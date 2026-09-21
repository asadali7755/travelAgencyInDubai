import type { MetadataRoute } from "next";
import {
  attractionPath,
  attractions,
  categoryPath,
  emiratePath,
  emirates,
  planCategories,
  planPath,
  populatedPlanPairs,
} from "@/lib/data/attractions";
import { guides } from "@/lib/data/guides";
import { packagePath, packages } from "@/lib/data/packages";
import { tours } from "@/lib/data/tours";
import { getCategories, getListings } from "@/lib/services/directory";
import { site } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Sitemap entries, grouped by section.
 *
 * Split out of app/sitemap.ts so that file stays a thin composition as the site
 * grows past a hundred URLs, and so the directory section — which is the only
 * one that needs a database round trip — is obviously separate from the static
 * ones.
 *
 * Priority is a hint, not a ranking factor, and is set by commercial value:
 * package pages convert, attraction guides bring the traffic that finds them.
 */

export function staticEntries(now: Date): Entry[] {
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/uae-attractions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/things-to-do`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/dubai-tours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${site.url}/list-your-business`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Low crawl priority, high trust value: this is the page a reader or an
    // answer engine checks before deciding whether the rest is worth believing.
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}

export function attractionEntries(): Entry[] {
  return [
    ...emirates.map((emirate) => ({
      url: `${site.url}${emiratePath(emirate.id)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...attractions.map((attraction) => ({
      url: `${site.url}${attractionPath(attraction)}`,
      // The date the facts were verified, not the deploy date. A lastmod that
      // moves on every build teaches crawlers to ignore it.
      lastModified: new Date(attraction.checked),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}

/**
 * The "what are you planning?" pages: 16 category hubs plus every emirate and
 * category pair that actually has something in it. The pairs are generated from
 * the data, so an empty combination never reaches the sitemap.
 */
export function planEntries(now: Date): Entry[] {
  return [
    ...planCategories.map((category) => ({
      url: `${site.url}${categoryPath(category.id)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...populatedPlanPairs().map((pair) => ({
      url: `${site.url}${planPath(pair.emirate, pair.category)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

export function packageEntries(): Entry[] {
  return packages.map((pkg) => ({
    url: `${site.url}${packagePath(pkg)}`,
    lastModified: new Date(pkg.checked),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));
}

export function tourEntries(now: Date): Entry[] {
  return tours.map((tour) => ({
    url: `${site.url}/dubai-tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}

export function guideEntries(): Entry[] {
  return guides.map((guide) => ({
    url: `${site.url}/blog/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

/**
 * Directory URLs. Needs Supabase, so it returns nothing when the database is
 * not configured rather than failing the whole sitemap.
 */
export async function directoryEntries(now: Date): Promise<Entry[]> {
  const [categories, listings] = await Promise.all([
    getCategories(),
    getListings({ limit: 1000 }),
  ]);

  return [
    ...categories.map((category) => ({
      url: `${site.url}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...listings.map((listing) => ({
      url: `${site.url}/services/${listing.categorySlug}/${listing.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
