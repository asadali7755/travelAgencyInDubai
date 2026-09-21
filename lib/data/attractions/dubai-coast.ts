/**
 * Dubai on the water — the reclaimed island, the fountain in Burj Lake, the
 * Marina/JBR strip and the Atlantis waterpark. Kept separate from the tower
 * landmarks so neither file grows past the project’s 300-line ceiling.
 *
 * Prices are published gate prices checked in September 2026. Most of what is
 * listed here is free, which is the point worth making to a visitor who has
 * been told Dubai is expensive.
 */

import type { Attraction } from "./types";

export const dubaiCoast: Attraction[] = [
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    emirate: "dubai",
    area: "Palm Jumeirah",
    categories: ["beaches", "landmarks", "family"],
    tagline: "The reclaimed island you can walk, ride and look down on — mostly for free",
    summary:
      "Sixteen fronds, a trunk and an eleven-kilometre breakwater, built out into the Gulf in the 2000s and now home to Atlantis, a monorail, a boardwalk and some of the best public beach in the city. You do not need to be staying on it to enjoy it.",
    sections: [
      {
        heading: "Seeing it without paying for it",
        paragraphs: [
          "The Palm's best free asset is the boardwalk on the outer edge of the fronds — eleven kilometres of paved path with the open sea on one side and the Marina skyline across the water. Early morning and after dark are the usable hours for most of the year; between May and September the middle of the day is genuinely unpleasant.",
          "The monorail runs the length of the trunk from Gateway station to Atlantis and is worth the short fare purely as a moving viewpoint. The Palm West Beach strip at the base of the trunk is public, free, and has the restaurants and loungers that most visitors assume are hotel-only.",
        ],
      },
      {
        heading: "The view from above",
        paragraphs: [
          "The observation deck at the top of The Palm Tower is the only place the island's shape resolves into the postcard. From ground level you are simply on a wide road; from 240 metres up you can see why it took a decade to build.",
        ],
      },
    ],
    highlights: [
      "Eleven kilometres of free public boardwalk on the outer crescent",
      "Palm West Beach — public, free, with beach clubs you can walk into",
      "Monorail along the trunk to Atlantis",
      "Observation deck at The Palm Tower for the shape from above",
    ],
    gate: {
      kind: "free",
      note: "The island, boardwalk and public beaches are free. Paid extras: the monorail, the observation deck at The Palm Tower and the Atlantis waterparks.",
    },
    hours: "Open at all hours; beach clubs and the monorail keep their own times",
    bestTime: "October to April; otherwise before 09:00 or after sunset",
    timeNeeded: "Half a day",
    gettingThere:
      "Nakheel or Al Khail metro then a taxi, or the tram to Palm Jumeirah station for the monorail. Driving is easy and parking on the trunk is straightforward outside weekends.",
    nearby: ["atlantis-aquaventure", "dubai-marina-jbr", "dubai-fountain"],
    accent: "sea",
    motif: "wave",
    image: "/images/palm-aerial.jpg",
    alt: "Aerial view of the fronds and trunk of Palm Jumeirah reaching into the Gulf",
    geo: { lat: 25.1124, lng: 55.1390 },
    faqs: [
      {
        q: "Can you visit Palm Jumeirah for free?",
        a: "Yes. The island is public road, the boardwalk is free to walk and Palm West Beach is a free public beach. Only the waterparks, the observation deck and the monorail charge.",
      },
      {
        q: "Are the beaches on the Palm public?",
        a: "Palm West Beach on the trunk is public and has showers, loungers for hire and restaurants behind it. The frond beaches belong to the villas and hotels and are not open to walk-ins.",
      },
    ],
    metaTitle: "Palm Jumeirah Guide | Beaches, Boardwalk & What's Free",
    metaDescription:
      "How to visit Palm Jumeirah without staying there: the free boardwalk and public beach, the monorail, the observation deck, and the best time of day to go.",
    checked: "2026-09-18",
  },
  {
    slug: "dubai-fountain",
    name: "The Dubai Fountain",
    emirate: "dubai",
    area: "Burj Lake, Downtown Dubai",
    categories: ["landmarks", "family", "events"],
    tagline: "Free, every half hour, and still the best thing in Downtown after dark",
    summary:
      "A 275-metre water system in the lake at the foot of the Burj Khalifa, choreographed to music and running every thirty minutes through the evening. It costs nothing, it lasts about five minutes, and it is the single most reliable piece of Dubai spectacle.",
    sections: [
      {
        heading: "Where to stand",
        paragraphs: [
          "The free viewing is the whole waterfront promenade behind Dubai Mall, and the crowd thins considerably if you walk south towards Souk Al Bahar rather than stopping at the first railing you reach. The bridge across the lake gives the straightest view back at the tower, and it fills first.",
          "Restaurant terraces on the Souk Al Bahar side charge a minimum spend rather than a ticket. It buys you a seat and a drink, not a better angle — the view from the free promenade twenty metres away is materially the same.",
        ],
      },
      {
        heading: "The timing",
        paragraphs: [
          "Shows run every half hour in the evening, with a shorter afternoon set. Each one uses a different track, rotating through Arabic, Hindi and Western pieces, so staying for two consecutive shows is not a repeat. The last show of the night is the least crowded by some margin.",
        ],
      },
    ],
    highlights: [
      "Free to watch, every 30 minutes through the evening",
      "Different soundtrack each show — two in a row is not a repeat",
      "Lake boat rides available if you want to be inside the ring",
      "Two minutes' walk from the Burj Khalifa entrance",
    ],
    gate: {
      kind: "free",
      note: "Watching from the promenade is free. Lake boat rides and terrace minimum spends are the only paid options.",
    },
    hours: "Evening shows every 30 minutes, roughly 18:00 until 23:00, plus an afternoon set",
    bestTime: "The last show of the evening, when the promenade has emptied",
    timeNeeded: "30 minutes",
    gettingThere:
      "Burj Khalifa/Dubai Mall metro, then through the mall to the waterfront promenade at the lower-ground level.",
    nearby: ["burj-khalifa", "museum-of-the-future", "dubai-frame"],
    accent: "sea",
    motif: "wave",
    image: "/images/city-night.jpg",
    alt: "Downtown Dubai lit up at night above the Burj Lake",
    geo: { lat: 25.1955, lng: 55.2748 },
    faqs: [
      {
        q: "Is the Dubai Fountain free?",
        a: "Completely. Every show is free to watch from the promenade behind Dubai Mall. Nobody needs to buy anything.",
      },
      {
        q: "What time does the Dubai Fountain start?",
        a: "The evening sequence begins around six and runs every half hour until about eleven, with a shorter afternoon set. Times shift slightly during Ramadan.",
      },
    ],
    metaTitle: "The Dubai Fountain | Show Times, Best Spots & It's Free",
    metaDescription:
      "Dubai Fountain show times, where to stand for the best free view, and whether the paid lake boat or a Souk Al Bahar terrace is worth it.",
    checked: "2026-09-18",
  },
  {
    slug: "dubai-marina-jbr",
    name: "Dubai Marina & JBR",
    emirate: "dubai",
    area: "Dubai Marina / Jumeirah Beach Residence",
    categories: ["beaches", "family", "dining", "nightlife"],
    tagline: "A three-kilometre canal, a free beach and the city's easiest evening",
    summary:
      "An artificial canal cut inland from the Gulf, lined with towers and a seven-kilometre promenade, with the free public beach at JBR at its seaward end. It is where Dubai residents actually spend their evenings, which makes it a useful corrective to a trip spent entirely in malls.",
    sections: [
      {
        heading: "The walk",
        paragraphs: [
          "The Marina Walk runs the full length of the canal at water level, past moored yachts and under the road bridges, and it is free, shaded in stretches and open at all hours. Start at Marina Mall and walk south-west and you will come out at The Beach at JBR in about forty minutes.",
          "The Bluewaters footbridge from JBR takes you across to Ain Dubai, the observation wheel on the island, and the crossing itself is one of the better free viewpoints in the city.",
        ],
      },
      {
        heading: "The beach",
        paragraphs: [
          "JBR's open beach is public, free, has lifeguards, showers and a running track behind it, and looks straight out at the wheel. Water sports operators work the sand from mid-morning, and there is no reason to pay a beach club unless you want a pool as well.",
        ],
      },
    ],
    highlights: [
      "Seven kilometres of free promenade at canal level",
      "JBR open beach — public, lifeguarded, free",
      "Footbridge to Bluewaters Island and Ain Dubai",
      "Dhow cruises and yacht charters leave from the Marina jetties",
    ],
    gate: {
      kind: "free",
      note: "The walk and beach are free. Ain Dubai tickets start around AED 130 adult off-peak.",
    },
    hours: "Open at all hours; restaurants and the wheel keep their own times",
    bestTime: "Any evening from October to April; after sunset in summer",
    timeNeeded: "An evening",
    gettingThere:
      "DMCC or Sobha Realty metro on the Red Line, then the tram to Marina Towers or Jumeirah Beach Residence. Taxis drop at The Walk.",
    nearby: ["palm-jumeirah", "atlantis-aquaventure", "dubai-fountain"],
    accent: "sea",
    motif: "wheel",
    image: "/images/marina-towers.jpg",
    alt: "The towers of Dubai Marina reflected in the canal at dusk",
    geo: { lat: 25.0805, lng: 55.1403 },
    faqs: [
      {
        q: "Is JBR beach free?",
        a: "Yes. The open beach at JBR is a free public beach with lifeguards, showers and changing facilities. Only the beach clubs behind it charge.",
      },
      {
        q: "Marina or JBR for an evening?",
        a: "They are the same evening — the promenade connects them. Start on the Marina Walk for the yachts and the canal, finish at JBR for the beach and the wheel.",
      },
    ],
    metaTitle: "Dubai Marina & JBR Guide | Free Beach, Walk & Ain Dubai",
    metaDescription:
      "Dubai Marina Walk and JBR beach: what's free, where the promenade starts and ends, the Bluewaters bridge to Ain Dubai, and the best time to go.",
    checked: "2026-09-18",
  },
  {
    slug: "atlantis-aquaventure",
    name: "Atlantis Aquaventure",
    emirate: "dubai",
    area: "Atlantis, Palm Jumeirah",
    categories: ["waterparks", "family", "kids"],
    tagline: "The largest waterpark in the region, with a shark tunnel at the bottom of a slide",
    summary:
      "More than a hundred slides, rides and attractions spread across the tip of Palm Jumeirah, including the near-vertical Leap of Faith, which drops you through a clear tube running along the bottom of a shark-filled lagoon. Entry includes the Lost Chambers Aquarium and a private beach.",
    sections: [
      {
        heading: "What the ticket covers",
        paragraphs: [
          "A day pass covers all the slides across the park's towers, the Torrent River rapids, the wave pools, the children's areas, and a stretch of private beach that most people forget is included. The Lost Chambers Aquarium is bundled in, which makes it considerably better value than its headline price suggests.",
          "Animal experiences — swimming with dolphins, the shark safari, the ray feed — are separately ticketed and priced well above the gate.",
        ],
      },
      {
        heading: "Making the day work",
        paragraphs: [
          "Arrive at opening and do the big towers first; from about eleven the queues for the headline slides run to half an hour. Bring your own towels if your hotel allows it, since hiring them adds up for a family. Food inside is priced as you would expect at a resort waterpark.",
        ],
      },
    ],
    highlights: [
      "Over 100 slides and attractions across several towers",
      "Leap of Faith — a near-vertical drop through a shark lagoon tunnel",
      "Lost Chambers Aquarium included in the day pass",
      "Private beach access on Palm Jumeirah included",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 299,
      childFrom: null,
      note: "Gate price varies by season and day; AED 299–350 is the usual band. Dolphin and shark experiences cost extra.",
    },
    hours: "Daily, roughly 10:00–sunset; hours shorten in winter",
    bestTime: "October to April. Weekdays at opening for the shortest queues.",
    timeNeeded: "A full day",
    gettingThere:
      "Monorail to Atlantis Aquaventure station from Palm Gateway, or taxi straight to the resort. Parking is on site.",
    nearby: ["palm-jumeirah", "dubai-marina-jbr"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.1304, lng: 55.1171 },
    faqs: [
      {
        q: "Is the aquarium included with Aquaventure?",
        a: "Yes, the Lost Chambers Aquarium comes with a standard day pass. The dolphin and shark interactions do not — those are booked and paid separately.",
      },
      {
        q: "What is the minimum height for the big slides?",
        a: "The headline drops require 1.2 m, with some rides at 1.1 m. Under that there are two large dedicated children's areas, so a shorter child still has a full day.",
      },
    ],
    metaTitle: "Atlantis Aquaventure Dubai | Tickets & What's Included",
    metaDescription:
      "Aquaventure ticket prices, what the day pass covers including the Lost Chambers Aquarium, height limits for the big slides and when to arrive.",
    checked: "2026-09-18",
  },
];
