import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { ThingsToDoBody } from "@/components/sections/guides/ThingsToDoBody";
import { TourCard } from "@/components/sections/TourCard";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { guideBySlug } from "@/lib/data/guides";
import { tours } from "@/lib/data/tours";
import { articleSchema, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

const guide = guideBySlug("things-to-do-in-dubai");

export const metadata: Metadata = guide
  ? pageMetadata({
      title: guide.metaTitle,
      description: guide.metaDescription,
      path: `/blog/${guide.slug}`,
      image: guide.image,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    })
  : {};

const contents = [
  { id: "free", label: "Free things worth doing" },
  { id: "paid", label: "The paid attractions, ranked" },
  { id: "desert", label: "The desert, and which one" },
  { id: "food", label: "Food and drink" },
  { id: "getting-around", label: "Getting around" },
  { id: "when", label: "When to come" },
];

const faqs = [
  {
    q: "How many days do you need in Dubai?",
    a: "Three full days covers the skyline, the old town and a desert evening without rushing. Five lets you add Abu Dhabi or Hatta, and a week is comfortable if you want beach days in between.",
  },
  {
    q: "Is Dubai expensive for tourists?",
    a: "It can be, but it does not have to be. Beaches, souks, the abra, the fountain shows and the historical district are free. The cost comes from the headline attractions, alcohol and the well-known restaurants — you can have a very good week while picking one or two of those.",
  },
  {
    q: "What should women wear in Dubai?",
    a: "Normal summer clothing is fine in malls, hotels and restaurants. Cover shoulders and knees in the old town, the souks and government buildings, and bring a headscarf for mosque visits. Swimwear is for beaches and pools only.",
  },
  {
    q: "Is alcohol available to tourists?",
    a: "Yes, in licensed hotels, bars and restaurants, and tourists can buy from licensed shops. Drinking in public or being drunk in public is not tolerated, and the rules tighten during Ramadan.",
  },
  {
    q: "What is the cheapest way to get around Dubai?",
    a: "The Metro with a Nol Silver card. Fares run roughly AED 5 to AED 7.50 depending on zones, and the daily cap means travel is free once you have spent AED 14 in a day.",
  },
];

export default function ThingsToDoGuide() {
  if (!guide) notFound();

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Travel guide", path: `/blog/${guide.slug}` },
  ];

  const suggested = tours.filter((tour) =>
    ["desert-safari", "old-dubai-souks-abras", "burj-khalifa-at-the-top"].includes(tour.slug),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          articleSchema({
            headline: guide.title,
            description: guide.excerpt,
            path: `/blog/${guide.slug}`,
            image: guide.image,
            published: guide.published,
            modified: guide.updated,
          }),
        ]}
      />

      <section className="bg-gold-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-gold-dark">
            Travel guide · updated {guide.updated}
          </p>
          <h1 className="mt-3 max-w-[20ch] text-[clamp(2.3rem,5.2vw,3.8rem)] font-extrabold leading-[1.04] tracking-tight">
            {guide.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[19px] leading-relaxed text-ink/75">
            {guide.excerpt}
          </p>
          <p className="mt-5 text-[14px] text-ink/55">
            Written by our Dubai desk · {guide.readingMinutes} min read
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="relative -mt-2 aspect-16/7 overflow-hidden rounded-[var(--radius-xl2)]">
          <Image
            src={guide.image}
            alt={guide.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 lg:grid-cols-[260px_1fr] lg:px-10 lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="border-t-2 border-ink pt-4 text-[12px] font-bold uppercase tracking-[0.14em]">
            In this guide
          </h2>
          <ul className="mt-4 flex flex-col gap-1">
            {contents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex min-h-11 items-center text-[15px] text-ink/70 no-underline hover:text-sea"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article>
          <ThingsToDoBody />
          <FaqList faqs={faqs} heading="Questions people ask before they come" className="mt-16" />
        </article>
      </div>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
              Turn the list into a trip
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((tour, i) => (
              <Reveal key={tour.slug} delayMs={i * 80}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
