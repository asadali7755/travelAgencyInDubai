/**
 * Al Ain — the Garden City, inland in Abu Dhabi emirate on the Omani border.
 *
 * Administratively Abu Dhabi, culturally its own place: the UAE's only inland
 * city, its only UNESCO World Heritage site, and the one part of the country
 * where the old oasis economy is still legible. Checked September 2026.
 */

import type { Attraction } from "./types";

export const alAinAttractions: Attraction[] = [
  {
    slug: "jebel-hafeet",
    name: "Jebel Hafeet",
    emirate: "abu-dhabi",
    area: "Al Ain, on the Omani border",
    categories: ["adventure", "landmarks", "nature"],
    tagline: "1,249 m, and one of the great driving roads anywhere",
    summary:
      "The second-highest peak in the UAE, with an eleven-kilometre road of sixty bends climbing it that regularly appears on lists of the world's best drives. Free to go up, there is a viewing terrace and a café at the top, and the Bronze Age tombs at the foot are part of a UNESCO World Heritage site.",
    sections: [
      {
        heading: "The road and the view",
        paragraphs: [
          "The road was cut in the 1980s and is beautifully engineered: three lanes, sixty corners, crash barriers throughout and lay-bys at the good viewpoints. It climbs about 1,200 metres in eleven kilometres. Cyclists use it as a training climb; cars use it to watch the sun go down over Al Ain on one side and Oman on the other.",
          "The summit has a car park, a café and a terrace. Go up in the last hour of daylight, stay for the lights of Al Ain coming on, and come down in the dark — the road is lit.",
        ],
      },
      {
        heading: "The tombs at the bottom",
        paragraphs: [
          "Scattered across the lower slopes are around five hundred beehive-shaped stone tombs dating to roughly 3200–2700 BCE. They gave their name to the Hafit period of Gulf archaeology and are part of the Cultural Sites of Al Ain, inscribed by UNESCO in 2011 — the UAE's only World Heritage listing. Free to walk among.",
          "Green Mubazzarah, the hot-spring park at the foot of the mountain, is on the same road and is where most people combine the two.",
        ],
      },
    ],
    highlights: [
      "11 km, 60-bend mountain road, free to drive",
      "Summit terrace and café at about 1,200 m",
      "Bronze Age Hafit tombs on the lower slopes — UNESCO listed",
      "Green Mubazzarah hot springs at the base",
    ],
    gate: { kind: "free", note: "The road, the summit terrace and the tombs are all free. Only the café and the parking at Green Mubazzarah charge." },
    hours: "Open at all hours; the road is lit after dark",
    bestTime: "An hour before sunset, October to April. It is several degrees cooler than Al Ain below.",
    timeNeeded: "Half a day with Green Mubazzarah",
    gettingThere:
      "About 30 minutes from central Al Ain, 90 minutes from Abu Dhabi and just under two hours from Dubai. Own vehicle — no public transport goes up.",
    nearby: ["green-mubazzarah", "al-ain-oasis", "al-ain-zoo"],
    accent: "sun",
    motif: "mountain",
    image: "/images/dunes-skyline.jpg",
    alt: "A wide desert landscape with hills on the horizon",
    geo: { lat: 24.0576, lng: 55.7736 },
    faqs: [
      {
        q: "Is Jebel Hafeet free?",
        a: "Yes. The road, the summit viewpoints and the Bronze Age tombs at the base cost nothing. Only the café at the top and the paid areas of Green Mubazzarah charge.",
      },
      {
        q: "How long does it take to drive up Jebel Hafeet?",
        a: "About twenty minutes each way at a sensible pace. Add time for the lay-bys — the views on the way up are better than the one at the top.",
      },
    ],
    metaTitle: "Jebel Hafeet Al Ain | Free Mountain Road, Views & Tombs",
    metaDescription:
      "Jebel Hafeet: the UAE's great mountain drive, free to go up, plus the UNESCO-listed Bronze Age tombs at its base and Green Mubazzarah hot springs.",
    checked: "2026-09-18",
    keywords: ["things to do in al ain", "al alain uae", "alain in uae", "al ain tourist places free"],
  },
  {
    slug: "green-mubazzarah",
    name: "Green Mubazzarah",
    emirate: "abu-dhabi",
    area: "Foot of Jebel Hafeet, Al Ain",
    categories: ["family", "nature", "camping"],
    tagline: "Hot springs, green hills and chalets at the base of the mountain",
    summary:
      "An unlikely stretch of irrigated green hills at the foot of Jebel Hafeet, fed by natural hot springs that run at around 40°C. Grassy mounds for picnics, hot-spring pools to soak your feet in, a small lake, chalets to rent overnight and a permitted camping area. Entry is free.",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Green Mubazzarah looks like nowhere else in the country — steep grass hills against bare mountain rock, with hot springs bubbling up through them. Families drive up, park beside a mound, spread a rug and stay for the afternoon. The spring water is channelled into small pools; it is hot enough to be a genuine soak and popular with older visitors for exactly that reason.",
          "There is a small lake with pedalos, a children's play area, a café strip and a modest funfair. Chalets on the hillside can be booked overnight, and there is a designated camping area — one of the few places in the UAE where camping is on grass rather than sand.",
        ],
      },
    ],
    highlights: [
      "Natural hot springs at around 40°C, free to use",
      "Grass hills for picnics, right under Jebel Hafeet",
      "Chalets and a permitted camping area",
      "Free entry; nominal charge for parking and activities",
    ],
    gate: {
      kind: "free",
      note: "Free entry. Parking, pedalos, the funfair and chalet hire are charged separately.",
    },
    hours: "Open at all hours; facilities roughly 09:00–23:00",
    bestTime: "October to April. Evenings are busiest and best.",
    timeNeeded: "Half a day, or overnight",
    gettingThere:
      "At the base of the Jebel Hafeet road, about 25 minutes from central Al Ain. Own vehicle.",
    nearby: ["jebel-hafeet", "al-ain-oasis", "al-ain-zoo"],
    accent: "palm",
    motif: "garden",
    image: "/images/hatta-oasis.jpg",
    alt: "Still water below bare mountain slopes",
    geo: { lat: 24.0810, lng: 55.7440 },
    faqs: [
      {
        q: "Are the Green Mubazzarah hot springs free?",
        a: "Yes, entry and the spring pools cost nothing. Parking, the pedalos, the funfair and the chalets are charged separately.",
      },
      {
        q: "Can you camp at Green Mubazzarah?",
        a: "Yes, there is a designated camping area, and chalets can be rented if you would rather have a roof. It is one of very few places in the UAE where you camp on grass.",
      },
    ],
    metaTitle: "Green Mubazzarah Al Ain | Hot Springs, Chalets & Camping",
    metaDescription:
      "Green Mubazzarah park at the foot of Jebel Hafeet: free entry, natural hot springs, picnic hills, chalets and a permitted camping area.",
    checked: "2026-09-18",
    keywords: ["al ain green mubazzarah park", "al ain mubazzarah park", "al ain camping site", "things to do in al ain"],
  },
  {
    slug: "al-ain-oasis",
    name: "Al Ain Oasis",
    emirate: "abu-dhabi",
    area: "Central Al Ain",
    categories: ["nature", "culture", "family"],
    tagline: "147,000 date palms, a 3,000-year-old irrigation system, and free",
    summary:
      "A working date plantation of around 147,000 palms in the middle of the city, still irrigated by falaj channels that have run for three millennia. Shaded walkways run through it, an eco-centre explains how the system works, and the whole thing is free and around six degrees cooler than the street outside.",
    sections: [
      {
        heading: "The falaj",
        paragraphs: [
          "The oasis is not a park made to look old — it is a farm that has been continuously worked, fed by aflaj, the underground channels that carry groundwater from the mountains by gravity alone. Some of the Al Ain system dates to the Iron Age, and the channels still run open through the plantation where you can put a hand in them.",
          "Marked walking routes thread between the plots, shaded almost the whole way by the canopy. The eco-centre at the main entrance is small, free and genuinely good on how the engineering works.",
        ],
      },
      {
        heading: "Part of the World Heritage site",
        paragraphs: [
          "Al Ain Oasis is one of the components of the Cultural Sites of Al Ain, inscribed by UNESCO in 2011. Al Jahili Fort, Qasr Al Muwaiji and the Hili archaeological park are the others, and all are within a few minutes' drive.",
        ],
      },
    ],
    highlights: [
      "Around 147,000 date palms, still farmed",
      "Working Iron Age falaj irrigation channels",
      "Free, shaded and noticeably cooler than the city",
      "Part of the UAE's only UNESCO World Heritage listing",
    ],
    gate: { kind: "free", note: "Free entry, including the eco-centre." },
    hours: "Daily, roughly 09:00–17:00 for the eco-centre; walkways open longer",
    bestTime: "Morning, any month — the canopy keeps it usable even in summer",
    timeNeeded: "1.5 hours",
    gettingThere:
      "Central Al Ain beside the Al Ain Palace Museum, about 90 minutes from Abu Dhabi and just under two hours from Dubai. Free parking.",
    nearby: ["al-jahili-fort", "al-ain-zoo", "hili-archaeological-park"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 24.2170, lng: 55.7620 },
    faqs: [
      {
        q: "Is Al Ain Oasis free?",
        a: "Yes, entry and the eco-centre cost nothing. It is also one of the few outdoor attractions in the country that works in summer, because the palm canopy shades the whole route.",
      },
      {
        q: "What is a falaj?",
        a: "An underground channel that moves groundwater from higher ground to a plantation by gravity, with no pumping. The Al Ain system is around three thousand years old and parts of it still supply the oasis today.",
      },
    ],
    metaTitle: "Al Ain Oasis | Free UNESCO Site, Falaj Channels & Walks",
    metaDescription:
      "Al Ain Oasis: 147,000 date palms, working 3,000-year-old falaj irrigation, shaded walks and free entry. Part of the UAE's only UNESCO listing.",
    checked: "2026-09-18",
    keywords: ["al ain oasis", "al ain farm visit", "al ain tourist places free", "things to do in al ain", "al alain uae"],
  },
  {
    slug: "al-ain-zoo",
    name: "Al Ain Zoo",
    emirate: "abu-dhabi",
    area: "Al Ain, below Jebel Hafeet",
    categories: ["wildlife", "family", "kids"],
    tagline: "400 hectares, a serious Arabian oryx programme, and a desert safari on site",
    summary:
      "The largest zoo in the UAE and by some distance the most substantial: four hundred hectares holding around four thousand animals, with a genuine conservation record on the Arabian oryx and a resort-style desert safari across open range within the grounds.",
    sections: [
      {
        heading: "Why it is better than you expect",
        paragraphs: [
          "Al Ain Zoo has been part of the programme that brought the Arabian oryx back from extinction in the wild, and the enclosures reflect a park that thinks about conservation rather than display. The African section runs large mixed-species open ranges rather than individual pens, and the Sheikh Zayed Desert Learning Centre on site is a serious museum of desert ecology in its own right.",
          "The Al Ain Safari is a separate ticketed drive-through across 217 hectares of open range — the largest of its kind outside Africa — with giraffe, oryx, and white rhino.",
        ],
      },
      {
        heading: "Doing it with children",
        paragraphs: [
          "The distances are real: four hundred hectares is not walkable end to end with small children in the heat. The land train covers the main loop and is worth the extra. Arrive at opening when the animals are active, and plan on half a day rather than a whole one unless you add the safari.",
        ],
      },
    ],
    highlights: [
      "400 hectares and around 4,000 animals",
      "Leading Arabian oryx conservation programme",
      "Al Ain Safari drive-through across 217 hectares of open range",
      "Sheikh Zayed Desert Learning Centre included",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 30,
      childFrom: 10,
      note: "Basic entry. The Al Ain Safari drive and the land train are ticketed separately. Under-3s free.",
    },
    hours: "Daily, roughly 09:00–20:00; shorter in summer",
    bestTime: "At opening, October to April",
    timeNeeded: "Half a day, a full day with the safari",
    gettingThere:
      "Southern Al Ain on the Jebel Hafeet road, about 15 minutes from the city centre. Free parking.",
    nearby: ["jebel-hafeet", "al-ain-oasis", "hili-fun-city"],
    accent: "palm",
    motif: "dune",
    geo: { lat: 24.1760, lng: 55.7380 },
    faqs: [
      {
        q: "How much is Al Ain Zoo?",
        a: "Around AED 30 for adults and AED 10 for children, with under-3s free. The Al Ain Safari drive-through and the land train are extra.",
      },
      {
        q: "Is Al Ain Zoo better than Dubai Safari Park?",
        a: "Yes, on almost every count — it is far larger, has a real conservation programme behind it, and is open all year rather than seasonally. The trade is the drive: Al Ain is around ninety minutes from Dubai.",
      },
    ],
    metaTitle: "Al Ain Zoo | Tickets, the Safari Drive & What to See",
    metaDescription:
      "Al Ain Zoo: 400 hectares, 4,000 animals, the Arabian oryx programme and the Al Ain Safari open-range drive. Ticket prices and how long to allow.",
    checked: "2026-09-18",
    keywords: ["al ain zoo", "things to do in al ain", "alain in uae"],
  },
];
