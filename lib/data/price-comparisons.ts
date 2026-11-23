/**
 * Published prices from other Dubai operators, for the comparison table on a
 * tour page.
 *
 * Rules for adding a row — these are what make naming competitors defensible:
 *
 * - The figure is copied from the operator's own page (or the page selling it),
 *   read by a person on the `checked` date. No figure from memory, from an
 *   aggregator's summary or converted from another currency.
 * - `source` is that page, linked from the table so a reader can check it.
 * - Anything ambiguous on the source page goes in `note`, not into the number.
 * - Re-check every row at least monthly. A comparison with stale competitor
 *   prices is a misleading claim, and it is the one most likely to be
 *   challenged. Update `checked` when you do.
 *
 * Our own price is never in this list. Until the client confirms one, the page
 * says "price on request" and these rows are context for the visitor, not an
 * offer — they are deliberately not emitted as Offer structured data.
 */

export type PriceRow = {
  operator: string;
  product: string;
  duration: string;
  /** Adult price in AED, as published. */
  adult: number;
  /** Child price in AED, with the age band the operator uses. */
  child?: { price: number; ages: string };
  includes: string[];
  /** Something on the source page a reader should know before comparing. */
  note?: string;
  source: string;
};

export type PriceComparison = {
  heading: string;
  /** One paragraph: what is being compared and the main thing that differs. */
  intro: string;
  checked: string;
  rows: PriceRow[];
  /** Operators we looked at but could not include, with the reason. */
  omitted?: string[];
};

export const priceComparisons: Record<string, PriceComparison> = {
  "speed-boat-tour": {
    heading: "Dubai speed boat tours: prices compared",
    intro:
      "Published prices for shared speed boat tours from Dubai Marina. Compare like with like: the 90 and 99 minute tours go as far as the Burj Al Arab, the shorter ones do not.",
    checked: "2026-11-23",
    rows: [
      {
        operator: "Zutours",
        product: "Marina, Atlantis, Palm & Burj Al Arab Speedboat Tour",
        duration: "90 min",
        adult: 119,
        child: { price: 99, ages: "4+" },
        includes: ["Licensed captain", "Guide commentary", "Life jackets", "Bottled water"],
        note: "The page headlines \"from AED 99\"; its own rate table gives AED 119 for adults.",
        source: "https://zutours.com/dubai-marina-atlantis-palm-burj-al-arab-speedboat-tour/",
      },
      {
        operator: "Xclusive Yachts",
        product: "Marina, Atlantis, Palm & Burj Al Arab Speedboat Tour",
        duration: "90 min",
        adult: 160,
        child: { price: 120, ages: "5+" },
        includes: ["Audio guide", "VAT included", "Free cancellation up to 24 h"],
        note: "No transfers. Children under 5 are not allowed on board.",
        source: "https://www.xclusiveyachts.com/sightseeing-tours-dubai/",
      },
      {
        operator: "The Yellow Boats",
        product: "99-Minute Premium Tour",
        duration: "99 min",
        adult: 249,
        child: { price: 99, ages: "5–12, over 15 kg" },
        includes: ["Life jackets", "Departs Marina Walk"],
        note: "The page shows both AED 299 and AED 249 for adults; AED 249 appears to be the current price.",
        source: "https://www.theyellowboats.ae/dubai-tours/sightseeing-boat-cruise/",
      },
      {
        operator: "The Yellow Boats",
        product: "45-Minute Atlantis Blast",
        duration: "45 min",
        adult: 149,
        child: { price: 99, ages: "5–12, over 15 kg" },
        includes: ["Photo stop at Atlantis"],
        note: "Shorter route to Atlantis. The page shows both AED 199 and AED 149 for adults.",
        source: "https://www.theyellowboats.ae/dubai-tours/speed-boat-cruise/",
      },
    ],
  },

  "desert-safari": {
    heading: "Evening desert safari: prices compared",
    intro:
      "Published per-person prices for a shared evening desert safari with hotel pick-up, dune bashing and a BBQ dinner. What separates them is mostly what is included in the base price and what is charged as an extra at camp.",
    checked: "2026-11-23",
    rows: [
      {
        operator: "Dubai Desert Tour",
        product: "Evening Desert Safari: Dune Bashing, BBQ Dinner & Live Shows",
        duration: "About 7 h",
        adult: 120,
        child: { price: 104, ages: "child rate; infants usually free" },
        includes: [
          "Shared hotel pick-up",
          "Dune bashing in a Land Cruiser",
          "Camel ride and sandboarding",
          "BBQ dinner, three live shows",
        ],
        note: "Premium tier AED 240. Private car for your group is an extra AED 450 per vehicle.",
        source: "https://dubaideserttour.com/desert-safari-dubai-price",
      },
      {
        operator: "City Tour in Dubai",
        product: "Evening Desert Safari Dubai",
        duration: "About 6 h",
        adult: 150,
        child: { price: 125, ages: "3–10; under 3 free" },
        includes: [
          "Shared transfer",
          "Dune bashing in a Land Cruiser",
          "BBQ buffet, soft drinks",
          "Belly dance, fire and tanoura shows",
        ],
        note: "Its FAQ treats camel rides and sandboarding as paid extras. Adds AED 25–50 per person from 20 Dec 2026 to 10 Jan 2027.",
        source: "https://www.citytourindubai.com/safari-tours/evening-desert-safari/",
      },
    ],
    omitted: [
      "Platinum Heritage — no price is published online; bookings are quoted by its consultants.",
      "Arabian Adventures — the booking page showed prices only in another currency and every option as sold out on the day we checked.",
    ],
  },
};
