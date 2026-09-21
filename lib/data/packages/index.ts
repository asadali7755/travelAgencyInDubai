/**
 * The single entry point for package data.
 *
 * Read the pricing note at the top of types.ts before changing any number in
 * here — the figures are researched market rates, not contracted agency rates,
 * and the UI says so wherever it renders one.
 */

import { outboundPackages } from "./outbound";
import { uaeDayTours } from "./uae-day-tours";
import { uaeHolidays } from "./uae-holidays";
import type { Package, PackageKind, PriceTier } from "./types";

export type { ItineraryDay, Package, PackageKind, PriceTier } from "./types";

export const packages: Package[] = [...uaeDayTours, ...uaeHolidays, ...outboundPackages];

export const packageKinds: { id: PackageKind; label: string; blurb: string }[] = [
  {
    id: "day-tour",
    label: "Day tours",
    blurb: "Out after breakfast, back for dinner. Hotel pick-up included on all of them.",
  },
  {
    id: "uae-holiday",
    label: "UAE holidays",
    blurb: "Hotel, transfers and tours as one price, from a weekend to a week.",
  },
  {
    id: "outbound",
    label: "Holidays from the UAE",
    blurb: "Flights included. Short breaks and longer trips for residents leaving the country.",
  },
];

const bySlugMap = new Map(packages.map((p) => [p.slug, p]));

export const packageBySlug = (slug: string) => bySlugMap.get(slug);

export const packagesOfKind = (kind: PackageKind) => packages.filter((p) => p.kind === kind);

export const packagePath = (pkg: Package) => `/packages/${pkg.slug}`;

/**
 * Packages that visit a given attraction. Drives the "book this" strip on every
 * attraction page, which is the internal link that turns a research visit into
 * an enquiry.
 */
export const packagesForAttraction = (attractionSlug: string) =>
  packages.filter((p) => p.attractions.includes(attractionSlug));

/**
 * The cheapest adult figure across a package's tiers, used for the "from" price
 * on cards, in the Offer structured data and in the sitemap-facing summaries.
 *
 * Private-only tiers carry `adult: 0` because the price is a vehicle total, not
 * a per-head rate, so they are skipped rather than reported as free.
 */
export function fromPrice(pkg: Package): number {
  const perHead = pkg.tiers.map((t) => t.adult).filter((n) => n > 0);
  return perHead.length ? Math.min(...perHead) : 0;
}

/** The cheapest private-departure total, or null where none is offered. */
export function fromPrivatePrice(pkg: Package): number | null {
  const totals = pkg.tiers
    .map((t) => t.privateTotal)
    .filter((n): n is number => typeof n === "number" && n > 0);
  return totals.length ? Math.min(...totals) : null;
}

/** Formats a tier for the pricing table. Returns null for cells with no rate. */
export function tierAdultLabel(tier: PriceTier): string | null {
  if (tier.privateTotal) {
    return `AED ${tier.privateTotal.toLocaleString("en-AE")} total`;
  }
  return tier.adult > 0 ? `AED ${tier.adult.toLocaleString("en-AE")}` : null;
}

export function tierChildLabel(tier: PriceTier): string | null {
  if (tier.privateTotal) {
    return `up to ${tier.privateUpTo ?? 4} people`;
  }
  return tier.child && tier.child > 0 ? `AED ${tier.child.toLocaleString("en-AE")}` : null;
}

export const aed = (n: number) => `AED ${n.toLocaleString("en-AE")}`;
