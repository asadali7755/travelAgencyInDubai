import {
  attractionPath,
  attractions,
  attractionsInCategory,
  categoryPath,
  emirates,
  gateLabel,
  planCategories,
} from "@/lib/data/attractions";
import { aed, fromPrice, packagePath, packages } from "@/lib/data/packages";
import { site } from "@/lib/site";
import { tours } from "@/lib/data/tours";

/**
 * /llms.txt — a plain-text map of the site for answer engines and AI crawlers.
 *
 * The emerging convention (llmstxt.org) is a single Markdown file at the root
 * that states what a site is and links its most useful pages, so a model does
 * not have to infer structure from navigation chrome. It is cheap, it is honest,
 * and unlike most "AI SEO" advice it asks for nothing from the crawler.
 *
 * Generated from the same data the pages render, so it cannot drift. If an
 * attraction's price changes in lib/data/attractions, it changes here too.
 *
 * Note what this is not: it is not a place to say anything we would not print
 * on the page itself. Content written only for machines is cloaking, and it is
 * penalised by exactly the systems it is meant to impress.
 */

export const revalidate = 86400;

export async function GET() {
  const freeCount = attractions.filter((a) => a.gate.kind === "free").length;

  const lines: string[] = [
    `# ${site.name}`,
    "",
    "> A UAE travel and services platform covering tours and attractions across all seven",
    "> emirates, tour packages with published market pricing, outbound holidays for UAE",
    "> residents, and a directory of licensed UAE businesses. Independent agency site,",
    "> based in Dubai.",
    "",
    "## About the prices on this site",
    "",
    "Attraction prices are published gate prices researched in September 2026 and carry the",
    "date they were checked. Package prices are indicative market rates for a trip of that",
    "shape, not contracted agency rates, and every page that shows one says so. Nothing on",
    "this site quotes a price we cannot evidence.",
    "",
    "## Browse by what you are planning",
    "",
    "Every category below covers all seven emirates and can be narrowed to one.",
    "",
  ];

  for (const category of planCategories) {
    const n = attractionsInCategory(category.id).length;
    if (!n) continue;
    lines.push(
      `- [${category.label}](${site.url}${categoryPath(category.id)}): ${category.tagline}. ${n} ${n === 1 ? "place" : "places"}.`,
    );
  }

  lines.push(
    "",
    `## UAE attractions (${attractions.length} across 7 emirates, ${freeCount} free to enter)`,
    "",
  );

  for (const emirate of emirates) {
    const list = attractions.filter((a) => a.emirate === emirate.id);
    if (!list.length) continue;

    lines.push(`### ${emirate.name}`, "");
    for (const attraction of list) {
      lines.push(
        `- [${attraction.name}](${site.url}${attractionPath(attraction)}): ${attraction.tagline}. ` +
          // Not lower-cased: "Allow half a day from Dubai" contains proper
          // nouns, and "from dubai" in an AI answer reads as a typo we wrote.
          `${gateLabel(attraction)}. Allow ${attraction.timeNeeded}.`,
      );
    }
    lines.push("");
  }

  lines.push(`## Tour packages (${packages.length})`, "");
  for (const pkg of packages) {
    const duration =
      pkg.durationNights > 0
        ? `${pkg.durationDays} days / ${pkg.durationNights} nights`
        : "single day";
    lines.push(
      `- [${pkg.title}](${site.url}${packagePath(pkg)}): ${pkg.tagline}. ` +
        `${duration}, from ${aed(fromPrice(pkg))} per adult. ` +
        `${pkg.kind === "outbound" ? "Flights included." : "Land only."}`,
    );
  }
  lines.push("");

  lines.push("## Dubai tours and experiences", "");
  for (const tour of tours) {
    lines.push(`- [${tour.title}](${site.url}/dubai-tours/${tour.slug}): ${tour.detail}`);
  }
  lines.push("");

  lines.push(
    "## Services directory",
    "",
    `- [UAE services directory](${site.url}/services): licensed UAE businesses — tour`,
    "  operators, visa and PRO services, hotels, transport, law firms, clinics, spas and",
    "  movers. Listings are reviewed by a person; a verified badge means a trade licence",
    "  was checked.",
    `- [List your business](${site.url}/list-your-business): free registration for UAE`,
    "  companies.",
    "",
    "## Planning tools",
    "",
    `- [Dubai trip cost calculator](${site.url}/): estimates a trip budget from published`,
    "  market ranges for hotels, visas, transfers, tours and daily spend.",
    `- [Things to do in Dubai](${site.url}/blog/things-to-do-in-dubai): forty ideas sorted`,
    "  by what they cost, including the attractions we think are not worth the ticket.",
    "",
    "## Contact",
    "",
    `- [Enquiries and quotes](${site.url}/contact)`,
    `- Email: ${site.email}`,
    "",
    "## Optional",
    "",
    `- [Terms and cancellation](${site.url}/terms)`,
    `- [Privacy](${site.url}/privacy)`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
