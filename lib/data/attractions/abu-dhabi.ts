/**
 * Abu Dhabi — the mosque, the museum, the palace and Yas Island.
 *
 * All four are doable from Dubai in a long day, which is why every entry
 * carries a realistic drive time: the emirate is 90 minutes away and visitors
 * routinely try to fit two of these into an afternoon and fail.
 *
 * Gate prices checked September 2026.
 */

import type { Attraction } from "./types";

export const abuDhabiAttractions: Attraction[] = [
  {
    slug: "sheikh-zayed-grand-mosque",
    name: "Sheikh Zayed Grand Mosque",
    emirate: "abu-dhabi",
    area: "Al Rawdah, Abu Dhabi",
    categories: ["culture", "landmarks"],
    tagline: "Eighty-two domes, the world's largest hand-knotted carpet, and free to enter",
    summary:
      "Completed in 2007 and built to hold forty thousand worshippers, the Grand Mosque is the single most impressive building in the UAE and it costs nothing to walk into. Entry is free, guided tours are free, and the only requirement is that you dress for it.",
    sections: [
      {
        heading: "What makes it worth the drive",
        paragraphs: [
          "The scale is the first thing — a courtyard of white marble inlaid with floral mosaic, eighty-two domes, four minarets and reflecting pools that double the whole facade at night. Inside, the main prayer hall holds what is still the largest hand-knotted carpet ever made, woven in Iran over about two years, and seven chandeliers hung with Swarovski crystal.",
          "It is a working mosque, not a monument. Prayer times close sections to visitors and the atmosphere changes entirely around them, which is worth planning around rather than resenting.",
        ],
      },
      {
        heading: "The dress code, plainly",
        paragraphs: [
          "Long, loose clothing covering shoulders, elbows and ankles for everyone. Women additionally cover their hair. Abayas and headscarves are lent free at the entrance, and men arriving in shorts are given a wrap — the staff deal with this hundreds of times a day and are entirely matter-of-fact about it.",
          "Tight clothing is refused even when it covers, so leggings and bodycon dresses are a common cause of being sent back to the desk.",
        ],
      },
    ],
    highlights: [
      "Free entry and free guided tours led by the mosque's own specialists",
      "The largest hand-knotted carpet in the world in the main prayer hall",
      "Reflecting pools that mirror the facade after dark",
      "Wahat Al Karama memorial across the road, open at all hours and also free",
    ],
    gate: {
      kind: "free",
      note: "Entry and guided tours are free. Abayas and headscarves are lent at the door at no charge.",
    },
    hours:
      "Saturday–Thursday 09:00–21:00 (last entry 20:30). Friday 09:00–12:00 and 15:00–21:00.",
    bestTime: "Late afternoon into dusk, when the pools light and the marble cools",
    timeNeeded: "2 hours",
    gettingThere:
      "About 140 km from Dubai, roughly 90 minutes by road. Registration at the visitor centre car park, then a short shuttle or walk to the courtyard.",
    nearby: ["qasr-al-watan", "louvre-abu-dhabi"],
    accent: "gold",
    motif: "dome",
    image: "/images/grand-mosque.jpg",
    alt: "The white marble domes and minarets of the Sheikh Zayed Grand Mosque",
    geo: { lat: 24.4128, lng: 54.4750 },
    faqs: [
      {
        q: "Is the Sheikh Zayed Grand Mosque free?",
        a: "Yes, entry is free and so are the guided tours run by the mosque's own cultural specialists. There is no ticket to buy in advance.",
      },
      {
        q: "What should women wear to the Grand Mosque?",
        a: "Loose clothing covering wrists, ankles and hair. Tight fabric is refused even when it covers, so avoid leggings. Free abayas and headscarves are available at the entrance if you arrive unprepared.",
      },
      {
        q: "Can non-Muslims visit?",
        a: "Yes, and the mosque actively encourages it — the free guided tours exist precisely for visitors of any faith or none.",
      },
    ],
    metaTitle: "Sheikh Zayed Grand Mosque | Free Entry, Hours & Dress Code",
    metaDescription:
      "Visiting the Sheikh Zayed Grand Mosque in Abu Dhabi: free entry and tours, exact opening hours including Friday, the dress code and what gets refused.",
    checked: "2026-09-18",
  },
  {
    slug: "louvre-abu-dhabi",
    name: "Louvre Abu Dhabi",
    emirate: "abu-dhabi",
    area: "Saadiyat Cultural District",
    categories: ["culture", "landmarks"],
    tagline: "A museum that hangs civilisations side by side, under a dome that rains light",
    summary:
      "Jean Nouvel's museum on Saadiyat Island arranges its galleries by chronology rather than by culture, so a Chinese bronze sits alongside a Mediterranean bronze of the same century. The perforated dome above the plaza filters sunlight into what the architect called a rain of light, and it is worth the ticket on its own.",
    sections: [
      {
        heading: "How the collection is hung",
        paragraphs: [
          "Most encyclopaedic museums separate by region — an Egyptian wing, an Asian wing. The Louvre Abu Dhabi refuses that and sequences twelve chapters by time instead. The effect is immediate: you see what humanity was doing simultaneously in places that never met, and the coincidences do more teaching than any label.",
          "The collection is a mixture of permanent acquisitions and long-term loans from French institutions, and the rotating exhibitions are genuinely substantial rather than filler.",
        ],
      },
      {
        heading: "The dome",
        paragraphs: [
          "Eight superimposed layers of perforated steel form a 180-metre dome resting on four hidden piers, so it appears to float above the galleries. Sunlight through the layers falls as thousands of shifting points of light on the plaza below. Go out onto the water-level terrace under it before you enter the galleries, and again before you leave — it is completely different at each hour.",
        ],
      },
    ],
    highlights: [
      "Galleries sequenced by century across all cultures, not split by region",
      "Nouvel's perforated dome and its 'rain of light' plaza",
      "Substantial rotating exhibitions, not just the permanent hang",
      "Waterfront terraces you can sit on with a coffee",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 63,
      childFrom: null,
      note: "Under-18s enter free. Combo tickets with Yas Waterworld and other Abu Dhabi venues are cheaper than buying separately.",
    },
    hours: "Tuesday–Sunday, roughly 10:00–18:30. Closed Mondays.",
    bestTime: "Late afternoon for the dome light; weekdays for space in the galleries",
    timeNeeded: "3 hours",
    gettingThere:
      "Saadiyat Island, about 20 minutes from central Abu Dhabi and 90 minutes from Dubai. Parking on site; no metro anywhere in the emirate.",
    nearby: ["sheikh-zayed-grand-mosque", "qasr-al-watan", "ferrari-world-abu-dhabi"],
    accent: "sea",
    motif: "gallery",
    geo: { lat: 24.5339, lng: 54.3981 },
    faqs: [
      {
        q: "Is the Louvre Abu Dhabi worth it if I have seen the Paris Louvre?",
        a: "They are not comparable collections and are not trying to be. Paris is about depth in Western art; Abu Dhabi is about placing cultures beside each other in time. Seeing one does not spend the other.",
      },
      {
        q: "Is the Louvre Abu Dhabi closed on Mondays?",
        a: "Yes. It closes one day a week and that day is Monday, which catches out a lot of day-trippers from Dubai.",
      },
    ],
    metaTitle: "Louvre Abu Dhabi | Tickets, Hours & Why the Dome Matters",
    metaDescription:
      "Louvre Abu Dhabi ticket prices, opening hours including the Monday closure, how the galleries are arranged by century, and the best time for the dome.",
    checked: "2026-09-18",
  },
  {
    slug: "qasr-al-watan",
    name: "Qasr Al Watan",
    emirate: "abu-dhabi",
    area: "Presidential Palace, Ras Al Akhdar",
    categories: ["culture", "landmarks"],
    tagline: "A working presidential palace that opens its state rooms to the public",
    summary:
      "Part of the Presidential Palace complex, opened to visitors in 2019 and still used for state business. The Great Hall sits under a 37-metre dome, the library holds several thousand volumes on Arab scholarship, and after dark the whole facade becomes the screen for the Palace in Motion projection.",
    sections: [
      {
        heading: "What you get to walk through",
        paragraphs: [
          "The Great Hall is the centrepiece — a perfect cube, 100 metres each way, beneath a dome finished in white and gold geometry. Off it run the presidential banquet hall and the actual meeting rooms used by the Federal Supreme Council, left set as they are used rather than roped into a display.",
          "The House of Knowledge wing makes the argument that the palace is a scholarly institution as much as a seat of government, with manuscripts and instruments tracing Arab contributions to astronomy, mathematics and medicine.",
        ],
      },
      {
        heading: "Palace in Motion",
        paragraphs: [
          "After sunset the west facade is used as a projection surface for a twenty-minute sequence on the founding of the UAE. It is included in the ticket and it is the reason to go late rather than early. Seating on the lawn is unreserved and fills in the half hour before it starts.",
        ],
      },
    ],
    highlights: [
      "The Great Hall — a 100 m cube under a 37 m dome",
      "Federal Supreme Council chamber, presented as it is used",
      "House of Knowledge wing on Arab science and scholarship",
      "Palace in Motion projection after dark, included in the ticket",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 65,
      childFrom: 30,
      note: "Junior rate covers ages 4–17. Under-4s free. The evening projection is included.",
    },
    hours: "Daily, roughly 10:00–19:00 with last entry around 17:30; projection after sunset",
    bestTime: "Arrive around 16:00 so the interior and the projection fall in one visit",
    timeNeeded: "2.5 hours including the projection",
    gettingThere:
      "Ras Al Akhdar, west Abu Dhabi, about 20 minutes from the Corniche. Large free car park; taxi is straightforward.",
    nearby: ["sheikh-zayed-grand-mosque", "louvre-abu-dhabi"],
    accent: "gold",
    motif: "dome",
    geo: { lat: 24.4614, lng: 54.3049 },
    faqs: [
      {
        q: "Is Qasr Al Watan still a working palace?",
        a: "Yes. It hosts state visits and Federal Supreme Council business, and sections close at short notice when it is in official use. That is also what makes the rooms feel unlike a museum.",
      },
      {
        q: "Is the light show included in the ticket?",
        a: "Yes, Palace in Motion is included. Time your visit so you are still there after sunset rather than paying to return.",
      },
    ],
    metaTitle: "Qasr Al Watan Abu Dhabi | Tickets, Hours & Palace in Motion",
    metaDescription:
      "Qasr Al Watan ticket prices, opening hours, what is inside the Great Hall and House of Knowledge, and why to arrive in time for the evening projection.",
    checked: "2026-09-18",
  },
  {
    slug: "ferrari-world-abu-dhabi",
    name: "Ferrari World Abu Dhabi",
    emirate: "abu-dhabi",
    area: "Yas Island",
    categories: ["family", "kids", "adventure"],
    tagline: "The fastest rollercoaster on earth, under the largest space frame ever built",
    summary:
      "The red roof on Yas Island covers the world's first Ferrari-branded theme park and Formula Rossa, which reaches 240 km/h in under five seconds and still holds the speed record for a rollercoaster. Around it sit forty more rides, most of them aimed squarely at families rather than adrenaline.",
    sections: [
      {
        heading: "Formula Rossa and the rest",
        paragraphs: [
          "Formula Rossa launches hydraulically and accelerates hard enough that protective goggles are issued, not offered. It is over in under a minute and there is nothing else like it in the region. Riders need to be 1.4 m and to have thought about it properly first.",
          "Beyond it the park is broader than its reputation suggests: a driving school for children, a Ferrari factory ride, simulators, a family coaster and a roof-level suspended ride. Two of the newer attractions are among the tallest and steepest of their kind anywhere.",
        ],
      },
      {
        heading: "Making it pay",
        paragraphs: [
          "A single-park day is the most expensive way to buy Yas Island. Multi-park passes covering Ferrari World, Warner Bros. World, Yas Waterworld and SeaWorld are valid across several days and work out at roughly a third less per park, which matters if you are staying on the island at all.",
          "Everything is indoors and air-conditioned, so unlike most UAE attractions this one is at its best in July.",
        ],
      },
    ],
    highlights: [
      "Formula Rossa — 0 to 240 km/h in under five seconds",
      "Entirely indoors, so it works in peak summer",
      "Over 40 rides, most of them family rather than thrill",
      "Multi-park Yas passes cut the per-park cost sharply",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 345,
      childFrom: null,
      note: "Single park, single day. Two parks about AED 475, three about AED 575, four about AED 675, each valid across six days.",
    },
    hours: "Daily, roughly 11:00–20:00; hours extend at weekends and in holidays",
    bestTime: "Any month — it is indoors. Weekday mornings for the short queues.",
    timeNeeded: "A full day",
    gettingThere:
      "Yas Island, about 30 minutes from central Abu Dhabi and 70 minutes from Dubai. Free parking; free shuttles between the Yas parks.",
    nearby: ["louvre-abu-dhabi", "qasr-al-watan"],
    accent: "coral",
    motif: "speed",
    geo: { lat: 24.4839, lng: 54.6070 },
    faqs: [
      {
        q: "How fast is Formula Rossa?",
        a: "It reaches about 240 km/h in under five seconds, which is still the fastest of any rollercoaster. Goggles are compulsory because at that speed airborne sand is a genuine hazard.",
      },
      {
        q: "Is a multi-park Yas ticket worth it?",
        a: "If you will visit more than one park, almost always. Two parks cost around AED 475 against AED 345 for one, and the pass stays valid for about six days so the second park can be another trip.",
      },
    ],
    metaTitle: "Ferrari World Abu Dhabi | Tickets, Formula Rossa & Yas Passes",
    metaDescription:
      "Ferrari World ticket prices, how Formula Rossa compares, height limits, and why a multi-park Yas Island pass costs far less per park than single entry.",
    checked: "2026-09-18",
  },
];
