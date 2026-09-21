import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { adminNav } from "@/lib/auth/nav";
import { requireSuperadmin } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Every enquiry that has come in — the commercial output of the whole site.
 *
 * Contact details are shown because this page exists to let someone pick up the
 * phone, and it is behind requireSuperadmin() plus an is_superadmin() RLS
 * policy on `leads`. It is the one screen on the site that renders an email
 * address and a phone number together, and that is deliberate.
 */
export default async function AdminLeadsPage() {
  const profile = await requireSuperadmin("/admin/leads");
  const supabase = await createServerClient();

  const { data } = await supabase
    .from("leads")
    .select("id, full_name, email, phone, country, message, travel_date, source, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const leads = data ?? [];

  return (
    <DashboardShell
      profile={profile}
      items={adminNav()}
      title="Enquiries"
      subtitle="Newest first. Contact details are on this screen only."
    >
      {leads.length === 0 ? (
        <EmptyState
          title="No enquiries yet"
          body="Every form on the public site writes here — the contact page, the tour pages, the package pages and the trip calculator."
        />
      ) : (
        <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <caption className="sr-only">All enquiries</caption>
            <thead>
              <tr className="border-y border-divider">
                {["Received", "Name", "Contact", "About", "Travelling", "Status"].map((head) => (
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
                  <td className="py-4 pr-4 text-[14px] whitespace-nowrap text-ink/70">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <th scope="row" className="py-4 pr-4 text-[15px] font-semibold text-ink">
                    {lead.full_name}
                    <span className="mt-0.5 block text-[13px] font-normal text-ink/55">
                      {lead.country}
                    </span>
                  </th>
                  <td className="py-4 pr-4 text-[14px] text-ink/75">
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    <span className="mt-0.5 block">
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </span>
                  </td>
                  <td className="max-w-[36ch] py-4 pr-4 text-[14px] leading-relaxed text-ink/75">
                    {lead.message ?? lead.source ?? "—"}
                  </td>
                  <td className="py-4 pr-4 text-[14px] whitespace-nowrap text-ink/75">
                    {lead.travel_date
                      ? new Date(lead.travel_date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })
                      : "—"}
                  </td>
                  <td className="py-4">
                    <span className="inline-block rounded-full bg-sea-tint px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-sea-dark">
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
