import { z } from "zod";

export const subscribeSchema = z
  .object({
    email: z.email().trim().toLowerCase().max(160),
    source: z.string().trim().max(120).optional(),
  })
  .strict();

export type SubscribeInput = z.infer<typeof subscribeSchema>;

/**
 * Carries nothing from the stored row. `subscribers` is write-only for the
 * public under RLS, so returning the row would need a SELECT policy the table
 * must not have — the same reason app/api/leads/route.ts does not select.
 */
export const serializeSubscribeReceipt = () => ({ status: "subscribed" as const });
