/**
 * The shape of a UAE attraction entry.
 *
 * Every attraction page, the emirate hubs, the sitemap and the TouristAttraction
 * structured data are generated from these objects, so a fact is corrected in
 * exactly one place.
 *
 * On prices: `price` holds the *published gate price* researched in September
 * 2026, not a price this agency charges. Gate prices move, so each entry carries
 * its own `checked` date and the UI shows it. If we cannot evidence a figure it
 * stays null rather than being guessed — see lib/data/attractions/index.ts.
 */

import type { Accent } from "@/lib/data/tours";
import type { PlanCategory } from "./categories";

export type Emirate =
  | "dubai"
  | "abu-dhabi"
  | "sharjah"
  | "ajman"
  | "ras-al-khaimah"
  | "fujairah"
  | "umm-al-quwain";

/**
 * The poster motif drawn by components/attractions/AttractionPoster.tsx when an
 * attraction has no photograph we hold a licence for. Original artwork, so
 * there is nothing to clear.
 */
export type PosterMotif =
  | "tower"
  | "dome"
  | "arch"
  | "wave"
  | "dune"
  | "garden"
  | "wheel"
  | "mountain"
  | "speed"
  | "gallery";

/**
 * How a place charges.
 *
 * Not every venue sells a ticket. A beach club takes a minimum spend you get
 * back in food and drink; a park charges by the car; a souk charges nothing but
 * nobody leaves empty-handed. Flattening all of that into one "price from"
 * number would make the site confidently wrong, so the basis is stated and the
 * label is built from it.
 */
export type GateKind =
  | "free"
  /** A published admission ticket. */
  | "ticket"
  /** A minimum spend, redeemable against food and drink. */
  | "spend"
  /** Charged per vehicle rather than per head. */
  | "per-car"
  /** Genuinely varies by night, season or operator, and we will not guess. */
  | "varies";

export type Gate = {
  kind: GateKind;
  /** Cheapest published adult price in AED, for `ticket`, `spend` and `per-car`. */
  adultFrom?: number | null;
  /** Cheapest published child ticket. Undefined where the venue has no child rate. */
  childFrom?: number | null;
  /** Anything the numbers cannot carry — peak surcharges, age limits, dress codes. */
  note?: string;
};

export type AttractionSection = {
  heading: string;
  /** One or more paragraphs. Written for this site; nothing is quoted. */
  paragraphs: string[];
};

export type Attraction = {
  slug: string;
  name: string;
  emirate: Emirate;
  /** The district a visitor would type into a taxi app. */
  area: string;
  /**
   * Every intent this place answers, most relevant first. Multi-valued because
   * a visitor does not sort the world the way a filing system does — Kite Beach
   * is a beach, a family day out and a watersports spot at the same time, and
   * making it pick one would hide it from two of the three people looking.
   */
  categories: PlanCategory[];
  /**
   * Client search terms this page is the answer to, from
   * seo/keywords-source.csv. Used for the "people also search for" links and
   * seo/keyword-map.csv — never stuffed into the body copy.
   */
  keywords?: string[];
  /** One line under the card title. Under 90 characters. */
  tagline: string;
  /** One paragraph. Used on hubs and as the base of the meta description. */
  summary: string;
  sections: AttractionSection[];
  highlights: string[];
  gate: Gate;
  hours: string;
  bestTime: string;
  timeNeeded: string;
  gettingThere: string;
  /** Slugs of other attractions within easy reach. Powers internal linking. */
  nearby: string[];
  accent: Accent;
  motif: PosterMotif;
  /** A photograph in public/images we hold. Omitted means the poster is drawn. */
  image?: string;
  alt?: string;
  /** WGS84, for the TouristAttraction geo block and the "open in maps" link. */
  geo: { lat: number; lng: number };
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  /** The date the facts above were last verified against published sources. */
  checked: string;
};
