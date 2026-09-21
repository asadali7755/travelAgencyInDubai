import type { MetadataRoute } from "next";
import {
  attractionEntries,
  directoryEntries,
  guideEntries,
  packageEntries,
  planEntries,
  staticEntries,
  tourEntries,
} from "@/lib/seo-sitemap";

// Directory listings are approved through the day, so the sitemap is rebuilt
// hourly rather than frozen at deploy time.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    ...staticEntries(now),
    ...packageEntries(),
    ...attractionEntries(),
    ...planEntries(now),
    ...tourEntries(now),
    ...guideEntries(),
    ...(await directoryEntries(now)),
  ];
}
