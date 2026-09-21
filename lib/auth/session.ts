import "server-only";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export type Role = "user" | "editor" | "agency" | "superadmin";

export type SessionProfile = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: Role;
  pointsBalance: number;
  streakDays: number;
  isBanned: boolean;
  createdAt: string;
};

/**
 * The signed-in user and their profile row, or null.
 *
 * Always getUser(), never getSession(): getSession reads the cookie and trusts
 * it, and the cookie is attacker-controlled. getUser revalidates the JWT with
 * Supabase before we act on the identity in it.
 */
export async function getSessionProfile(): Promise<SessionProfile | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, role, points_balance, streak_days, is_banned, created_at")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    email: user.email ?? "",
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    role: data.role as Role,
    pointsBalance: data.points_balance,
    streakDays: data.streak_days,
    isBanned: data.is_banned,
    createdAt: data.created_at,
  };
}

/** For pages. Redirects to login, preserving where they were going. */
export async function requireUser(next: string): Promise<SessionProfile> {
  const profile = await getSessionProfile();
  if (!profile) redirect(`/login?next=${encodeURIComponent(next)}`);
  // A banned account keeps a valid session until it expires. Bounce it here as
  // well as in RLS, so it cannot sit in the dashboard reading its own history.
  if (profile.isBanned) redirect("/?banned=1");
  return profile;
}

export async function requireSuperadmin(next: string): Promise<SessionProfile> {
  const profile = await requireUser(next);
  // 404 rather than 403: the existence of an admin area is not information a
  // non-admin needs confirmed.
  if (profile.role !== "superadmin") redirect("/404");
  return profile;
}

/** The companies this user may act for, with their membership role. */
export async function getMemberships(): Promise<
  { agencyId: string; name: string; slug: string; status: string; memberRole: string }[]
> {
  const profile = await getSessionProfile();
  if (!profile) return [];

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("agency_members")
    .select("member_role, agencies!inner(id, name, slug, status)")
    .eq("user_id", profile.id);

  if (error || !data) return [];

  type Row = {
    member_role: string;
    agencies: { id: string; name: string; slug: string; status: string };
  };

  return (data as unknown as Row[]).map((row) => ({
    agencyId: row.agencies.id,
    name: row.agencies.name,
    slug: row.agencies.slug,
    status: row.agencies.status,
    memberRole: row.member_role,
  }));
}
