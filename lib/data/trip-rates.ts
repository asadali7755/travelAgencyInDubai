/**
 * Rate tables behind the trip cost estimator.
 *
 * IMPORTANT — where these numbers come from and what they are not.
 *
 * Every figure here is a *published Dubai market range* researched in September
 * 2026, not a price this agency has quoted. The estimator therefore answers
 * "what does a trip like this usually cost in Dubai?" and never "this is your
 * price". The UI says so, and every result ends in a call to get a real quote.
 *
 * Sources used when these were set:
 *  - Hotels: 3-4* city-centre AED 300-600/night, 5* AED 550 (summer) to
 *    AED 1,500-2,500/night in the Nov-Mar peak.
 *  - Tourism Dirham: AED 7-20 per occupied room per night by hotel category.
 *  - Visa: GDRFA government fee AED 200 (30 day) / AED 300 (60 day) + 5% VAT;
 *    agency-inclusive prices commonly AED 350-550 and AED 580-900.
 *  - Desert safari AED 130-499pp; Marina dhow cruise AED 99-350pp; Burj Khalifa
 *    At the Top from AED 169, prime-time from AED 219, level 148 from AED 369.
 *  - Airport transfers AED 120-300 one way for a sedan, AED 350-800 luxury.
 *  - Food and everyday spend AED 80-120/day budget, AED 120-150 mid,
 *    up to AED 500/day at the luxury end.
 *  - Return economy airfares to DXB from the main source markets.
 *
 * TODO(client): once the boss confirms his own contracted rates, replace the
 * tour ranges here with them and change the disclaimer copy in
 * components/calculator/CalculatorSummary.tsx from "typical market cost" to a
 * real quote.
 */

export type Range = { low: number; high: number };

export type Tier = "saver" | "comfort" | "luxury";

export type OriginKey =
  | "uae"
  | "gcc"
  | "india"
  | "pakistan"
  | "uk"
  | "europe"
  | "russia"
  | "china"
  | "africa"
  | "americas"
  | "other";

/** The dirham has been pegged at 3.6725 to the US dollar since 1997. */
export const AED_PER_USD = 3.6725;

export const tiers: {
  id: Tier;
  label: string;
  hotelLabel: string;
  blurb: string;
}[] = [
  {
    id: "saver",
    label: "Saver",
    hotelLabel: "3-star / apartment",
    blurb: "Clean 3-star or aparthotel, shared tours, metro and taxis.",
  },
  {
    id: "comfort",
    label: "Comfort",
    hotelLabel: "4-star",
    blurb: "Central 4-star, private transfers, the headline experiences.",
  },
  {
    id: "luxury",
    label: "Luxury",
    hotelLabel: "5-star",
    blurb: "5-star on the beach or Downtown, private guide, fine dining.",
  },
];

/** Per room, per night, double occupancy, before the season adjustment. */
export const hotelPerNight: Record<Tier, Range> = {
  saver: { low: 260, high: 460 },
  comfort: { low: 460, high: 820 },
  luxury: { low: 850, high: 2000 },
};

/** Tourism Dirham, charged per occupied room per night at check-out. */
export const tourismDirhamPerNight: Record<Tier, number> = {
  saver: 10,
  comfort: 15,
  luxury: 20,
};

/** Return airport transfers, per booking rather than per person. */
export const airportTransferReturn: Record<Tier, Range> = {
  saver: { low: 130, high: 220 },
  comfort: { low: 240, high: 400 },
  luxury: { low: 500, high: 900 },
};

/** Food, coffee, water, tips and the odd souvenir. Per person per day. */
export const dailySpend: Record<Tier, Range> = {
  saver: { low: 80, high: 130 },
  comfort: { low: 130, high: 250 },
  luxury: { low: 250, high: 500 },
};

/** Metro, taxis and the getting-about that transfers do not cover. */
export const gettingAroundPerDay: Record<Tier, Range> = {
  saver: { low: 25, high: 55 },
  comfort: { low: 50, high: 110 },
  luxury: { low: 90, high: 200 },
};

