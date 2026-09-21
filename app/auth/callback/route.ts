import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Where the email confirmation link lands. Exchanges the one-time code for a
 * session cookie, then sends the visitor on.
 *
 * `next` comes from the URL, so it is validated to be a same-site path before
 * it is used in a redirect. Without that check this is a textbook open redirect
 * — and an open redirect on an auth callback is the one that gets used.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const raw = req.nextUrl.searchParams.get("next") ?? "/dashboard";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing-code", req.url));
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("auth.callback", error.message);
    return NextResponse.redirect(new URL("/login?error=expired-link", req.url));
  }

  return NextResponse.redirect(new URL(next, req.url));
}
