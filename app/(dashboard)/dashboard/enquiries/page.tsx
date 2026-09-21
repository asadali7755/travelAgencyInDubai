import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

const STATUS_STYLE: Record<string, string> = {
  new: "bg-sea-tint text-sea-dark",
  contacted: "bg-gold-tint text-gold-dark",
  won: "bg-palm-tint text-palm",
  lost: "bg-sand text-ink/60",
  spam: "bg-coral-tint text-coral-dark",
};

/**
 * The visitor's own enquiry history.
 *
 * The only filter is `user_id`, and the RLS policy added in migration 0007 says
 * the same thing — a signed-in user reads rows stamped with their own id and
 * nothing else. `leads` still has no public SELECT policy at all.
 */
export default async function EnquiriesPage() {
  const profile = await requireUser("/dashboard/enquiries");
  const memberships = await getMemberships();

  const supabase = await createServerClient();
  const { data } = await supabase
    .from("leads")
    .select("id, created_at, status, message, travel_date, source")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const leads = data ?? [];

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, memberships.length > 0)}
      title="My enquiries"
      subtitle="Everything you've sent us from this account, newest first."
    >
      {leads.length === 0 ? (
        <EmptyState
          title="No enquiries yet"
          body="Send us a question about a tour, a package or a visa while you're signed in and it will appear here."
          action={{ href: "/contact", label: "Ask us something" }}
        />
      ) : (
        <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Your enquiry history</caption>
            <thead>
              <tr className="border-y border-divider">
                {["Sent", "About", "Travel date", "Status"].map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className="py-3 pr-4 text-[13px] font-bold uppercase tracking-[0.1em] text-ink/55"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-divider align-top">
                  <td className="py-4 pr-4 text-[15px] whitespace-nowrap text-ink/85">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="max-w-[40ch] py-4 pr-4 text-[15px] leading-relaxed text-ink/75">
                    {lead.message ?? lead.source ?? "General enquiry"}
                  </td>
                  <td className="py-4 pr-4 text-[15px] whitespace-nowrap text-ink/75">
                    {lead.travel_date
                      ? new Date(lead.travel_date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] ${
                        STATUS_STYLE[lead.status] ?? "bg-sand text-ink/60"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
