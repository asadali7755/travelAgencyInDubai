import type { Metadata } from "next";
import { PlanGrid } from "@/components/attractions/PlanGrid";
import { EmiratePicker } from "@/components/map/EmiratePicker";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  attractions,
  categoriesWithContent,
  categoryCounts,
  categoryPath,
  isFree,
} from "@/lib/data/attractions";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/seo-schema";

export const metadata: Metadata = pageMetadata({
  title: "Things to Do in the UAE | By What You're Planning",
  description:
    "Beaches, family days out, kids' activities, nightlife, spas, camping, souks and adventure across all seven emirates — with 2026 prices and what's free.",
  path: "/things-to-do",
  image: "/images/dunes-sunset.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Things to do", path: "/things-to-do" },
];

const faqs = [
  {
    q: "What is there to do in the UAE besides Dubai?",
    a: "A great deal, and most of it is cheaper. Abu Dhabi has the Grand Mosque and the Louvre; Al Ain has a UNESCO oasis, a mountain road and the country's best zoo; Sharjah has a dozen serious museums at under AED 20 each; Fujairah has the only good diving in the country; Ras Al Khaimah has the mountains and an abandoned pearling town.",
  },
  {
    q: "Where can you go out in the UAE?",
    a: "Dubai and Abu Dhabi have licensed clubs, beach clubs and bars, all inside hotels or licensed complexes, with a legal drinking age of 21. Ras Al Khaimah, Ajman, Umm Al Quwain and Fujairah licence hotel venues. Sharjah is entirely dry — no alcohol is sold or served anywhere in the emirate.",
  },
  {
    q: "What can families do in the UAE that doesn't cost much?",
    a: "Beach parks charge a few dirhams for grass, showers and barbecue pits — Al Mamzar in Dubai, Mushrif in Abu Dhabi, Sharjah National Park. Al Ain Oasis, the Heritage Village in Abu Dhabi and Khor Fakkan beach are free. Hili Fun City is about AED 10 a head including the rides.",
  },
  {
    q: "Is camping allowed in the UAE?",
    a: "Yes, in open unfenced desert and on several beaches, and it costs nothing. It is not allowed in protected reserves, on city beaches, or anywhere signed — and those areas are patrolled. Take every piece of rubbish home; litter is why areas get closed off.",
  },
  {
    q: "How much is a massage in the UAE?",
    a: "AED 120–300 an hour at a licensed neighbourhood centre, AED 400–900 at a hotel spa, and AED 250–500 for a traditional hammam ritual. Always check the centre displays a Department of Economy and Tourism licence.",
  },
];

/**
 * The top of the "what are you planning?" flow, for visitors who know what kind
 * of day they want before they know where. The emirate-first route into the
 * same content is /uae-attractions.
 */
export default function ThingsToDoPage() {
  const categories = categoriesWithContent();
  const freeCount = attractions.filter(isFree).length;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          itemListSchema(
            categories.map((c) => ({ name: c.label, path: categoryPath(c.id) })),
            "Things to do in the UAE",
          ),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            What are you planning?
          </h1>
          <p data-speakable className="mt-6 max-w-[64ch] text-[18px] leading-relaxed text-ink/75">
            {attractions.length} places across all seven emirates, sorted by the kind of day
            you are after rather than by category label. {freeCount} of them cost nothing to
            enter, and every list can be reordered by whatever is closest to you.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <PlanGrid
            categories={categories}
            counts={categoryCounts()}
            hrefFor={categoryPath}
            heading="Pick a kind of day"
            intro="Each one covers all seven emirates. Narrow it down to a single emirate once you are inside, or let the page sort by what is nearest to you."
          />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <EmiratePicker />
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="Planning a day out, answered" />
        </div>
      </div>

      <FinalCta />
    </>
  );
}
