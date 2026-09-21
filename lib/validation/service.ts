import { z } from "zod";
import { EMIRATES } from "@/lib/validation/agency";

/**
 * A directory listing: one service a company offers, in one emirate.
 *
 * Separate from the company itself because a law firm has offices in three
 * emirates and a tour operator sells eight different products, and the
 * directory is browsed by service rather than by company.
 */

export const serviceCreateSchema = z
  .object({
    agency_id: z.string().uuid(),
    category_id: z.string().uuid(),
    name: z.string().trim().min(3).max(140),
    emirate: z.enum(EMIRATES),
    area: z.string().trim().max(120).optional(),
    summary: z.string().trim().max(300).optional(),
    body_md: z.string().trim().max(8000).optional(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s-]{7,20}$/)
      .optional(),
    whatsapp: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s-]{7,20}$/)
      .optional(),
    website: z
      .string()
      .trim()
      .max(200)
      .refine((v) => /^https?:\/\//i.test(v), "Start the address with http:// or https://")
      .optional(),
  })
  .strict();

export const serviceUpdateSchema = serviceCreateSchema
  .omit({ agency_id: true })
  .partial()
  .strict();

export type ServiceCreate = z.infer<typeof serviceCreateSchema>;

type ServiceRow = {
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
  status: string;
  created_at: string;
};

/**
 * Public shape. `body_md` is included but is rendered through
 * lib/sanitize.ts — it is guest-authored text and is untrusted by definition.
 */
export const serializeServicePublic = (row: ServiceRow) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  emirate: row.emirate,
  area: row.area,
  summary: row.summary,
  body_md: row.body_md,
  phone: row.phone,
  whatsapp: row.whatsapp,
  website: row.website,
  hero_image: row.hero_image,
  is_verified: row.is_verified,
});

export const serializeServiceOwner = (row: ServiceRow) => ({
  ...serializeServicePublic(row),
  status: row.status,
  created_at: row.created_at,
});

/** Paging for the directory. Capped so nobody can ask for the whole table. */
export const serviceListQuerySchema = z
  .object({
    category: z.string().trim().max(60).optional(),
    emirate: z.enum(EMIRATES).optional(),
    q: z.string().trim().max(80).optional(),
    page: z.coerce.number().int().min(1).max(500).default(1),
    perPage: z.coerce.number().int().min(1).max(48).default(24),
  })
  .strict();
