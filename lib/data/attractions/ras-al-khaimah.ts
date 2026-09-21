/**
 * Ras Al Khaimah beyond Jebel Jais — the ghost town, the hill fort, the water
 * park and the resort island. Checked September 2026.
 */

import type { Attraction } from "./types";

export const rasAlKhaimahAttractions: Attraction[] = [
  {
    slug: "al-jazirah-al-hamra",
    name: "Al Jazirah Al Hamra",
    emirate: "ras-al-khaimah",
    area: "Al Jazirah Al Hamra, south Ras Al Khaimah",
    categories: ["culture", "adventure"],
    tagline: "The UAE's abandoned pearling town — and the ghost stories attached",
    summary:
      "A complete coral-block town abandoned in 1968 and left standing: houses, a mosque, a fort, a souk and the wind towers, all built from beach rock and gypsum. It is the last intact pre-oil village in the country, it is free to walk through, and it has a reputation for being haunted that does it no harm at all.",
    sections: [
      {
        heading: "What is actually there",
        paragraphs: [
          "Al Jazirah Al Hamra was a pearling and fishing settlement of several thousand people that emptied almost overnight in 1968 following a tribal dispute. Because nothing was built over it, the whole town survives — hundreds of coral-stone houses, courtyards, a congregational mosque, a fort and a market square, with wind towers still standing on the larger houses.",
          "Restoration work has stabilised parts of it and some buildings are now fenced off. The rest can be walked freely, and it is the single best place in the UAE to understand what a Gulf settlement looked like before oil.",
        ],
      },
      {
        heading: "The ghost town reputation",
        paragraphs: [
          "It is widely described as haunted, features in local legend and is the subject of a steady stream of overnight dares. That is folklore, not history, and the practical hazards are ordinary ones: unlit ruins, unstable masonry, loose stone underfoot and no lighting after dark. Visit in daylight, watch where you step, and do not climb on the walls.",
          "It is used as a film location and as an arts venue during the RAK Fine Arts Festival, when parts of it are lit and open in the evening.",
        ],
      },
    ],
    highlights: [
      "A complete pre-oil town, abandoned in 1968 and left standing",
      "Coral-block houses, wind towers, mosque, fort and souk",
      "Free to walk through in daylight",
      "The UAE's best-known 'ghost town'",
    ],
    gate: { kind: "free", note: "Free. Some restored buildings are fenced; the rest is open. No lighting after dark." },
    hours: "Daylight hours. There is no gate, but visiting after dark is unwise and sometimes restricted.",
    bestTime: "Winter mornings, or late afternoon for the light on the stone",
    timeNeeded: "1.5 hours",
    gettingThere:
      "Just off the E11 in southern Ras Al Khaimah, about an hour from Dubai. Own vehicle; park at the edge and walk in.",
    nearby: ["dhayah-fort", "al-marjan-island", "jebel-jais"],
    accent: "sun",
    motif: "arch",
    geo: { lat: 25.7100, lng: 55.7900 },
    faqs: [
      {
        q: "Is Al Jazirah Al Hamra really haunted?",
        a: "It has a long-standing local reputation and a great deal of folklore, and no evidence beyond that. The real risks are unstable masonry and unlit ruins, which is why daylight visits are the sensible ones.",
      },
      {
        q: "Can you visit the RAK ghost town?",
        a: "Yes, freely and at no cost during daylight. Parts have been restored and fenced; the rest of the town can be walked. Do not climb the walls — the coral block is fragile and several structures are unstable.",
      },
    ],
    metaTitle: "Al Jazirah Al Hamra | RAK Ghost Town, Free Entry & Safety",
    metaDescription:
      "The UAE's abandoned pearling town in Ras Al Khaimah: coral-block houses, wind towers and a fort, free to walk, plus the truth about the ghost stories.",
    checked: "2026-09-18",
    keywords: ["ras al khaimah ghost town", "ghost town in ras al khaimah", "haunted places in ras al khaimah", "places to visit in ras al khaimah", "ras al khaimah tourist places"],
  },
  {
    slug: "dhayah-fort",
    name: "Dhayah Fort",
    emirate: "ras-al-khaimah",
    area: "Dhayah, north Ras Al Khaimah",
    categories: ["culture", "adventure", "landmarks"],
    tagline: "A hilltop fort above a palm oasis, and the last stand of 1819",
    summary:
      "The only remaining hilltop fort in the UAE, reached by a stepped climb of a few hundred steps, looking out over a date-palm oasis on one side and the Gulf on the other. It was the site of the final resistance to the British expedition of 1819 and is one of the best short walks in the country.",
    sections: [
      {
        heading: "The climb and the view",
        paragraphs: [
          "The fort sits on a conical hill above the Dhayah plain. A stepped path zigzags up the side — around fifteen minutes at a steady pace, steep in places but handrailed — and the reward is a 360-degree view across the palm groves to the Hajar mountains inland and the Gulf to the west. Sunset from the walls is the reason most people go.",
          "The fort itself is compact: a walled enclosure with a single tower, restored in the 1990s. There is little inside, and that is not the point.",
        ],
      },
      {
        heading: "1819",
        paragraphs: [
          "When a British expedition moved against the Qawasim ports in 1819, Dhayah was where the defenders withdrew to and held out for several days before surrendering. The fort was partly demolished afterwards. It is a small site with a genuinely consequential history attached to it.",
        ],
      },
    ],
    highlights: [
      "The UAE's only surviving hilltop fort",
      "Stepped climb of about 15 minutes, handrailed",
      "360-degree views over palm groves, mountains and the Gulf",
      "Site of the final resistance to the 1819 expedition",
    ],
    gate: { kind: "ticket", adultFrom: 5, note: "Nominal entry, sometimes uncollected. Bring water — there is no shade on the climb." },
    hours: "Daily, roughly 09:00–18:00",
    bestTime: "Late afternoon for the light and the temperature, October to April",
    timeNeeded: "1 hour including the climb",
    gettingThere:
      "Dhayah, about 20 minutes north of Ras Al Khaimah city and 90 minutes from Dubai. Own vehicle; parking at the base.",
    nearby: ["al-jazirah-al-hamra", "jebel-jais", "al-marjan-island"],
    accent: "sun",
    motif: "mountain",
    geo: { lat: 25.8790, lng: 56.0290 },
    faqs: [
      {
        q: "How hard is the climb to Dhayah Fort?",
        a: "About fifteen minutes up a stepped, handrailed path. Steep in places but manageable for most people in reasonable shoes. There is no shade, so avoid the middle of the day.",
      },
    ],
    metaTitle: "Dhayah Fort Ras Al Khaimah | Hilltop Climb, Views & History",
    metaDescription:
      "Dhayah Fort: the UAE's only hilltop fort, a 15-minute stepped climb above a palm oasis, with the story of the 1819 siege and the best sunset in RAK.",
    checked: "2026-09-18",
    keywords: ["places to visit in ras al khaimah", "best attractions in ras al khaimah", "ras al khaimah best place to visit", "nice place to visit in ras al khaimah", "10 things to do in ras al khaimah"],
  },
  {
    slug: "iceland-water-park",
    name: "Iceland Water Park",
    emirate: "ras-al-khaimah",
    area: "Al Jazeera Al Hamra, Ras Al Khaimah",
    categories: ["waterparks", "family", "kids"],
    tagline: "Penguin-themed slides at about half the Dubai price",
    summary:
      "A large, deliberately kitsch water park on the RAK coast, wrapped in an ice-and-penguin theme complete with an artificial waterfall mountain. Around thirty slides, a wave pool, a lazy river and a big children's area, at a gate price well below the Dubai parks.",
    sections: [
      {
        heading: "Worth the drive?",
        paragraphs: [
          "If you are comparing on ride engineering, Aquaventure wins. If you are comparing on cost per family and queue length, Iceland wins comfortably — it is roughly half the price and on a weekday you walk onto most slides. The theming is unashamedly odd and children love it.",
          "The park is older than the Dubai ones and shows it in places. Facilities are adequate rather than polished.",
        ],
      },
    ],
    highlights: [
      "Around 30 slides plus a wave pool and lazy river",
      "Roughly half the price of the Dubai water parks",
      "Very short queues on weekdays",
      "Large dedicated toddler and children's zone",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 150,
      childFrom: 120,
      note: "Gate price varies by day and season; weekdays are cheapest. Under-3s free.",
    },
    hours: "Daily, roughly 10:00–18:00; shorter in winter",
    bestTime: "October to May, on a weekday",
    timeNeeded: "A full day",
    gettingThere:
      "Al Jazeera Al Hamra on the RAK coast road, about an hour from Dubai. Own vehicle; free parking.",
    nearby: ["al-jazirah-al-hamra", "al-marjan-island", "dhayah-fort"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.6800, lng: 55.7760 },
    faqs: [
      {
        q: "Is Iceland Water Park worth it?",
        a: "For families on a budget, yes. It is about half the price of the Dubai parks, the queues on a weekday are negligible, and there is plenty for small children. It is older and less polished, which is the trade.",
      },
    ],
    metaTitle: "Iceland Water Park RAK | Tickets, Slides & Is It Worth It",
    metaDescription:
      "Iceland Water Park in Ras Al Khaimah: around 30 slides, a wave pool and short queues at roughly half the price of the Dubai water parks.",
    checked: "2026-09-18",
    keywords: ["iceland water park ras al khaimah", "things to do in ras al khaimah", "new attraction in ras al khaimah", "dubai water park"],
  },
  {
    slug: "al-marjan-island",
    name: "Al Marjan Island",
    emirate: "ras-al-khaimah",
    area: "Al Marjan, Ras Al Khaimah coast",
    categories: ["beaches", "nightlife", "dining"],
    tagline: "Four reclaimed islands, public beach, and the emirate's resort strip",
    summary:
      "A set of four man-made coral-shaped islands reaching into the Gulf, holding the emirate's main resort cluster along with public beach access, a promenade and a growing restaurant and bar strip. It is where Ras Al Khaimah's New Year fireworks — repeated record-breakers — are launched from.",
    sections: [
      {
        heading: "Using it without staying there",
        paragraphs: [
          "Stretches of the beach are public and free, and the promenade runs the length of the main island. Several resorts sell day passes that include a pool, a beach lounger and a food-and-drink credit, typically from around AED 150 a head midweek — generally better value than the Dubai equivalents.",
          "RAK licenses alcohol in hotels, so the bars and beach clubs here are the nightlife of the northern emirates. It is a quieter, more resort-shaped scene than Dubai's.",
        ],
      },
      {
        heading: "New Year",
        paragraphs: [
          "Al Marjan hosts the emirate's New Year's Eve display, which has repeatedly set world records for the largest firework show. It is free to watch from the public beaches and the whole coast road fills; hotels sell out months ahead.",
        ],
      },
    ],
    highlights: [
      "Free public beach access and a full-length promenade",
      "Resort day passes from around AED 150 including a credit",
      "Licensed bars and beach clubs — the northern emirates' nightlife",
      "Record-setting New Year firework display, free to watch",
    ],
    gate: {
      kind: "free",
      note: "Public beach and promenade are free. Resort day passes start around AED 150 and usually include a food-and-drink credit.",
    },
    hours: "Open at all hours; resort facilities keep their own times",
    bestTime: "October to April",
    timeNeeded: "A day",
    gettingThere:
      "Off the RAK coast road, about an hour from Dubai. Own vehicle or taxi; free public parking.",
    nearby: ["iceland-water-park", "al-jazirah-al-hamra", "dhayah-fort"],
    accent: "sea",
    motif: "wave",
    image: "/images/marina-pier.jpg",
    alt: "A waterfront promenade and jetty beside calm water",
    geo: { lat: 25.6860, lng: 55.7420 },
    faqs: [
      {
        q: "Can you drink alcohol in Ras Al Khaimah?",
        a: "Yes, in licensed hotel and resort venues, as in Dubai. Sharjah is the emirate that is entirely dry.",
      },
      {
        q: "Is Al Marjan Island beach public?",
        a: "Parts of it are free and public, with a promenade running the length of the main island. The resort beaches are private but most sell day passes.",
      },
    ],
    metaTitle: "Al Marjan Island RAK | Public Beach, Day Passes & Nightlife",
    metaDescription:
      "Al Marjan Island in Ras Al Khaimah: free public beach, resort day passes from around AED 150, licensed bars and the record-breaking New Year fireworks.",
    checked: "2026-09-18",
    keywords: ["things to do in ras al khaimah", "places to eat in rak", "best place to eat in ras al khaimah", "ras al khaimah best place to visit"],
  },
];
