import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AttractionBody } from "@/components/attractions/AttractionBody";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { AttractionFacts } from "@/components/attractions/AttractionFacts";
import { AttractionMedia } from "@/components/attractions/AttractionMedia";
import { PackageCard } from "@/components/packages/PackageCard";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import {
  attractionBySlug,
  attractionOgImage,
  attractionPath,
  attractions,
  emirateById,
  emiratePath,
  nearbyAttractions,
} from "@/lib/data/attractions";
import { packagesForAttraction } from "@/lib/data/packages";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { touristAttractionSchema, webPageSchema } from "@/lib/seo-schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return attractions.map((a) => ({ emirate: a.emirate, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/uae-attractions/[emirate]/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const attraction = attractionBySlug(slug);
  if (!attraction) return { title: "Attraction not found" };

  return pageMetadata({
    title: attraction.metaTitle,
    description: attraction.metaDescription,
    path: attractionPath(attraction),
    image: attractionOgImage(attraction),
  });
}

export default async function AttractionPage({
  params,
}: PageProps<"/uae-attractions/[emirate]/[slug]">) {
  const { emirate: emirateParam, slug } = await params;
  const attraction = attractionBySlug(slug);
  if (!attraction) notFound();

  // One attraction, one URL. If the emirate segment is wrong — an old link, a
  // hand-typed guess — send the visitor and the crawler to the canonical path
  // rather than serving the same content twice.
  if (attraction.emirate !== emirateParam) redirect(attractionPath(attraction));

  const emirate = emirateById(attraction.emirate)!;
  const nearby = nearbyAttractions(attraction);
  const bookable = packagesForAttraction(attraction.slug);

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "UAE attractions", path: "/uae-attractions" },
    { name: emirate.name, path: emiratePath(emirate.id) },
    { name: attraction.name, path: attractionPath(attraction) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          webPageSchema({
            path: attractionPath(attraction),
            name: attraction.metaTitle,
            description: attraction.metaDescription,
            checked: attraction.checked,
            image: attraction.image,
            aboutId: `${site.url}${attractionPath(attraction)}#attraction`,
          }),
          touristAttractionSchema(attraction),
          ...(attraction.faqs.length ? [faqSchema(attraction.faqs)] : []),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-sea-dark">
            {attraction.area} · {emirate.name}
          </p>
          <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {attraction.name}
          </h1>
          <p data-speakable className="mt-5 max-w-[66ch] text-[18px] leading-relaxed text-ink/75">
            {attraction.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="relative -mt-2 aspect-16/7 overflow-hidden rounded-[var(--radius-xl2)] bg-sand">
          <AttractionMedia
            attraction={attraction}
            priority
            variant="wide"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-20">
        <div>
          <AttractionBody attraction={attraction} />
          {attraction.faqs.length ? (
            <FaqList
              faqs={attraction.faqs}
              heading={`${attraction.name}, answered`}
              className="mt-14"
            />
          ) : null}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <AttractionFacts attraction={attraction} />
        </div>
      </div>

      {bookable.length ? (
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
                Packages that include {attraction.name}
              </h2>
              <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookable.slice(0, 3).map((pkg, i) => (
                <Reveal key={pkg.slug} delayMs={i * 80}>
                  <PackageCard pkg={pkg} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {nearby.length ? (
        <section className="bg-page">
          <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
                Close enough to do on the same day
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.slice(0, 3).map((other, i) => (
                <Reveal key={other.slug} delayMs={i * 80}>
                  <AttractionCard attraction={other} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
