/**
 * Dubai's spa and massage scene.
 *
 * Its own file because the useful content here is not a venue listing — it is
 * the price bands for the three very different things called "a spa" here, and
 * how to tell a licensed centre from one that will get a visitor arrested.
 */

import type { Attraction } from "./types";

export const dubaiWellness: Attraction[] = [
  {
    slug: "dubai-spas-and-hammams",
    name: "Dubai spas & massage centres",
    emirate: "dubai",
    area: "Al Barsha, Jumeirah, Deira and Sheikh Zayed Road",
    categories: ["spa"],
    tagline: "Hammam, hotel spa or neighbourhood centre — and how to tell them apart",
    summary:
      "Three different things get called a spa in Dubai and they differ by a factor of ten in price. The traditional hammam is a scrub and steam ritual; the hotel spa is a resort treatment with a thermal suite attached; the licensed neighbourhood massage centre is an hour of straightforward bodywork. Here is how to pick and how to check one is legitimate.",
    sections: [
      {
        heading: "The three kinds",
        paragraphs: [
          "A **hammam** is a Moroccan or Turkish-style wet ritual — steam, a black soap application, a vigorous scrub with a kessa mitt, then a rinse and often a light massage. Expect around 45 minutes and AED 250–500 in a hotel, less in a dedicated hammam house. It is the one most worth trying if you have not.",
          "A **hotel spa** sells the surroundings as much as the treatment: thermal suites, plunge pools, relaxation lounges, a day pass that lets you use them either side. Reckon on AED 400–900 for an hour's massage, more at the resort names on the Palm and in Downtown.",
          "A **licensed massage centre** in Al Barsha, Deira or along Sheikh Zayed Road does an hour of Thai, deep tissue, Swedish or Balinese for roughly AED 120–300. These are the ones most residents use weekly and there are hundreds of them.",
        ],
      },
      {
        heading: "Checking a centre is legitimate",
        paragraphs: [
          "Massage centres in Dubai are licensed and regulated by the Department of Economy and Tourism and the health authority, and legitimate ones display the licence. Signs a place is not: no visible licence, no published price list, no separate male and female therapists where the licence requires it, a location that is a flat rather than a commercial unit, and any suggestion by phone of services beyond massage. That last one is not a grey area — it is a criminal matter and tourists have been arrested.",
          "Home and hotel-room massage services advertise heavily online. The legitimate ones are branches of licensed centres and will give you the centre's licence number when asked. If a service will not, do not book it.",
        ],
      },
    ],
    highlights: [
      "Hammam: 45 minutes of steam and scrub, AED 250–500",
      "Hotel spa: an hour plus thermal facilities, AED 400–900",
      "Licensed neighbourhood centre: an hour's massage, AED 120–300",
      "Always check for a displayed DET licence and a published price list",
    ],
    gate: {
      kind: "varies",
      note: "AED 120–300 at a licensed neighbourhood centre, AED 250–500 for a hammam, AED 400–900 at a hotel spa. Booking ahead is normal at weekends.",
    },
    hours: "Most centres run roughly 10:00–23:00, seven days",
    bestTime: "Weekday afternoons are the cheapest and quietest",
    timeNeeded: "1–2 hours",
    gettingThere:
      "Al Barsha, Deira and Sheikh Zayed Road hold the highest concentration of licensed centres, all close to Red Line stations.",
    nearby: ["the-dubai-mall", "dubai-marina-jbr", "palm-jumeirah"],
    accent: "palm",
    motif: "dome",
    geo: { lat: 25.1130, lng: 55.1960 },
    faqs: [
      {
        q: "How much is a massage in Dubai?",
        a: "AED 120–300 an hour at a licensed neighbourhood centre, AED 400–900 at a hotel spa. A hammam ritual runs AED 250–500 for around 45 minutes.",
      },
      {
        q: "How do I know a massage centre is licensed?",
        a: "It displays a Department of Economy and Tourism licence, publishes a price list, operates from a commercial unit rather than an apartment, and never suggests anything beyond massage. If any of those is missing, walk away — this is one of the more common ways visitors get into serious legal trouble here.",
      },
      {
        q: "Is home massage legal in Dubai?",
        a: "Yes, when it is provided by a licensed centre sending a licensed therapist. Ask for the centre's licence number before booking; a legitimate operator will give it without hesitation.",
      },
    ],
    metaTitle: "Spa & Massage in Dubai | Prices, Hammams & Licensed Centres",
    metaDescription:
      "Massage and spa in Dubai: what a hammam, a hotel spa and a neighbourhood centre each cost, and how to check a massage centre is properly licensed.",
    checked: "2026-09-18",
    keywords: ["spa in dubai", "massage center", "massage center near me", "massage therapy center", "home massage dubai", "lavana spa dubai", "lavana spa al barsha", "cora spa massage center sheikh zayed road dubai", "massagecenter near me", "massage center near to me"],
  },
];
