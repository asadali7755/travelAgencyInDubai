import { createClient } from "@supabase/supabase-js";

/**
 * Anon client with no cookies attached, for public reads.
 *
 * `createServerClient()` binds to the request cookies, which makes any route
 * that touches it dynamic. A directory page that only ever shows approved
 * listings has nothing user-specific in it, so binding it to cookies both
 * broke `export const revalidate` (DYNAMIC_SERVER_USAGE, served as a 500) and
 * forced a render per request for content that is the same for everybody.
 *
 * Still the anon key, so Row Level Security governs every read exactly as
 * before — this sees precisely what a signed-out visitor sees, which for the
 * public directory is the whole point.
 */
export const createPublicClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
