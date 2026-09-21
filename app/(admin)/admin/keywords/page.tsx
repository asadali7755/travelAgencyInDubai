import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { adminNav } from "@/lib/auth/nav";
import { requireSuperadmin } from "@/lib/auth/session";
import { keywordCoverage } from "@/lib/seo-keywords";

/**
 * Which of the client's keywords the site now answers, and which it does not.
 *
 * Derived from the content itself rather than maintained by hand, so it cannot
 * drift: add a keyword to an attraction and this report picks it up on the next
 * build. The point of the page is the two honest columns — what we are chasing,
 * and what we have deliberately decided not to.
 */
export default async function AdminKeywordsPage() {
  const profile = await requireSuperadmin("/admin/keywords");
  const { targets, total, covered, excluded, percent } = keywordCoverage();

  const rows = [...targets].sort((a, b) => {
    if ((a.path === null) !== (b.path === null)) return a.path === null ? 1 : -1;
    return (a.path ?? "").localeCompare(b.path ?? "");
  });

  return (
    <DashboardShell
      profile={profile}
      items={adminNav()}
      title="Keyword coverage"
      subtitle="Every term from the keyword sheet, and the page on this site that answers it."
    >
      <StatTiles
        tiles={[
          { label: "Keywords", value: total, hint: "Unique terms in the sheet" },
          { label: "Targeted", value: covered, hint: "Have a page on this site" },
          { label: "Coverage", value: `${percent}%`, hint: "Of the terms worth chasing" },
          { label: "Not targeted", value: excluded, hint: "Deliberately — see below" },
        ]}
      />

      <p className="mt-8 max-w-[70ch] rounded-[var(--radius-card)] bg-sand px-5 py-4 text-[15px] leading-relaxed text-ink/80">
        <strong className="font-semibold">How the keywords were used.</strong> They decided
        which pages exist and what each one is about — the beaches, nightlife, spa, camping
        and kids categories, and the Al Ain, Fujairah and Ras Al Khaimah coverage, are all
        here because the sheet asked for them. They were not sprinkled into the sentences.
        Text written to contain a phrase reads like it, and that is precisely what Google&rsquo;s
        helpful-content systems demote.
      </p>

      <div className="mt-6">
        <a
          href="/api/admin/keyword-map"
          className="inline-flex min-h-11 items-center rounded-full bg-sea px-6 text-[15px] font-semibold text-white no-underline hover:bg-sea-dark"
        >
          Download as CSV
        </a>
      </div>

      <div className="-mx-5 mt-8 overflow-x-auto px-5 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Keyword to page mapping</caption>
          <thead>
            <tr className="border-y border-divider">
              {["Keyword", "Target page", "Status"].map((head) => (
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
            {rows.map((row) => (
              <tr key={row.keyword} className="border-b border-divider align-top">
                <th scope="row" className="py-3 pr-4 text-[15px] font-normal text-ink">
                  {row.keyword}
                </th>
                <td className="py-3 pr-4 text-[14px]">
                  {row.path ? (
                    <Link href={row.path}>{row.path}</Link>
                  ) : (
                    <span className="text-ink/45">—</span>
                  )}
                </td>
                <td className="py-3 text-[14px] text-ink/70">
                  {row.path ? (
                    <span className="rounded-full bg-palm-tint px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-palm">
                      Targeted
                    </span>
                  ) : (
                    <span className="max-w-[36ch] text-ink/60">{row.note}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
