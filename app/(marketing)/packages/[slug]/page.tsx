import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { PackageCard } from "@/components/packages/PackageCard";
import { PackageEnquiryCard } from "@/components/packages/PackageEnquiryCard";
import { PackageItinerary } from "@/components/packages/PackageItinerary";
import { PricingTable } from "@/components/packages/PricingTable";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { attractionBySlug } from "@/lib/data/attractions";
import { packageBySlug, packagePath, packages } from "@/lib/data/packages";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { packageTripSchema, webPageSchema } from "@/lib/seo-schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) return { title: "Package not found" };

  return pageMetadata({
    title: pkg.metaTitle,
    description: pkg.metaDescription,
    path: packagePath(pkg),
    image: pkg.image ?? "/images/dunes-sunset.jpg",
  });
}

export default async function PackagePage({ params }: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) notFound();

  const visits = pkg.attractions
    .map(attractionBySlug)
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const related = packages
    .filter((other) => other.slug !== pkg.slug && other.kind === pkg.kind)
    .slice(0, 3);

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Packages & prices", path: "/packages" },
    { name: pkg.title, path: packagePath(pkg) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          webPageSchema({
            path: packagePath(pkg),
            name: pkg.metaTitle,
            description: pkg.metaDescription,
            checked: pkg.checked,
            image: pkg.image,
            aboutId: `${site.url}${packagePath(pkg)}#trip`,
          }),
          packageTripSchema(pkg),
          ...(pkg.faqs.length ? [faqSchema(pkg.faqs)] : []),
        ]}
      />

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-gold-dark">
            {pkg.places.join(" · ")} ·{" "}
            {pkg.durationNights > 0
              ? `${pkg.durationDays} days, ${pkg.durationNights} nights`
              : "Day tour"}
          </p>
          <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {pkg.title}
          </h1>
          <p data-speakable className="mt-5 max-w-[66ch] text-[18px] leading-relaxed text-ink/75">
            {pkg.summary}
          </p>
        </div>
      </section>

      {pkg.image && pkg.alt ? (
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="relative -mt-2 aspect-16/7 overflow-hidden rounded-[var(--radius-xl2)]">
            <Image
              src={pkg.image}
              alt={pkg.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-20">
        <div>
          <Reveal>
            <h2 className="text-[26px] font-extrabold tracking-tight">What you get</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {pkg.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <PackageItinerary pkg={pkg} />

          <div className="mt-14">
            <PricingTable pkg={pkg} />
          </div>

          {pkg.faqs.length ? (
            <FaqList faqs={pkg.faqs} heading="Before you book" className="mt-14" />
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <PackageEnquiryCard pkg={pkg} />
        </aside>
      </div>

      {visits.length ? (
        <section className="bg-page">
          <div className="mx-auto max-w-[1280px] px-5 pb-20 lg:px-10 lg:pb-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
                What this package visits
              </h2>
              <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visits.slice(0, 3).map((attraction, i) => (
                <Reveal key={attraction.slug} delayMs={i * 80}>
                  <AttractionCard attraction={attraction} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
                People comparing this also looked at
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other, i) => (
                <Reveal key={other.slug} delayMs={i * 80}>
                  <PackageCard pkg={other} />
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
