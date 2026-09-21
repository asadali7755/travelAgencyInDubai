import { NextRequest } from "next/server";
import { blockedByOrigin, readJson, requireApiUser } from "@/lib/api/guards";
import { fail, ok } from "@/lib/api/respond";
import { rateLimit } from "@/lib/rate-limit";
import {
  agencyCreateSchema,
  serializeAgencyOwner,
  slugifyName,
} from "@/lib/validation/agency";

/**
 * Register a company profile.
 *
 * rate limit -> origin -> auth -> validate -> insert -> link the owner ->
 * serialise. The listing is created `pending` and unverified; RLS enforces that
 * as well, so a hand-rolled request cannot insert itself as approved.
 */
export async function POST(req: NextRequest) {
  // Three a day per IP. Registering a business is a once-ever action for a real
  // company, and the cost of a directory full of spam listings is the moderation
  // queue becoming useless.
  const limited = await rateLimit(req, { key: "agency:create", limit: 3, window: "24 h" });
  if (limited) return fail(429, "Too many registrations from this connection today.");

  if (blockedByOrigin(req)) return fail(403, "Request blocked.");

  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const body = await readJson(req);
  if (body === null) return fail(400, "Invalid request body.");

  const parsed = agencyCreateSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }

  const { supabase, userId } = auth;

  // Slug collisions are resolved with a short random suffix rather than a
  // read-then-write, which would race two simultaneous registrations of the
  // same company name.
  const base = slugifyName(parsed.data.name) || "company";
  const slug = `${base}-${crypto.randomUUID().slice(0, 6)}`;

  const { data, error } = await supabase
    .from("agencies")
    .insert({ ...parsed.data, slug, created_by: userId, status: "pending" })
    .select(
      "id, slug, name, kind, tagline, about_md, emirate, area, email, phone, whatsapp, website, logo_url, cover_url, licence_number, is_verified, status, review_note, created_at",
    )
    .single();

  if (error || !data) {
    console.error("agencies.create", error?.message);
    return fail(500, "We couldn't register that company. Please try again.");
  }

  // Link the creator as owner. If this fails the profile exists but nobody can
  // edit it, so it is reported rather than swallowed — a superadmin can attach
  // the member by hand and the audit trail shows what happened.
  const { error: memberError } = await supabase
    .from("agency_members")
    .insert({ agency_id: data.id, user_id: userId, member_role: "owner" });

  if (memberError) {
    console.error("agencies.create.member", memberError.message);
    return fail(500, "The profile was created but we couldn't link your account. Contact us.");
  }

  return ok(serializeAgencyOwner(data), 201);
}
