/**
 * The single entry point for attraction data.
 *
 * Every page, the sitemap and the structured data import from here, so the
 * split across dubai-*.ts / abu-dhabi.ts / sharjah.ts / northern-emirates.ts
 * is an implementation detail nothing else has to know about.
 */

import { abuDhabiAttractions } from "./abu-dhabi";
import { abuDhabiCity } from "./abu-dhabi-city";
import { abuDhabiOutdoors } from "./abu-dhabi-outdoors";
import { abuDhabiYas } from "./abu-dhabi-yas";
import { ajmanAttractions } from "./ajman";
import { alAinAttractions } from "./al-ain";
import { alAinFamily } from "./al-ain-family";
import { dubaiBeaches } from "./dubai-beaches";
import { dubaiCoast } from "./dubai-coast";
import { dubaiExperiences } from "./dubai-experiences";
import { dubaiLandmarks } from "./dubai-landmarks";
import { dubaiNightlife } from "./dubai-nightlife";
import { dubaiShoppingFamily } from "./dubai-shopping-family";
import { dubaiWellness } from "./dubai-wellness";
import { fujairahAttractions } from "./fujairah";
import { northernEmirateAttractions } from "./northern-emirates";
import { rasAlKhaimahAttractions } from "./ras-al-khaimah";
import { sharjahAttractions } from "./sharjah";
import { sharjahCoast } from "./sharjah-coast";
import { sharjahCulture } from "./sharjah-culture";
import { ummAlQuwainAttractions } from "./umm-al-quwain";
import { planCategories, type PlanCategory } from "./categories";
import type { Attraction, Emirate } from "./types";

export type { Attraction, AttractionSection, Emirate, Gate, PosterMotif } from "./types";
export type { CategoryMeta, PlanCategory } from "./categories";
export { categoryById, categoryLabel, planCategories } from "./categories";

export const attractions: Attraction[] = [
  ...dubaiLandmarks,
  ...dubaiCoast,
  ...dubaiExperiences,
  ...dubaiBeaches,
  ...dubaiNightlife,
  ...dubaiShoppingFamily,
  ...dubaiWellness,
  ...abuDhabiAttractions,
  ...abuDhabiCity,
  ...abuDhabiOutdoors,
  ...abuDhabiYas,
  ...alAinAttractions,
  ...alAinFamily,
  ...sharjahAttractions,
  ...sharjahCoast,
  ...sharjahCulture,
  ...ajmanAttractions,
  ...rasAlKhaimahAttractions,
  ...fujairahAttractions,
  ...ummAlQuwainAttractions,
  ...northernEmirateAttractions,
];

/**
 * Emirate metadata. `blurb` is the intro paragraph on each emirate hub and the
 * base of its meta description, so it is written once here rather than in the
 * page — the hub is generated, not hand-authored per emirate.
 */
export const emirates: {
  id: Emirate;
  name: string;
  /** How it reads mid-sentence: "attractions in Abu Dhabi". */
  shortName: string;
  blurb: string;
  accent: Attraction["accent"];
}[] = [
  {
    id: "dubai",
    name: "Dubai",
    shortName: "Dubai",
    blurb:
      "The emirate most visitors fly into, and the one with the widest gap between what it is famous for and what is actually good. The towers and the waterparks are worth the ticket; so is the one-dirham abra across the Creek and the free fountain show at the foot of the tallest building on earth.",
    accent: "sea",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    shortName: "Abu Dhabi",
    blurb:
      "The capital, ninety minutes down the coast, and the emirate that spends its money on museums and mosques rather than malls. The Grand Mosque is free, the Louvre reorganises how you think about art history, and Yas Island holds the fastest rollercoaster in the world.",
    accent: "gold",
  },
  {
    id: "sharjah",
    name: "Sharjah",
    shortName: "Sharjah",
    blurb:
      "The UAE's culture capital by deliberate policy — a dozen serious museums within a few kilometres, most charging under AED 20, plus desert archaeology at Mleiha that rewrites the timeline of human migration. The emirate is dry, so plan dinner accordingly.",
    accent: "palm",
  },
  {
    id: "ajman",
    name: "Ajman",
    shortName: "Ajman",
    blurb:
      "The smallest emirate, and the easiest half-day nobody plans. An eighteenth-century fort that was still the police station in 1978, a creek where wooden dhows are built by hand, and a corniche with no queue on it.",
    accent: "sun",
  },
  {
    id: "ras-al-khaimah",
    name: "Ras Al Khaimah",
    shortName: "Ras Al Khaimah",
    blurb:
      "Mountains rather than skyline. Jebel Jais is the highest point in the country, the road up is an attraction in its own right, and the zipline down the side of it is the longest in the world. Ten degrees cooler than the coast in winter.",
    accent: "palm",
  },
  {
    id: "fujairah",
    name: "Fujairah",
    shortName: "Fujairah",
    blurb:
      "The only emirate entirely on the Gulf of Oman, which means cooler, clearer water and the best snorkelling in the country straight off a free public beach. It also holds the oldest mosque in the UAE, built around 1446 and still in use.",
    accent: "sea",
  },
  {
    id: "umm-al-quwain",
    name: "Umm Al Quwain",
    shortName: "Umm Al Quwain",
    blurb:
      "The quietest emirate and the one that prices like it. A very large waterpark you can camp at, mangrove kayaking, and an old town that has changed less in thirty years than Dubai changes in three.",
    accent: "sea",
  },
];

