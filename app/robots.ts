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
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
