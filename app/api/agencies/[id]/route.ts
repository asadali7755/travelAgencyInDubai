import { NextRequest } from "next/server";
import {
  blockedByOrigin,
  readJson,
  requireAgencyMember,
  requireApiUser,
} from "@/lib/api/guards";
import { fail, ok } from "@/lib/api/respond";
import { rateLimit } from "@/lib/rate-limit";
import { agencyUpdateSchema, serializeAgencyOwner } from "@/lib/validation/agency";

const COLUMNS =
  "id, slug, name, kind, tagline, about_md, emirate, area, email, phone, whatsapp, website, logo_url, cover_url, licence_number, is_verified, status, review_note, created_at";

/** The company's own view of its profile, including its moderation state. */
export async function GET(_req: NextRequest, { params }: RouteContext<"/api/agencies/[id]">) {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const member = await requireAgencyMember(auth.supabase, auth.userId, id);
  if ("error" in member) return member.error;

  const { data, error } = await auth.supabase
    .from("agencies")
    .select(COLUMNS)
    .eq("id", id)
    .single();

  if (error || !data) return fail(404, "Company not found.");

  return ok(serializeAgencyOwner(data));
}

/**
 * Edit the company profile.
 *
 * Note what is not in agencyUpdateSchema: status and is_verified. `.strict()`
 * rejects them outright, and the RLS policy in migration 0007 freezes both
 * columns on an owner update as well. Two locks, because "approve yourself" is
 * the single most valuable thing an attacker could do here.
 */
export async function PATCH(req: NextRequest, { params }: RouteContext<"/api/agencies/[id]">) {
  const limited = await rateLimit(req, { key: "agency:update", limit: 30, window: "10 m" });
  if (limited) return fail(429, "Too many changes. Please try again shortly.");

  if (blockedByOrigin(req)) return fail(403, "Request blocked.");

  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const member = await requireAgencyMember(auth.supabase, auth.userId, id);
  if ("error" in member) return member.error;
  if (member.memberRole !== "owner") {
    return fail(403, "Only an owner can edit the company profile.");
  }

  const body = await readJson(req);
  if (body === null) return fail(400, "Invalid request body.");

  const parsed = agencyUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }
  if (Object.keys(parsed.data).length === 0) {
    return fail(400, "Nothing to update.");
  }

  const { data, error } = await auth.supabase
    .from("agencies")
    .update(parsed.data)
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error || !data) {
    console.error("agencies.update", error?.message);
    return fail(500, "We couldn't save those changes. Please try again.");
  }

  return ok(serializeAgencyOwner(data));
}
