import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { NearestResults } from "@/components/attractions/NearestResults";
import { DirectoryStrip } from "@/components/services/DirectoryStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import {
  attractionPath,
  attractions,
  attractionsInEmirate,
  categoriesWithContent,
  categoryById,
  categoryPath,
  emirateById,
  emiratePath,
  planPath,
  populatedPlanPairs,
  type Emirate,
} from "@/lib/data/attractions";
import { getListings } from "@/lib/services/directory";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema, webPageSchema } from "@/lib/seo-schema";

/** Only the emirate/category pairs that actually have something in them. */
export function generateStaticParams() {
  return populatedPlanPairs().map((pair) => ({
    category: pair.category,
    emirate: pair.emirate,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/things-to-do/[category]/[emirate]">): Promise<Metadata> {
  const { category: categoryId, emirate: emirateId } = await params;
  const category = categoryById(categoryId);
  const emirate = emirateById(emirateId);
  if (!category || !emirate) return { title: "Not found" };

  const count = attractionsInEmirate(emirate.id).filter((a) =>
    a.categories.includes(category.id),
  ).length;

  return pageMetadata({
    title:
      count === 1
        ? `${category.label} in ${emirate.name} | Where to Go & Prices`
        : `${category.label} in ${emirate.name} | ${count} Places & Prices`,
    description: `The best ${category.noun} in ${emirate.name}, with 2026 prices and which are free. Sort by whatever is nearest to you.`,
    path: planPath(emirate.id, category.id),
  });
}

/**
 * One category, one emirate — the end of the "where → what → results" flow.
 *
 * When an emirate has only a handful in a category, the rest of the country is
 * shown underneath rather than leaving a near-empty page. A visitor asking for
 * spas in Umm Al Quwain is better served by three in Umm Al Quwain and the next
 * dozen elsewhere than by three and a full stop.
 */
export default async function PlanResultsPage({
  params,
}: PageProps<"/things-to-do/[category]/[emirate]">) {
  const { category: categoryId, emirate: emirateId } = await params;
  const category = categoryById(categoryId);
  const emirate = emirateById(emirateId);
  if (!category || !emirate) notFound();

  const inEmirate = attractionsInEmirate(emirate.id as Emirate).filter((a) =>
    a.categories.includes(category.id),
  );
  const elsewhere = attractions.filter(
    (a) => a.emirate !== emirate.id && a.categories.includes(category.id),
  );

  const listings = category.directorySlug
    ? await getListings({
        category: category.directorySlug,
        emirate: emirate.name,
        limit: 6,
      })
    : [];

  const alsoHere = categoriesWithContent(attractionsInEmirate(emirate.id as Emirate)).filter(
    (other) => other.id !== category.id,
  );

  const pagePath = planPath(emirate.id, category.id);
  const lastChecked = inEmirate.map((a) => a.checked).sort().at(-1) ?? "2026-09-18";

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Things to do", path: "/things-to-do" },
    { name: category.label, path: categoryPath(category.id) },
    { name: emirate.name, path: planPath(emirate.id, category.id) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          webPageSchema({
            path: pagePath,
            name: `${category.label} in ${emirate.name}`,
            description: category.blurb,
            checked: lastChecked,
          }),
          itemListSchema(
            inEmirate.map((a) => ({ name: a.name, path: attractionPath(a) })),
            `${category.label} in ${emirate.name}`,
          ),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[20ch] text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.04] tracking-tight">
            {category.label} in {emirate.name}
          </h1>
          <p data-speakable className="mt-5 max-w-[66ch] text-[18px] leading-relaxed text-ink/75">
            {inEmirate.length}{" "}
            {inEmirate.length === 1 ? "place" : "places"} for {category.noun} in{" "}
            {emirate.name}, with what each costs and when to go. {category.tagline}.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
          <NearestResults
            attractions={inEmirate}
            heading={`${category.label} in ${emirate.name}`}
            emptyMessage="Nothing here matches that filter. Try the rest of the UAE below."
          />
        </div>
      </section>

      {category.directorySlug ? (
        <section className="bg-sea-tint/40">
          <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
            <DirectoryStrip
              listings={listings}
              heading={`${category.label} businesses in ${emirate.name}`}
              categorySlug={category.directorySlug}
            />
          </div>
        </section>
      ) : null}

      {elsewhere.length ? (
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight">
                {category.label} elsewhere in the UAE
              </h2>
              <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-ink/70">
                Nothing in the Emirates is more than a few hours&rsquo; drive from anywhere else.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {elsewhere.slice(0, 6).map((attraction, i) => (
                <Reveal key={attraction.slug} delayMs={(i % 3) * 80}>
                  <AttractionCard attraction={attraction} />
                </Reveal>
              ))}
            </div>
            <Link
              href={categoryPath(category.id)}
              className="mt-8 inline-flex min-h-11 items-center rounded-full border border-sea px-6 text-[15px] font-semibold text-sea no-underline hover:bg-sea-tint"
            >
              All {category.noun} in the UAE
            </Link>
          </div>
        </section>
      ) : null}

      {alsoHere.length ? (
        <section className="bg-page">
          <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight">
                Also in {emirate.name}
              </h2>
            </Reveal>
            <nav aria-label={`Other categories in ${emirate.name}`} className="mt-6 flex flex-wrap gap-2.5">
              {alsoHere.map((other) => (
                <Link
                  key={other.id}
                  href={planPath(emirate.id, other.id)}
                  className="flex min-h-11 items-center rounded-full border border-card-border bg-surface px-5 text-[14px] text-ink/75 no-underline transition-colors hover:border-sea/40"
                >
                  {other.label}
                </Link>
              ))}
              <Link
                href={emiratePath(emirate.id)}
                className="flex min-h-11 items-center rounded-full border border-sea bg-sea-tint px-5 text-[14px] font-semibold text-sea-dark no-underline"
              >
                Everything in {emirate.name}
              </Link>
            </nav>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
