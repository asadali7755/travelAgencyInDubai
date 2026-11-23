import type { MetadataRoute } from "next";
import { site, indexingAllowed } from "@/lib/site";

/**
 * The authenticated areas carry no public content and every page in them is
 * noindex anyway; keeping them out of the crawl budget as well is free.
 * /auth/callback is excluded because a crawled one-time code is a burnt one.
 */
const PRIVATE_PATHS = [
  "/api/",
  "/admin",
  "/agency",
  "/dashboard",
  "/login",
  "/signup",
  "/auth/",
];

/**
 * Answer-engine and AI-search crawlers, named explicitly.
 *
 * The `*` group already lets them in, but a crawler that finds a group with its
 * own name obeys that group and ignores `*`, so each one is given the same
 * private-path rules rather than a bare allow. Naming them is a deliberate,
 * visible decision that the site wants to be cited in AI answers (AISO); to opt
 * out of one, change its group to `disallow: "/"`.
 *
 * Search-indexing bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot) are what
 * puts a page into AI search results. The *-User agents fetch a page because a
 * person asked about it. Google-Extended and Applebot-Extended are not crawlers
 * but permission tokens for using already-crawled pages in AI answers.
 */
const AI_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  // Until the real domain is attached the site lives on a vercel.app URL while
  // its canonicals already point at travelagencyindubai.com. Letting crawlers
  // in now would get the preview indexed and turn into duplicate content on
  // launch day, so the preview stays closed until NEXT_PUBLIC_ALLOW_INDEXING
  // is set.
  if (!indexingAllowed) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_AGENTS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
