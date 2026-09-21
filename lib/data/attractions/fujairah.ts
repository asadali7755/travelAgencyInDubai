/**
 * Fujairah — the only emirate entirely on the Gulf of Oman, and the one with
 * mountains behind every beach. Checked September 2026.
 */

import type { Attraction } from "./types";

export const fujairahAttractions: Attraction[] = [
  {
    slug: "fujairah-fort",
    name: "Fujairah Fort",
    emirate: "fujairah",
    area: "Al Madhab, Fujairah city",
    categories: ["culture", "landmarks"],
    tagline: "The oldest fort in the country, above a restored heritage village",
    summary:
      "Built around 1670 on a rocky outcrop above the date gardens, Fujairah Fort is the oldest and largest fort in the UAE. Restored over two decades after being shelled in 1925, it stands over a reconstructed heritage village of traditional houses, a souk and a mosque.",
    sections: [
      {
        heading: "The fort",
        paragraphs: [
          "Three round towers and one square one, built of stone, mud brick and gypsum on a natural rock platform that puts it a good ten metres above the surrounding plain. It served as both a defensive position and the ruling family's residence, and its condition today is the result of a restoration that ran from the late 1990s into the 2010s.",
          "The climb into it is short and the views over the palm gardens and across to the Hajar mountains are the best in the city.",
        ],
      },
      {
        heading: "The village below",
        paragraphs: [
          "At the foot of the outcrop, Fujairah Heritage Village reconstructs pre-oil coastal and mountain life: barasti and stone houses, a falaj channel, an irrigation well with its bull-driven pump, fishing and farming tools, and a small souk. It is a separate site on the same ticket area and the two together take about two hours.",
        ],
      },
    ],
    highlights: [
      "The oldest fort in the UAE, from around 1670",
      "Restored after being shelled in 1925",
      "Heritage village with a working falaj and well below it",
      "Views across the date gardens to the Hajar mountains",
    ],
    gate: { kind: "free", note: "Free or nominal entry depending on the day. The heritage village below is included." },
    hours: "Typically Saturday–Thursday roughly 08:00–18:00, Friday afternoons",
    bestTime: "Winter mornings, or late afternoon for the light",
    timeNeeded: "2 hours with the heritage village",
    gettingThere:
      "Al Madhab, Fujairah city, about two hours from Dubai across the mountains. Free parking.",
    nearby: ["fujairah-heritage-village", "friday-market", "al-bidyah-mosque"],
    accent: "gold",
    motif: "arch",
    image: "/images/mosque-day.jpg",
    alt: "Traditional pale stone architecture in bright daylight",
    geo: { lat: 25.1290, lng: 56.3320 },
    faqs: [
      {
        q: "How old is Fujairah Fort?",
        a: "It dates from around 1670, making it the oldest fort in the UAE. It was partly destroyed by British shelling in 1925 and restored from the late 1990s onwards.",
      },
      {
        q: "Is Fujairah Fort free?",
        a: "Entry is free or nominal depending on the day, and the heritage village below is included. Confirm hours locally — they change seasonally and around Fridays.",
      },
    ],
    metaTitle: "Fujairah Fort | The UAE's Oldest Fort, Hours & Entry",
    metaDescription:
      "Fujairah Fort, built around 1670 and the oldest in the country, with the reconstructed heritage village below it. Opening hours and what to see.",
    checked: "2026-09-18",
    keywords: ["fujairah fort", "fujairah fort fujairah", "places in fujairah", "fujairah heritage village"],
  },
  {
    slug: "fujairah-heritage-village",
    name: "Fujairah Heritage Village & Ain Al Madhab",
    emirate: "fujairah",
    area: "Al Madhab, Fujairah",
    categories: ["culture", "family", "nature"],
    tagline: "A reconstructed village, and hot sulphur springs in the same park",
    summary:
      "Two things next to each other at the foot of the mountains: an open-air reconstruction of traditional Fujairah life, and Ain Al Madhab, a park built around natural sulphur springs whose water is channelled into public pools. Cheap, shaded, and a genuine local Friday afternoon.",
    sections: [
      {
        heading: "The village",
        paragraphs: [
          "Stone and barasti dwellings, a falaj irrigation channel, a traditional well with the bull-driven pump still in place, fishing boats, farming tools and a small souk. It covers both the coastal and the mountain ways of life, which in Fujairah were genuinely different from each other.",
        ],
      },
      {
        heading: "The springs",
        paragraphs: [
          "Ain Al Madhab's sulphur water comes out of the mountain at around 30°C and is fed into separate men's and women's pools. It smells exactly as sulphur springs do, and the mineral content is the reason people have come here for generations. The park around it has chalets, lawns, a children's play area and an amphitheatre used during the Fujairah heritage festival.",
        ],
      },
    ],
    highlights: [
      "Reconstructed coastal and mountain dwellings",
      "Working falaj channel and bull-driven well",
      "Natural sulphur springs at around 30°C, separate pools",
      "Chalets, lawns and a play area in the same park",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 5,
      note: "Nominal entry to the park; the springs and chalets are charged separately and are still inexpensive.",
    },
    hours: "Daily, roughly 08:00–20:00",
    bestTime: "October to April, afternoons",
    timeNeeded: "2–3 hours",
    gettingThere:
      "Al Madhab, just west of Fujairah city at the foot of the mountains. About two hours from Dubai.",
    nearby: ["fujairah-fort", "friday-market", "al-hayl-castle"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 25.1230, lng: 56.3140 },
    faqs: [
      {
        q: "Can you swim in the Ain Al Madhab springs?",
        a: "Yes, in the public pools the spring water is channelled into, with separate men's and women's sections. The sulphur smell is strong and entirely normal.",
      },
    ],
    metaTitle: "Fujairah Heritage Village & Ain Al Madhab Springs",
    metaDescription:
      "Fujairah Heritage Village and the Ain Al Madhab sulphur springs: reconstructed traditional life, hot spring pools, chalets and a nominal entry fee.",
    checked: "2026-09-18",
    keywords: ["fujairah heritage village", "places in fujairah", "cafes in fujairah"],
  },
  {
    slug: "friday-market",
    name: "Friday Market",
    emirate: "fujairah",
    area: "Masafi, on the Dubai–Fujairah road",
    categories: ["souks", "shopping"],
    tagline: "Carpets, pottery and honey on a mountain road — open seven days",
    summary:
      "A long strip of open-fronted stalls on the Masafi road through the Hajar mountains, selling carpets, clay pots, baskets, local honey, fruit and plants. Despite the name it trades every day of the week, and it is the standard stop on the drive between Dubai and the east coast.",
    sections: [
      {
        heading: "What to buy and what to pay",
        paragraphs: [
          "Machine-made carpets from Iran and Pakistan are the bulk of it, alongside locally thrown clay water pots, palm-frond baskets, honey from the mountain villages, and seasonal fruit. Prices are quoted high and settle at roughly half after a polite negotiation — start lower than feels comfortable and be prepared to walk.",
          "The honey is worth the stop on its own. Sidr honey from the mountains is expensive and genuinely different from the supermarket product.",
        ],
      },
      {
        heading: "Why it is called Friday Market",
        paragraphs: [
          "It began as a weekly Friday market and the name stuck long after it went daily. Weekends are busiest and the sellers are least inclined to negotiate; a weekday morning gets better prices and a quieter road.",
        ],
      },
    ],
    highlights: [
      "Open daily despite the name",
      "Carpets, clay pottery, baskets and mountain honey",
      "Prices are negotiable — expect to halve the first quote",
      "On the main Dubai–Fujairah mountain road",
    ],
    gate: { kind: "free", note: "Free to browse. Everything is negotiable." },
    hours: "Daily, roughly 08:00–20:00",
    bestTime: "Weekday mornings for the best prices",
    timeNeeded: "45 minutes",
    gettingThere:
      "On the E88 at Masafi, about 90 minutes from Dubai and 25 minutes from Fujairah city. Roadside parking.",
    nearby: ["fujairah-fort", "al-hayl-castle", "wadi-wurayah"],
    accent: "gold",
    motif: "arch",
    image: "/images/spice-souk.jpg",
    alt: "Goods stacked on display at a traditional market stall",
    geo: { lat: 25.3040, lng: 56.1490 },
    faqs: [
      {
        q: "Is the Friday Market only open on Fridays?",
        a: "No — it trades every day. The name is a leftover from when it was a weekly market. Weekdays are quieter and the prices are better.",
      },
      {
        q: "Are the carpets at Friday Market genuine?",
        a: "Mostly machine-made imports rather than hand-knotted antiques, and priced accordingly once you have negotiated. The pottery, baskets and honey are local and are the better buys.",
      },
    ],
    metaTitle: "Friday Market Masafi | Carpets, Pottery & Haggling Guide",
    metaDescription:
      "The Friday Market on the Dubai–Fujairah mountain road: open daily, selling carpets, clay pottery, baskets and mountain honey. What to pay.",
    checked: "2026-09-18",
    keywords: ["friday market fujairah", "places in fujairah", "best mandi in fujairah"],
  },
  {
    slug: "al-hayl-castle",
    name: "Al Hayl Castle",
    emirate: "fujairah",
    area: "Wadi Al Hayl, inland from Fujairah",
    categories: ["culture", "adventure"],
    tagline: "A 250-year-old hill fort up a wadi, and usually empty",
    summary:
      "A small ruined castle and watchtower on a rocky spur up Wadi Al Hayl, about fifteen kilometres inland from Fujairah city. Built around 1830 as the ruling family's summer residence and a lookout over the valley. Free, rarely visited, and reached by a rough track that is half the appeal.",
    sections: [
      {
        heading: "Getting there is the experience",
        paragraphs: [
          "The track up the wadi from the main road is graded gravel, passable in a normal car in dry weather but not after rain, and it runs between bare mountain walls with date plantations in the valley floor. The castle appears on a spur above the plantations with a separate watchtower on the ridge behind it.",
          "There is nobody there. No ticket office, no café, no guide — just the ruin, the wadi and, usually, goats. That is precisely why it is worth the detour.",
        ],
      },
      {
        heading: "A caution",
        paragraphs: [
          "Wadis flood fast and without warning after rain in the mountains, even when it is dry where you are standing. Do not drive into a wadi if rain has been forecast anywhere in the Hajar range, and do not camp on the wadi floor.",
        ],
      },
    ],
    highlights: [
      "Around 1830, built as a summer residence and lookout",
      "Separate watchtower on the ridge behind",
      "Free, unstaffed and almost always empty",
      "Rough but drivable wadi track in dry weather",
    ],
    gate: { kind: "free", note: "Free and unstaffed. No facilities of any kind — bring water." },
    hours: "Daylight hours",
    bestTime: "Winter mornings. Never after rain in the mountains.",
    timeNeeded: "1.5 hours including the drive in",
    gettingThere:
      "Wadi Al Hayl, about 15 km inland from Fujairah city off the E89. Graded track; fine in a normal car when dry.",
    nearby: ["fujairah-fort", "friday-market", "wadi-wurayah"],
    accent: "sun",
    motif: "mountain",
    geo: { lat: 25.0730, lng: 56.2330 },
    faqs: [
      {
        q: "Do you need a 4x4 for Al Hayl Castle?",
        a: "Not in dry weather — the track is graded gravel and a normal car manages it slowly. After rain, do not attempt it at all: wadis flood quickly and dangerously.",
      },
    ],
    metaTitle: "Al Hayl Castle Fujairah | Free Wadi Fort & How to Get There",
    metaDescription:
      "Al Hayl Castle: an 1830s hill fort up a Fujairah wadi, free and unstaffed, reached by a gravel track. Directions and the flood warning that matters.",
    checked: "2026-09-18",
    keywords: ["al hayl castle fujairah", "places in fujairah", "fujairah fort"],
  },
  {
    slug: "wadi-wurayah",
    name: "Wadi Wurayah",
    emirate: "fujairah",
    area: "Hajar mountains, north-west Fujairah",
    categories: ["nature", "adventure", "camping"],
    tagline: "The UAE's first mountain protected area, and a waterfall that runs",
    summary:
      "A protected mountain wadi holding the country's only year-round freshwater waterfall and pools, declared the UAE's first mountain protected area in 2009 and a Ramsar site in 2013. Access is controlled and permits are required, which is exactly why there is still anything left to see.",
    sections: [
      {
        heading: "Why it is restricted",
        paragraphs: [
          "Wadi Wurayah holds the only permanent freshwater in the Emirates outside the aflaj, and with it species found nowhere else in the country — including the Arabian tahr, the wadi racer snake and endemic dragonflies and toads. Unrestricted visiting through the 2000s did severe damage: litter, off-road driving through the pools and swimming in the drinking water of the species that live there.",
          "Access is now managed by the Fujairah authorities and generally requires a permit or an organised visit. Arrangements change; check before driving out rather than after.",
        ],
      },
      {
        heading: "What you see",
        paragraphs: [
          "A waterfall running into a plunge pool, a chain of smaller pools up the wadi, sheer mountain walls and, if you are lucky and quiet, mountain gazelle or tahr on the slopes. Guided hikes run from Fujairah and are the simplest legitimate way in.",
        ],
      },
    ],
    highlights: [
      "The UAE's only year-round mountain waterfall",
      "First mountain protected area in the country, and a Ramsar site",
      "Endemic species including Arabian tahr and the wadi racer",
      "Permit or guided access — check before travelling",
    ],
    gate: {
      kind: "varies",
      note: "Access is controlled and arrangements change. Confirm the current permit position with Fujairah Municipality or book a guided hike.",
    },
    hours: "Daylight hours, by permit or with a guide",
    bestTime: "November to March. Never enter a wadi with rain forecast in the mountains.",
    timeNeeded: "Half a day",
    gettingThere:
      "Off the Masafi–Khor Fakkan road in the northern Hajar range, about two hours from Dubai. 4x4 and a guide are the practical requirements.",
    nearby: ["al-hayl-castle", "friday-market", "khor-fakkan-beach"],
    accent: "palm",
    motif: "mountain",
    image: "/images/hatta-oasis.jpg",
    alt: "Still water at the base of steep mountain rock",
    geo: { lat: 25.4000, lng: 56.2670 },
    faqs: [
      {
        q: "Can you visit Wadi Wurayah?",
        a: "Yes, but access is managed — it is a protected area and a Ramsar site, and a permit or an organised guided hike is normally required. Turning up unannounced is how the place got damaged in the first place.",
      },
      {
        q: "Can you swim in the Wadi Wurayah waterfall?",
        a: "No. It is the only permanent freshwater in the mountains and the species that depend on it cannot cope with swimmers, sunscreen or soap. Look, photograph, and stay out of the water.",
      },
    ],
    metaTitle: "Wadi Wurayah Fujairah | Waterfall, Permits & Protected Area",
    metaDescription:
      "Wadi Wurayah: the UAE's only year-round mountain waterfall, a protected Ramsar site with permit-controlled access, and why swimming is not allowed.",
    checked: "2026-09-18",
    keywords: ["wadi wurayah fujairah", "places in fujairah", "camping in fujairah", "adventure park fujairah"],
  },
];
