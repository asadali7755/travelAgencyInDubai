import "server-only";
import type { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { fail } from "@/lib/api/respond";

/**
 * The checks every mutating route handler repeats, in one place.
 *
 * RLS is the security boundary; these are the second lock. Checking here as
 * well means a handler that forgets a filter fails with a clean 401/403 instead
 * of returning an empty list and looking like a bug.
 */

/**
 * Same-origin check for state-changing requests. Supabase auth uses cookies, so
 * without this a form on another site could post here with the visitor's
 * session attached. `Origin` is set by the browser on every cross-site POST and
 * cannot be forged by page script.
 */
export function blockedByOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin || !site) return false;
  return !origin.startsWith(site);
}

export async function readJson(req: NextRequest): Promise<unknown | null> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

/** The signed-in user id, or a 401 response to return straight back. */
export async function requireApiUser() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: fail(503, "Accounts are not connected yet.") } as const;
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: fail(401, "Please sign in first.") } as const;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, is_banned")
    .eq("id", user.id)
    .single();

  if (!profile) return { error: fail(401, "Please sign in first.") } as const;
  if (profile.is_banned) return { error: fail(403, "This account is suspended.") } as const;

  return { supabase, userId: user.id, role: profile.role as string } as const;
}

export async function requireApiSuperadmin() {
  const auth = await requireApiUser();
  if ("error" in auth) return auth;
  if (auth.role !== "superadmin") {
    return { error: fail(403, "Not allowed.") } as const;
  }
  return auth;
}

/**
 * Confirms the caller may act for this company.
 *
 * Reads agency_members with the *user's* client, so RLS decides. A caller who
 * is not a member gets no row back and therefore no access, even if they
 * guessed a valid agency id.
 */
export async function requireAgencyMember(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  userId: string,
  agencyId: string,
) {
  const { data } = await supabase
    .from("agency_members")
    .select("member_role")
    .eq("agency_id", agencyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) return { error: fail(403, "You do not manage that company.") } as const;
  return { memberRole: data.member_role as string } as const;
}
