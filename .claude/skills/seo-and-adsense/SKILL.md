---
name: seo-and-adsense
description: SEO architecture for the TravelAgencyInDubai platform — URL structure, Next.js metadata, JSON-LD structured data, sitemaps, hreflang, blog and service page templates, Core Web Vitals, plus AdSense placement rules and the policy traps around a points/rewards system. Use this whenever the user mentions SEO, ranking, metadata, sitemaps, structured data, schema markup, canonical URLs, blog or content strategy, page speed for ranking, AdSense, ad placement, or monetisation.
---

# SEO and monetisation

Two goals pull in different directions: rank for high-intent searches, and earn ad revenue.
Ads that damage page experience lose more traffic than they earn, so treat SEO as primary
and ads as something layered on carefully afterwards.

## URL structure

Decide this once; changing it later costs rankings.

```
/                                     home
/dubai-tours                          category hub
/dubai-tours/desert-safari-evening    package
/services/law-firms/dubai             service category by emirate
/services/law-firms/dubai/al-adl-legal service listing
/tours-from-dubai/pakistan            outbound country hub
/blog                                 blog index
/blog/uae-visit-visa-guide-2026       post
/faq                                  FAQ hub
/faq/visa                             FAQ category
```

Lowercase, hyphenated, no dates in blog URLs (so posts can be refreshed without a redirect),
no IDs, no query strings for anything that should rank. Every slug is stored in the database
with a unique constraint and never changed — if it must change, write a 301 in
`next.config.js` redirects.

## Metadata

Generate it, never hand-write it per page.

```ts
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found" };

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | TravelAgencyInDubai`,
    description: post.excerpt?.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      type: "article", url, title: post.title, description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt,
    },
    twitter: { card: "summary_large_image" },
    robots: post.status === "approved" ? undefined : { index: false, follow: false },
  };
}

export const revalidate = 3600;
export async function generateStaticParams() { /* top ~200 slugs */ }
```

Titles under 60 characters, descriptions 140–155. Every page needs a canonical — filtered
and paginated listing pages should canonicalise to the unfiltered page, or they will
compete with each other.

Never let unapproved or thin content into the index. Guest submissions awaiting moderation
must return `noindex`.

## Structured data

JSON-LD in a shared helper so the shape stays consistent:

```tsx
// lib/seo.ts
export const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);
```

The `<` escape prevents a `</script>` inside user-supplied text from breaking out — this is
one of the few legitimate uses of `dangerouslySetInnerHTML`, and it still needs care.

Types to emit:

- **Organization + LocalBusiness** in the root layout (address, phone, opening hours,
  `areaServed`, social profiles).
- **TouristTrip** or **Product** with `Offer` on package pages — price, currency AED,
  availability, `priceValidUntil`. This is what produces price-rich results.
- **Article** on blog posts — headline, author, datePublished, dateModified, image.
- **FAQPage** on the FAQ pages, built from approved FAQs only.
- **BreadcrumbList** everywhere below the home page.
- **AggregateRating** only where real reviews exist. Marking up invented ratings is a manual
  action risk and is not worth it.

## Sitemaps and robots

```ts
// app/sitemap.ts — split into sitemap indexes once past ~5,000 URLs
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, posts, services] = await Promise.all([...]);
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    ...packages.map(p => ({ url: `${base}/dubai-tours/${p.slug}`, lastModified: p.updatedAt, priority: 0.9 })),
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt, priority: 0.7 })),
    ...services.map(s => ({ url: `${base}/services/${s.categorySlug}/${s.emirateSlug}/${s.slug}`, priority: 0.6 })),
  ];
}
```

Only approved, indexable URLs belong in the sitemap. `robots.ts` should disallow `/admin`,
`/dashboard`, `/api`, and any search or filter path, and point to the sitemap.

## Content strategy

Search traffic here comes from long-tail informational queries that sit just upstream of a
booking: visa rules, best time to visit, cost breakdowns, "is X worth it", documents needed.
Each post should end in a relevant package or service CTA — that internal link is both the
conversion path and the ranking signal.

Structure for a post that ranks: one `h1`, a short answer to the query in the first 100
words, `h2`s that mirror the question phrasing, a table or list of concrete numbers, a FAQ
block, and links to two or three related posts plus one package.

For the international audience: if you publish Arabic, Urdu or Russian versions, use real
translations at `/ar/...` with `hreflang` alternates and `x-default`. Machine-translated
duplicates of the whole site are a well-known way to acquire a thin-content problem.

Guest posts are good for volume and bad for quality control. Require ~600 words, run them
through `content-moderation`, and apply `rel="nofollow ugc"` to any outbound link in
guest content — otherwise the blog becomes a link-spam target within weeks.

## Core Web Vitals

These are ranking inputs and the ad script is usually what breaks them.

- **LCP under 2.5s** — hero image with `priority`, preconnect to Supabase storage, no
  blocking font or animation ahead of it.
- **CLS under 0.1** — explicit width/height on every image, and **reserved space for every
  ad slot**. An ad that pops in and pushes content down is the most common CLS failure and
  it also drives the accidental clicks that get accounts flagged.
- **INP under 200ms** — keep the main thread free; load chat, maps and games dynamically.

Measure with real field data in Search Console, not just Lighthouse.

## AdSense

**Before applying**: 30+ substantial original posts, a real About, Contact and Privacy
Policy page, a cookie consent banner (the audience includes the EU and UAE), no scraped or
AI-dumped filler, and clean navigation. Applying early and being rejected costs months.

Placement that earns without wrecking the page:
- In-article after the third paragraph and between major sections.
- One responsive unit at the end of listing pages.
- No ads above the hero, none in the sticky bottom bar, none adjacent to buttons.
- Never more ads than content on a page.
- Reserve the slot's height in CSS so nothing shifts.

**The rewards-system conflict, stated plainly.** Google prohibits incentivising ad
interaction, and interprets it broadly. A points system that rewards page views, time on
site, or "visit 5 pages today" tasks sits close enough to that line that it can put the
account at risk, and enforcement is usually account-level and hard to reverse. Three rules
keep the two systems apart:

1. **No AdSense code anywhere under `/dashboard`, `/rewards`, or the games.** Ads and the
   points UI never appear on the same page.
2. **Never award points for anything an ad impression is a byproduct of** — no points for
   page views, scroll depth, session length, or "browse N packages". Award points for
   account actions instead: completing a profile, a quiz about destinations, submitting a
   reviewed FAQ, referring a friend who enquires.
3. **Never mention ads in task copy.** No "click through our partners", no "support us by
   viewing ads".

Affiliate links (hotels, insurance, eSIM, activities) are usually the better revenue line
for this niche anyway — higher value per visitor and no policy conflict with the rewards
programme. Disclose them and mark them `rel="sponsored"`.

## Analytics

GA4 plus Search Console from day one. Track: lead form submit, WhatsApp click, call click,
package view, chat opened. Without these, no SEO decision can be evaluated. Load analytics
with `next/script` at `strategy="afterInteractive"` so it never blocks the hero.
