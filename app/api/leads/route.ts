import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { leadCreateSchema, serializeLeadReceipt } from "@/lib/validation/lead";
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

  // Until Supabase is connected there is nowhere to put the enquiry. Say so
  // clearly rather than letting the client throw and return an empty body,
  // which is what a visitor would otherwise experience as a dead button.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("leads.create: Supabase is not configured");
    return fail(
      503,
      "Our enquiry form isn't connected yet. Please message us on WhatsApp and we'll reply straight away.",
    );
  }

  const { travel_date, ...rest } = parsed.data;

  try {
    const supabase = await createServerClient();
    // No .select() on purpose. PostgREST turns one into INSERT ... RETURNING,
    // which Postgres runs through the SELECT policy as well — and `leads` has
    // none for the public, by design. Asking for the row back would make every
    // enquiry fail with 42501 while the row itself inserted fine.
    const { error } = await supabase.from("leads").insert({
      ...rest,
      travel_date: travel_date ? travel_date.toISOString().slice(0, 10) : null,
    });

    if (error) {
      console.error("leads.create", error.message);
      return fail(500, "We couldn't submit your enquiry. Please try again.");
    }

    return ok(serializeLeadReceipt(), 201);
  } catch (cause) {
    console.error("leads.create", cause);
    return fail(500, "We couldn't submit your enquiry. Please try again.");
  }
}
