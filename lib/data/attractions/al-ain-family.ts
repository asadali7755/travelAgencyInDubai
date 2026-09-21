/**
 * Al Ain's forts, archaeology, camel market and family parks — the rest of the
 * Garden City. Checked September 2026.
 */

import type { Attraction } from "./types";

export const alAinFamily: Attraction[] = [
  {
    slug: "hili-fun-city",
    name: "Hili Fun City",
    emirate: "abu-dhabi",
    area: "Hili, north Al Ain",
    categories: ["kids", "family"],
    tagline: "The UAE's first theme park, and still the cheapest ticket in it",
    summary:
      "Opened in 1985 and the first theme park in the country, Hili Fun City is twenty-two hectares of rides, gardens and lawns aimed squarely at families with young children. Entry is a few dirhams, most of the rides are included, and it sits beside the Hili archaeological park.",
    sections: [
      {
        heading: "What it is and is not",
        paragraphs: [
          "This is not Ferrari World and does not pretend to be. It is a municipal family park with around thirty rides, a roller coaster, a small train, large shaded lawns and an amphitheatre, run at a price that means a family of five can spend a day there for less than one adult ticket at Yas Island.",
          "The rides are weighted to under-tens. Older children will exhaust it in a couple of hours; four-to-ten-year-olds will not want to leave.",
        ],
      },
    ],
    highlights: [
      "The UAE's first theme park, open since 1985",
      "Around 30 rides, most included in the entry price",
      "Large shaded lawns for picnics",
      "Next to the Hili archaeological park",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 10,
      childFrom: 10,
      note: "Entry includes most rides. Under-3s free. Confirm the season — hours shorten considerably in summer.",
    },
    hours: "Typically afternoons and evenings, closed some weekdays; shorter in summer",
    bestTime: "October to April, evenings",
    timeNeeded: "Half a day",
    gettingThere:
      "Hili, north Al Ain, about 10 minutes from the city centre. Free parking.",
    nearby: ["hili-archaeological-park", "al-ain-zoo", "al-ain-oasis"],
    accent: "sun",
    motif: "wheel",
    geo: { lat: 24.2620, lng: 55.7700 },
    faqs: [
      {
        q: "How much are Hili Fun City tickets?",
        a: "Around AED 10 a head, which includes most of the rides. It is the cheapest theme park ticket in the UAE by a wide margin.",
      },
      {
        q: "What ages is Hili Fun City for?",
        a: "Four to ten is the sweet spot. Teenagers will have seen everything in two hours; younger children get a full day out of it.",
      },
    ],
    metaTitle: "Hili Fun City Al Ain | Ticket Price, Rides & Opening Hours",
    metaDescription:
      "Hili Fun City: the UAE's first theme park, entry around AED 10 including most rides, which ages it suits and when it is open.",
    checked: "2026-09-18",
    keywords: ["al ain hili fun city ticket price", "alain fun city ticket price", "things to do in al ain", "fun city safeer mall ajman"],
  },
  {
    slug: "hili-archaeological-park",
    name: "Hili Archaeological Park",
    emirate: "abu-dhabi",
    area: "Hili, north Al Ain",
    categories: ["culture", "nature"],
    tagline: "A Bronze Age tomb from 2500 BCE, standing in a public garden",
    summary:
      "One of the most important Bronze Age sites in the Gulf, laid out as a public park. The centrepiece is the Hili Grand Tomb, a circular communal tomb of around 2500 BCE with carved reliefs of people and animals on its entrances, standing intact among the lawns. Part of the UNESCO listing, and free.",
    sections: [
      {
        heading: "What survives",
        paragraphs: [
          "Hili was a settled farming community during the Umm an-Nar period, which is remarkable in itself — permanent agriculture in this landscape depended on the falaj irrigation whose earliest known examples are here. The Grand Tomb is around twelve metres across, built of dressed stone, and its two entrances carry carved figures that are among the oldest representational art in the Emirates.",
          "Around it are the remains of round towers, houses and the Iron Age falaj system. Interpretation boards are good and the site is small enough to cover properly in an hour.",
        ],
      },
    ],
    highlights: [
      "Hili Grand Tomb, around 2500 BCE, with carved reliefs",
      "Earliest known falaj irrigation anywhere",
      "Laid out as a free public garden",
      "Part of the Cultural Sites of Al Ain UNESCO listing",
    ],
    gate: { kind: "free", note: "Free entry." },
    hours: "Daily, roughly 09:00–22:00",
    bestTime: "Late afternoon, October to April",
    timeNeeded: "1 hour",
    gettingThere:
      "Hili, north Al Ain, beside Hili Fun City. Free parking.",
    nearby: ["hili-fun-city", "al-ain-oasis", "al-jahili-fort"],
    accent: "gold",
    motif: "arch",
    geo: { lat: 24.2650, lng: 55.7650 },
    faqs: [
      {
        q: "Is Hili Archaeological Park worth visiting?",
        a: "If you have any interest in how people lived here before oil, yes — it is the deepest settlement record in the country and the Grand Tomb is genuinely striking. An hour covers it, and it is free.",
      },
    ],
    metaTitle: "Hili Archaeological Park Al Ain | Free Bronze Age Site",
    metaDescription:
      "Hili Archaeological Park: the 2500 BCE Grand Tomb with carved reliefs, the earliest known falaj irrigation, and free entry. Part of the UNESCO listing.",
    checked: "2026-09-18",
    keywords: ["hili archaeological park abu dhabi", "things to do in al ain", "al ain tourist places free"],
  },
  {
    slug: "al-jahili-fort",
    name: "Al Jahili Fort",
    emirate: "abu-dhabi",
    area: "Central Al Ain",
    categories: ["culture", "landmarks"],
    tagline: "An 1890s fort with a permanent Wilfred Thesiger exhibition inside",
    summary:
      "One of the largest historic forts in the UAE, built in the 1890s to defend the oasis and later the headquarters of the Oman Trucial Scouts. Restored to an unusually high standard, and now holding a permanent exhibition of Wilfred Thesiger's photographs of the Empty Quarter crossings. Free.",
    sections: [
      {
        heading: "The fort",
        paragraphs: [
          "Al Jahili's round stepped tower is the image most associated with Al Ain, and the restoration — which won architectural awards — kept the mud-brick construction visible rather than rendering over it. The courtyards are planted, there is a café, and it stays comfortable in the shade well into the warmer months.",
        ],
      },
      {
        heading: "Thesiger",
        paragraphs: [
          "The permanent exhibition holds a selection of the photographs Wilfred Thesiger took during his two crossings of the Rub' al Khali in 1946–48, travelling with Bedu companions. It is one of the best things in any UAE museum: the pictures are extraordinary, and they document a way of life that ended within a decade of them being taken.",
        ],
      },
    ],
    highlights: [
      "Built in the 1890s; award-winning restoration",
      "Permanent Wilfred Thesiger photography exhibition",
      "Free entry, with a café and planted courtyards",
      "Part of the Cultural Sites of Al Ain UNESCO listing",
    ],
    gate: { kind: "free", note: "Free entry, including the exhibition." },
    hours: "Tuesday–Sunday roughly 09:00–17:00, Friday afternoons only; closed Mondays",
    bestTime: "Weekday mornings",
    timeNeeded: "1.5 hours",
    gettingThere:
      "Central Al Ain near the oasis, about 90 minutes from Abu Dhabi. Free parking.",
    nearby: ["al-ain-oasis", "hili-archaeological-park", "al-ain-camel-market"],
    accent: "gold",
    motif: "arch",
    image: "/images/mosque-day.jpg",
    alt: "Pale traditional architecture under a bright daytime sky",
    geo: { lat: 24.2150, lng: 55.7530 },
    faqs: [
      {
        q: "Is Al Jahili Fort free?",
        a: "Yes, including the Thesiger exhibition. It closes on Mondays and opens only in the afternoon on Fridays.",
      },
    ],
    metaTitle: "Al Jahili Fort Al Ain | Free Entry & Thesiger Exhibition",
    metaDescription:
      "Al Jahili Fort: an 1890s mud-brick fort in Al Ain, free to enter, with a permanent exhibition of Wilfred Thesiger's Empty Quarter photographs.",
    checked: "2026-09-18",
    keywords: ["things to do in al ain", "al ain tourist places free", "al alain uae"],
  },
  {
    slug: "al-ain-camel-market",
    name: "Al Ain Camel Market",
    emirate: "abu-dhabi",
    area: "Zayed Bin Sultan Street, Al Ain",
    categories: ["souks", "culture"],
    tagline: "The last real livestock souk in the country",
    summary:
      "A working camel market where animals are traded daily, not a heritage display. Hundreds of camels in pens, traders negotiating in earnest, and goats and sheep in the adjoining section. Free to walk into, best very early in the morning, and genuinely unlike anything else left in the UAE.",
    sections: [
      {
        heading: "How to visit it well",
        paragraphs: [
          "Go early — trading starts not long after dawn and has wound down by about ten. It is dusty, noisy and entirely unstaged, which is the appeal. Traders are generally happy for visitors to watch and photograph, but ask first and expect that someone will offer to show you round and then ask for a tip. Agree the amount before, not after.",
          "You are not expected to buy anything and nobody will mind if you do not. Wear shoes you do not care about.",
        ],
      },
    ],
    highlights: [
      "A working livestock market, not a reconstruction",
      "Hundreds of camels traded daily; goats and sheep alongside",
      "Free to enter",
      "Trading is over by mid-morning — arrive early",
    ],
    gate: {
      kind: "free",
      note: "Free. Guides will offer themselves informally — agree a tip in advance if you want one.",
    },
    hours: "Daily from around sunrise; trading largely finished by 10:00",
    bestTime: "Between 07:00 and 09:00, October to April",
    timeNeeded: "1 hour",
    gettingThere:
      "Off Zayed Bin Sultan Street on the north-eastern edge of Al Ain, near Bawadi Mall. Free parking.",
    nearby: ["al-jahili-fort", "al-ain-oasis", "al-ain-zoo"],
    accent: "sun",
    motif: "dune",
    image: "/images/camel-caravan.jpg",
    alt: "Camels standing together in open desert",
    geo: { lat: 24.2360, lng: 55.7080 },
    faqs: [
      {
        q: "What time does Al Ain camel market open?",
        a: "Trading starts around sunrise and is mostly finished by ten. Arriving at eleven means an empty yard, which is the most common mistake visitors make here.",
      },
      {
        q: "Is the camel market free?",
        a: "Yes. Someone will usually offer to walk you around and will expect a tip for it — agree the figure before you set off rather than at the end.",
      },
    ],
    metaTitle: "Al Ain Camel Market | Opening Hours, What to Expect & Tips",
    metaDescription:
      "Al Ain camel market: a working livestock souk, free to visit, trading from dawn until mid-morning. When to arrive and how to handle the informal guides.",
    checked: "2026-09-18",
    keywords: ["al ain camel market opening hours", "things to do in al ain", "bawadi mall al ain location", "shopping mall in al ain"],
  },
  {
    slug: "wadi-adventure",
    name: "Wadi Adventure",
    emirate: "abu-dhabi",
    area: "Below Jebel Hafeet, Al Ain",
    categories: ["adventure", "waterparks", "kids"],
    tagline: "Surfable waves and white water rafting, in the middle of a desert",
    summary:
      "A purpose-built adventure park at the foot of Jebel Hafeet with the region's first man-made surf pool, three artificial white water rafting and kayaking channels, an airpark with a zipline and climbing wall, and a drop pool. Improbable, and one of the more genuinely unusual things in the country.",
    sections: [
      {
        heading: "The water",
        paragraphs: [
          "The surf pool generates sets up to around three metres, big enough that it is used for training rather than novelty, with lessons available for complete beginners. The white water channels run over a kilometre of artificial rapids at grades that suit both rafting groups and competitive kayakers, and they are among very few of their kind in the region.",
          "You do not need experience for either. Rafting runs with a guide in the boat and the surf pool sets a beginner session on smaller waves.",
        ],
      },
      {
        heading: "The dry side",
        paragraphs: [
          "The airpark holds a zipline, a climbing wall, a giant swing and an obstacle course, and there is a large drop pool for younger children. It is quieter and cheaper than the Dubai parks and the drive from Al Ain is fifteen minutes.",
        ],
      },
    ],
    highlights: [
      "Surf pool with waves up to around 3 m, and lessons",
      "Over a kilometre of artificial white water for rafting and kayaking",
      "Zipline, climbing wall and obstacle course",
      "Quieter and cheaper than the Dubai water parks",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 120,
      note: "General entry; surfing, rafting and kayaking sessions are booked and priced separately.",
    },
    hours: "Daily, roughly 11:00–19:00; check seasonal changes",
    bestTime: "October to April; sessions book up at weekends",
    timeNeeded: "Half a day",
    gettingThere:
      "At the foot of Jebel Hafeet, about 15 minutes from central Al Ain. Own vehicle.",
    nearby: ["jebel-hafeet", "green-mubazzarah", "al-ain-zoo"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 24.0960, lng: 55.7290 },
    faqs: [
      {
        q: "Do you need experience to raft at Wadi Adventure?",
        a: "No. Rafting runs with a trained guide in the boat and the surf pool sets smaller waves for beginner sessions. Minimum ages apply to each activity.",
      },
      {
        q: "Is Wadi Adventure worth the drive from Dubai?",
        a: "As a day on its own, marginally — it is around ninety minutes. Combined with Jebel Hafeet and Green Mubazzarah it makes one of the better full days in the country.",
      },
    ],
    metaTitle: "Wadi Adventure Al Ain | Surf Pool, Rafting & Prices",
    metaDescription:
      "Wadi Adventure: a surf pool with 3 m waves, artificial white water rafting and kayaking, zipline and climbing, at the foot of Jebel Hafeet in Al Ain.",
    checked: "2026-09-18",
    keywords: ["wadi adventure al ain", "things to do in al ain", "dubai water park"],
  },
];
