import { createPublicClient } from "@/lib/supabase/public";

/**
 * Read paths for the public services directory.
 *
 * Every function here degrades to an empty result when Supabase is not
 * configured, so the directory renders its "nothing listed yet" state during
 * local development instead of throwing on a public page.
 *
 * All reads go through the cookie-free anon client, so RLS governs every one of
 * them and the pages stay statically cacheable. The `status = 'approved'`
 * filters below are a second lock, not the only one.
 */

export type DirectoryCategory = {
  id: string;
  slug: string;
  name: string;
  kind: string;
};

export type DirectoryListing = {
  id: string;
  slug: string;
  name: string;
  emirate: string;
  area: string | null;
  summary: string | null;
  bodyMd: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  heroImage: string | null;
  isVerified: boolean;
  categorySlug: string;
  categoryName: string;
  agency: { name: string; slug: string; isVerified: boolean } | null;
};

const configured = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

const SELECT =
  "id, slug, name, emirate, area, summary, body_md, phone, whatsapp, website, hero_image, is_verified, " +
  "categories!inner(slug, name), agencies(name, slug, is_verified)";

type Row = {
  id: string;
  slug: string;
  name: string;
  emirate: string;
  area: string | null;
  summary: string | null;
  body_md: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  hero_image: string | null;
  is_verified: boolean;
  categories: { slug: string; name: string };
  agencies: { name: string; slug: string; is_verified: boolean } | null;
};

/** Explicit mapping, never a spread of the raw row — see the platform rules. */
const toListing = (row: Row): DirectoryListing => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  emirate: row.emirate,
  area: row.area,
  summary: row.summary,
  bodyMd: row.body_md,
  phone: row.phone,
  whatsapp: row.whatsapp,
  website: row.website,
  heroImage: row.hero_image,
  isVerified: row.is_verified,
  categorySlug: row.categories.slug,
  categoryName: row.categories.name,
  agency: row.agencies
    ? { name: row.agencies.name, slug: row.agencies.slug, isVerified: row.agencies.is_verified }
    : null,
});

export async function getCategories(): Promise<DirectoryCategory[]> {
  if (!configured()) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, kind")
    .order("position");

  if (error || !data) return [];
  return data as DirectoryCategory[];
}

export async function getCategory(slug: string): Promise<DirectoryCategory | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getListings(options: {
  category?: string;
  emirate?: string;
  limit?: number;
}): Promise<DirectoryListing[]> {
  if (!configured()) return [];

  const supabase = createPublicClient();
  let query = supabase
    .from("services")
    .select(SELECT)
    .eq("status", "approved")
    .is("deleted_at", null);

  if (options.category) query = query.eq("categories.slug", options.category);
  if (options.emirate) query = query.eq("emirate", options.emirate);

  // Verified businesses first. It is the only ranking signal we have that a
  // human actually checked something, so it is the one worth surfacing.
  const { data, error } = await query
    .order("is_verified", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(options.limit ?? 48);

  if (error || !data) return [];
  return (data as unknown as Row[]).map(toListing);
}

export async function getListing(
  category: string,
  slug: string,
): Promise<DirectoryListing | null> {
  if (!configured()) return null;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select(SELECT)
    .eq("slug", slug)
    .eq("categories.slug", category)
    .eq("status", "approved")
    .is("deleted_at", null)
    .maybeSingle();

  if (error || !data) return null;
  return toListing(data as unknown as Row);
}

/** How many approved listings sit in each category, for the hub cards. */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  if (!configured()) return {};

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("categories!inner(slug)")
    .eq("status", "approved")
    .is("deleted_at", null)
    .limit(1000);

  if (error || !data) return {};

  const counts: Record<string, number> = {};
  for (const row of data as unknown as { categories: { slug: string } }[]) {
    counts[row.categories.slug] = (counts[row.categories.slug] ?? 0) + 1;
  }
  return counts;
}
