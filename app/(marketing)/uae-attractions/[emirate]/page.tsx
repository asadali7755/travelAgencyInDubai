import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AttractionExplorer } from "@/components/attractions/AttractionExplorer";
import { PlanGrid } from "@/components/attractions/PlanGrid";
import { EmiratePicker } from "@/components/map/EmiratePicker";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import {
  attractionOgImage,
  attractionPath,
  attractions,
  attractionsInEmirate,
  categoriesWithContent,
  categoryCounts,
  emirateById,
  emiratePath,
  emirates,
  isFree,
  planPath,
  type Emirate,
} from "@/lib/data/attractions";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/seo-schema";

export function generateStaticParams() {
  return emirates.map((emirate) => ({ emirate: emirate.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/uae-attractions/[emirate]">): Promise<Metadata> {
  const { emirate: id } = await params;
  const emirate = emirateById(id);
  if (!emirate) return { title: "Emirate not found" };

  const list = attractionsInEmirate(emirate.id);
  const count = list.length;

  return pageMetadata({
    title:
      count === 1
        ? `Things to Do in ${emirate.name} | Prices & Opening Hours`
        : `Things to Do in ${emirate.name} | ${count} Places & Prices`,
    description: `${count} places worth your time in ${emirate.name}: beaches, family days out, culture and adventure, with 2026 prices and which are free.`,
    path: emiratePath(emirate.id),
    image: attractionOgImage(list[0] ?? attractions[0]),
  });
}

/**
 * One emirate. The page leads with the question rather than a list, because
 * "what are you planning?" is the decision a visitor is actually making — the
 * full A-to-Z is underneath for anyone who would rather browse.
 */
export default async function EmiratePage({ params }: PageProps<"/uae-attractions/[emirate]">) {
  const { emirate: id } = await params;
  const emirate = emirateById(id);
  if (!emirate) notFound();

  const list = attractionsInEmirate(emirate.id as Emirate);
  const freeCount = list.filter(isFree).length;
  const categories = categoriesWithContent(list);
  const counts = categoryCounts(list);

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "UAE attractions", path: "/uae-attractions" },
    { name: emirate.name, path: emiratePath(emirate.id) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          itemListSchema(
            list.map((a) => ({ name: a.name, path: attractionPath(a) })),
            `Things to do in ${emirate.name}`,
          ),
        ]}
      />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.3rem,5vw,3.6rem)] font-extrabold leading-[1.03] tracking-tight">
            Things to do in {emirate.name}
          </h1>
          <p data-speakable className="mt-6 max-w-[64ch] text-[18px] leading-relaxed text-ink/75">
            {emirate.blurb}
          </p>
          <p className="mt-4 text-[15px] text-ink/60">
            {list.length} {list.length === 1 ? "place" : "places"}
            {freeCount ? `, ${freeCount} of them free to enter` : ""}.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <PlanGrid
            categories={categories}
            counts={counts}
            hrefFor={(category) => planPath(emirate.id as Emirate, category)}
            intro={`Pick what kind of day you are after in ${emirate.name} and we'll show you what's there — with the option to sort by whatever is closest to you.`}
          />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold tracking-tight">
              Everything in {emirate.name}
            </h2>
          </Reveal>
          <div className="mt-6">
            <AttractionExplorer attractions={list} showEmirate={false} />
          </div>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-20">
          <EmiratePicker activeId={emirate.id as Emirate} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
