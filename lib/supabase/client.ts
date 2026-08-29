import { createBrowserClient } from "@supabase/ssr";

/** Browser client. Anon key only — every read it makes is governed by RLS. */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
