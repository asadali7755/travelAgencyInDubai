import type { Metadata } from "next";
import { site, socialProfiles } from "@/lib/site";

/**
 * One place that builds page metadata, so every page ends up with a canonical
 * URL and an OpenGraph entry without each page remembering to add them.
 *
 * Titles and descriptions come from the client's keyword sheet (seo/keyword-map.csv):
 * titles stay at or under 60 characters, descriptions at or under 155.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/dunes-sunset.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = `${site.url}${path}`;

  return {
    // Absolute, because these titles already carry the brand where it belongs.
    // Letting the root template append it again pushed them past 70 characters
    // and Google would simply cut them off.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: site.name,
      locale: "en_AE",
      // No width/height: the photographs are not one size (the hero is
      // 1920x1280, one is portrait), and a wrong declared size is worse than
      // letting the consumer read it from the file.
      images: [{ url: image, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Builds a meta description that names real places, kept within the 155
 * characters Google shows.
 *
 * Every combination of "first n names" and each candidate tail is tried and the
 * longest that fits wins, so a page with one result still gets a full sentence
 * and a page with twenty is not cut off mid-name. Naming the places makes each
 * snippet specific to its page instead of a template shared by fifty others.
 */
export function describeWithNames(
  lead: string,
  names: readonly string[],
  tails: readonly string[],
  max = 155,
): string {
  const join = (shown: readonly string[]) => {
    if (shown.length === 1) return shown[0];
    const more = names.length > shown.length;
    return `${shown.slice(0, -1).join(", ")}${more ? ", " : " and "}${shown.at(-1)}${more ? " and more" : ""}`;
  };

  let best = "";
  for (let n = Math.min(names.length, 4); n > 0; n--) {
    for (const tail of tails) {
      const text = `${lead}${join(names.slice(0, n))}${tail}`;
      if (text.length <= max && text.length > best.length) best = text;
    }
  }
  return best || `${lead.replace(/(,\s*including|:)\s*$/, "")}${tails.at(-1) ?? ""}`.slice(0, max);
}

type Json = Record<string, unknown>;

/**
 * The agency itself. Deliberately carries no aggregateRating and no priceRange
 * band we cannot evidence — inventing either is both dishonest and a structured
 * data violation. They go in once the client gives us real figures.
 */
export function travelAgencySchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${site.url}/#organisation`,
    name: site.name,
    alternateName: site.domain,
    description: site.description,
    url: site.url,
    email: site.email,
    image: `${site.url}/images/dunes-sunset.jpg`,
    // Emitted only when real values exist. A placeholder in structured data is
    // worse than an absent field: it is a claim, and it is false.
    ...(site.phoneE164 ? { telephone: site.phoneE164 } : {}),
    ...(site.foundingYear ? { foundingDate: site.foundingYear } : {}),
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    knowsAbout: [
      "Travel in the United Arab Emirates",
      "Dubai tours and attractions",
      "UAE visit visas",
      "Outbound holidays from the UAE",
    ],
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organisation` },
    inLanguage: "en-AE",
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function faqSchema(faqs: ReadonlyArray<{ q: string; a: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * A single tour. No `offers` block: we have no confirmed price, and a made-up
 * one would be a rich-result violation as well as a lie to the visitor.
 */
export function touristTripSchema({
  name,
  description,
  path,
  image,
  durationHours,
  places = ["Dubai"],
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  durationHours?: string;
  /** Where the trip goes. Defaults to Dubai; the Abu Dhabi day trip says so. */
  places?: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    url: `${site.url}${path}`,
    image: `${site.url}${image}`,
    provider: { "@id": `${site.url}/#organisation` },
    "@id": `${site.url}${path}#trip`,
    touristType: "Leisure travellers visiting the UAE",
    itinerary: {
      "@type": "ItemList",
      itemListElement: places.map((place, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "City", name: place },
      })),
    },
    ...(durationHours ? { duration: durationHours } : {}),
  };
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  published,
  modified,
}: {
  headline: string;
  description: string;
  path: string;
  image: string;
  published: string;
  modified: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: `${site.url}${image}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${path}` },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organisation` },
    datePublished: published,
    dateModified: modified,
  };
}
