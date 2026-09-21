import { NextRequest } from "next/server";
import { z } from "zod";
import { blockedByOrigin, readJson, requireApiSuperadmin } from "@/lib/api/guards";
import { fail, ok } from "@/lib/api/respond";

/**
 * The single moderation endpoint. Approve, reject, archive or verify anything
 * in the queue, and write the decision to the audit log in the same request.
 *
 * Note there is no 'delete'. Rejected listings stay in the table: they are the
 * evidence if a decision is challenged and the signal for tuning the filters.
 * See CLAUDE.md — the database is append-only unless a human says otherwise.
 */

const TABLES = {
  agency: "agencies",
  service: "services",
  package: "packages",
  blog_post: "blog_posts",
  faq: "faqs",
} as const;

const moderateSchema = z
  .object({
    entity: z.enum(["agency", "service", "package", "blog_post", "faq"]),
    id: z.string().uuid(),
    action: z.enum(["approve", "reject", "archive", "verify", "unverify"]),
    note: z.string().trim().max(1000).optional(),
  })
  .strict()
  .refine(
    (v) => (v.action === "reject" ? Boolean(v.note && v.note.length >= 5) : true),
    { message: "Say why it was rejected — the company is told this.", path: ["note"] },
  )
  .refine(
    (v) => (v.action === "verify" || v.action === "unverify" ? v.entity === "agency" : true),
    { message: "Only companies can be verified.", path: ["action"] },
  );

const STATUS: Record<string, string> = {
  approve: "approved",
  reject: "rejected",
  archive: "archived",
};

export async function POST(req: NextRequest) {
  if (blockedByOrigin(req)) return fail(403, "Request blocked.");

  const auth = await requireApiSuperadmin();
  if ("error" in auth) return auth.error;

  const body = await readJson(req);
  if (body === null) return fail(400, "Invalid request body.");

  const parsed = moderateSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }

  const { entity, id, action, note } = parsed.data;
  const table = TABLES[entity];
  const now = new Date().toISOString();

  // Verification is a separate flag from publication status: a company can be
  // approved and appear in the directory without its trade licence having been
  // checked, and the badge has to mean something.
  const patch =
    action === "verify" || action === "unverify"
      ? { is_verified: action === "verify" }
      : {
          status: STATUS[action],
          ...(entity === "agency"
            ? { review_note: note ?? null, reviewed_by: auth.userId, reviewed_at: now }
            : {}),
          ...(action === "approve" && (entity === "package" || entity === "blog_post")
            ? { published_at: now }
            : {}),
        };

  const { error } = await auth.supabase.from(table).update(patch).eq("id", id);

  if (error) {
    console.error("moderate.update", error.message);
    return fail(500, "We couldn't apply that decision.");
  }

  // The log is append-only and has no client INSERT policy, so it is written
  // with the user's client only because superadmins have a blanket policy on
  // their own tables — moderation_events deliberately does not grant insert to
  // anyone, so this goes through the service role.
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const { error: logError } = await createAdminClient()
    .from("moderation_events")
    .insert({ entity, entity_id: id, action, actor_id: auth.userId, note: note ?? null });

  if (logError) {
    // The decision stands, but an unlogged decision is a governance problem.
    // Surface it rather than let the queue look clean.
    console.error("moderate.log", logError.message);
    return fail(500, "The decision was applied but could not be logged. Tell an engineer.");
  }

  return ok({ entity, id, action });
}
