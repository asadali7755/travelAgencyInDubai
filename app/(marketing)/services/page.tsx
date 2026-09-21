import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getCategories, getCategoryCounts, getListings } from "@/lib/services/directory";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/seo-schema";

export const metadata: Metadata = pageMetadata({
  title: "UAE Services Directory | Verified Local Businesses",
  description:
    "Find tour operators, visa agents, law firms, clinics, spas, movers and car hire across all seven emirates. Free to list your business, reviewed before it goes live.",
  path: "/services",
  image: "/images/marina-night.jpg",
});

// Listings are approved by hand and change through the day, so the hub is
// revalidated rather than frozen at build time.
export const revalidate = 300;

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services directory", path: "/services" },
];

const faqs = [
  {
    q: "Does it cost anything to list a business?",
    a: "No. A profile, your services, your contact details and enquiries routed to you are all free. We review every submission before it appears, which is the only barrier.",
  },
  {
    q: "What does the verified badge mean?",
    a: "That a person on our team opened the company's UAE trade licence and checked it against what the profile claims. It is not a quality rating and we do not sell it — an unverified listing simply has not sent us a licence yet.",
  },
  {
    q: "How long does approval take?",
    a: "Usually under two working days. Listings with a trade licence attached tend to clear faster because there is less to chase.",
  },
  {
    q: "Can I list a business that is not in travel?",
    a: "Yes. A large part of the audience lives in the UAE rather than visiting it, so law firms, clinics, spas, movers and PRO services are as welcome here as tour operators.",
  },
];

export default async function ServicesHubPage() {
  const [categories, counts, recent] = await Promise.all([
    getCategories(),
    getCategoryCounts(),
    getListings({ limit: 6 }),
  ]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          itemListSchema(
            categories.map((c) => ({ name: c.name, path: `/services/${c.slug}` })),
            "UAE services directory categories",
          ),
        ]}
      />

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            UAE services directory
          </h1>
          <p data-speakable className="mt-6 max-w-[64ch] text-[18px] leading-relaxed text-ink/75">
            Tour operators and visa agents for visitors; law firms, clinics, spas, movers and
            car hire for the people who live here. Every listing is reviewed by a person
            before it goes live, and the verified badge means we checked the trade licence.
          </p>
          <Link
            href="/list-your-business"
            className="mt-7 inline-flex min-h-13 items-center rounded-full bg-sea px-8 text-base font-semibold text-white no-underline hover:bg-sea-dark"
          >
            List your business — free
          </Link>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight">
              Browse by category
            </h2>
          </Reveal>

          {categories.length === 0 ? (
            <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-ink/65">
              The directory is being set up. If you run a business in the UAE you can register
              now and be among the first listings when it opens.
            </p>
          ) : (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, i) => (
                <Reveal key={category.id} delayMs={(i % 3) * 70}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="flex h-full min-h-24 flex-col justify-between rounded-[var(--radius-card)] border border-card-border bg-surface p-5 no-underline transition-colors hover:border-sea/40"
                  >
                    <span className="text-[17px] font-bold text-ink">{category.name}</span>
                    <span className="mt-2 text-[14px] text-ink/60">
                      {counts[category.slug] ?? 0} listed
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {recent.length ? (
        <section className="bg-sea-tint/40">
          <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight">
                Recently listed
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((listing, i) => (
                <Reveal key={listing.id} delayMs={(i % 3) * 80}>
                  <ServiceCard listing={listing} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="Listing your business, answered" />
        </div>
      </div>

      <FinalCta />
    </>
  );
}
