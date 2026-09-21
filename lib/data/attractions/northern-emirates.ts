/**
 * Ras Al Khaimah, Fujairah and Umm Al Quwain — the mountain and east-coast
 * emirates, plus the one nobody plans a trip around.
 *
 * Two of these are seasonal for reasons of heat rather than demand, and the
 * east coast sits on the Gulf of Oman rather than the Arabian Gulf, which is
 * why the diving there is worth the drive.
 *
 * Gate prices checked September 2026.
 */

import type { Attraction } from "./types";

export const northernEmirateAttractions: Attraction[] = [
  {
    slug: "jebel-jais",
    name: "Jebel Jais",
    emirate: "ras-al-khaimah",
    area: "Hajar Mountains, Ras Al Khaimah",
    categories: ["adventure", "nature", "camping"],
    tagline: "The UAE's highest peak, and a 2.8 km zipline down the side of it",
    summary:
      "At roughly 1,934 metres Jebel Jais is the highest point in the country, reached by a serpentine road that is itself worth the drive. The Jais Flight zipline runs 2.8 kilometres down the mountain at speeds above 120 km/h and holds the record for the world's longest.",
    sections: [
      {
        heading: "The mountain",
        paragraphs: [
          "The road up is a sequence of engineered switchbacks with viewing decks cut into the bends, and the temperature drops noticeably as you climb — in winter the summit can sit ten degrees below the coast, and frost is not unknown. There is a viewing park near the top with terraced seating, a café and the best sunset in the country.",
          "The walking is real walking: marked trails of several grades, exposed rock, no shade. Take more water than you think and start early.",
        ],
      },
      {
        heading: "Jais Flight and the sled",
        paragraphs: [
          "The zipline launches you prone from a platform near the summit and covers 2.8 kilometres in about three minutes, with a mid-station where you are unclipped and sent down a second leg. Minimum and maximum weights apply and the whole thing is weather-dependent.",
          "It closes for part of the summer — typically from around May to October — because the heat makes the launch platform unworkable. The season generally runs October through April, so check before building a trip around it.",
        ],
      },
    ],
    highlights: [
      "The UAE's highest peak at about 1,934 m",
      "Jais Flight — 2.8 km, over 120 km/h, a Guinness World Record holder",
      "Viewing park, terraced café and the country's best sunset",
      "Graded hiking trails and a mountain toboggan run",
    ],
    gate: {
      kind: "free",
      note: "The mountain road and viewing park are free. Jais Flight zipline tickets start around AED 325; weight and age limits apply.",
    },
    hours:
      "Road and viewing park open daily. Zipline season is roughly October to April — it closes through the summer heat.",
    bestTime: "November to March, for the temperature and for the zipline season",
    timeNeeded: "A full day from Dubai",
    gettingThere:
      "About 170 km from Dubai, roughly two hours by road, the last 30 km climbing. Own vehicle or a booked tour; nothing public goes up.",
    nearby: ["al-bidyah-mosque", "snoopy-island"],
    accent: "palm",
    motif: "mountain",
    geo: { lat: 25.9350, lng: 56.1350 },
    faqs: [
      {
        q: "Is the Jebel Jais zipline open in summer?",
        a: "Usually not. It closes for roughly May to October because of the heat on the launch platform, with the season running October to April. Confirm before travelling — the closure dates shift year to year.",
      },
      {
        q: "Do you have to pay to drive up Jebel Jais?",
        a: "No. The road and the viewing park at the top are free. Only the zipline, the toboggan and the paid activities charge.",
      },
    ],
    metaTitle: "Jebel Jais | World's Longest Zipline & Free Viewpoints",
    metaDescription:
      "Jebel Jais visitor guide: the free mountain road and viewing park, Jais Flight zipline prices and season dates, drive time from Dubai and when to go.",
    checked: "2026-09-18",
  },
  {
    slug: "al-bidyah-mosque",
    name: "Al Bidyah Mosque",
    emirate: "fujairah",
    area: "Al Bidyah, north of Fujairah city",
    categories: ["culture"],
    tagline: "The oldest mosque in the UAE, built around 1446, still in use",
    summary:
      "A small mud-and-stone mosque on the east coast, dated to roughly 1446 and the oldest known in the country. Four domes rest on a single central pillar, the whole building is about fifty square metres, and it is free to visit. Watchtowers on the hill behind it look out over the Gulf of Oman.",
    sections: [
      {
        heading: "The building",
        paragraphs: [
          "The structure is deceptively clever: four shallow domes carried on one internal pillar, built from stone, mud brick and gypsum with no timber in the roof at all. There is no minaret — the call to prayer was made from the roof — and the prayer niche and pulpit are cut directly into the wall.",
          "It is still an active mosque, so visits fit around prayer times and visitors cover up as they would anywhere else. Shoes come off at the door.",
        ],
      },
      {
        heading: "What else is there",
        paragraphs: [
          "Two restored watchtowers sit on the rock above the mosque, reached by a short scramble, and the view takes in the coastal plain and the sea. A small visitor centre at the base covers the excavation, which turned up pottery and metalwork indicating the site was occupied long before the mosque was built.",
        ],
      },
    ],
    highlights: [
      "Oldest known mosque in the UAE, dated to around 1446",
      "Four domes carried on a single internal pillar",
      "Free to enter and still in active use",
      "Restored watchtowers on the hill behind, with sea views",
    ],
    gate: {
      kind: "free",
      note: "Free. Visits pause during the five daily prayers; dress as you would for any mosque.",
    },
    hours: "Daylight hours, outside prayer times",
    bestTime: "Winter mornings, combined with the east coast beaches",
    timeNeeded: "45 minutes",
    gettingThere:
      "On the east coast road between Khor Fakkan and Dibba, about two hours from Dubai across the Hajar range. Own vehicle.",
    nearby: ["snoopy-island", "jebel-jais"],
    accent: "sun",
    motif: "dome",
    geo: { lat: 25.4419, lng: 56.3567 },
    faqs: [
      {
        q: "Can non-Muslims enter Al Bidyah Mosque?",
        a: "Yes, outside prayer times and dressed appropriately — covered shoulders, knees and ankles, hair covered for women, shoes off at the door.",
      },
      {
        q: "Is there an entry fee?",
        a: "No. The mosque, the watchtowers and the small visitor centre are all free.",
      },
    ],
    metaTitle: "Al Bidyah Mosque | The UAE's Oldest Mosque, Free Entry",
    metaDescription:
      "Al Bidyah Mosque near Fujairah, built around 1446 and the oldest in the UAE. Free entry, visiting rules, the watchtowers behind it and how to get there.",
    checked: "2026-09-18",
  },
  {
    slug: "snoopy-island",
    name: "Snoopy Island, Al Aqah",
    emirate: "fujairah",
    area: "Al Aqah, Fujairah east coast",
    categories: ["beaches", "waterparks", "camping"],
    tagline: "Reef snorkelling straight off a public beach, with turtles and reef sharks",
    summary:
      "A rock formation a couple of hundred metres off the beach at Al Aqah, named for its resemblance to a certain reclining dog, and ringed by the most accessible coral reef in the UAE. You swim out from a free public beach; no boat, no dive charter, no ticket.",
    sections: [
      {
        heading: "What you will see",
        paragraphs: [
          "The reef around the rock holds hard and soft coral, clownfish, parrotfish, moray eels and rays, and green turtles are common enough that most snorkellers see one. Blacktip reef sharks patrol the deeper side and are harmless to swimmers. Visibility is best in the calmer winter months.",
          "This is the Gulf of Oman rather than the Arabian Gulf, which is why the water is cooler, clearer and richer than anything on the Dubai side of the country.",
        ],
      },
      {
        heading: "Doing it safely",
        paragraphs: [
          "The swim out is around two hundred metres over open water with no lifeguard beyond the beach line, and currents pick up on the far side of the rock. Fins make it comfortable; a float or a buddy makes it sensible. Dive centres at the hotels on the strip rent gear and run guided snorkel and scuba trips for anyone who would rather not swim out cold.",
          "The public beach is free. The hotel day passes on the same stretch buy a pool, a lounger and a shower rather than better access to the reef.",
        ],
      },
    ],
    highlights: [
      "Coral reef reachable by swimming from a free public beach",
      "Green turtles, reef sharks, rays and moray eels",
      "Cooler, clearer Gulf of Oman water",
      "Dive centres on the strip for gear hire and guided trips",
    ],
    gate: {
      kind: "free",
      note: "The public beach and the swim out are free. Snorkel hire, dive trips and hotel day passes are the paid options.",
    },
    hours: "Daylight hours; no gate",
    bestTime: "October to April for visibility and sea temperature",
    timeNeeded: "Half a day",
    gettingThere:
      "Al Aqah on the east coast, about two hours from Dubai over the mountains. Own vehicle; parking along the beach road.",
    nearby: ["al-bidyah-mosque", "jebel-jais"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.5030, lng: 56.3600 },
    faqs: [
      {
        q: "Is Snoopy Island free?",
        a: "Yes. The beach is public and the reef is reached by swimming out. Only gear hire, guided dives and hotel day passes cost anything.",
      },
      {
        q: "Are the sharks at Snoopy Island dangerous?",
        a: "No. They are blacktip reef sharks, typically under a metre and a half, and they avoid swimmers. The genuine hazards are the current on the far side of the rock and the distance from shore.",
      },
    ],
    metaTitle: "Snoopy Island Fujairah | Free Reef Snorkelling & Turtles",
    metaDescription:
      "Snorkelling at Snoopy Island, Al Aqah: a free public beach, a reef you swim to, turtles and reef sharks, and the safety points nobody mentions.",
    checked: "2026-09-18",
  },
  {
    slug: "dreamland-aqua-park",
    name: "Dreamland Aqua Park",
    emirate: "umm-al-quwain",
    area: "Emirates Road, Umm Al Quwain",
    categories: ["waterparks", "family", "kids"],
    tagline: "A 250,000 m² waterpark in the quietest emirate, at half the Dubai price",
    summary:
      "One of the largest waterparks in the region by area, sitting on the coast road in Umm Al Quwain with more than thirty rides, a wave pool, a lazy river and camping on site. It is older and less polished than the Dubai parks and priced accordingly, which is the whole argument for it.",
    sections: [
      {
        heading: "What it is and is not",
        paragraphs: [
          "Dreamland does not compete with Aquaventure on ride engineering and does not try to. What it has is space — a quarter of a million square metres of it — so queues are short, there is grass to sit on, and a family can spend a day without being pressed against anyone. There is a wave pool, a large lazy river, multi-lane racers, a go-kart track and a separate children's area.",
          "Facilities show their age in places. If that matters more to you than price and space, the Dubai parks are ninety minutes south.",
        ],
      },
      {
        heading: "Camping and the lagoon",
        paragraphs: [
          "The site runs overnight camping and has its own stretch of shallow lagoon, which makes it one of the few UAE waterparks you can stay at rather than just visit. Weekends fill; weekdays are close to empty outside school holidays.",
        ],
      },
    ],
    highlights: [
      "Over 30 rides across 250,000 m²",
      "Wave pool, lazy river and a dedicated children's area",
      "Overnight camping on site",
      "Materially cheaper than the Dubai waterparks",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 145,
      childFrom: null,
      note: "Gate price varies by day and season; weekday tickets are the cheapest. Confirm before travelling.",
    },
    hours: "Daily, roughly 10:00–18:00; shorter in winter",
    bestTime: "October to May, on a weekday",
    timeNeeded: "A full day",
    gettingThere:
      "On the coast road in Umm Al Quwain, about an hour from Dubai. Own vehicle; no useful public transport.",
    nearby: ["ajman-museum", "al-noor-island"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.6197, lng: 55.6667 },
    faqs: [
      {
        q: "Is Dreamland better than the Dubai waterparks?",
        a: "Not on rides or finish. It wins on space, queue length and price, and it lets you camp overnight. For a family on a budget, that trade is often the right one.",
      },
    ],
    metaTitle: "Dreamland Aqua Park Umm Al Quwain | Tickets & Camping",
    metaDescription:
      "Dreamland Aqua Park in Umm Al Quwain: ticket prices, over 30 rides across 250,000 m², on-site camping, and how it compares to the Dubai waterparks.",
    checked: "2026-09-18",
  },
];