export const origins: {
  id: OriginKey;
  label: string;
  /** Return economy fare per adult. Zero when no flight is involved. */
  flight: Range;
  /** Whether a paid visit visa is the usual case from this market. */
  visaUsual: boolean;
}[] = [
  { id: "uae", label: "I'm already in the UAE", flight: { low: 0, high: 0 }, visaUsual: false },
  { id: "gcc", label: "Saudi Arabia or the GCC", flight: { low: 500, high: 1200 }, visaUsual: false },
  { id: "india", label: "India", flight: { low: 800, high: 1800 }, visaUsual: true },
  { id: "pakistan", label: "Pakistan", flight: { low: 900, high: 1900 }, visaUsual: true },
  { id: "uk", label: "United Kingdom", flight: { low: 900, high: 2600 }, visaUsual: false },
  { id: "europe", label: "Europe", flight: { low: 850, high: 2400 }, visaUsual: false },
  { id: "russia", label: "Russia or CIS", flight: { low: 1000, high: 2600 }, visaUsual: false },
  { id: "china", label: "China or Far East", flight: { low: 1500, high: 3500 }, visaUsual: false },
  { id: "africa", label: "Africa", flight: { low: 1200, high: 3000 }, visaUsual: true },
  { id: "americas", label: "USA or Canada", flight: { low: 2600, high: 5200 }, visaUsual: false },
  { id: "other", label: "Somewhere else", flight: { low: 900, high: 3500 }, visaUsual: true },
];

export const originById = (id: OriginKey) => origins.find((o) => o.id === id) ?? origins[0];

/**
 * Visit visa, per person, agency-inclusive. Government fee is AED 200 for 30
 * days and AED 300 for 60 days plus 5% VAT; the rest is insurance, typing and
 * service. Trips of 30 nights or fewer take the short visa.
 */
export const visaPerPerson: { upToNights: number; price: Range }[] = [
  { upToNights: 30, price: { low: 350, high: 550 } },
  { upToNights: 60, price: { low: 580, high: 900 } },
];

/**
 * Per-adult ranges for the experiences on the site. `perBooking` marks the ones
 * priced for the whole boat or car rather than per head.
 */
export const tourPricing: Record<string, { price: Range; perBooking?: boolean }> = {
  "desert-safari": { price: { low: 160, high: 320 } },
  "dhow-cruise-marina": { price: { low: 110, high: 220 } },
  "burj-khalifa-at-the-top": { price: { low: 175, high: 290 } },
  "yacht-charter": { price: { low: 900, high: 2200 }, perBooking: true },
  "old-dubai-souks-abras": { price: { low: 120, high: 250 } },
  "abu-dhabi-grand-mosque": { price: { low: 200, high: 400 } },
};

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Dubai's high season is the cool half of the year. Hotels move most; tours and
 * tickets move a little. Summer is genuinely cheaper, which is worth showing
 * rather than hiding.
 */
export function seasonFor(month: number): {
  label: string;
  note: string;
  hotel: number;
  tours: number;
} {
  if ([10, 11, 0, 1, 2].includes(month)) {
    return {
      label: "Peak season",
      note: "November to March is the cool, busy half of the year — hotels are at their highest and sunset slots sell out early.",
      hotel: 1.25,
      tours: 1.15,
    };
  }
  if ([3, 9].includes(month)) {
    return {
      label: "Shoulder season",
      note: "April and October still have comfortable weather with softer hotel rates than mid-winter.",
      hotel: 1.1,
      tours: 1.05,
    };
  }
  if ([5, 6, 7].includes(month)) {
    return {
      label: "Low season",
      note: "June to August is hot outdoors, but hotels discount heavily and the malls, aquariums and indoor attractions are at their quietest.",
      hotel: 0.8,
      tours: 0.9,
    };
  }
  return {
    label: "Mid season",
    note: "May and September sit between the summer discounts and the winter peak.",
    hotel: 1,
    tours: 1,
  };
}

/** Children pay less, and how much less differs by line. */
export const childFactor = {
  flight: 0.85,
  visa: 1,
  tour: 0.7,
  dailySpend: 0.6,
  gettingAround: 0.5,
};
