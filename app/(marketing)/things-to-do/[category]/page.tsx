import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NearestResults } from "@/components/attractions/NearestResults";
import { DirectoryStrip } from "@/components/services/DirectoryStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import {
  attractionPath,
  attractionsInCategory,
  categoryById,
  categoryPath,
  emirates,
  planCategories,
  planPath,
  type Emirate,
} from "@/lib/data/attractions";
import { getListings } from "@/lib/services/directory";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema, webPageSchema } from "@/lib/seo-schema";

export function generateStaticParams() {
  return planCategories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/things-to-do/[category]">): Promise<Metadata> {
  const { category: id } = await params;
  const category = categoryById(id);
  if (!category) return { title: "Not found" };

  const count = attractionsInCategory(category.id).length;

  return pageMetadata({
    title:
      count === 1
        ? `${category.label} in the UAE | Where to Go & Prices`
        : `${category.label} in the UAE | ${count} Places & Prices`,
    description: `${category.tagline}. The best ${category.noun} across all seven emirates, with 2026 prices and which are free.`,
    path: categoryPath(category.id),
  });
}

/**
 * One category across the whole country, with the emirate breakdown beneath it.
 *
 * The emirate links are the point as much as the results are: this page is the
 * hub, and /things-to-do/<category>/<emirate> are its spokes.
 */
export default async function CategoryPage({ params }: PageProps<"/things-to-do/[category]">) {
  const { category: id } = await params;
  const category = categoryById(id);
  if (!category) notFound();

  const list = attractionsInCategory(category.id);

  // Some intents are answered by a registered business rather than by a guide
  // we write. Where the category maps to a directory category, show those too.
  const listings = category.directorySlug
    ? await getListings({ category: category.directorySlug, limit: 6 })
    : [];

  const byEmirate = emirates
    .map((emirate) => ({
      emirate,
      count: list.filter((a) => a.emirate === emirate.id).length,
    }))
    .filter((row) => row.count > 0);

  const pagePath = categoryPath(category.id);
  // The newest verification date among the places listed. Honest, and it moves
  // only when a fact was actually re-checked rather than on every deploy.
  const lastChecked = list.map((a) => a.checked).sort().at(-1) ?? "2026-09-18";

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Things to do", path: "/things-to-do" },
    { name: category.label, path: categoryPath(category.id) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          webPageSchema({
            path: pagePath,
            name: `${category.label} in the UAE`,
            description: category.blurb,
            checked: lastChecked,
          }),
          itemListSchema(
            list.map((a) => ({ name: a.name, path: attractionPath(a) })),
            `${category.label} in the UAE`,
          ),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-sea-dark">
            All seven emirates
          </p>
          <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.03] tracking-tight">
            {category.label} in the UAE
          </h1>
          <p data-speakable className="mt-5 max-w-[66ch] text-[18px] leading-relaxed text-ink/75">
            {category.blurb}
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
              By emirate
            </h2>
          </Reveal>
          <nav aria-label={`${category.label} by emirate`} className="mt-6 flex flex-wrap gap-2.5">
            {byEmirate.map((row) => (
              <Link
                key={row.emirate.id}
                href={planPath(row.emirate.id as Emirate, category.id)}
                className="flex min-h-11 items-center gap-2 rounded-full border border-card-border bg-surface px-5 text-[14px] text-ink/75 no-underline transition-colors hover:border-sea/40"
              >
                {row.emirate.name}
                <span className="text-ink/45">{row.count}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-10">
            <NearestResults
              attractions={list}
              heading={`${category.label} across the UAE`}
              emptyMessage="Nothing matches that filter yet."
            />
          </div>
        </div>
      </section>

      {category.directorySlug ? (
        <section className="bg-sea-tint/40">
          <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
            <DirectoryStrip
              listings={listings}
              heading={`${category.label} businesses in the UAE`}
              categorySlug={category.directorySlug}
            />
          </div>
        </section>
      ) : null}

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
              Planning something else?
            </h2>
          </Reveal>
          <nav aria-label="Other categories" className="mt-6 flex flex-wrap gap-2.5">
            {planCategories
              .filter((other) => other.id !== category.id)
              .map((other) => (
                <Link
                  key={other.id}
                  href={categoryPath(other.id)}
                  className="flex min-h-11 items-center rounded-full border border-card-border bg-surface px-5 text-[14px] text-ink/75 no-underline transition-colors hover:border-sea/40"
                >
                  {other.label}
                </Link>
              ))}
          </nav>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
