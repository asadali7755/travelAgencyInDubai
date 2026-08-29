import { z } from "zod";

export const leadCreateSchema = z
  .object({
    full_name: z.string().trim().min(2).max(80),
    email: z.email().trim().toLowerCase().max(160),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
    country: z.string().trim().length(2).toUpperCase(),
    package_id: z.string().uuid().optional(),
    service_id: z.string().uuid().optional(),
    message: z.string().trim().max(1000).optional(),
    travel_date: z.coerce.date().min(new Date()).optional(),
    source: z.string().trim().max(120).optional(),
  })
  .strict();

export type LeadCreate = z.infer<typeof leadCreateSchema>;

export const serializeLead = (row: {
  id: string;
  created_at: string;
  status: string;
}) => ({
  id: row.id,
  createdAt: row.created_at,
  status: row.status,
});
