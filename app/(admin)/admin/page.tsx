import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { adminNav } from "@/lib/auth/nav";
import { requireSuperadmin } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Admin overview.
 *
 * requireSuperadmin() guards the route, and every table read below is also
 * behind an `is_superadmin()` RLS policy — so a role change that somehow got
 * past the page guard still returns nothing. Two locks, as everywhere else in
 * this area.
 */
export default async function AdminPage() {
  const profile = await requireSuperadmin("/admin");
  const supabase = await createServerClient();

  const countOf = async (table: string, filters: Record<string, string>) => {
    let query = supabase.from(table).select("id", { count: "exact", head: true });
    for (const [column, value] of Object.entries(filters)) query = query.eq(column, value);
    const { count } = await query;
    return count ?? 0;
  };

  const [pendingAgencies, pendingServices, pendingPosts, pendingFaqs, newLeads, subscribers] =
    await Promise.all([
      countOf("agencies", { status: "pending" }),
      countOf("services", { status: "pending" }),
      countOf("blog_posts", { status: "pending" }),
      countOf("faqs", { status: "pending" }),
      countOf("leads", { status: "new" }),
      supabase
        .from("subscribers")
        .select("id", { count: "exact", head: true })
        .then(({ count }) => count ?? 0),
    ]);

  const queue = pendingAgencies + pendingServices + pendingPosts + pendingFaqs;

  return (
    <DashboardShell
      profile={profile}
      items={adminNav()}
      title="Admin"
      subtitle="What needs a decision, and what has come in since you last looked."
    >
      <StatTiles
        tiles={[
          { label: "In the queue", value: queue, hint: "Awaiting approval" },
          { label: "New enquiries", value: newLeads, hint: "Not yet contacted" },
          { label: "Pending companies", value: pendingAgencies },
          { label: "Newsletter", value: subscribers, hint: "Subscribers" },
        ]}
      />

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/admin/moderation", label: "Moderation queue", body: `${queue} items waiting` },
          { href: "/admin/agencies", label: "Companies", body: "Verify, approve, review" },
          { href: "/admin/leads", label: "Enquiries", body: `${newLeads} new` },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-[var(--radius-card)] border border-card-border bg-surface p-5 no-underline transition-colors hover:border-sea/40"
          >
            <h2 className="text-[18px] font-bold text-ink">{card.label}</h2>
            <p className="mt-1 text-[14px] text-ink/60">{card.body}</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 rounded-[var(--radius-card)] border border-card-border bg-sand p-5">
        <h2 className="text-[17px] font-bold tracking-tight">Two things worth remembering</h2>
        <ul className="mt-3 flex flex-col gap-2 text-[15px] leading-relaxed text-ink/75">
          <li>
            Rejecting is not deleting. Rejected content stays in the database as the record of
            why a decision was made, and every decision is written to the moderation log with
            your name on it.
          </li>
          <li>
            Verifying a company means someone opened its trade licence and checked it. The
            badge is worth nothing the first time it is given out without that.
          </li>
        </ul>
      </section>
    </DashboardShell>
  );
}
