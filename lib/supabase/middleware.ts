import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase session on every request and hands the refreshed
 * cookies back on the response.
 *
 * Server Components cannot set cookies, so without this the access token
 * expires after an hour and a signed-in visitor is silently logged out mid-
 * session. Middleware is the only place in the App Router that can write them.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Not configured yet (local dev before Supabase is wired up). Pass through
  // rather than throwing on every single request, including public pages.
  if (!url || !key) return { response, user: null };

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser(), not getSession(): getSession trusts the cookie as sent, which is
  // attacker-controlled. getUser revalidates the token against Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
