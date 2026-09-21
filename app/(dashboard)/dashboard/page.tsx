import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

/**
 * The account overview: who you are, what you have asked us, and whether you
 * run a business on the directory.
 *
 * A Server Component reading Supabase directly — the session cookie is already
 * on the request and RLS scopes every query to this user, so there is no reason
 * to bounce through a route handler.
 */
export default async function DashboardPage() {
  const profile = await requireUser("/dashboard");
  const memberships = await getMemberships();

  const supabase = await createServerClient();
  const { data: recent } = await supabase
    .from("leads")
    .select("id, created_at, status, message, travel_date")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const enquiries = recent ?? [];

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, memberships.length > 0)}
      title={`Hello, ${profile.displayName}`}
      subtitle="Everything you've asked us, in one place."
    >
      <StatTiles
        tiles={[
          { label: "Enquiries", value: enquiries.length, hint: "Sent from this account" },
          { label: "Points", value: profile.pointsBalance, hint: "Redeemable against tours" },
          { label: "Streak", value: `${profile.streakDays} days`, hint: "Consecutive visits" },
          {
            label: "Businesses",
            value: memberships.length,
            hint: memberships.length ? "You manage these" : "List yours for free",
          },
        ]}
      />

      <section className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[21px] font-extrabold tracking-tight">Recent enquiries</h2>
          {enquiries.length ? <Link href="/dashboard/enquiries">See all</Link> : null}
        </div>

        <div className="mt-5">
          {enquiries.length === 0 ? (
            <EmptyState
              title="Nothing here yet"
              body="Once you send us an enquiry while signed in, it shows up here with whatever we've replied."
              action={{ href: "/packages", label: "Browse packages" }}
            />
          ) : (
            <ul className="rounded-[var(--radius-card)] border border-card-border bg-surface">
              {enquiries.map((lead) => (
                <li
                  key={lead.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-divider px-5 py-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink">
                      {new Date(lead.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-0.5 max-w-[60ch] truncate text-[14px] text-ink/60">
                      {lead.message ?? "No message"}
                    </p>
                  </div>
                  <span className="rounded-full bg-sea-tint px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-sea-dark">
                    {lead.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}
