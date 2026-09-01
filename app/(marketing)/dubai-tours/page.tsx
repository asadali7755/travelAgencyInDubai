import type { Metadata } from "next";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { ToursGrid } from "@/components/sections/ToursGrid";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Tours | Desert Safari, Cruises & City Tours",
  description:
    "Browse our Dubai tours: desert safari, dhow cruise, city sightseeing, yacht charters and attraction tickets. Hotel pick-up on almost everything.",
  path: "/dubai-tours",
  image: "/images/dune-bashing.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Dubai tours", path: "/dubai-tours" },
];

const faqs = [
  {
    q: "How far ahead should we book a tour in Dubai?",
    a: "Between November and March, book the popular evening tours three to seven days ahead — desert safaris and sunset Burj Khalifa slots fill first. From June to September you can usually book the same day.",
  },
  {
    q: "Is hotel pick-up included?",
    a: "On the desert safari, the city tour and the Abu Dhabi day trip, yes, anywhere in Dubai. On cruises and attraction tickets it is an optional add-on, because plenty of guests prefer to arrive under their own steam.",
  },
  {
    q: "What is the best tour for a first visit to Dubai?",
    a: "An evening desert safari and a half-day city tour between them cover what most first-timers came for: the dunes, the old town and the skyline. Add a dhow cruise if you have a spare evening.",
  },
  {
    q: "Can you run tours during Ramadan?",
    a: "Yes. Daytime tours run as normal with some adjustments — live entertainment pauses and eating and drinking in public during daylight is avoided. Evening tours after iftar are often the best of the year.",
  },
  {
    q: "Do you arrange private tours?",
    a: "Yes, on every tour here. A private vehicle and guide costs more than a seat on a shared trip, but for families, older guests or anyone short of time it is usually worth it.",
  },
];

export default function ToursHubPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(faqs)]} />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            Dubai tours &amp; experiences
          </h1>
          <p className="mt-6 max-w-[62ch] text-[18px] leading-relaxed text-ink/75">
            Every tour here is one we run or book directly — desert safaris on the Lahbab red
            dunes, dhow cruises through the Marina, the old souks of Deira, private yachts and
            attraction tickets. Prices are per person, and pick-up is included unless the tour
            says otherwise.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <ToursGrid />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              How we plan a Dubai itinerary
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <Reveal>
              <h3 className="text-[19px] font-bold">Two full days, first visit</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/75">
                Day one: a half-day city tour, then the Dubai Fountain in the evening — the shows
                run every half hour from six until eleven and cost nothing to watch. Day two: the
                desert safari, which takes the whole afternoon and evening.
              </p>
            </Reveal>
            <Reveal delayMs={90}>
              <h3 className="text-[19px] font-bold">Four days, with children</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/75">
                Break the big-ticket days up. Burj Khalifa early, a beach afternoon at Kite Beach
                or La Mer, a gentler desert evening without the fastest dune bashing, and a day
                for a water park.
              </p>
            </Reveal>
            <Reveal delayMs={180}>
              <h3 className="text-[19px] font-bold">A week, seeing the country</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/75">
                Keep three days for Dubai, then take the Abu Dhabi day trip for the Grand Mosque,
                a day in the Hajar mountains at Hatta, and a dhow day into the Musandam fjords
                across the Omani border.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="Questions about booking tours" />
        </div>
      </div>

      <FinalCta />
    </>
  );
}
