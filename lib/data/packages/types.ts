/**
 * The shape of a bookable tour package.
 *
 * IMPORTANT — what the prices in these files are.
 *
 * Every figure is an *indicative published market rate* researched in September
 * 2026 across UAE operators and OTAs. It is what a trip of this shape normally
 * sells for, not a rate this agency has contracted. Each package therefore
 * carries `checked`, and every price the site renders is accompanied by the
 * disclaimer in components/packages/PriceNote.tsx.
 *
 * This is the same rule lib/data/trip-rates.ts already follows for the trip
 * cost calculator. When the client confirms his own contracted rates, replace
 * the numbers here and change `basis` — the UI and the Offer structured data
 * both read from this one place.
 *
 * TODO(client): sign off reports/package-rates-for-approval.md, then swap each
 * `from` and each tier price for the agency's own rate.
 */

import type { Accent } from "@/lib/data/tours";

export type PackageKind = "day-tour" | "uae-holiday" | "outbound";

export type PriceTier = {
  id: string;
  label: string;
  /** What the traveller gets at this tier, in one line. */
  detail: string;
  /** Per adult, in AED. */
  adult: number;
  /** Per child sharing, in AED. Null where the tier has no child rate. */
  child: number | null;
  /** Total for a private departure at this tier, where one is offered. */
  privateTotal?: number;
  /** Party size a `privateTotal` covers. */
  privateUpTo?: number;
};

export type ItineraryDay = {
  /** "Day 1" for multi-day, "16:00" for a day tour. */
  label: string;
  title: string;
  body: string;
};

export type Package = {
  slug: string;
  title: string;
  kind: PackageKind;
  /** ISO 3166-1 alpha-2 of the destination. UAE packages are "AE". */
  countryCode: string;
  countryName: string;
  /** Cities or emirates the package covers, in order. */
  places: string[];
  durationDays: number;
  durationNights: number;
  /** ISO 8601 duration for the TouristTrip structured data. */
  durationIso: string;
  tagline: string;
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  tiers: PriceTier[];
  /** What the headline price is per: "per adult, twin sharing" and so on. */
  priceBasis: string;
  /** Seasonality in one sentence. Dubai pricing swings hard Nov–Mar. */
  seasonNote: string;
  /** Optional extras sold alongside, priced per person unless said otherwise. */
  addOns: { label: string; priceAed: number; note?: string }[];
  /** Attraction slugs this package visits. Powers cross-linking both ways. */
  attractions: string[];
  accent: Accent;
  image?: string;
  alt?: string;
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  checked: string;
};
