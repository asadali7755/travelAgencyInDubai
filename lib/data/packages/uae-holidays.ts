/**
 * Multi-day UAE holidays — hotel, transfers and tours as one price.
 * Indicative market rates checked September 2026; see types.ts.
 */

import type { Package } from "./types";

export const uaeHolidays: Package[] = [
  {
    slug: "dubai-essentials-3-day",
    title: "Dubai Essentials — 3 days, 2 nights",
    kind: "uae-holiday",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    places: ["Dubai"],
    durationDays: 3,
    durationNights: 2,
    durationIso: "P3D",
    tagline: "The short break that covers the desert, the old town and the skyline",
    summary:
      "Two nights in a central hotel with airport transfers, a half-day city tour, an evening desert safari and a Marina dhow cruise. It is the shortest trip that leaves nobody feeling they missed the point of Dubai.",
    highlights: [
      "Two nights central, room and breakfast",
      "Return airport transfers",
      "Half-day city tour including the Creek abra",
      "Evening desert safari with BBQ dinner and shows",
      "Marina dhow dinner cruise",
    ],
    inclusions: [
      "2 nights' accommodation, twin sharing, with breakfast",
      "Return airport transfers in a private vehicle",
      "Half-day Dubai city tour",
      "Evening desert safari with dinner and hotel transfers",
      "Dhow dinner cruise in Dubai Marina",
      "All applicable tourism fees on the tours",
    ],
    exclusions: [
      "International flights",
      "UAE visit visa",
      "Tourism Dirham, payable at the hotel on check-out",
      "Lunches and personal spending",
      "Attraction tickets not listed above",
    ],
    itinerary: [
      { label: "Day 1", title: "Arrival and the Marina", body: "Met at the airport and transferred to your hotel. The evening is the Marina dhow cruise — two hours on the water with a buffet and the towers lit on both banks." },
      { label: "Day 2", title: "Old Dubai, then the dunes", body: "The city tour in the morning: Al Fahidi, the abra, the souks, Jumeirah and Downtown. Back to the hotel for a few hours, then collected at three for the desert safari — dune bashing, camels, sandboarding, BBQ and the tanoura show, back by nine." },
      { label: "Day 3", title: "Free morning and departure", body: "Breakfast, a free morning for Dubai Mall or the beach, then the airport transfer. Late check-out is available at a supplement if your flight is an evening one." },
    ],
    tiers: [
      { id: "three-star", label: "3-star / aparthotel", detail: "Clean central 3-star or serviced apartment, breakfast included.", adult: 600, child: 420 },
      { id: "four-star", label: "4-star", detail: "Central 4-star, usually Bur Dubai, Deira or Barsha Heights.", adult: 850, child: 600 },
      { id: "five-star", label: "5-star", detail: "Downtown, Marina or beachfront 5-star.", adult: 1450, child: 990 },
    ],
    priceBasis: "per adult, twin sharing, land only",
    seasonNote:
      "These are low-to-shoulder season rates. Hotel cost roughly doubles between late December and February, and during major exhibitions.",
    addOns: [
      { label: "Burj Khalifa levels 124/125, off-peak", priceAed: 173 },
      { label: "Museum of the Future", priceAed: 149 },
      { label: "Single-occupancy supplement, 3-star", priceAed: 380, note: "Per stay, not per night" },
    ],
    attractions: ["al-fahidi-historic-district", "dubai-marina-jbr", "burj-khalifa", "dubai-fountain"],
    accent: "sea",
    image: "/images/dunes-sunset.jpg",
    alt: "Low sun over the ridge of a red sand dune outside Dubai",
    faqs: [
      { q: "Are flights included?", a: "No. These are land-only prices so that travellers already in the Gulf are not paying for a flight they do not need. We book flights alongside on request." },
      { q: "What is the Tourism Dirham?", a: "A per-room, per-night municipality charge of roughly AED 10–20 depending on hotel category. Every hotel in Dubai collects it at check-out and no package can include it." },
    ],
    metaTitle: "Dubai 3-Day Package | Hotel, Safari, Cruise & City Tour",
    metaDescription:
      "Three-day Dubai package with two nights' hotel, airport transfers, city tour, desert safari and dhow cruise. From AED 600 per person, twin sharing.",
    checked: "2026-09-18",
  },
  {
    slug: "dubai-explorer-5-day",
    title: "Dubai Explorer — 5 days, 4 nights",
    kind: "uae-holiday",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    places: ["Dubai", "Abu Dhabi"],
    durationDays: 5,
    durationNights: 4,
    durationIso: "P5D",
    tagline: "Dubai properly, plus a full day in the capital",
    summary:
      "Four nights with transfers, the city tour, the desert safari, a dhow cruise, Burj Khalifa tickets and a full day in Abu Dhabi for the Grand Mosque and Qasr Al Watan. The version of the trip where nothing is rushed.",
    highlights: [
      "Four nights central, room and breakfast",
      "Burj Khalifa levels 124/125 included",
      "Full-day Abu Dhabi with the Grand Mosque and Qasr Al Watan",
      "Evening desert safari and a Marina dhow cruise",
      "A completely free day to use as you like",
    ],
    inclusions: [
      "4 nights' accommodation, twin sharing, with breakfast",
      "Return airport transfers in a private vehicle",
      "Half-day Dubai city tour",
      "Burj Khalifa levels 124/125, off-peak slot",
      "Evening desert safari with dinner",
      "Marina dhow dinner cruise",
      "Full-day Abu Dhabi tour including Qasr Al Watan entry",
    ],
    exclusions: [
      "International flights",
      "UAE visit visa",
      "Tourism Dirham, payable at the hotel",
      "Louvre Abu Dhabi entry",
      "Lunches and personal spending",
    ],
    itinerary: [
      { label: "Day 1", title: "Arrival", body: "Airport transfer and check-in. Nothing scheduled — most long-haul arrivals want the evening back." },
      { label: "Day 2", title: "Old and new Dubai", body: "Half-day city tour in the morning, then an off-peak Burj Khalifa slot in the afternoon and the fountain shows from the promenade afterwards, which cost nothing." },
      { label: "Day 3", title: "Desert", body: "A free morning, then collected at three for the evening safari: dune bashing on the Lahbab red dunes, camel rides, sandboarding, BBQ dinner and the camp shows." },
      { label: "Day 4", title: "Abu Dhabi", body: "Early start south for the Grand Mosque, the Corniche and Qasr Al Watan, back to Dubai in the evening." },
      { label: "Day 5", title: "Free morning and departure", body: "Breakfast, a free morning, then the airport transfer." },
    ],
    tiers: [
      { id: "three-star", label: "3-star / aparthotel", detail: "Clean central 3-star or serviced apartment.", adult: 1200, child: 850 },
      { id: "four-star", label: "4-star", detail: "Central 4-star with a pool.", adult: 1650, child: 1150 },
      { id: "five-star", label: "5-star", detail: "Downtown, Marina or beachfront 5-star.", adult: 2750, child: 1900 },
    ],
    priceBasis: "per adult, twin sharing, land only",
    seasonNote:
      "Shoulder-season pricing. December to February runs materially higher on the hotel component; June to August runs lower.",
    addOns: [
      { label: "Louvre Abu Dhabi entry", priceAed: 63 },
      { label: "Museum of the Future", priceAed: 149 },
      { label: "Atlantis Aquaventure day pass", priceAed: 299 },
      { label: "Single-occupancy supplement, 4-star", priceAed: 1100, note: "Per stay" },
    ],
    attractions: ["burj-khalifa", "sheikh-zayed-grand-mosque", "qasr-al-watan", "al-fahidi-historic-district", "dubai-fountain"],
    accent: "gold",
    image: "/images/dunes-skyline.jpg",
    alt: "Dunes in the foreground with the Dubai skyline on the horizon",
    faqs: [
      { q: "Is five days enough for Dubai and Abu Dhabi?", a: "For the headline sights, comfortably. It is not enough to add the east coast or Ras Al Khaimah as well — that wants a week." },
      { q: "Why an off-peak Burj Khalifa slot?", a: "Prime hours cost about AED 80 more per adult. On a package that difference is better spent elsewhere, and the morning air is often clearer than the evening haze." },
    ],
    metaTitle: "Dubai 5-Day Package | Burj Khalifa, Safari & Abu Dhabi",
    metaDescription:
      "Five-day Dubai and Abu Dhabi package: four nights' hotel, transfers, city tour, Burj Khalifa, desert safari, dhow cruise and a full capital day. From AED 1,200.",
    checked: "2026-09-18",
  },
  {
    slug: "uae-family-theme-parks-4-day",
    title: "UAE Theme Parks Family Break — 4 days, 3 nights",
    kind: "uae-holiday",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    places: ["Dubai", "Abu Dhabi"],
    durationDays: 4,
    durationNights: 3,
    durationIso: "P4D",
    tagline: "Two Yas Island parks, Aquaventure, and everything indoors when it matters",
    summary:
      "Built for families travelling in the hot months: a two-park Yas Island pass, an Aquaventure day on Palm Jumeirah, three nights with breakfast and every transfer arranged. Almost all of it is air-conditioned.",
    highlights: [
      "Two-park Yas Island pass — Ferrari World plus one more",
      "Atlantis Aquaventure day pass including the Lost Chambers Aquarium",
      "All park transfers included",
      "Three nights with breakfast, family rooms available",
      "Works in summer: the Yas parks are entirely indoors",
    ],
    inclusions: [
      "3 nights' accommodation with breakfast, family room or twin plus extra bed",
      "Return airport transfers",
      "Two-park Yas Island pass, valid across the stay",
      "Atlantis Aquaventure day pass",
      "Return transfers to Yas Island and to Atlantis",
    ],
    exclusions: [
      "International flights and UAE visa",
      "Tourism Dirham, payable at the hotel",
      "Meals inside the parks",
      "Locker and towel hire at Aquaventure",
    ],
    itinerary: [
      { label: "Day 1", title: "Arrival and settle", body: "Airport transfer and check-in, with the rest of the day free. Most families need it." },
      { label: "Day 2", title: "Yas Island", body: "Transfer to Abu Dhabi for Ferrari World and a second Yas park on the same pass. Both are indoors, so the month makes no difference." },
      { label: "Day 3", title: "Aquaventure", body: "Transfer to Atlantis on Palm Jumeirah for the waterpark, the private beach and the Lost Chambers Aquarium, all on the one pass." },
      { label: "Day 4", title: "Departure", body: "Breakfast, a free morning, airport transfer." },
    ],
    tiers: [
      { id: "four-star", label: "4-star family room", detail: "Central 4-star with a pool, family room or twin plus extra bed.", adult: 1850, child: 1250 },
      { id: "five-star", label: "5-star", detail: "Beachfront or Downtown 5-star with a children's club.", adult: 2950, child: 1950 },
    ],
    priceBasis: "per adult, two adults sharing; child price is for a child sharing the same room",
    seasonNote:
      "The one UAE package that is better value in summer — hotels are at their cheapest in July and August and every park in it is indoors or in water.",
    addOns: [
      { label: "Upgrade to a three-park Yas pass", priceAed: 100, note: "Per person, on top of the two-park pass" },
      { label: "Upgrade to a four-park Yas pass", priceAed: 200, note: "Per person" },
      { label: "Dubai city tour, half day", priceAed: 150 },
    ],
    attractions: ["ferrari-world-abu-dhabi", "atlantis-aquaventure", "palm-jumeirah"],
    accent: "coral",
    image: "/images/palm-aerial.jpg",
    alt: "Palm Jumeirah from the air with the Atlantis resort at the crescent",
    faqs: [
      { q: "Which second Yas park should we pick?", a: "Warner Bros. World for under-tens, Yas Waterworld for over-tens in the summer, SeaWorld if the children are into marine life. All three are on the same pass, so you choose on the day." },
      { q: "Is this really a summer trip?", a: "Yes, and that is unusual for the UAE. Ferrari World and Warner Bros. World are fully indoors, Aquaventure is a waterpark, and hotel rates in July are a fraction of January's." },
    ],
    metaTitle: "UAE Family Theme Park Package | Yas Island & Aquaventure",
    metaDescription:
      "Four-day UAE family break with a two-park Yas Island pass, Atlantis Aquaventure, three nights' hotel and all transfers. From AED 1,850 per adult.",
    checked: "2026-09-18",
  },
];
