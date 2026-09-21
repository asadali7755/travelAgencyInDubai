import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";

/**
 * Account details.
 *
 * Read-only for now on purpose. The RLS policy in migration 0003 lets a user
 * update their own display name and avatar but freezes `role` and
 * `points_balance`, and the edit form is the next thing to build against that
 * policy — shipping a form that half-works would be worse than showing the
 * details plainly and saying so.
 */
export default async function ProfilePage() {
  const profile = await requireUser("/dashboard/profile");
  const memberships = await getMemberships();

  const rows: { term: string; value: string }[] = [
    { term: "Name", value: profile.displayName },
    { term: "Email", value: profile.email },
    { term: "Account type", value: profile.role === "user" ? "Traveller" : profile.role },
    {
      term: "Member since",
      value: new Date(profile.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    { term: "Points balance", value: String(profile.pointsBalance) },
    { term: "Visit streak", value: `${profile.streakDays} days` },
  ];

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, memberships.length > 0)}
      title="Profile"
      subtitle="Your account details and what they are used for."
    >
      <dl className="rounded-[var(--radius-card)] border border-card-border bg-surface">
        {rows.map((row) => (
          <div
            key={row.term}
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-divider px-5 py-4 last:border-b-0"
          >
            <dt className="text-[14px] font-semibold text-ink/60">{row.term}</dt>
            <dd className="text-[16px] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 rounded-[var(--radius-card)] border border-card-border bg-sand p-5">
        <h2 className="text-[17px] font-bold tracking-tight">Editing these details</h2>
        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink/70">
          Name and photo will be editable here shortly. Your role and points balance are set by
          us and cannot be changed from the browser — the database refuses it, which is what
          stops anyone granting themselves a discount balance.
        </p>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink/70">
          To change your email or delete your account, message us and a human will handle it.
        </p>
      </div>
    </DashboardShell>
  );
}
