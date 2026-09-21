import { site } from "@/lib/site";
import type { Attraction } from "@/lib/data/attractions";
import { attractionPath } from "@/lib/data/attractions";
import type { Package } from "@/lib/data/packages";
import { fromPrice, packagePath } from "@/lib/data/packages";

/**
 * Structured data for the entities lib/seo.ts does not cover: attractions,
 * priced packages, service listings and the list pages that index them.
 *
 * Split from lib/seo.ts to keep both files inside the project's 300-line rule.
 *
 * On prices: unlike the tour pages, packages *do* emit an `offers` block, because
 * the figures in lib/data/packages are researched market rates that the page
 * itself renders and labels. Google's rule is that the structured price must match
 * the visible price, and it does — both read from the same `fromPrice()`.
 */

type Json = Record<string, unknown>;

const abs = (path: string) => `${site.url}${path}`;

export function touristAttractionSchema(a: Attraction): Json {
  const free = a.gate.kind === "free";

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${abs(attractionPath(a))}#attraction`,
    name: a.name,
    description: a.summary,
    url: abs(attractionPath(a)),
    ...(a.image ? { image: abs(a.image) } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: a.area,
      addressRegion: emirateLabel(a.emirate),
      addressCountry: "AE",
    },
    geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
    isAccessibleForFree: free,
    // Only a published admission ticket becomes an Offer. A minimum spend or a
    // per-car charge is not an admission price, and putting one in an Offer
    // would be a structured-data claim we cannot stand behind.
    ...(a.gate.kind !== "ticket" || !a.gate.adultFrom
      ? {}
      : {
          offers: {
            "@type": "Offer",
            price: a.gate.adultFrom,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
            category: "Adult admission",
          },
        }),
    touristType: "Visitors to the United Arab Emirates",
    publicAccess: true,
  };
}

/**
 * A package as both a trip and a priced product.
 *
 * `lowPrice` is the cheapest per-adult tier, which is exactly the "from" figure
 * the page prints. `validThrough` is set a year from the check date so a stale
 * offer expires rather than quietly misleading a crawler.
 */
export function packageTripSchema(pkg: Package): Json {
  const from = fromPrice(pkg);
  const high = Math.max(...pkg.tiers.map((t) => t.adult));
  const validThrough = new Date(pkg.checked);
  validThrough.setFullYear(validThrough.getFullYear() + 1);

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${abs(packagePath(pkg))}#trip`,
    name: pkg.title,
    description: pkg.summary,
    url: abs(packagePath(pkg)),
    ...(pkg.image ? { image: abs(pkg.image) } : {}),
    provider: { "@id": `${site.url}/#organisation` },
    duration: pkg.durationIso,
    touristType: pkg.kind === "outbound" ? "UAE residents travelling abroad" : "Visitors to the UAE",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.itinerary.length,
      itemListElement: pkg.itinerary.map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: day.title,
        description: day.body,
      })),
    },
    ...(from > 0
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "AED",
            lowPrice: from,
            highPrice: high,
            offerCount: pkg.tiers.length,
            availability: "https://schema.org/InStock",
            validThrough: validThrough.toISOString().slice(0, 10),
            url: abs(packagePath(pkg)),
          },
        }
      : {}),
  };
}

/** A generic ordered list page — attraction hubs, package hubs, service categories. */
export function itemListSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
  listName: string,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  };
}

/** A directory listing — a law firm, clinic, spa or visa agent in the services index. */
export function localBusinessSchema(business: {
  name: string;
  path: string;
  summary?: string | null;
  emirate: string;
  area?: string | null;
  phone?: string | null;
  website?: string | null;
  image?: string | null;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${abs(business.path)}#business`,
    name: business.name,
    url: abs(business.path),
    ...(business.summary ? { description: business.summary } : {}),
    ...(business.image ? { image: business.image } : {}),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.website ? { sameAs: [business.website] } : {}),
    address: {
      "@type": "PostalAddress",
      ...(business.area ? { addressLocality: business.area } : {}),
      addressRegion: business.emirate,
      addressCountry: "AE",
    },
  };
}

/**
 * Marks the paragraphs a voice assistant should read aloud. Small win, and the
 * same signal helps answer engines pick a clean extract rather than a nav label.
 */
export function speakableSchema(cssSelectors: string[]): Json {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

const emirateNames: Record<string, string> = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  sharjah: "Sharjah",
  ajman: "Ajman",
  "ras-al-khaimah": "Ras Al Khaimah",
  fujairah: "Fujairah",
  "umm-al-quwain": "Umm Al Quwain",
};

export const emirateLabel = (id: string) => emirateNames[id] ?? id;

/**
 * The page itself as an entity: what it is about, when it was last checked, and
 * which paragraphs a voice assistant should read.
 *
 * This is the block that does the most for answer engines. `dateModified` gives
 * them a freshness signal they can cite; `speakable` marks the summary sentences
 * rather than leaving them to guess; `about` ties the page to the thing it
 * describes instead of to a bag of keywords; and `isPartOf` plus `publisher`
 * connect it back to the organisation that stands behind it.
 *
 * `dateModified` is the date the facts were verified, from the content's own
 * `checked` field — not the deploy date. A lastmod that moves every build is a
 * signal crawlers learn to ignore.
 */
export function webPageSchema({
  path,
  name,
  description,
  checked,
  published,
  image,
  aboutId,
}: {
  path: string;
  name: string;
  description: string;
  /** ISO date the facts on this page were last verified. */
  checked: string;
  published?: string;
  image?: string;
  /** @id of the main entity on the page, when it has one. */
  aboutId?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: "en-AE",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organisation` },
    datePublished: published ?? checked,
    dateModified: checked,
    ...(image ? { primaryImageOfPage: abs(image) } : {}),
    ...(aboutId ? { about: { "@id": aboutId } } : {}),
    // The h1 and the standfirst. Both are written as complete sentences that
    // stand on their own, which is what makes them quotable.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

/**
 * The about page, typed as an AboutPage and tied to the organisation.
 *
 * Separate from webPageSchema because `mainEntity` pointing at the organisation
 * is the whole reason this page exists for a crawler: it is the declaration of
 * who stands behind everything else on the site.
 */
export function aboutPageSchema({
  path,
  name,
  description,
  checked,
}: {
  path: string;
  name: string;
  description: string;
  checked: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: "en-AE",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organisation` },
    mainEntity: { "@id": `${site.url}/#organisation` },
    dateModified: checked,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}
