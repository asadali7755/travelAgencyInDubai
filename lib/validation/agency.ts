import { z } from "zod";

/**
 * The company profile boundary — used by the registration form, the agency
 * dashboard and the mobile app, so the rules exist exactly once.
 *
 * `.strict()` everywhere: an unknown key is a bug or an attempt, and either way
 * it should fail loudly rather than be silently dropped into an insert.
 */

export const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Fujairah",
  "Ras Al Khaimah",
  "Umm Al Quwain",
] as const;

export const AGENCY_KINDS = [
  "tour",
  "visa",
  "hotel",
  "transport",
  "law",
  "medical",
  "spa",
  "moving",
  "other",
] as const;

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number");

/**
 * http/https only. Without the protocol check a value like
 * `javascript:alert(1)` reaches an href and becomes stored XSS, and
 * z.string().url() accepts it happily.
 */
const website = z
  .string()
  .trim()
  .max(200)
  .refine((value) => /^https?:\/\//i.test(value), "Start the address with http:// or https://");

export const agencyCreateSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    kind: z.enum(AGENCY_KINDS),
    tagline: z.string().trim().max(160).optional(),
    about_md: z.string().trim().max(6000).optional(),
    emirate: z.enum(EMIRATES),
    area: z.string().trim().max(120).optional(),
    email: z.email().trim().toLowerCase().max(160).optional(),
    phone: phone.optional(),
    whatsapp: phone.optional(),
    website: website.optional(),
    licence_number: z.string().trim().max(60).optional(),
  })
  .strict();

/** Same fields, all optional — a profile edit changes one thing at a time. */
export const agencyUpdateSchema = agencyCreateSchema.partial().strict();

export type AgencyCreate = z.infer<typeof agencyCreateSchema>;
export type AgencyUpdate = z.infer<typeof agencyUpdateSchema>;

/** A row as it comes back from Supabase, before anything is decided about it. */
type AgencyRow = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  tagline: string | null;
  about_md: string | null;
  emirate: string;
  area: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  logo_url: string | null;
  cover_url: string | null;
  licence_number: string | null;
  is_verified: boolean;
  status: string;
  review_note: string | null;
  created_at: string;
};

/**
 * What the public directory may see.
 *
 * Note what is missing: licence_number, review_note, created_by, reviewed_by.
 * A trade licence number is a business identifier we hold to verify the
 * company, not something to publish, and the review note routinely contains
 * the reason a listing was rejected.
 */
export const serializeAgencyPublic = (row: AgencyRow) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  kind: row.kind,
  tagline: row.tagline,
  about_md: row.about_md,
  emirate: row.emirate,
  area: row.area,
  email: row.email,
  phone: row.phone,
  whatsapp: row.whatsapp,
  website: row.website,
  logo_url: row.logo_url,
  cover_url: row.cover_url,
  is_verified: row.is_verified,
});

/** What the company itself sees: the above plus its own moderation state. */
export const serializeAgencyOwner = (row: AgencyRow) => ({
  ...serializeAgencyPublic(row),
  licence_number: row.licence_number,
  status: row.status,
  review_note: row.review_note,
  created_at: row.created_at,
});

/**
 * Slug from a company name. Collisions are resolved by the caller appending a
 * suffix — this only has to produce something URL-safe and stable.
 */
export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
