import { NextRequest, NextResponse } from "next/server";
import { blockedByOrigin } from "@/lib/api/guards";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Sign out. POST only and same-origin only: a GET would let any page on the
 * internet log our visitors out with an <img src>, which is a small but real
 * denial-of-service on the session.
 */
export async function POST(req: NextRequest) {
  if (blockedByOrigin(req)) {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", req.url), { status: 303 });
}
