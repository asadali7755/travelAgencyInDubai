import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { adminNav } from "@/lib/auth/nav";
import { requireSuperadmin } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

const STATUS_TONE: Record<string, string> = {
  pending: "bg-gold-tint text-gold-dark",
  approved: "bg-palm-tint text-palm",
  rejected: "bg-coral-tint text-coral-dark",
  archived: "bg-sand text-ink/60",
  draft: "bg-sand text-ink/60",
};

/** Every company on the platform, whatever its state. */
export default async function AdminAgenciesPage() {
  const profile = await requireSuperadmin("/admin/agencies");
  const supabase = await createServerClient();

  const { data } = await supabase
    .from("agencies")
    .select("id, name, slug, kind, emirate, status, is_verified, licence_number, created_at")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(200);

  const agencies = data ?? [];

  return (
    <DashboardShell
      profile={profile}
      items={adminNav()}
      title="Companies"
      subtitle="Everyone who has registered a profile. Verification means a person opened the trade licence."
    >
      {agencies.length === 0 ? (
        <EmptyState
          title="No companies yet"
          body="Once a business registers through /agency it appears here for review."
        />
      ) : (
        <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">All registered companies</caption>
            <thead>
              <tr className="border-y border-divider">
                {["Company", "Type", "Emirate", "Licence", "Verified", "Status"].map((head) => (
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
              {agencies.map((agency) => (
                <tr key={agency.id} className="border-b border-divider align-top">
                  <th scope="row" className="py-4 pr-4 text-[15px] font-semibold text-ink">
                    {agency.name}
                  </th>
                  <td className="py-4 pr-4 text-[15px] text-ink/75">{agency.kind}</td>
                  <td className="py-4 pr-4 text-[15px] whitespace-nowrap text-ink/75">
                    {agency.emirate}
                  </td>
                  <td className="py-4 pr-4 text-[15px] text-ink/75">
                    {agency.licence_number ?? "—"}
                  </td>
                  <td className="py-4 pr-4 text-[15px]">
                    {agency.is_verified ? (
                      <span className="text-palm">Yes</span>
                    ) : (
                      <span className="text-ink/45">No</span>
                    )}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] ${
                        STATUS_TONE[agency.status] ?? "bg-sand text-ink/60"
                      }`}
                    >
                      {agency.status}
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
