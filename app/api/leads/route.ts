import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { leadCreateSchema, serializeLead } from "@/lib/validation/lead";
import { rateLimit } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/api/respond";

/**
 * rate limit -> validate input -> insert -> serialise output.
 * No auth step: enquiries are public by design, and RLS makes `leads` write-only
 * for anyone holding the anon key.
 */
export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, { key: "leads:create", limit: 5, window: "10 m" });
  if (limited) return fail(429, "Too many requests. Please try again shortly.");

  const origin = req.headers.get("origin");
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (origin && site && !origin.startsWith(site)) {
    return fail(403, "Request blocked.");
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const parsed = leadCreateSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }

  const { travel_date, ...rest } = parsed.data;
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      ...rest,
      travel_date: travel_date ? travel_date.toISOString().slice(0, 10) : null,
    })
    .select("id, created_at, status")
    .single();

  if (error) {
    console.error("leads.create", error.message);
    return fail(500, "We couldn't submit your enquiry. Please try again.");
  }

  return ok(serializeLead(data), 201);
}
