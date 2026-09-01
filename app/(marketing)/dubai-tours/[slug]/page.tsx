import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingCard } from "@/components/sections/BookingCard";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { TourCard } from "@/components/sections/TourCard";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { tourDetails } from "@/lib/data/tour-details";
import { tourBySlug, tours } from "@/lib/data/tours";
import { breadcrumbSchema, faqSchema, pageMetadata, touristTripSchema } from "@/lib/seo";

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps<"/dubai-tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour) return { title: "Tour not found" };

  return pageMetadata({
    title: tour.metaTitle,
    description: tour.metaDescription,
    path: `/dubai-tours/${tour.slug}`,
    image: tour.image,
  });
}

export default async function TourPage({ params }: PageProps<"/dubai-tours/[slug]">) {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour) notFound();

  const detail = tourDetails[tour.slug];
  const related = tours.filter((other) => other.slug !== tour.slug).slice(0, 3);

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Dubai tours", path: "/dubai-tours" },
    { name: tour.title, path: `/dubai-tours/${tour.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          touristTripSchema({
            name: tour.title,
            description: tour.summary,
            path: `/dubai-tours/${tour.slug}`,
            image: tour.image,
            durationHours: tour.durationIso,
          }),
          ...(detail?.faqs?.length ? [faqSchema(detail.faqs)] : []),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-sea-dark">
            {tour.durationLabel} · Dubai
          </p>
          <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {tour.title}
          </h1>
          <p className="mt-5 max-w-[64ch] text-[18px] leading-relaxed text-ink/75">
            {tour.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="relative -mt-2 aspect-16/7 overflow-hidden rounded-[var(--radius-xl2)]">
          <Image
            src={tour.image}
            alt={tour.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 lg:grid-cols-[1fr_360px] lg:px-10 lg:py-20">
        <div>
          {detail ? (
            <Reveal as="p" className="text-[19px] leading-relaxed text-ink/85">
              {detail.intro}
            </Reveal>
          ) : null}

          <Reveal className="mt-10">
            <h2 className="text-[26px] font-extrabold tracking-tight">What you get</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          {detail?.itinerary ? (
            <Reveal className="mt-12">
              <h2 className="text-[26px] font-extrabold tracking-tight">How the day runs</h2>
              <ol className="mt-6 border-t border-divider">
                {detail.itinerary.map((stop) => (
                  <li
                    key={stop.time}
                    className="grid gap-2 border-b border-divider py-5 sm:grid-cols-[96px_1fr] sm:gap-5"
                  >
                    <p className="text-[19px] font-bold text-sea">{stop.time}</p>
                    <div>
                      <h3 className="text-[17px] font-bold">{stop.title}</h3>
                      <p className="mt-1 max-w-[62ch] text-[16px] leading-relaxed text-ink/75">
                        {stop.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}

          {detail ? (
            <Reveal className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="text-[22px] font-extrabold tracking-tight">Included</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {detail.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                      <span aria-hidden className="font-bold text-palm">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-[22px] font-extrabold tracking-tight">Not included</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {detail.excludes.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                      <span aria-hidden className="font-bold text-coral-dark">
                        ✕
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          {detail?.faqs?.length ? <FaqList faqs={detail.faqs} className="mt-14" /> : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <BookingCard tour={tour} />
        </aside>
      </div>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
              People who booked this also asked about
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other, i) => (
              <Reveal key={other.slug} delayMs={i * 80}>
                <TourCard tour={other} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
