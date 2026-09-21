import { requireApiSuperadmin } from "@/lib/api/guards";
import { keywordTargets } from "@/lib/seo-keywords";
import { site } from "@/lib/site";

/**
 * The keyword sheet, filled in, as a CSV the client can paste back into their
 * own Google Sheet.
 *
 * Columns match the sheet they sent so it drops straight in. Superadmin only:
 * the mapping is the site's SEO strategy and there is no reason to publish it.
 */

/** RFC 4180 quoting. A keyword containing a comma would otherwise split a row. */
const cell = (value: string | null) => {
  const text = value ?? "";
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export async function GET() {
  const auth = await requireApiSuperadmin();
  if ("error" in auth) return auth.error;

  const header = ["#", "Keyword", "URL", "Page title", "Status / note"];
  const rows = keywordTargets().map((target, i) => [
    String(i + 1),
    cell(target.keyword),
    cell(target.path ? `${site.url}${target.path}` : null),
    cell(target.title),
    cell(target.path ? "Targeted" : (target.note ?? "Not targeted")),
  ]);

  const csv = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");

  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="keyword-map.csv"',
      "Cache-Control": "no-store",
    },
  });
}
