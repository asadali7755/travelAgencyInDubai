/**
 * Sharjah's aquarium, wildlife centre, car museum and national park — the
 * emirate that funds culture as policy. Checked September 2026.
 */

import type { Attraction } from "./types";

export const sharjahCulture: Attraction[] = [
  {
    slug: "sharjah-aquarium",
    name: "Sharjah Aquarium",
    emirate: "sharjah",
    area: "Al Khan, beside the Maritime Museum",
    categories: ["wildlife", "family", "kids"],
    tagline: "Local Gulf species, properly explained, for AED 25",
    summary:
      "A compact, well-run aquarium on Al Khan beach holding around 250 species, almost all of them native to the Gulf and the Gulf of Oman rather than imported showpieces. Twenty tanks arranged as a journey from the lagoon out to the reef, a walk-through tunnel, and the Maritime Museum next door on the same ticket.",
    sections: [
      {
        heading: "Why it is worth it",
        paragraphs: [
          "Sharjah Aquarium does not try to compete on scale with Dubai's. What it does instead is show you what actually lives off this coast — reef sharks, rays, moray eels, clownfish, seahorses and the mangrove species most visitors never see — with interpretation that treats you as capable of reading.",
          "The combined ticket with the Sharjah Maritime Museum next door covers pearling, dhow building and the fishing economy, and the two together make a good two hours.",
        ],
      },
    ],
    highlights: [
      "Around 250 species, nearly all native to the Gulf",
      "Walk-through tunnel and 20 themed tanks",
      "Combined ticket with the Maritime Museum next door",
      "A fraction of the price of the Dubai aquariums",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 25,
      childFrom: 15,
      note: "Combined aquarium and Maritime Museum ticket is the better value. Under-2s free.",
    },
    hours: "Saturday–Thursday roughly 08:00–20:00, Friday afternoons only; closed some Mondays",
    bestTime: "Weekday mornings",
    timeNeeded: "1.5–2 hours with the Maritime Museum",
    gettingThere:
      "Al Khan beach, Sharjah, about 25 minutes from Dubai Deira. Free parking. No metro in the emirate.",
    nearby: ["al-khan-beach", "arabian-wildlife-centre", "al-noor-island"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.3340, lng: 55.3790 },
    faqs: [
      {
        q: "How much are Sharjah Aquarium tickets?",
        a: "Around AED 25 for adults and AED 15 for children, with a combined ticket for the Maritime Museum next door that costs little more. Under-2s go free.",
      },
      {
        q: "Is Sharjah Aquarium better than Dubai Aquarium?",
        a: "Smaller, and much cheaper. Sharjah shows local Gulf species with proper interpretation; Dubai has the bigger tank and the shark tunnel inside a mall. For children learning something, Sharjah wins.",
      },
    ],
    metaTitle: "Sharjah Aquarium | Tickets, Opening Hours & What's Inside",
    metaDescription:
      "Sharjah Aquarium: around 250 native Gulf species, a walk-through tunnel and a combined ticket with the Maritime Museum, from about AED 25.",
    checked: "2026-09-18",
    keywords: ["sharjah aquarium", "sharjah aquarium sharjah", "sharjah aquarium tickets", "ticket sharjah aquarium"],
  },
  {
    slug: "arabian-wildlife-centre",
    name: "Arabian Wildlife Centre",
    emirate: "sharjah",
    area: "Al Dhaid Road, Sharjah desert",
    categories: ["wildlife", "family", "nature"],
    tagline: "Every animal native to Arabia, including the ones nearly lost",
    summary:
      "Part of the Sharjah Desert Park complex, and the only place in the region showing the full range of Arabian native fauna — Arabian leopard, Arabian wolf, caracal, oryx, hyena, reptiles and a large free-flight aviary. A serious breeding centre rather than a zoo, and one ticket covers the whole desert park.",
    sections: [
      {
        heading: "What makes it different",
        paragraphs: [
          "The Arabian leopard is critically endangered and the breeding programme here is one of the few keeping the species going. The centre also holds Arabian wolves, caracal, sand cats and striped hyena, most of which almost nobody sees in the wild any more, in enclosures designed around nocturnal behaviour — the reversed-light nocturnal house is the best part of the visit.",
          "The same ticket covers the Natural History Museum, the Botanical Museum and the Children's Farm, where small children can feed goats and handle chicks. The farm alone justifies the drive for families with under-sixes.",
        ],
      },
    ],
    highlights: [
      "Arabian leopard breeding programme — critically endangered",
      "Reversed-light nocturnal house for the desert predators",
      "One ticket covers the whole Sharjah Desert Park",
      "Children's Farm with hands-on animal contact",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 15,
      childFrom: null,
      note: "One ticket covers the Wildlife Centre, Natural History Museum, Botanical Museum and Children's Farm. Under-12s often free.",
    },
    hours: "Typically Sunday–Thursday 09:00–17:30, Friday afternoons, Saturday 11:00–17:30; closed Tuesdays",
    bestTime: "Weekday mornings, October to April",
    timeNeeded: "Half a day",
    gettingThere:
      "Al Dhaid Road (E88), about 28 km east of Sharjah city and 45 minutes from Dubai. Own vehicle.",
    nearby: ["sharjah-aquarium", "mleiha-archaeological-centre", "sharjah-national-park"],
    accent: "palm",
    motif: "dune",
    geo: { lat: 25.2880, lng: 55.6890 },
    faqs: [
      {
        q: "How much is the Arabian Wildlife Centre?",
        a: "Around AED 15 for adults, and that single ticket covers the whole Sharjah Desert Park — the wildlife centre, the natural history and botanical museums and the children's farm.",
      },
      {
        q: "Can you see Arabian leopards there?",
        a: "Yes. It runs one of the few breeding programmes for the species, which is critically endangered in the wild. The nocturnal house is where the desert predators are most active.",
      },
    ],
    metaTitle: "Arabian Wildlife Centre Sharjah | Tickets & Desert Park",
    metaDescription:
      "Arabian Wildlife Centre: Arabian leopards, wolves and caracal in Sharjah Desert Park, with one ticket covering four attractions from about AED 15.",
    checked: "2026-09-18",
    keywords: ["arabian wildlife center sharjah", "national park sharjah", "sharjah national park sharjah"],
  },
  {
    slug: "sharjah-classic-cars-museum",
    name: "Sharjah Classic Cars Museum",
    emirate: "sharjah",
    area: "Airport Road, Sharjah",
    categories: ["culture", "family"],
    tagline: "A hundred cars from 1915 onwards, including the Ruler's own",
    summary:
      "Around a hundred vehicles from 1915 to the 1970s, laid out by era in a purpose-built hall on the airport road. The collection is drawn largely from the Ruler of Sharjah's own cars and is unusually strong on pre-war American and European marques. Entry is AED 10.",
    sections: [
      {
        heading: "The collection",
        paragraphs: [
          "The earliest car is a 1915 Dodge; from there the hall runs forward through Mercedes, Rolls-Royce, Cadillac, Ford and Chevrolet, with a section on the vehicles that were actually used in the Trucial States and the modifications the conditions demanded. Several of the cars belonged to Sheikh Dr Sultan bin Muhammad Al Qasimi.",
          "It is a quiet, air-conditioned hour and it is very rarely busy, which makes it one of the better options in the middle of a summer afternoon.",
        ],
      },
    ],
    highlights: [
      "Around 100 vehicles from 1915 to the 1970s",
      "Cars from the Ruler of Sharjah's own collection",
      "Section on vehicles used in the Trucial States",
      "AED 10 entry and almost never crowded",
    ],
    gate: { kind: "ticket", adultFrom: 10, childFrom: 5, note: "Under-2s free." },
    hours: "Saturday–Thursday roughly 08:00–20:00, Friday afternoons only",
    bestTime: "Any time — it is indoors and quiet",
    timeNeeded: "1 hour",
    gettingThere:
      "Airport Road, Sharjah, about 30 minutes from Dubai Deira. Free parking.",
    nearby: ["sharjah-museum-of-islamic-civilization", "arabian-wildlife-centre", "al-khan-beach"],
    accent: "coral",
    motif: "speed",
    geo: { lat: 25.3070, lng: 55.4640 },
    faqs: [
      {
        q: "How much is Sharjah Classic Cars Museum?",
        a: "AED 10 for adults and AED 5 for children. It is one of the cheapest museum tickets in the country and it is almost never busy.",
      },
    ],
    metaTitle: "Sharjah Classic Cars Museum | AED 10 Entry & Collection",
    metaDescription:
      "Sharjah Classic Cars Museum: around 100 vehicles from 1915 onward including the Ruler's own cars, for AED 10. Hours and how to get there.",
    checked: "2026-09-18",
    keywords: ["classic cars museum sharjah", "places to visit in sharjah for free", "best restaurant in sharjah"],
  },
  {
    slug: "sharjah-national-park",
    name: "Sharjah National Park",
    emirate: "sharjah",
    area: "Sharjah–Dhaid Road",
    categories: ["family", "nature", "kids"],
    tagline: "The emirate's biggest public park, and entry is a few dirhams",
    summary:
      "Around 630,000 square metres of landscaped park on the Dhaid road with lakes, a miniature railway, large children's play areas, barbecue spots and enough lawn that it never feels full. It is the standard Sharjah family picnic ground and it costs almost nothing.",
    sections: [
      {
        heading: "What is there",
        paragraphs: [
          "Wide irrigated lawns, planted avenues, two lakes with pedalos, a small train circling the grounds, graded play areas and a skate park. Barbecue areas are provided and used heavily at weekends, and there are shaded majlis-style seating areas throughout.",
          "It is genuinely large, which is the point — on a Saturday in February it holds a great many families without feeling crowded.",
        ],
      },
    ],
    highlights: [
      "Around 630,000 m² of landscaped parkland",
      "Lakes with pedalos and a miniature railway",
      "Barbecue areas and shaded majlis seating",
      "A few dirhams to enter",
    ],
    gate: { kind: "ticket", adultFrom: 5, note: "Nominal per-person entry. Pedalos and the train charge separately." },
    hours: "Daily, roughly 08:00–22:00; later at weekends",
    bestTime: "October to April, late afternoon",
    timeNeeded: "Half a day",
    gettingThere:
      "Sharjah–Dhaid Road (E88), about 20 minutes from Sharjah city and 40 from Dubai. Free parking.",
    nearby: ["arabian-wildlife-centre", "al-khan-beach", "al-noor-island"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 25.3120, lng: 55.5230 },
    faqs: [
      {
        q: "Can you barbecue at Sharjah National Park?",
        a: "Yes, there are designated barbecue areas and they are well used at weekends. Bring your own charcoal and take everything home with you.",
      },
      {
        q: "Where can families go in Sharjah for free or nearly free?",
        a: "Al Khan Beach and the corniche are free. Sharjah National Park, Al Montazah and Al Noor Island are all a few dirhams, and the Museum of Islamic Civilization is AED 10.",
      },
    ],
    metaTitle: "Sharjah National Park | Entry Fee, Barbecues & Play Areas",
    metaDescription:
      "Sharjah National Park: 630,000 m² of lawns, lakes, a miniature railway and barbecue areas for a few dirhams a head. Hours and directions.",
    checked: "2026-09-18",
    keywords: ["national park sharjah", "sharjah national park sharjah", "places to visit in sharjah for free with family", "places to visit in sharjah for free"],
  },
];
