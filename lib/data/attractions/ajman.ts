/**
 * Ajman — the smallest emirate, 260 km², and the easiest half-day nobody plans.
 * Checked September 2026.
 */

import type { Attraction } from "./types";

export const ajmanAttractions: Attraction[] = [
  {
    slug: "ajman-corniche",
    name: "Ajman Corniche & Beach",
    emirate: "ajman",
    area: "Ajman Corniche",
    categories: ["beaches", "family", "dining"],
    tagline: "A free white-sand beach with none of the crowd",
    summary:
      "Three kilometres of free public beach and landscaped promenade along the Ajman waterfront — clean white sand, calm shallow water, playgrounds, showers, shaded seating and a café strip behind. Forty-five minutes from Dubai and a fraction as busy.",
    sections: [
      {
        heading: "Why people drive up for it",
        paragraphs: [
          "Ajman's beach is the one residents recommend when they are tired of queuing for a parking space in Jumeirah. The sand is genuinely white, the water shelves gently, and outside a Friday afternoon you can have a large stretch of it more or less to yourself.",
          "The promenade behind has been rebuilt with play areas, outdoor gym equipment, a jogging track and shaded majlis seating. Cafés and shisha terraces line the road; several of the hotel beach clubs along the same stretch sell day passes if you want a pool as well.",
        ],
      },
      {
        heading: "Rules and timing",
        paragraphs: [
          "Ajman licenses alcohol in hotels but the public beach follows the same modesty expectations as Sharjah next door — swimwear on the sand, covered up off it. Evenings are the best time; the sunset here faces straight out to sea.",
        ],
      },
    ],
    highlights: [
      "3 km of free public beach with white sand",
      "Playgrounds, showers, jogging track and shaded seating",
      "Far quieter than any Dubai beach",
      "Café and shisha strip directly behind",
    ],
    gate: { kind: "free", note: "Beach and promenade are free. Hotel beach-club day passes are the paid alternative." },
    hours: "Open at all hours; lifeguards during daylight",
    bestTime: "Late afternoon into sunset, October to April",
    timeNeeded: "Half a day",
    gettingThere:
      "Ajman Corniche, about 45 minutes from Dubai Deira via Sharjah. Free parking along the road; no metro.",
    nearby: ["ajman-museum", "ajman-fish-market", "al-zorah-nature-reserve"],
    accent: "sea",
    motif: "wave",
    image: "/images/lamer-beach.jpg",
    alt: "Clear shallow water lapping a quiet stretch of pale sand",
    geo: { lat: 25.4110, lng: 55.4380 },
    faqs: [
      {
        q: "Is Ajman beach free?",
        a: "Yes — three kilometres of it, with free parking, showers and lifeguards. Only the hotel beach clubs along the same stretch charge.",
      },
      {
        q: "Is Ajman beach better than Dubai's?",
        a: "Cleaner sand and far fewer people, which for most of the year matters more than facilities. Dubai's beaches have more behind them; Ajman's have space.",
      },
    ],
    metaTitle: "Ajman Corniche & Beach | Free White Sand, 45 Min From Dubai",
    metaDescription:
      "Ajman Corniche: three kilometres of free public beach with white sand, showers, playgrounds and a café strip, far quieter than Dubai.",
    checked: "2026-09-18",
    keywords: ["ajman corniche", "best beach in sharjah", "al mamzar beach"],
  },
  {
    slug: "ajman-fish-market",
    name: "Ajman Fish Market",
    emirate: "ajman",
    area: "Ajman Creek",
    categories: ["souks", "dining"],
    tagline: "Boats unload at the door, and a grill shop is twenty paces away",
    summary:
      "One of the most authentic fish markets in the UAE, on the creek where the dhows still tie up. The catch comes off the boats and straight onto the ice, prices are per kilo and negotiable, and the cook shops behind will clean and grill whatever you buy.",
    sections: [
      {
        heading: "The market",
        paragraphs: [
          "Ajman's creek is a working fishing harbour and the market sits at its head, so the gap between the boat and the ice is measured in metres. It is smaller and scruffier than Mina Zayed or Sharjah and considerably more atmospheric for it. Early morning is when the trading happens.",
          "As elsewhere, the sequence is buy, clean, cook. Cleaning costs a few dirhams; the grill shops charge by the kilo and will do it with rice, salad and bread for a fraction of a restaurant price.",
        ],
      },
      {
        heading: "The dhow yard",
        paragraphs: [
          "A few minutes along the creek is one of the last working dhow-building yards in the country, where wooden hulls are still shaped by hand without plans. Nobody charges to look and the builders are generally happy for visitors to watch from a respectful distance.",
        ],
      },
    ],
    highlights: [
      "Boats unload directly at the market",
      "Cleaning and grilling available on site",
      "Working dhow-building yard a few minutes along the creek",
      "Free to enter; prices negotiable",
    ],
    gate: { kind: "free", note: "Free to enter. Cleaning and cooking cost a few dirhams per kilo." },
    hours: "Daily from around 05:00; freshest before 09:00",
    bestTime: "Early morning",
    timeNeeded: "1–2 hours with the dhow yard",
    gettingThere:
      "Ajman Creek, about 50 minutes from Dubai Deira. Free parking.",
    nearby: ["ajman-museum", "ajman-corniche", "sharjah-fish-market"],
    accent: "gold",
    motif: "wave",
    image: "/images/spice-souk.jpg",
    alt: "Goods laid out on display in a traditional market",
    geo: { lat: 25.4050, lng: 55.4470 },
    faqs: [
      {
        q: "What time is Ajman fish market busiest?",
        a: "Between five and eight in the morning, when the boats land. By afternoon the selection has thinned and the prices have not.",
      },
    ],
    metaTitle: "Ajman Fish Market | Times, Prices & the Dhow Yard Next Door",
    metaDescription:
      "Ajman fish market on the creek: boats unloading at the door, cook shops that will grill your catch, and the working dhow yard a few minutes away.",
    checked: "2026-09-18",
    keywords: ["ajman fish market", "ajman museum", "sharjah fish market"],
  },
  {
    slug: "al-zorah-nature-reserve",
    name: "Al Zorah Nature Reserve",
    emirate: "ajman",
    area: "Al Zorah, north Ajman",
    categories: ["nature", "adventure", "family"],
    tagline: "Mangrove channels, flamingos, and a kayak in two metres of water",
    summary:
      "A protected tidal lagoon and mangrove system on the northern edge of Ajman holding around sixty bird species, including a resident flamingo population. Kayaks and paddleboards launch from the boardwalk and the channels are shallow, sheltered and easy enough for a complete beginner.",
    sections: [
      {
        heading: "Paddling it",
        paragraphs: [
          "The mangrove channels are the reason to come. The water is calm, waist-deep in most places and threads between the mangrove roots where herons, egrets and kingfishers sit at arm's length. Guided kayak and paddleboard tours run from the marina; independent hire is also available.",
          "Flamingos are present year round in varying numbers and are easiest to see at low tide from the boardwalk, which is free to walk and needs no booking.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "It is a protected reserve. Landing on the mangrove banks, taking anything out and approaching nesting birds are all prohibited, and the mangroves themselves are fragile — a paddle pushed into the roots does real damage. Stay in the channels.",
        ],
      },
    ],
    highlights: [
      "Around 60 bird species including resident flamingos",
      "Sheltered mangrove channels suitable for beginners",
      "Free boardwalk with no booking needed",
      "Guided kayak and paddleboard tours from the marina",
    ],
    gate: {
      kind: "free",
      note: "The boardwalk and birdwatching are free. Kayak and paddleboard hire is typically AED 100–160 an hour.",
    },
    hours: "Daylight hours; tours usually morning and late afternoon",
    bestTime: "October to April, early morning at low tide",
    timeNeeded: "2–3 hours",
    gettingThere:
      "Al Zorah, northern Ajman, about 50 minutes from Dubai Deira. Own vehicle; free parking at the marina.",
    nearby: ["ajman-corniche", "ajman-museum", "umm-al-quwain-mangroves"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 25.4400, lng: 55.5010 },
    faqs: [
      {
        q: "Do you need experience to kayak at Al Zorah?",
        a: "No. The channels are sheltered and shallow, and the guided tours are built around first-timers. Children can go in a double with an adult.",
      },
      {
        q: "Are there flamingos at Al Zorah?",
        a: "Yes, year round in varying numbers, and they are easiest to spot at low tide from the free boardwalk without going on the water at all.",
      },
    ],
    metaTitle: "Al Zorah Ajman | Mangrove Kayaking & Flamingos",
    metaDescription:
      "Al Zorah: mangrove kayaking, around 60 bird species and resident flamingos in Ajman. Free boardwalk, guided tours and what the reserve rules are.",
    checked: "2026-09-18",
    keywords: ["ajman museum", "hidden gems in abu dhabi", "places in fujairah"],
  },
];
