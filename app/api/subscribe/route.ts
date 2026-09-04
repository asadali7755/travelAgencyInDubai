import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { subscribeSchema, serializeSubscribeReceipt } from "@/lib/validation/subscriber";
import { rateLimit } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/api/respond";

/**
 * rate limit -> validate input -> insert -> serialise output.
 * Same five-step shape as the leads route, and the same reason there is no auth
 * step: subscribing is public by design, and RLS makes `subscribers` write-only
 * for anyone holding the anon key.
 */
export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, { key: "subscribe:create", limit: 5, window: "10 m" });
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

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return fail(400, "Please enter a valid email address.", parsed.error.flatten().fieldErrors);
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("subscribe.create: Supabase is not configured");
    return fail(503, "The newsletter isn't connected yet. Please try again later.");
  }

  try {
    const supabase = await createServerClient();
    // No .select(): PostgREST would turn it into INSERT ... RETURNING, which
    // Postgres runs through the SELECT policy this table deliberately lacks.
    const { error } = await supabase.from("subscribers").insert(parsed.data);

    // 23505 is the unique index on lower(email). Somebody subscribing twice has
    // got what they wanted, so telling them it failed would be both untrue and
    // annoying.
    if (error && error.code !== "23505") {
      console.error("subscribe.create", error.message);
      return fail(500, "We couldn't sign you up. Please try again.");
    }

    return ok(serializeSubscribeReceipt(), 201);
  } catch (cause) {
    console.error("subscribe.create", cause);
    return fail(500, "We couldn't sign you up. Please try again.");
  }
}
