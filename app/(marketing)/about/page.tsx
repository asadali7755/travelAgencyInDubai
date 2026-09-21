import type { Metadata } from "next";
import Link from "next/link";
import { AboutMethod } from "@/components/sections/AboutMethod";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { attractions } from "@/lib/data/attractions";
import { packages } from "@/lib/data/packages";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { aboutPageSchema } from "@/lib/seo-schema";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us | A Licensed Dubai Travel & Tourism Company",
  description:
    "Who writes this site, how we check every price and opening time, what we refuse to publish, and how to tell us when we have got something wrong.",
  path: "/about",
  image: "/images/marina-night.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
];

const faqs = [
  {
    q: "Who writes the guides on this site?",
    a: "Our own team in Dubai. Every attraction page, price and opening time is researched and written here rather than syndicated, rewritten from another site or generated and left unchecked. Each page carries the date its facts were last verified.",
  },
  {
    q: "Are you a licensed travel agency?",
    a: "Yes — we hold a Department of Economy and Tourism licence to operate as a travel agency in Dubai. The licence number is in the footer of every page.",
  },
  {
    q: "Do you get paid to feature attractions or businesses?",
    a: "No. Nothing on this site is a paid placement. Directory listings are free, the verified badge is not for sale, and no business can pay to rank above another. We earn from the trips people book with us, which only works if the advice is worth reading.",
  },
  {
    q: "Where do the prices on this site come from?",
    a: "Attraction prices are the venue's own published gate price, checked against the venue's site and the main UAE ticket resellers. Package prices are indicative market rates for a trip of that shape, clearly labelled as such rather than presented as a quote. Both carry the month they were checked.",
  },
  {
    q: "How do I tell you something is wrong?",
    a: "Email us or send a message through the contact page with the page and what has changed. Venues alter prices and hours without notice and we would rather be corrected quickly than be wrong for a season. Corrections are made within a working day.",
  },
];

/**
 * The page that says who is behind the content and how it is produced.
 *
 * This is not filler. Search engines and answer engines both weigh whether a
 * site discloses who wrote something, how it was checked and what the
 * commercial relationships are — and an answer engine deciding whether to cite
 * a price has no other way to find out. The methodology section below is the
 * part that matters, so it is specific rather than reassuring.
 */
export default function AboutPage() {
  const checkedDates = [
    ...attractions.map((a) => a.checked),
    ...packages.map((p) => p.checked),
  ].sort();
  const lastChecked = checkedDates.at(-1) ?? "2026-09-18";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          aboutPageSchema({
            path: "/about",
            name: "About Travel Agency in Dubai",
            description:
              "Who writes this site, how every price and opening time is checked, and what we refuse to publish.",
            checked: lastChecked,
          }),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.3rem,5vw,3.6rem)] font-extrabold leading-[1.03] tracking-tight">
            Who writes this, and how it gets checked
          </h1>
          <p data-speakable className="mt-6 max-w-[66ch] text-[18px] leading-relaxed text-ink/75">
            We are a Department of Economy and Tourism licensed travel agency based in Dubai.
            We sell tours, visas, transfers and holidays — and we publish {attractions.length}{" "}
            attraction guides across all seven emirates because the honest version of that
            information is what makes someone trust us with a booking.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Reveal>
                <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
                  What we actually do
                </h2>
                <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
              </Reveal>

              <Reveal className="mt-6">
                <p className="max-w-[68ch] text-[17px] leading-relaxed text-ink/80">
                  Three groups of people use us, and they want completely different things.
                  Visitors to the UAE want tours, tickets, transfers and a visa. Residents
                  want a spa, a law firm, a clinic or a mover, and they want to know the
                  company is licensed. UAE residents going abroad want a flight-inclusive
                  package to Baku, Tbilisi, Istanbul or Phuket at a price they can check.
                </p>
                <p className="mt-4 max-w-[68ch] text-[17px] leading-relaxed text-ink/80">
                  The site is built around those three, which is why an attraction guide, a
                  priced package and a business directory sit alongside each other rather
                  than on three separate sites.
                </p>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
                  What we will not publish
                </h2>
                <span className="mt-4 block h-1 w-16 rounded-full bg-coral" />
                <ul className="mt-6 flex flex-col gap-4">
                  {[
                    ["A price we cannot evidence.", "Where a venue does not publish one, the page says the price varies rather than inventing a number. Package prices are labelled as researched market rates, not as a quote, because that is what they are until you ask us for one."],
                    ["A photograph we do not hold a licence for.", "Attractions we have no licensed photograph of get original illustrations we drew, not something lifted from a search results page."],
                    ["Copy taken from another site.", "Every guide here is written from scratch. It is also the most common reason we reject a directory listing."],
                    ["A rating or review count we did not collect.", "There is no aggregateRating in our structured data, because we have not gathered enough reviews to honestly claim one."],
                    ["Paid placement dressed as editorial.", "Nothing on this site is bought. The verified badge means somebody opened a trade licence, and it is not for sale."],
                  ].map(([head, body]) => (
                    <li key={head} className="flex gap-3 text-[17px] leading-relaxed text-ink/80">
                      <span aria-hidden className="mt-1 font-bold text-coral-dark">
                        ✕
                      </span>
                      <span>
                        <strong className="font-semibold text-ink">{head}</strong> {body}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <AboutMethod lastChecked={lastChecked} />
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
              Corrections
            </h2>
            <p className="mt-5 max-w-[66ch] text-[17px] leading-relaxed text-ink/80">
              Venues change prices and opening hours without telling anybody, and seasonal
              attractions move their dates every year. If something here is out of date, tell
              us which page and what changed and we will fix it within a working day — then
              move that page&rsquo;s verification date forward so you can see it happened.
            </p>
            <p className="mt-4 max-w-[66ch] text-[17px] leading-relaxed text-ink/80">
              Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or use the{" "}
              <Link href="/contact">contact form</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="About us, answered" />
        </div>
      </div>

      <FinalCta />
    </>
  );
}
