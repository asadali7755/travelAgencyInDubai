import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";

const STATUS_COPY: Record<string, { label: string; tone: string }> = {
  pending: { label: "Awaiting review", tone: "bg-gold-tint text-gold-dark" },
  approved: { label: "Live", tone: "bg-palm-tint text-palm" },
  rejected: { label: "Needs changes", tone: "bg-coral-tint text-coral-dark" },
  draft: { label: "Draft", tone: "bg-sand text-ink/60" },
  archived: { label: "Archived", tone: "bg-sand text-ink/60" },
};

/** The companies this account manages, and the way in to registering another. */
export default async function AgencyIndexPage() {
  const profile = await requireUser("/agency");
  const memberships = await getMemberships();

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, memberships.length > 0)}
      title={memberships.length ? "My business" : "List your business"}
      subtitle="Travel agencies, visa agents, clinics, law firms, spas and movers — a free profile in the UAE directory, reviewed by a person before it goes live."
    >
      {memberships.length === 0 ? (
        <EmptyState
          title="No business on your account yet"
          body="Register your company to get a public profile, list your services, upload your trade licence for a verified badge, and receive enquiries from visitors straight to your inbox."
          action={{ href: "/agency/new", label: "Register a company" }}
        />
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2">
            {memberships.map((membership) => {
              const status = STATUS_COPY[membership.status] ?? STATUS_COPY.draft;

              return (
                <li key={membership.agencyId}>
                  <Link
                    href={`/agency/${membership.agencyId}`}
                    className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-card-border bg-surface p-5 no-underline transition-colors hover:border-sea/40"
                  >
                    <div>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${status.tone}`}
                      >
                        {status.label}
                      </span>
                      <h2 className="mt-3 text-[19px] font-bold text-ink">{membership.name}</h2>
                    </div>
                    <p className="mt-3 text-[14px] text-ink/60">
                      You are {membership.memberRole === "owner" ? "the owner" : "staff"} ·
                      Manage →
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/agency/new"
            className="mt-6 inline-flex min-h-11 items-center rounded-full border border-sea px-6 text-[15px] font-semibold text-sea no-underline hover:bg-sea-tint"
          >
            Register another company
          </Link>
        </>
      )}
    </DashboardShell>
  );
}
