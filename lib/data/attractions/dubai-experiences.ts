/**
 * Dubai beyond the skyline — the old town, the seasonal gardens, the waterpark
 * and the mountain exclave at Hatta.
 *
 * Gate prices checked September 2026. Two of these are seasonal and shut for
 * the summer; the `hours` field says so rather than leaving a visitor to
 * discover it at the gate.
 */

import type { Attraction } from "./types";

export const dubaiExperiences: Attraction[] = [
  {
    slug: "al-fahidi-historic-district",
    name: "Al Fahidi Historic District & the Creek souks",
    emirate: "dubai",
    area: "Al Fahidi / Bur Dubai, on the Creek",
    categories: ["culture", "souks", "family"],
    tagline: "Wind-tower lanes, a one-dirham abra crossing and the gold souk on the far bank",
    summary:
      "The coral-and-gypsum quarter behind Bur Dubai's waterfront is the oldest surviving piece of the city, built in the late nineteenth century and restored rather than rebuilt. Crossing the Creek by abra to the Deira souks costs one dirham and is the best-value thing you will do in Dubai.",
    sections: [
      {
        heading: "Walking Al Fahidi",
        paragraphs: [
          "The lanes are deliberately narrow and the wind towers above them are pre-electric air conditioning: they catch whatever breeze is moving and drop it into the rooms below. The quarter now holds small museums, courtyard cafés and the Sheikh Mohammed Centre for Cultural Understanding, which runs sit-down meals where the whole point is that you ask the awkward questions about religion, dress and local life.",
          "Al Fahidi Fort at the edge of the district, built around 1787, houses the Dubai Museum and is the oldest building in the city.",
        ],
      },
      {
        heading: "The abra and the souks",
        paragraphs: [
          "Wooden abras run continuously from Bur Dubai Souk station across to Deira Old Souk. There is no ticket office and no timetable — you sit down, the boat leaves when it is full, and you hand a single dirham to the driver mid-crossing. The whole thing takes five minutes.",
          "On the Deira bank the Spice Souk comes first, then the Gold Souk a few streets north. Gold is sold by weight at a rate posted daily, so the negotiation is over the making charge rather than the metal. In the Spice Souk, prices for saffron and frankincense are quoted high to tourists as a matter of routine and settle at roughly half after a polite back-and-forth.",
        ],
      },
    ],
    highlights: [
      "Nineteenth-century wind-tower architecture, restored in situ",
      "Abra across the Creek for AED 1, running all day",
      "Spice Souk and Gold Souk on the Deira bank",
      "Cultural meals at the Sheikh Mohammed Centre for Cultural Understanding",
    ],
    gate: {
      kind: "free",
      note: "The district, the souks and the lanes are free. The abra is AED 1 per crossing; Al Fahidi Fort charges a small museum entry.",
    },
    hours: "Lanes open at all hours; souks roughly 10:00–22:00 with an afternoon lull",
    bestTime: "Early morning or after 16:00, October to April",
    timeNeeded: "Half a day including both banks",
    gettingThere:
      "Al Fahidi metro on the Green Line, then a five-minute walk towards the water. Return from Deira on the Green Line at Al Ras.",
    nearby: ["dubai-frame", "dubai-fountain", "burj-khalifa"],
    accent: "gold",
    motif: "arch",
    image: "/images/abra-fahidi.jpg",
    alt: "A wooden abra crossing Dubai Creek towards the Bur Dubai bank",
    geo: { lat: 25.2637, lng: 55.2972 },
    faqs: [
      {
        q: "How much is the abra across Dubai Creek?",
        a: "One dirham, paid in cash to the driver once the boat is moving. There is no ticket and no card machine, so carry a coin.",
      },
      {
        q: "Should I buy gold in the Gold Souk?",
        a: "The metal price is fixed and posted daily, so nobody can overcharge you for the gold itself. What varies is the making charge, and that is negotiable. Ask for the piece to be weighed in front of you and ask for the certificate.",
      },
      {
        q: "Is Old Dubai safe to walk at night?",
        a: "Yes. It is busy, well lit and heavily policed, and the souks are at their best after dark once the afternoon heat has gone.",
      },
    ],
    metaTitle: "Al Fahidi & Dubai Creek Souks | Old Dubai Walking Guide",
    metaDescription:
      "Walk Al Fahidi's wind-tower lanes, cross Dubai Creek by abra for one dirham and haggle in the Gold and Spice Souks. Free to do, best after four.",
    checked: "2026-09-18",
  },
  {
    slug: "global-village",
    name: "Global Village",
    emirate: "dubai",
    area: "Sheikh Mohammed Bin Zayed Road, Dubailand",
    categories: ["family", "shopping", "events", "kids"],
    tagline: "Ninety country pavilions, a funfair and the cheapest ticket in Dubai",
    summary:
      "A seasonal open-air park where each pavilion is a country selling its own food, textiles and tat, wrapped around a funfair, a stunt arena and a nightly firework. It runs from about October to April, entry is around twenty dirhams, and it is where Dubai's own residents go on a Friday night.",
    sections: [
      {
        heading: "What it actually is",
        paragraphs: [
          "Calling it a theme park undersells and oversells it at once. It is a very large market organised by nationality — a Turkish pavilion selling lamps and lokum next to a Yemeni one selling honey next to an Indian one that is effectively a covered bazaar. The quality ranges from genuinely good regional food to mass-produced souvenirs, and half the pleasure is in the sorting.",
          "Around the pavilions sit a fairground with over a hundred rides, a stunt arena, several stages running free shows through the evening, and a street-food quarter with a few hundred stalls.",
        ],
      },
      {
        heading: "Doing it well",
        paragraphs: [
          "Arrive at opening rather than at eight, when the car parks back up onto the motorway. Bring cash for the smaller stalls. Budget two to three hours minimum; people routinely underestimate the scale and leave having seen a third of it.",
          "It closes entirely for the summer. If you are visiting between May and September it is not an option, and nothing else in Dubai replaces it.",
        ],
      },
    ],
    highlights: [
      "Around 90 country pavilions, each independently run",
      "Over a hundred funfair rides and a stunt arena",
      "Hundreds of street-food stalls at genuinely local prices",
      "Free stage shows and a firework most evenings",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 20,
      childFrom: null,
      note: "Gate entry only; rides and food are paid separately. Combo tickets with Miracle Garden run around AED 110.",
    },
    hours: "Seasonal, roughly late October to late April. Closed for the summer.",
    bestTime: "Weekday evenings from opening; weekends are extremely busy",
    timeNeeded: "3–4 hours",
    gettingThere:
      "No metro. Taxi, ride-hailing or the shuttle buses from several metro stations; driving is fine on a weekday and grim on a weekend.",
    nearby: ["dubai-miracle-garden", "burj-khalifa"],
    accent: "coral",
    motif: "garden",
    geo: { lat: 25.0700, lng: 55.3080 },
    faqs: [
      {
        q: "Is Global Village open in summer?",
        a: "No. It is an open-air park and it closes completely, usually from late April to late October. Check the season dates before planning a trip around it.",
      },
      {
        q: "How much money should I take to Global Village?",
        a: "Entry is about twenty dirhams. Realistically budget AED 150–250 per person on top for food, a few rides and whatever you end up buying in the pavilions.",
      },
    ],
    metaTitle: "Global Village Dubai | Season Dates & Ticket Prices",
    metaDescription:
      "Global Village entry price, season dates, how long to allow and why it closes in summer. Ninety country pavilions, a funfair and cheap street food.",
    checked: "2026-09-18",
  },
  {
    slug: "dubai-miracle-garden",
    name: "Dubai Miracle Garden",
    emirate: "dubai",
    area: "Al Barsha South, Dubailand",
    categories: ["nature", "family", "kids"],
    tagline: "Fifty million flowers arranged into an Airbus A380, in a desert",
    summary:
      "A seasonal flower park built around structures — an A380 covered in petunias, arched floral tunnels, a castle, a Disney installation — rather than borders and beds. It is unapologetically artificial and, photographed well, is one of the most striking places in the city.",
    sections: [
      {
        heading: "The point of it",
        paragraphs: [
          "Miracle Garden makes no attempt to look like a natural garden and is better for it. The centrepiece is a full-size Airbus A380 airframe planted over its entire surface, which held a world record for the largest floral installation. Around it run tunnels, domes, hearts and an amphitheatre, all replanted each season.",
          "The Butterfly Garden next door is a separate ticket and a separate building — nine domes of live butterflies, and a reliable hit with younger children when the heat outside becomes too much.",
        ],
      },
      {
        heading: "When to go",
        paragraphs: [
          "Like Global Village it is seasonal and shuts through the summer, since neither the flowers nor the visitors survive June outdoors. Go at opening or in the last two hours of the day: the light is better and the installations are not three deep in people.",
        ],
      },
    ],
    highlights: [
      "Full-size Airbus A380 planted over its whole surface",
      "Floral tunnels, domes and an amphitheatre, replanted each season",
      "Butterfly Garden next door on a separate ticket",
      "Combo ticket with Global Village saves on buying both",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 89,
      childFrom: null,
      note: "Butterfly Garden is a separate ticket. A Miracle Garden + Global Village combo runs around AED 110.",
    },
    hours: "Seasonal, roughly mid-November to late May. Closed through the summer.",
    bestTime: "Opening time or the final two hours; avoid weekend afternoons",
    timeNeeded: "2 hours",
    gettingThere:
      "Mall of the Emirates metro then a taxi, or drive — there is a large free car park. No direct metro.",
    nearby: ["global-village", "palm-jumeirah"],
    accent: "coral",
    motif: "garden",
    image: "/images/miracle-garden.jpg",
    alt: "Arched floral tunnels planted with dense rows of flowers at Dubai Miracle Garden",
    geo: { lat: 25.0595, lng: 55.2437 },
    faqs: [
      {
        q: "When is Dubai Miracle Garden open?",
        a: "Seasonally, roughly from the middle of November until the end of May. It closes entirely for the summer because the planting cannot survive it.",
      },
      {
        q: "Is the Butterfly Garden included?",
        a: "No, it is a separate ticket and a separate entrance next door. Worth adding if you have children under ten; skippable otherwise.",
      },
    ],
    metaTitle: "Dubai Miracle Garden | Season, Tickets & the A380 of Flowers",
    metaDescription:
      "Dubai Miracle Garden opening season, ticket prices, the flower-covered Airbus A380 and whether the Butterfly Garden next door is worth adding.",
    checked: "2026-09-18",
  },
  {
    slug: "hatta",
    name: "Hatta",
    emirate: "dubai",
    area: "Hajar Mountains, Dubai exclave",
    categories: ["adventure", "nature", "family", "camping"],
    tagline: "Dubai's mountain exclave — a turquoise dam, a restored village and no skyline",
    summary:
      "An hour and a half inland, Hatta is administratively Dubai and geographically another country: dry riverbeds, bare Hajar peaks and a dam whose water is an implausible turquoise. Kayaking on the reservoir, mountain biking and a heritage village fill a very good day trip.",
    sections: [
      {
        heading: "The dam and the water",
        paragraphs: [
          "Hatta Dam holds back a reservoir between steep rock walls, and the colour comes from minerals in the surrounding geology rather than anything added. Kayaks, pedalos and small electric boats are hired by the hour from the shore, and the water is calm enough for complete beginners.",
          "There is no swimming — it is a drinking-water reservoir — and that rule is enforced.",
        ],
      },
      {
        heading: "The rest of the day",
        paragraphs: [
          "Hatta Heritage Village reconstructs a fortified mountain settlement with watchtowers, a mosque and traditional houses, and is free. Above it a network of graded mountain-bike trails runs from family-easy to genuinely technical, with bikes for hire at the trailhead.",
          "The drive itself passes through Omani territory on some routes, so carry passports; the main road from Dubai now stays inside the UAE the whole way, but signage changes and it is worth confirming on the day.",
        ],
      },
    ],
    highlights: [
      "Hatta Dam — kayaks and pedalos on turquoise water",
      "Free heritage village with restored watchtowers",
      "Graded mountain-bike trail network with hire on site",
      "Cooler than the coast by several degrees year round",
    ],
    gate: {
      kind: "free",
      note: "The dam, the village and the trails are free. Kayak and bike hire are paid on site by the hour.",
    },
    hours: "Daylight hours; kayak hire typically 08:00–18:00",
    bestTime: "October to April; winter mornings are cool enough for the trails",
    timeNeeded: "A full day from Dubai",
    gettingThere:
      "About 130 km by road from Downtown Dubai, roughly 90 minutes. No public transport worth the name — drive or take a tour.",
    nearby: ["al-fahidi-historic-district"],
    accent: "palm",
    motif: "mountain",
    image: "/images/hatta-oasis.jpg",
    alt: "Still turquoise water below the bare rock walls of the Hajar Mountains at Hatta",
    geo: { lat: 24.7967, lng: 56.1180 },
    faqs: [
      {
        q: "Can you swim at Hatta Dam?",
        a: "No. It is a drinking-water reservoir and swimming is prohibited. Kayaking, pedalos and electric boats are the way onto the water.",
      },
      {
        q: "Do I need a passport to drive to Hatta?",
        a: "The main route from Dubai stays inside the UAE, but some approaches clip Omani territory. Carry passports for the day — it costs nothing and avoids being turned back at a post.",
      },
    ],
    metaTitle: "Hatta Dubai | Dam Kayaking, Trails & Day Trip Guide",
    metaDescription:
      "Hatta day trip from Dubai: kayaking on the turquoise dam, the free heritage village, mountain-bike trails, drive time and whether you need a passport.",
    checked: "2026-09-18",
  },
];
