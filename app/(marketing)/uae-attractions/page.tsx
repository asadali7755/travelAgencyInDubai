import type { Metadata } from "next";
import { AttractionExplorer } from "@/components/attractions/AttractionExplorer";
import { PlanGrid } from "@/components/attractions/PlanGrid";
import { EmiratePicker } from "@/components/map/EmiratePicker";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  attractions,
  attractionPath,
  categoriesWithContent,
  categoryCounts,
  categoryPath,
  isFree,
} from "@/lib/data/attractions";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/seo-schema";

export const metadata: Metadata = pageMetadata({
  title: "UAE Attractions | All 7 Emirates, Prices & Opening Hours",
  description:
    "Every UAE attraction worth your time across seven emirates, with 2026 gate prices, opening hours and which ones are free.",
  path: "/uae-attractions",
  image: "/images/burj-downtown.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "UAE attractions", path: "/uae-attractions" },
];

const faqs = [
  {
    q: "What is the best attraction in the UAE?",
    a: "For a single choice, the Sheikh Zayed Grand Mosque in Abu Dhabi — it is the most impressive building in the country and entry is free. For a first visit to Dubai specifically, the Burj Khalifa observation deck and an evening desert safari between them cover what most people came for.",
  },
  {
    q: "How many UAE attractions are free?",
    a: "More than visitors expect. The Grand Mosque, the Dubai Fountain, Palm Jumeirah's boardwalk and public beach, the Al Fahidi lanes, JBR beach, Hatta's dam and heritage village, Jebel Jais and the snorkelling at Snoopy Island all cost nothing. The Creek abra is one dirham.",
  },
  {
    q: "Which emirate should I visit after Dubai?",
    a: "Abu Dhabi for museums and the mosque, Sharjah for serious culture at a tenth of Dubai's prices, Ras Al Khaimah for mountains, and Fujairah for the only good diving in the country. All four are day trips from Dubai.",
  },
  {
    q: "When is the best time to visit UAE attractions?",
    a: "November to March. Outdoor attractions are genuinely uncomfortable from June to September, and two of the best — Global Village and Miracle Garden — close entirely for the summer. Indoor attractions like Ferrari World and the museums are unaffected.",
  },
  {
    q: "Do UAE attraction tickets need booking in advance?",
    a: "The Museum of the Future and the Burj Khalifa sell by timed slot and regularly sell out in peak season, so book those before you fly. Almost everything else can be bought on the day, though weekend afternoons queue.",
  },
];

export default function AttractionsHubPage() {
  const freeCount = attractions.filter(isFree).length;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          itemListSchema(
            attractions.map((a) => ({ name: a.name, path: attractionPath(a) })),
            "UAE attractions",
          ),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            Attractions across all seven emirates
          </h1>
          <p
            data-speakable
            className="mt-6 max-w-[64ch] text-[18px] leading-relaxed text-ink/75"
          >
            {attractions.length} places worth your time in the UAE, with 2026 gate prices,
            opening hours and honest advice on what to skip. {freeCount} of them cost nothing
            to enter — including the most impressive building in the country.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-16">
          <EmiratePicker />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <PlanGrid
            categories={categoriesWithContent()}
            counts={categoryCounts()}
            hrefFor={categoryPath}
            intro="Skip the emirate if you already know what kind of day you want. Every category covers all seven, and you can narrow it down once you are in."
          />
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 lg:px-10 lg:pb-20">
          <AttractionExplorer attractions={attractions} />
        </div>
      </section>

      <div className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="UAE attractions, answered" />
        </div>
      </div>

      <FinalCta />
    </>
  );
}
