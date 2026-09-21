/**
 * Single-day tours run out of Dubai. Prices are indicative market rates checked
 * September 2026 — see the note at the top of types.ts.
 */

import type { Package } from "./types";

export const uaeDayTours: Package[] = [
  {
    slug: "dubai-city-tour",
    title: "Dubai City Tour — half day",
    kind: "day-tour",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    places: ["Dubai"],
    durationDays: 1,
    durationNights: 0,
    durationIso: "PT5H",
    tagline: "Old town, new skyline and the Palm in one air-conditioned morning",
    summary:
      "Five hours that take you from the wind-tower lanes of Al Fahidi and a one-dirham abra across the Creek to the Burj Al Arab, the Palm and the foot of the Burj Khalifa. Hotel pick-up anywhere in Dubai, and the driver stops wherever the photograph is.",
    highlights: [
      "Al Fahidi historic district and the Creek abra crossing",
      "Spice and Gold Souks in Deira",
      "Jumeirah Mosque and the Burj Al Arab photo stop",
      "Palm Jumeirah drive and Atlantis viewpoint",
      "Downtown, the Dubai Frame and the Burj Khalifa base",
    ],
    inclusions: [
      "Hotel pick-up and drop-off across Dubai",
      "Air-conditioned vehicle and English-speaking guide",
      "Abra fare across Dubai Creek",
      "Bottled water",
    ],
    exclusions: [
      "Burj Khalifa observation deck tickets",
      "Meals and personal spending",
      "Tips for the guide and driver",
    ],
    itinerary: [
      { label: "08:30", title: "Pick-up", body: "Collected from your hotel lobby anywhere in Dubai. Pick-ups outside the city are possible on request at a supplement." },
      { label: "09:15", title: "Al Fahidi and the Creek", body: "Walk the restored wind-tower lanes, then cross to Deira by abra — the same wooden boats residents use to commute, at one dirham a head." },
      { label: "10:15", title: "Spice and Gold Souks", body: "Forty minutes on the Deira bank. Your guide will tell you what the making charge should be before you start negotiating." },
      { label: "11:30", title: "Jumeirah and the Burj Al Arab", body: "Along the beach road past Jumeirah Mosque, with the standard Burj Al Arab photo stop from the public side." },
      { label: "12:15", title: "Palm Jumeirah", body: "The length of the trunk to the Atlantis viewpoint, with the monorail running overhead." },
      { label: "13:00", title: "Downtown and drop-off", body: "Past the Dubai Frame and into Downtown for the Burj Khalifa from ground level, then back to your hotel." },
    ],
    tiers: [
      { id: "shared", label: "Shared group", detail: "Seat on a shared coach or minibus, fixed route and timings.", adult: 150, child: 110 },
      { id: "private", label: "Private car", detail: "Your own vehicle and guide, route and timings flexible.", adult: 0, child: null, privateTotal: 550, privateUpTo: 4 },
      { id: "private-suv", label: "Private SUV", detail: "Larger vehicle for families or groups with luggage.", adult: 0, child: null, privateTotal: 800, privateUpTo: 6 },
    ],
    priceBasis: "per adult on a shared seat; private tiers are a total for the vehicle",
    seasonNote: "Shared seats are scarcest from November to March; book three days ahead in peak season.",
    addOns: [
      { label: "Burj Khalifa levels 124/125, off-peak", priceAed: 173, note: "Adult, subject to slot availability" },
      { label: "Burj Khalifa levels 124/125, prime hours", priceAed: 250, note: "Adult, roughly 4–7 pm" },
      { label: "Dubai Frame entry", priceAed: 42 },
    ],
    attractions: ["al-fahidi-historic-district", "palm-jumeirah", "burj-khalifa", "dubai-frame"],
    accent: "sea",
    image: "/images/creek-alseef.jpg",
    alt: "Restored waterfront buildings along Dubai Creek",
    faqs: [
      { q: "Does the city tour include going up the Burj Khalifa?", a: "No — the tour stops at the base. Deck tickets are a separate timed booking and we add them at the gate price rather than marking them up." },
      { q: "Is there a lot of walking?", a: "About forty minutes in total, split between Al Fahidi and the souks. Everything else is a drive with photo stops, so it suits older travellers and pushchairs." },
    ],
    metaTitle: "Dubai City Tour | Half-Day Old & New Dubai with Pick-Up",
    metaDescription:
      "Half-day Dubai city tour: Al Fahidi, the Creek abra, the Gold and Spice Souks, Burj Al Arab, Palm Jumeirah and Downtown. Shared from AED 150, private from AED 550.",
    checked: "2026-09-18",
  },
  {
    slug: "abu-dhabi-day-trip",
    title: "Abu Dhabi Day Trip from Dubai",
    kind: "day-tour",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    places: ["Abu Dhabi"],
    durationDays: 1,
    durationNights: 0,
    durationIso: "PT11H",
    tagline: "The Grand Mosque, the presidential palace and the capital's waterfront",
    summary:
      "A full day down the coast to the capital: the Sheikh Zayed Grand Mosque in the morning light, Qasr Al Watan's state rooms, the Corniche and, if you want it, the Louvre. Ninety minutes each way in an air-conditioned vehicle.",
    highlights: [
      "Sheikh Zayed Grand Mosque — free entry, abayas provided",
      "Qasr Al Watan presidential palace",
      "Abu Dhabi Corniche and the Emirates Palace exterior",
      "Optional Louvre Abu Dhabi on Saadiyat Island",
      "Heritage Village for the old pearling town",
    ],
    inclusions: [
      "Hotel pick-up and drop-off in Dubai",
      "Air-conditioned vehicle and guide",
      "Qasr Al Watan entry",
      "Bottled water",
    ],
    exclusions: [
      "Louvre Abu Dhabi entry (add-on)",
      "Lunch",
      "Ferrari World or Yas Island park tickets",
    ],
    itinerary: [
      { label: "07:30", title: "Leave Dubai", body: "Pick-up from your hotel and south along the E11. The drive is about ninety minutes with one comfort stop." },
      { label: "09:30", title: "Sheikh Zayed Grand Mosque", body: "Two hours including the free guided tour. Abayas and headscarves are lent at the entrance — no need to bring your own." },
      { label: "12:00", title: "Corniche and lunch", body: "Along the waterfront past Emirates Palace, with time for lunch at your own cost." },
      { label: "14:00", title: "Qasr Al Watan", body: "The Great Hall, the Federal Supreme Council chamber and the House of Knowledge wing." },
      { label: "16:00", title: "Louvre Abu Dhabi (optional)", body: "Two hours on Saadiyat Island if you have added it. Note the museum closes on Mondays." },
      { label: "18:30", title: "Return to Dubai", body: "Back on the road north, hotel drop-off between eight and nine." },
    ],
    tiers: [
      { id: "shared", label: "Shared group", detail: "Seat on a shared coach, fixed itinerary.", adult: 250, child: 190 },
      { id: "private", label: "Private car", detail: "Own vehicle and guide; you choose what to skip.", adult: 0, child: null, privateTotal: 950, privateUpTo: 4 },
      { id: "private-suv", label: "Private SUV", detail: "For families or groups up to six.", adult: 0, child: null, privateTotal: 1350, privateUpTo: 6 },
    ],
    priceBasis: "per adult on a shared seat; private tiers are a total for the vehicle",
    seasonNote: "Runs year round. The mosque is busiest on Friday afternoons and during Eid.",
    addOns: [
      { label: "Louvre Abu Dhabi entry", priceAed: 63, note: "Adult; under-18s free. Closed Mondays." },
      { label: "Ferrari World single-park day", priceAed: 345, note: "Replaces the afternoon palace visit" },
      { label: "Lunch at a Corniche restaurant", priceAed: 85 },
    ],
    attractions: ["sheikh-zayed-grand-mosque", "qasr-al-watan", "louvre-abu-dhabi"],
    accent: "gold",
    image: "/images/mosque-day.jpg",
    alt: "White marble arcades and domes of a grand mosque in daylight",
    faqs: [
      { q: "What should I wear for the Grand Mosque?", a: "Loose clothing covering elbows and ankles; women also cover their hair. Abayas and headscarves are lent free at the entrance, so arriving unprepared is not a problem — arriving in tight leggings is, because those are refused even when they cover." },
      { q: "Can we add Ferrari World instead of the palace?", a: "Yes, on the private tiers. It swaps the afternoon and means a later return, usually around ten." },
    ],
    metaTitle: "Abu Dhabi Day Trip from Dubai | Grand Mosque & Qasr Al Watan",
    metaDescription:
      "Full-day Abu Dhabi tour from Dubai: Sheikh Zayed Grand Mosque, Qasr Al Watan, the Corniche and optional Louvre. Shared from AED 250, private from AED 950.",
    checked: "2026-09-18",
  },
  {
    slug: "hatta-day-trip",
    title: "Hatta Mountain Day Trip",
    kind: "day-tour",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    places: ["Hatta"],
    durationDays: 1,
    durationNights: 0,
    durationIso: "PT9H",
    tagline: "Kayaks on turquoise water, ninety minutes from the skyline",
    summary:
      "Out of the city and into the Hajar Mountains for the day: the dam reservoir with its improbable turquoise water, an hour on a kayak, the restored heritage village and lunch in the hills. Cooler than the coast in every month of the year.",
    highlights: [
      "Hatta Dam — kayaking on the reservoir",
      "Hatta Heritage Village and its watchtowers",
      "Mountain viewpoints across the Hajar range",
      "Hatta Honeybee Garden or the hill park, by season",
    ],
    inclusions: [
      "Hotel pick-up and drop-off in Dubai",
      "Air-conditioned vehicle and guide",
      "One hour of kayak hire at the dam",
      "Bottled water and a light snack",
    ],
    exclusions: ["Lunch", "Mountain bike hire", "Tips"],
    itinerary: [
      { label: "08:00", title: "Leave Dubai", body: "Pick-up and out on the E44 through the desert, with the mountains appearing about an hour in." },
      { label: "09:45", title: "Hatta Dam", body: "An hour on the water by kayak or pedalo. No swimming — it is a drinking-water reservoir and the rule is enforced." },
      { label: "11:30", title: "Heritage Village", body: "The reconstructed fortified settlement, its watchtowers and the small museum. Free to enter." },
      { label: "13:00", title: "Lunch and viewpoints", body: "Lunch in Hatta at your own cost, then the mountain viewpoints above the town." },
      { label: "15:30", title: "Return", body: "Back to Dubai for a drop-off around five." },
    ],
    tiers: [
      { id: "shared", label: "Shared group", detail: "Seat on a shared minibus with a fixed itinerary.", adult: 300, child: 220 },
      { id: "private", label: "Private car", detail: "Own vehicle and guide, flexible timings.", adult: 0, child: null, privateTotal: 1100, privateUpTo: 4 },
    ],
    priceBasis: "per adult on a shared seat; private tier is a total for the vehicle",
    seasonNote: "Best October to April. Kayaking runs year round but midday in summer is genuinely unpleasant.",
    addOns: [
      { label: "Mountain bike hire, half day", priceAed: 120 },
      { label: "Lunch at a Hatta restaurant", priceAed: 75 },
    ],
    attractions: ["hatta"],
    accent: "palm",
    image: "/images/hatta-oasis.jpg",
    alt: "Turquoise reservoir water below bare mountain rock at Hatta",
    faqs: [
      { q: "Can children kayak at Hatta Dam?", a: "Yes, in a double kayak with an adult, and buoyancy aids are compulsory for everyone. Pedalos suit younger children better." },
      { q: "Do we need passports for Hatta?", a: "The route we use stays inside the UAE, but carry them anyway — some approaches clip Omani territory and it costs nothing to have them in the vehicle." },
    ],
    metaTitle: "Hatta Day Trip from Dubai | Dam Kayaking & Heritage Village",
    metaDescription:
      "Hatta day tour from Dubai: kayaking on the turquoise dam, the free heritage village and mountain viewpoints. Shared from AED 300, private from AED 1,100.",
    checked: "2026-09-18",
  },
];
