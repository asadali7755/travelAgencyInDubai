import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Two jobs: keep the Supabase session alive, and keep signed-out visitors out
 * of the authenticated areas.
 *
 * This is a convenience gate, not the security boundary. Row Level Security is
 * the boundary — every guarded page and route handler re-checks the role server
 * side. Middleware only saves a visitor from loading a dashboard that would
 * render empty anyway.
 */
const GUARDED = ["/dashboard", "/agency", "/admin"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (GUARDED.some((prefix) => pathname.startsWith(prefix)) && !user) {
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    // Bring them back where they were trying to go once they have signed in.
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return response;
}

export const config = {
  // Everything except static assets and image files. Running the session
  // refresh on /_next/static would triple the request count for no benefit.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)",
  ],
};
