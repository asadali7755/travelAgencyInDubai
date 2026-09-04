/**
 * The trip cost estimator. A pure function: same input, same output, no React,
 * no fetch. The UI in components/calculator/ only renders what this returns.
 *
 * Everything is a low-high range rather than a single number, because a single
 * number would be precise in a way the underlying data is not. Rounding to the
 * nearest ten dirhams says the same thing visually.
 */

import {
  airportTransferReturn,
  childFactor,
  dailySpend,
  gettingAroundPerDay,
  hotelPerNight,
  originById,
  seasonFor,
  tourPricing,
  tourismDirhamPerNight,
  visaPerPerson,
  type OriginKey,
  type Range,
  type Tier,
} from "@/lib/data/trip-rates";
import { tourBySlug } from "@/lib/data/tours";

export type EstimateInput = {
  origin: OriginKey;
  nights: number;
  adults: number;
  children: number;
  tier: Tier;
  /** 0-11. Drives the season adjustment. */
  month: number;
  tourSlugs: string[];
  includeFlights: boolean;
  includeVisa: boolean;
  includeHotel: boolean;
};

export type LineItem = {
  id: string;
  label: string;
  detail: string;
  low: number;
  high: number;
};

export type Estimate = {
  lines: LineItem[];
  total: Range;
  perPerson: Range;
  perNight: Range;
  travellers: number;
  rooms: number;
  season: ReturnType<typeof seasonFor>;
};

const scale = (range: Range, factor: number): Range => ({
  low: range.low * factor,
  high: range.high * factor,
});

const round10 = (value: number) => Math.round(value / 10) * 10;

/** Head count weighted for children, used on the per-person lines. */
const heads = (adults: number, children: number, factor: number) =>
  adults + children * factor;

export function estimateTrip(input: EstimateInput): Estimate {
  const { adults, children, nights, tier, month } = input;
  const travellers = adults + children;
  const season = seasonFor(month);

  // Two adults to a room; children share with them. One adult still needs a
  // room, which is why this rounds up rather than down.
  const rooms = Math.max(1, Math.ceil(adults / 2));

  const lines: LineItem[] = [];
  const push = (id: string, label: string, detail: string, range: Range) => {
    if (range.high <= 0) return;
    lines.push({ id, label, detail, low: range.low, high: range.high });
  };

  if (input.includeFlights) {
    const origin = originById(input.origin);
    const people = heads(adults, children, childFactor.flight);
    push(
      "flights",
      "Flights",
      `Return economy for ${travellers} ${travellers === 1 ? "traveller" : "travellers"} from ${origin.label.replace(/^I'm already in the /, "")}`,
      scale(origin.flight, people),
    );
  }

  if (input.includeVisa) {
    const band =
      visaPerPerson.find((entry) => nights <= entry.upToNights) ??
      visaPerPerson[visaPerPerson.length - 1];
    push(
      "visa",
      "UAE visit visa",
      `${band.upToNights}-day visa for ${travellers} ${travellers === 1 ? "person" : "people"}, government fee and VAT included`,
      scale(band.price, travellers),
    );
  }

  if (input.includeHotel && nights > 0) {
    const room = scale(hotelPerNight[tier], season.hotel);
    const nightly: Range = {
      low: room.low + tourismDirhamPerNight[tier],
      high: room.high + tourismDirhamPerNight[tier],
    };
    push(
      "hotel",
      "Hotel",
      `${nights} ${nights === 1 ? "night" : "nights"} in ${rooms} ${rooms === 1 ? "room" : "rooms"}, Tourism Dirham included`,
      scale(nightly, nights * rooms),
    );
  }

  if (input.origin !== "uae") {
    push(
      "transfers",
      "Airport transfers",
      "Return between the airport and your hotel",
      airportTransferReturn[tier],
    );
  }

  if (input.tourSlugs.length) {
    let low = 0;
    let high = 0;
    const names: string[] = [];

    for (const slug of input.tourSlugs) {
      const pricing = tourPricing[slug];
      const tour = tourBySlug(slug);
      if (!pricing || !tour) continue;

      names.push(tour.title);
      const seasonal = scale(pricing.price, season.tours);
      // A yacht is chartered whole; everything else is sold per head.
      const multiplier = pricing.perBooking
        ? 1
        : heads(adults, children, childFactor.tour);

      low += seasonal.low * multiplier;
      high += seasonal.high * multiplier;
    }

    push(
      "tours",
      input.tourSlugs.length === 1 ? "Experience" : "Experiences",
      names.join(" · "),
      { low, high },
    );
  }

  if (nights > 0) {
    push(
      "food",
      "Food & everyday spend",
      `Meals, coffee and extras for ${nights} ${nights === 1 ? "day" : "days"}`,
      scale(dailySpend[tier], nights * heads(adults, children, childFactor.dailySpend)),
    );

    push(
      "transport",
      "Getting around",
      "Metro, taxis and short hops between the transfers",
      scale(
        gettingAroundPerDay[tier],
        nights * heads(adults, children, childFactor.gettingAround),
      ),
    );
  }

  const total = lines.reduce<Range>(
    (sum, line) => ({ low: sum.low + line.low, high: sum.high + line.high }),
    { low: 0, high: 0 },
  );

  const rounded: Range = { low: round10(total.low), high: round10(total.high) };

  return {
    lines: lines.map((line) => ({
      ...line,
      low: round10(line.low),
      high: round10(line.high),
    })),
    total: rounded,
    perPerson: {
      low: round10(total.low / Math.max(1, travellers)),
      high: round10(total.high / Math.max(1, travellers)),
    },
    perNight: {
      low: round10(total.low / Math.max(1, nights)),
      high: round10(total.high / Math.max(1, nights)),
    },
    travellers,
    rooms,
    season,
  };
}

/**
 * A one-line human summary of the choices, carried to the contact form so the
 * visitor does not have to type their own brief twice.
 */
export function describeTrip(input: EstimateInput, estimate: Estimate): string {
  const parts = [
    `${input.nights} ${input.nights === 1 ? "night" : "nights"} in Dubai`,
    `${input.adults} ${input.adults === 1 ? "adult" : "adults"}${
      input.children ? ` and ${input.children} ${input.children === 1 ? "child" : "children"}` : ""
    }`,
    `${input.tier} level`,
  ];

  const names = input.tourSlugs
    .map((slug) => tourBySlug(slug)?.title)
    .filter(Boolean)
    .join(", ");

  if (names) parts.push(`interested in ${names}`);

  return `${parts.join(", ")}. Estimated AED ${estimate.total.low.toLocaleString("en-AE")}–${estimate.total.high.toLocaleString("en-AE")} in total.`;
}