/**
 * Categories that actually have something in them, in display order. A
 * "what are you planning?" grid with an empty tile on it is worse than a
 * shorter grid, so every consumer filters through this rather than rendering
 * the full taxonomy.
 */
export const categoriesWithContent = (list: Attraction[] = attractions) =>
  planCategories.filter((category) =>
    list.some((a) => a.categories.includes(category.id)),
  );

export const attractionsInCategory = (id: PlanCategory, list: Attraction[] = attractions) =>
  list.filter((a) => a.categories.includes(id));

export const countInCategory = (id: PlanCategory, list: Attraction[] = attractions) =>
  attractionsInCategory(id, list).length;

const bySlugMap = new Map(attractions.map((a) => [a.slug, a]));

export const attractionBySlug = (slug: string) => bySlugMap.get(slug);

export const emirateById = (id: string) => emirates.find((e) => e.id === id);

export const attractionsInEmirate = (id: Emirate) =>
  attractions.filter((a) => a.emirate === id);

export const emirateCount = (id: Emirate) => attractionsInEmirate(id).length;

/**
 * Resolves the `nearby` slugs on an attraction to the attractions themselves,
 * dropping anything that no longer exists. A stale slug should thin the related
 * strip, never throw on a page a visitor is reading.
 */
export const nearbyAttractions = (attraction: Attraction) =>
  attraction.nearby
    .map((slug) => bySlugMap.get(slug))
    .filter((a): a is Attraction => Boolean(a) && a!.slug !== attraction.slug);

/** Free attractions, used by the hub filter and by the "free things to do" cluster. */
export const isFree = (attraction: Attraction) => attraction.gate.kind === "free";

/**
 * The canonical path for an attraction. Emirate-scoped because the emirate is a
 * real dimension of the content, not decoration — see the platform skill on
 * designing URLs around category and place from day one.
 */
export const attractionPath = (attraction: Attraction) =>
  `/uae-attractions/${attraction.emirate}/${attraction.slug}`;

export const emiratePath = (id: Emirate) => `/uae-attractions/${id}`;

/**
 * Human-readable gate price for cards and fact tables.
 *
 * Built from the basis rather than from the number alone: "From AED 200" on a
 * beach club reads as an entry fee when it is a minimum spend you get back in
 * drinks, and "From AED 20" on a park reads as per person when it is per car.
 * Where we genuinely do not know, it says so instead of guessing.
 */
export function gateLabel(attraction: Attraction): string {
  const { kind, adultFrom } = attraction.gate;

  switch (kind) {
    case "free":
      return "Free";
    case "varies":
      return "Varies";
    case "spend":
      return adultFrom ? `Min. spend AED ${adultFrom}` : "Minimum spend";
    case "per-car":
      return adultFrom ? `AED ${adultFrom} per car` : "Charged per car";
    case "ticket":
      return adultFrom ? `From AED ${adultFrom}` : "Ticketed";
  }
}

/**
 * Canonical paths for the "what are you planning?" flow.
 *
 * Category first, emirate second — /things-to-do/beaches/sharjah rather than
 * the reverse. Two reasons: Next.js refuses two different dynamic slug names at
 * the same position, so one order had to win; and this way each category is a
 * hub with the emirates as its spokes, which is the shape the internal linking
 * wants.
 */
export const categoryPath = (category: PlanCategory) => `/things-to-do/${category}`;

export const planPath = (emirate: Emirate, category: PlanCategory) =>
  `/things-to-do/${category}/${emirate}`;

/**
 * Every emirate/category pair that has at least one place in it.
 *
 * Used by generateStaticParams and by the sitemap, so the site never builds a
 * page for a combination it has nothing to say about. 7 emirates x 16
 * categories would be 112 routes, most of them empty; this is the subset worth
 * having.
 */
export const populatedPlanPairs = (): { emirate: Emirate; category: PlanCategory }[] =>
  emirates.flatMap((emirate) =>
    planCategories
      .filter((category) =>
        attractions.some(
          (a) => a.emirate === emirate.id && a.categories.includes(category.id),
        ),
      )
      .map((category) => ({ emirate: emirate.id, category: category.id })),
  );

/** Counts per category, optionally scoped to one emirate. */
export const categoryCounts = (list: Attraction[] = attractions): Record<string, number> =>
  Object.fromEntries(
    planCategories.map((category) => [
      category.id,
      list.filter((a) => a.categories.includes(category.id)).length,
    ]),
  );
