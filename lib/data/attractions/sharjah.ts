/**
 * Sharjah and Ajman — the two emirates most visitors drive past.
 *
 * Sharjah is the UAE's culture capital by policy as well as by reputation, and
 * its museum entry fees are a fraction of Dubai's. It is also dry: no alcohol
 * is served or sold anywhere in the emirate, which is worth knowing before a
 * dinner plan rather than after.
 *
 * Gate prices checked September 2026.
 */

import type { Attraction } from "./types";

export const sharjahAttractions: Attraction[] = [
  {
    slug: "al-noor-island",
    name: "Al Noor Island",
    emirate: "sharjah",
    area: "Khalid Lagoon, Sharjah",
    categories: ["nature", "family"],
    tagline: "A sculpture park and butterfly house on an island in the lagoon",
    summary:
      "A landscaped island in Khalid Lagoon reached by footbridge, laid out as a walk through light installations, planted terraces and a domed butterfly house holding around five hundred live butterflies. It is small, deliberately slow, and best after dark.",
    sections: [
      {
        heading: "The walk",
        paragraphs: [
          "The island is designed as a single looping route rather than a set of attractions, and it takes about an hour if you do not rush it. Literature Pavilion, a sculpted seating structure, sits at one end; the OVO installation, a mirrored form that catches the lagoon lights, sits at another. Between them run shaded paths, water features and planting that manages to look unforced.",
          "Lighting is the point. The installations are designed to be read at night, and the island is at its best from an hour after sunset.",
        ],
      },
      {
        heading: "The Butterfly House",
        paragraphs: [
          "A separate ticket buys entry to a climate-controlled dome with roughly five hundred butterflies across a few dozen species, free-flying around visitors. It takes twenty minutes and is the part children remember.",
        ],
      },
    ],
    highlights: [
      "Light and sculpture installations designed to be seen after dark",
      "Butterfly House with around 500 free-flying butterflies",
      "Reached on foot by bridge from the Sharjah corniche",
      "Entry costs a fraction of comparable Dubai attractions",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 35,
      childFrom: 20,
      note: "Child rate covers ages 2–13. The Butterfly House is a separate ticket, around AED 15 adult.",
    },
    hours: "Daily, typically 09:00–23:00 with later weekend closing",
    bestTime: "After sunset, October to April",
    timeNeeded: "1.5 hours including the Butterfly House",
    gettingThere:
      "About 30 minutes from Dubai Deira by road. Park on the Sharjah corniche and cross the footbridge; there is no metro in Sharjah.",
    nearby: ["sharjah-museum-of-islamic-civilization", "ajman-museum"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 25.3372, lng: 55.3860 },
    faqs: [
      {
        q: "Is Al Noor Island worth the drive from Dubai?",
        a: "On its own, not really — it is an hour's walk. Paired with the Museum of Islamic Civilization and dinner on the Sharjah corniche it makes a good half-day, and the whole thing costs less than one Dubai attraction.",
      },
      {
        q: "Can you buy alcohol in Sharjah?",
        a: "No. Sharjah is dry throughout — no bars, no licensed restaurants, no shops. Plan dinner accordingly.",
      },
    ],
    metaTitle: "Al Noor Island Sharjah | Tickets, Butterfly House & Timings",
    metaDescription:
      "Al Noor Island entry prices, the Butterfly House ticket, opening hours and why the light installations are worth seeing after dark rather than by day.",
    checked: "2026-09-18",
  },
  {
    slug: "sharjah-museum-of-islamic-civilization",
    name: "Sharjah Museum of Islamic Civilization",
    emirate: "sharjah",
    area: "Corniche Street, Al Majarrah",
    categories: ["culture"],
    tagline: "Five thousand objects across the Islamic world, for the price of a coffee",
    summary:
      "Housed in a converted souk on the Sharjah waterfront, with a golden dome over the central hall and around five thousand artefacts spanning astronomy, manuscripts, ceramics and coinage. At AED 10 it is the best-value museum in the country by a wide margin.",
    sections: [
      {
        heading: "What is in it",
        paragraphs: [
          "The ground floor takes the science seriously: astrolabes, surgical instruments, navigational tables and the mathematics that came with them, presented as working technology rather than as curiosities. Upstairs the galleries run chronologically through the arts of the Islamic world — Persian ceramics, Mamluk metalwork, Ottoman textiles, Qur'anic manuscripts.",
          "The central hall sits under a golden dome whose interior is painted with the zodiac as Arab astronomers mapped it, which is worth standing under for a minute before moving on.",
        ],
      },
      {
        heading: "Why Sharjah has this",
        paragraphs: [
          "Sharjah has spent four decades funding museums and heritage restoration as deliberate policy, and was named a capital of Islamic culture for it. The result is a dozen serious museums within a few kilometres of each other, almost all at entry prices under AED 20.",
        ],
      },
    ],
    highlights: [
      "Around 5,000 objects across science, manuscripts, ceramics and coins",
      "Golden dome painted with the Arab zodiac over the central hall",
      "Adult entry AED 10 — the cheapest serious museum in the UAE",
      "Ten minutes from a dozen other Sharjah museums",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 10,
      childFrom: 5,
      note: "Child rate covers ages 2–12. Under-2s free.",
    },
    hours: "Saturday–Thursday 08:00–20:00, Friday 16:00–20:00",
    bestTime: "Weekday mornings; it is rarely crowded at any hour",
    timeNeeded: "2 hours",
    gettingThere:
      "On the Sharjah corniche, about 25 minutes from Dubai Deira. Drive or take a taxi; Sharjah has no metro.",
    nearby: ["al-noor-island", "ajman-museum"],
    accent: "gold",
    motif: "dome",
    geo: { lat: 25.3573, lng: 55.3838 },
    faqs: [
      {
        q: "How much is Sharjah Museum of Islamic Civilization?",
        a: "AED 10 for adults and AED 5 for children aged two to twelve. Under-twos are free.",
      },
      {
        q: "Is it open on Fridays?",
        a: "Yes, but only in the afternoon — typically from four until eight, after Friday prayers.",
      },
    ],
    metaTitle: "Sharjah Museum of Islamic Civilization | AED 10 Entry Guide",
    metaDescription:
      "Sharjah Museum of Islamic Civilization entry fee, opening hours including Friday afternoons, and what is in its science, manuscript and ceramics galleries.",
    checked: "2026-09-18",
  },
  {
    slug: "mleiha-archaeological-centre",
    name: "Mleiha Archaeological Centre",
    emirate: "sharjah",
    area: "Mleiha, central Sharjah desert",
    categories: ["culture", "adventure", "camping"],
    tagline: "125,000 years of human settlement, built over the dig itself",
    summary:
      "An interpretation centre in the Sharjah desert built directly over an Umm an-Nar period tomb, anchoring a landscape of Bronze Age burials, pre-Islamic fortresses and the site of some of the earliest evidence of humans leaving Africa. It also runs the desert activities — dune drives, stargazing, overnight camps.",
    sections: [
      {
        heading: "The archaeology",
        paragraphs: [
          "Stone tools recovered at Jebel Faya nearby have been dated to roughly 125,000 years ago, which places human presence here far earlier than the previously accepted routes out of Africa allowed. The centre presents that argument properly, with the finds, rather than gesturing at it.",
          "Outside, the landscape holds a third-century BCE fort, Iron Age falaj irrigation traces, and camel and horse burials from the pre-Islamic period. Guided tours reach sites you would drive straight past.",
        ],
      },
      {
        heading: "The desert side",
        paragraphs: [
          "The same centre books dune drives, sunrise and sunset treks up Fossil Rock, stargazing sessions run away from city light, and overnight camps. It is a quieter and more serious alternative to the Dubai safari circuit, and considerably less staged.",
        ],
      },
    ],
    highlights: [
      "Built over an Umm an-Nar period tomb, visible from inside",
      "Finds connected to the earliest human migration out of Africa",
      "Guided archaeology tours across the surrounding desert",
      "Stargazing, Fossil Rock treks and overnight camps",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 25,
      childFrom: null,
      note: "Centre entry only. Guided tours, dune drives, stargazing and camps are priced separately and should be booked ahead.",
    },
    hours: "Daily, roughly 09:00–19:00; activity times vary by season",
    bestTime: "October to March; stargazing needs a clear, moonless night",
    timeNeeded: "2 hours for the centre, half a day with a guided tour",
    gettingThere:
      "About 70 km from Dubai, roughly an hour by road into the Sharjah interior. Own vehicle or a booked transfer; nothing public runs there.",
    nearby: ["sharjah-museum-of-islamic-civilization", "al-noor-island"],
    accent: "sun",
    motif: "dune",
    geo: { lat: 25.1258, lng: 55.8430 },
    faqs: [
      {
        q: "How old is the Mleiha site?",
        a: "Finds in the surrounding area have been dated to around 125,000 years, with dense settlement evidence from the Bronze Age through the pre-Islamic period. It is the deepest archaeological record in the UAE.",
      },
      {
        q: "Is Mleiha a good alternative to a Dubai desert safari?",
        a: "If you want the archaeology, the quiet and the stars, yes — it is far less staged. If you want dune bashing, camels and a BBQ with live shows, the Dubai safari is the product built for that.",
      },
    ],
    metaTitle: "Mleiha Archaeological Centre | Tickets & Desert Tours",
    metaDescription:
      "Mleiha Archaeological Centre entry price, what the 125,000-year-old finds actually show, and the stargazing, Fossil Rock and overnight camp options.",
    checked: "2026-09-18",
  },
  {
    slug: "ajman-museum",
    name: "Ajman Museum",
    emirate: "ajman",
    area: "Al Bustan, central Ajman",
    categories: ["culture"],
    tagline: "An eighteenth-century fort that was still the police station in 1978",
    summary:
      "The smallest emirate's museum occupies a fort built around 1775, which served as the ruler's residence and then as Ajman's police headquarters until 1978 before becoming a museum in 1981. Watchtowers, a wind tower, weapons, manuscripts and a reconstructed souk fill it.",
    sections: [
      {
        heading: "The building is the exhibit",
        paragraphs: [
          "Most UAE heritage forts are reconstructions. This one is largely original fabric — coral block and gypsum, two round watchtowers, a wind tower and a courtyard that still reads as defensive rather than decorative. Standing in the cells that were in use as recently as the late 1970s does more than any label.",
          "Inside, the collection covers pearling and fishing equipment, date cultivation, weapons, manuscripts and archaeological finds from Mowaihat, a site that produced Umm an-Nar pottery of real significance.",
        ],
      },
      {
        heading: "Worth the detour?",
        paragraphs: [
          "Ajman is twenty minutes past Sharjah, and the museum takes an hour. Combined with the corniche, the dhow yard where wooden boats are still built by hand, and the fish market, it makes a genuinely different half-day from anything on offer in Dubai.",
        ],
      },
    ],
    highlights: [
      "Fort dating from around 1775, in use as a police station until 1978",
      "Original coral-block construction, not a reconstruction",
      "Umm an-Nar period finds from the Mowaihat excavation",
      "Working dhow-building yard a few minutes away on the creek",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 5,
      childFrom: null,
      note: "Nominal entry. Confirm current hours by phone before travelling — the museum keeps short afternoon closures.",
    },
    hours: "Saturday–Thursday morning and evening sessions; Friday afternoons only",
    bestTime: "Winter mornings",
    timeNeeded: "1 hour",
    gettingThere:
      "About 45 minutes from Dubai Deira by road, via Sharjah. No rail; drive or take a taxi.",
    nearby: ["al-noor-island", "sharjah-museum-of-islamic-civilization"],
    accent: "sun",
    motif: "arch",
    geo: { lat: 25.4111, lng: 55.4406 },
    faqs: [
      {
        q: "How long do you need at Ajman Museum?",
        a: "An hour is enough for the fort and the galleries. Add the creek dhow yard and the fish market and you have a half-day in the emirate.",
      },
    ],
    metaTitle: "Ajman Museum | 1775 Fort, Entry Fee & Opening Hours",
    metaDescription:
      "Ajman Museum inside an eighteenth-century fort that served as the emirate's police station until 1978. Entry fee, hours and what else to see in Ajman.",
    checked: "2026-09-18",
  },
];
