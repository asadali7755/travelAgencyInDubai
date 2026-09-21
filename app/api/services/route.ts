import { NextRequest } from "next/server";
import { blockedByOrigin, readJson, requireAgencyMember, requireApiUser } from "@/lib/api/guards";
import { fail, ok } from "@/lib/api/respond";
import { rateLimit } from "@/lib/rate-limit";
import { createServerClient } from "@/lib/supabase/server";
import {
  serializeServiceOwner,
  serializeServicePublic,
  serviceCreateSchema,
  serviceListQuerySchema,
} from "@/lib/validation/service";
import { slugifyName } from "@/lib/validation/agency";

const COLUMNS =
  "id, slug, name, emirate, area, summary, body_md, phone, whatsapp, website, hero_image, is_verified, status, created_at";

/**
 * The public directory feed. Approved listings only — enforced by RLS as well
 * as by the filter here, so a mistake in this handler cannot leak a pending or
 * rejected listing.
 */
export async function GET(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return ok({ items: [], total: 0, page: 1, perPage: 24 });
  }

  const parsed = serviceListQuerySchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams),
  );
  if (!parsed.success) return fail(400, "Invalid filters.", parsed.error.flatten().fieldErrors);

  const { category, emirate, q, page, perPage } = parsed.data;
  const supabase = await createServerClient();

  let query = supabase
    .from("services")
    .select(`${COLUMNS}, categories!inner(slug)`, { count: "exact" })
    .eq("status", "approved")
    .is("deleted_at", null);

  if (emirate) query = query.eq("emirate", emirate);
  if (category) query = query.eq("categories.slug", category);
  // textSearch, not ILIKE '%term%': the GIN index in migration 0002 can serve
  // this, and a wildcard-prefixed LIKE cannot use an index at all.
  if (q) query = query.textSearch("search_tsv", q, { type: "websearch", config: "english" });

  const from = (page - 1) * perPage;
  const { data, error, count } = await query
    .order("is_verified", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, from + perPage - 1);

  if (error) {
    console.error("services.list", error.message);
    return fail(500, "We couldn't load the directory.");
  }

  return ok({
    items: (data ?? []).map(serializeServicePublic),
    total: count ?? 0,
    page,
    perPage,
  });
}

/** A company adds a listing. Created `pending`; a superadmin approves it. */
export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, { key: "services:create", limit: 10, window: "1 h" });
  if (limited) return fail(429, "Too many listings. Please try again later.");

  if (blockedByOrigin(req)) return fail(403, "Request blocked.");

  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const body = await readJson(req);
  if (body === null) return fail(400, "Invalid request body.");

  const parsed = serviceCreateSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }

  const member = await requireAgencyMember(auth.supabase, auth.userId, parsed.data.agency_id);
  if ("error" in member) return member.error;

  const slug = `${slugifyName(parsed.data.name) || "listing"}-${crypto.randomUUID().slice(0, 6)}`;

  const { data, error } = await auth.supabase
    .from("services")
    .insert({ ...parsed.data, slug, owner_id: auth.userId, status: "pending" })
    .select(COLUMNS)
    .single();

  if (error || !data) {
    console.error("services.create", error?.message);
    return fail(500, "We couldn't save that listing. Please try again.");
  }

  return ok(serializeServiceOwner(data), 201);
}
