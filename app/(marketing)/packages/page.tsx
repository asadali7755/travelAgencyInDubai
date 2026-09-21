import type { Metadata } from "next";
import { PackagesExplorer } from "@/components/packages/PackagesExplorer";
import { PriceNote } from "@/components/packages/PriceNote";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { fromPrice, packagePath, packages } from "@/lib/data/packages";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/seo-schema";

export const metadata: Metadata = pageMetadata({
  title: "Tour Packages & Prices | Dubai, UAE & Abroad",
  description:
    "Dubai day tours from AED 150, UAE holidays from AED 600 and flight-inclusive breaks to Baku, Georgia, Türkiye and Thailand. Real prices and itineraries.",
  path: "/packages",
  image: "/images/dunes-sunset.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Packages & prices", path: "/packages" },
];

const faqs = [
  {
    q: "Are these prices per person?",
    a: "Yes, unless the row says otherwise. Multi-day packages are quoted per adult on a twin-sharing basis, which is how the market prices them. Private day tours are quoted as a total for the vehicle, because a private car costs the same whether two people or four are in it.",
  },
  {
    q: "Do the UAE packages include flights?",
    a: "No. UAE packages are land-only so that residents and GCC visitors are not paying for a flight they do not need. Everything in the 'holidays from the UAE' section does include return economy flights from Dubai.",
  },
  {
    q: "Why do the prices change so much between seasons?",
    a: "Hotels, not tours. A Dubai 4-star that costs AED 400 a night in August can cost AED 1,200 in January, and that single line moves the package price more than everything else combined. The tour components barely move.",
  },
  {
    q: "What is the Tourism Dirham and why is it never included?",
    a: "A municipality charge of roughly AED 10 to AED 20 per occupied room per night, collected by the hotel at check-out. No agency can pre-pay it on your behalf, so no honest package price includes it.",
  },
  {
    q: "Can you build something that is not on this list?",
    a: "That is most of what we do. These packages are the shapes people ask for most often; send us your dates, your party and roughly what you want to spend and we will put together the version that fits.",
  },
];

export default function PackagesHubPage() {
  const cheapest = Math.min(...packages.map(fromPrice).filter((n) => n > 0));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          itemListSchema(
            packages.map((p) => ({ name: p.title, path: packagePath(p) })),
            "Tour packages",
          ),
        ]}
      />

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            Tour packages &amp; what they actually cost
          </h1>
          <p data-speakable className="mt-6 max-w-[64ch] text-[18px] leading-relaxed text-ink/75">
            {packages.length} packages with real numbers against them, from a half-day city
            tour at AED {cheapest} to flight-inclusive breaks in Türkiye and Thailand. Every
            itinerary lists what is included and, more usefully, what is not.
          </p>
          <PriceNote checked="2026-09-18" className="mt-6 max-w-[64ch]" />
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <PackagesExplorer packages={packages} />
        </div>
      </section>

      <div className="bg-sea-tint/50">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="Questions about pricing" />
        </div>
      </div>

      <FinalCta />
    </>
  );
}
