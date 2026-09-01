/**
 * The travel guide index. Sitemap, internal links and (later) the blog listing
 * all read from here.
 *
 * `updated` is the date the facts in a guide were last checked — Dubai's
 * opening hours, fares and visa rules change, and a guide that claims to be
 * current has to earn it.
 */

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  readingMinutes: number;
  published: string;
  updated: string;
  metaTitle: string;
  metaDescription: string;
};

export const guides: Guide[] = [
  {
    slug: "things-to-do-in-dubai",
    title: "40 things to do in Dubai, sorted by what they cost",
    excerpt:
      "Half of this list is free. The rest is priced honestly, including the attractions we think are not worth the ticket.",
    image: "/images/city-night.jpg",
    alt: "The Dubai skyline lit up after dark",
    readingMinutes: 14,
    published: "2026-08-30",
    updated: "2026-08-30",
    metaTitle: "Things to Do in Dubai | 40 Ideas, Free and Paid",
    metaDescription:
      "Forty things to do in Dubai sorted by cost — free beaches, souks and fountain shows, plus the paid attractions worth booking and the ones to skip.",
  },
];

export const guideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);
