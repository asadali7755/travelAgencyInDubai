/**
 * Abu Dhabi city beyond the mosque and the museums — the corniche, the forts,
 * the fish market and the free beaches. Checked September 2026.
 */

import type { Attraction } from "./types";

export const abuDhabiCity: Attraction[] = [
  {
    slug: "abu-dhabi-corniche",
    name: "Abu Dhabi Corniche",
    emirate: "abu-dhabi",
    area: "Corniche Road, Al Khubeirah",
    categories: ["beaches", "family", "landmarks"],
    tagline: "Eight kilometres of free waterfront with a Blue Flag beach on it",
    summary:
      "The capital's front garden: eight kilometres of landscaped promenade along the Gulf with cycle lanes, playgrounds, cafés and a Blue Flag public beach in the middle of it. Most of it is free, the beach section costs a few dirhams, and it is where Abu Dhabi actually spends its evenings.",
    sections: [
      {
        heading: "Walking it",
        paragraphs: [
          "The promenade runs the full length of the western waterfront with separated cycling and pedestrian lanes, shaded seating and a view across to Lulu Island and the Marina skyline. Bicycles hire from stands along the route. Playgrounds and free outdoor gym equipment are spaced along it, and the whole thing is lit after dark.",
          "The Corniche Beach in the middle is divided into three: a free open section, a paid family section with sunbeds and showers, and a quieter section. It holds Blue Flag status, which is an international standard for water quality and safety rather than a marketing line.",
        ],
      },
      {
        heading: "Where it sits",
        paragraphs: [
          "The Corniche is the natural centre of a day in Abu Dhabi — Qasr Al Hosn is a ten-minute walk inland, Marina Mall sits at the western end and Emirates Palace just beyond it. The best free viewpoint of the skyline is from the breakwater near the flagpole at the far western end.",
        ],
      },
    ],
    highlights: [
      "8 km of free promenade with separated cycle lanes",
      "Blue Flag public beach with free and paid sections",
      "Playgrounds, outdoor gyms and cafés along the route",
      "Free skyline viewpoint from the western breakwater",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 10,
      note: "The promenade is free. The paid family beach section is around AED 10 per adult; the open section costs nothing.",
    },
    hours: "Promenade open at all hours; beach sections roughly 08:00–20:00",
    bestTime: "October to April, late afternoon into the evening",
    timeNeeded: "Half a day",
    gettingThere:
      "Central Abu Dhabi, about 90 minutes from Dubai. No metro anywhere in the emirate — drive, taxi or the city buses.",
    nearby: ["qasr-al-hosn", "sheikh-zayed-grand-mosque", "emirates-heritage-village"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 24.4750, lng: 54.3370 },
    faqs: [
      {
        q: "Is Abu Dhabi Corniche beach free?",
        a: "Partly. The promenade and the open beach section are free; the family section with sunbeds, showers and lifeguards charges around AED 10 per adult.",
      },
      {
        q: "Can you cycle the Corniche?",
        a: "Yes, there is a separated cycle lane the full eight kilometres and hire stands along it. It is flat, well surfaced and the best way to see the whole thing in an hour.",
      },
    ],
    metaTitle: "Abu Dhabi Corniche | Free Beach, Cycle Path & Best Viewpoint",
    metaDescription:
      "Abu Dhabi Corniche: 8 km of free promenade, a Blue Flag beach, cycle hire and the best free skyline viewpoint in the capital.",
    checked: "2026-09-18",
    keywords: ["beach in abu dhabi free", "abu dhabi view point", "places to visit in abu dhabi for free", "abu dhabi at night", "visiting places abu dhabi"],
  },
  {
    slug: "qasr-al-hosn",
    name: "Qasr Al Hosn",
    emirate: "abu-dhabi",
    area: "Al Hosn, central Abu Dhabi",
    categories: ["culture", "landmarks"],
    tagline: "The oldest stone building in Abu Dhabi, and the reason the city is here",
    summary:
      "A coral-and-sea-stone watchtower built in the 1790s over the freshwater well that made settlement on the island possible, later the ruler's palace and the seat of government. Restored and opened as a museum in 2018, with the original tower left visible inside the later fort.",
    sections: [
      {
        heading: "Two buildings, two centuries",
        paragraphs: [
          "The inner watchtower came first, put up to guard the well that a hunting party had found on the island. The outer fort was built around it in the 1930s, and the whole complex served as the ruler's residence and the seat of the Abu Dhabi government until the 1960s. The restoration deliberately left the joins visible, so you can read the two phases against each other.",
          "The exhibition inside covers the archaeology of the island, the pearling economy that sustained it, and the oil era that ended that way of life within a generation. The House of Artisans in the same compound runs live demonstrations of weaving, palm-frond work and the traditional boat crafts.",
        ],
      },
    ],
    highlights: [
      "Abu Dhabi's oldest surviving stone building, from the 1790s",
      "Original watchtower left visible inside the 1930s fort",
      "House of Artisans with live traditional crafts",
      "Ten minutes' walk from the Corniche",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 30,
      childFrom: null,
      note: "Under-18s free. Combined tickets with other Abu Dhabi culture sites are cheaper than separate entry.",
    },
    hours: "Daily, roughly 10:00–19:00; shorter on Fridays",
    bestTime: "Weekday mornings; late afternoon for the light on the walls",
    timeNeeded: "2 hours",
    gettingThere:
      "Central Abu Dhabi, a ten-minute walk inland from the Corniche. Parking on site.",
    nearby: ["abu-dhabi-corniche", "emirates-heritage-village", "sheikh-zayed-grand-mosque"],
    accent: "gold",
    motif: "arch",
    geo: { lat: 24.4815, lng: 54.3545 },
    faqs: [
      {
        q: "How old is Qasr Al Hosn?",
        a: "The inner watchtower dates from the 1790s, making it the oldest stone structure in Abu Dhabi. The fort around it was added in the 1930s and the site was the seat of government until the 1960s.",
      },
      {
        q: "Is Qasr Al Hosn worth visiting?",
        a: "Yes, and it is the one place that explains why Abu Dhabi exists at all — a well on an island. Two hours covers the fort, the exhibition and the crafts house.",
      },
    ],
    metaTitle: "Qasr Al Hosn Abu Dhabi | Tickets, History & Opening Hours",
    metaDescription:
      "Qasr Al Hosn: Abu Dhabi's oldest building, from the 1790s watchtower to the 1930s fort, plus ticket prices, hours and the House of Artisans.",
    checked: "2026-09-18",
    keywords: ["qasr al hosn fort", "top sights in abu dhabi", "abu dhabi top things to do", "visiting places abu dhabi"],
  },
  {
    slug: "emirates-heritage-village",
    name: "Heritage Village",
    emirate: "abu-dhabi",
    area: "Breakwater, Abu Dhabi",
    categories: ["culture", "souks", "family"],
    tagline: "A reconstructed oasis village on the breakwater, and it is free",
    summary:
      "An open-air reconstruction of pre-oil Emirati life on the breakwater opposite the Corniche: barasti huts, a falaj irrigation channel, a camel pen, working craft workshops and a small museum. Free to enter, and the view back across the water at the skyline is the best in the city.",
    sections: [
      {
        heading: "What is in it",
        paragraphs: [
          "The village lays out the four traditional Emirati environments — coast, desert, oasis and mountain — with the dwellings and tools each one used. Craftspeople work on site: metalwork, pottery, glass-blowing and weaving, most of it for sale at prices well below the souvenir shops.",
          "The spice and craft shop at the entrance is one of the cheaper places in the capital to buy frankincense and dates. Behind the village, a small public beach faces back across the harbour.",
        ],
      },
      {
        heading: "The view",
        paragraphs: [
          "The breakwater's position, out in the harbour, gives the postcard shot of the Corniche skyline. It is free, it is uncrowded, and it is at its best forty minutes before sunset.",
        ],
      },
    ],
    highlights: [
      "Free entry to a full reconstructed village",
      "Working craft workshops selling at fair prices",
      "The best free skyline viewpoint in Abu Dhabi",
      "Small public beach behind it",
    ],
    gate: { kind: "free", note: "Free entry. Crafts, the spice shop and refreshments are the only paid parts." },
    hours: "Saturday–Thursday roughly 09:00–16:00, Friday afternoons only",
    bestTime: "Late afternoon, October to April",
    timeNeeded: "1.5 hours",
    gettingThere:
      "On the Breakwater beside Marina Mall, at the western end of the Corniche. Free parking.",
    nearby: ["abu-dhabi-corniche", "qasr-al-hosn", "mina-zayed-fish-market"],
    accent: "sun",
    motif: "dune",
    image: "/images/camel-caravan.jpg",
    alt: "Camels crossing open desert sand",
    geo: { lat: 24.4760, lng: 54.3300 },
    faqs: [
      {
        q: "Is the Heritage Village free?",
        a: "Yes, entry costs nothing. Only the crafts, the spice shop and the café charge.",
      },
      {
        q: "What is there to do in Abu Dhabi for free?",
        a: "Rather a lot: the Sheikh Zayed Grand Mosque, the Corniche promenade, the Heritage Village, Wahat Al Karama, the open section of Corniche Beach and Mushrif Central Park's grounds. A full day costs only what you spend on lunch.",
      },
    ],
    metaTitle: "Heritage Village Abu Dhabi | Free Entry & Skyline Views",
    metaDescription:
      "Abu Dhabi's Heritage Village on the Breakwater: free entry, working craft workshops, a small beach and the best free view of the Corniche skyline.",
    checked: "2026-09-18",
    keywords: ["emirates heritage village abu dhabi", "places to visit in abu dhabi for free", "hidden gems in abu dhabi", "best souk abu dhabi"],
  },
  {
    slug: "mina-zayed-fish-market",
    name: "Mina Zayed Fish Market",
    emirate: "abu-dhabi",
    area: "Mina Zayed, Abu Dhabi port",
    categories: ["souks", "dining", "culture"],
    tagline: "Buy it off the ice, pay someone to cook it, eat it upstairs",
    summary:
      "The capital's working fish market, rebuilt and still genuinely a market rather than a heritage exhibit. You pick your fish off the ice, take it to the cleaning counter, then to a cook shop that will grill or fry it with rice and salad for a fraction of a restaurant bill. The date market and plant souk are next door.",
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "Buy first. Prices are per kilo, negotiable, and lower in the early morning when the boats have just come in. Hammour, kingfish, sheri and prawns are the usual. Take the bag to the cleaning counter, where gutting and scaling costs a few dirhams, then to one of the cook shops, who charge a small fee per kilo to grill it with whatever you ask for.",
          "The whole thing — fish, cleaning and cooking — comes to well under what a hotel would charge for the same plate, and it is the most enjoyable meal in the city.",
        ],
      },
      {
        heading: "Next door",
        paragraphs: [
          "The same quarter holds the date market, which sells dates by weight from across the Gulf and is worth a detour in itself, the fruit and vegetable souk, the plant nursery market, and the carpet souk. Mina Zayed is also where the old dhow harbour still works.",
        ],
      },
    ],
    highlights: [
      "Buy off the ice, have it cleaned, have it cooked on site",
      "Date market, plant souk and carpet souk in the same quarter",
      "Prices are negotiable and lowest early morning",
      "Free to walk around",
    ],
    gate: {
      kind: "free",
      note: "Free to enter. Fish is per kilo; cleaning and cooking cost a few dirhams each.",
    },
    hours: "Daily from very early morning until late evening; fish is freshest before 08:00",
    bestTime: "Early morning for the catch, evening for the atmosphere",
    timeNeeded: "2 hours including eating",
    gettingThere:
      "Mina Zayed, at the port end of the city, about 10 minutes from the Corniche. Free parking.",
    nearby: ["abu-dhabi-corniche", "emirates-heritage-village", "qasr-al-hosn"],
    accent: "sea",
    motif: "wave",
    image: "/images/street-food.jpg",
    alt: "Food being prepared at a busy street stall",
    geo: { lat: 24.5150, lng: 54.3800 },
    faqs: [
      {
        q: "Can you eat at Mina fish market?",
        a: "Yes, and that is the point. Buy the fish, pay a few dirhams to have it cleaned, then take it to a cook shop who will grill or fry it with rice and salad. Far better and far cheaper than a restaurant.",
      },
      {
        q: "What is the cheapest market in Abu Dhabi?",
        a: "Mina Zayed, on all counts — fish, dates, fruit and vegetables, plants and carpets are all cheaper here than anywhere in the malls, and the prices are negotiable.",
      },
    ],
    metaTitle: "Mina Zayed Fish Market Abu Dhabi | Buy, Cook & Eat Guide",
    metaDescription:
      "Abu Dhabi's Mina Zayed fish market: how buying, cleaning and cooking works, what it costs, and the date, plant and carpet souks next door.",
    checked: "2026-09-18",
    keywords: ["al mina fish market", "best souk in abu dhabi", "best souk abu dhabi", "cheapest market in abu dhabi", "abu dhabi cheap shopping"],
  },
];
