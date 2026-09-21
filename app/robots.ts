import type { MetadataRoute } from "next";
import { site, indexingAllowed } from "@/lib/site";

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
      {
        userAgent: "*",
        allow: "/",
        // The authenticated areas carry no public content and every page in
        // them is noindex anyway. Keeping them out of the crawl budget as well
        // is free. /auth/callback is excluded because a crawled one-time code
        // is a burnt one-time code.
        disallow: [
          "/api/",
          "/admin",
          "/agency",
          "/dashboard",
          "/login",
          "/signup",
          "/auth/",
        ],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
