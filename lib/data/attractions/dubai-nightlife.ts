/**
 * Dubai's licensed night: the beach clubs and the clubs proper.
 *
 * These cover venues and districts rather than pretending to list what is on.
 * Door policies, minimum spends and even ownership change several times a year,
 * so the copy explains how the scene works and what the law is, which stays
 * true for a great deal longer than a line-up would.
 */

import type { Attraction } from "./types";

export const dubaiNightlife: Attraction[] = [
  {
    slug: "dubai-beach-clubs",
    name: "Dubai beach clubs",
    emirate: "dubai",
    area: "Marina, Palm Jumeirah and Jumeirah",
    categories: ["nightlife", "beaches", "dining"],
    tagline: "Day beds, day parties, and what a minimum spend actually means",
    summary:
      "Dubai's beach clubs sit between a beach and a nightclub: a pool, a stretch of private sand, a day bed, a DJ from mid-afternoon and a bar. You pay a minimum spend rather than an entry fee, which you get back in food and drink. Barasti, Zero Gravity, Nikki Beach and Bla Bla are the long-established names.",
    sections: [
      {
        heading: "How the pricing works",
        paragraphs: [
          "Almost nobody charges a door fee. Instead you book a sunbed or a day bed against a minimum spend — a figure you must reach in food and drink across the day, with anything unspent simply lost. It runs from around AED 150 a head midweek at the more casual clubs to several hundred for a weekend day bed at the big ones, and considerably more for a cabana.",
          "Ladies' days, usually midweek, cut that sharply or replace it with a set number of included drinks. They are the single best-value way to use a Dubai beach club and they are not a secret.",
        ],
      },
      {
        heading: "The rules worth knowing",
        paragraphs: [
          "Alcohol is served because these venues are licensed, almost always through an attached hotel. The legal drinking age is 21 and photo ID is checked at the door. Drinking or being drunk outside a licensed venue — including in a taxi home — is an offence, so plan the journey back.",
          "Most clubs enforce a swimwear-by-day, smart-by-night dress code and refuse entry to large all-male groups at weekends. Booking ahead is not optional from November to March.",
        ],
      },
    ],
    highlights: [
      "Pool, private beach and a day bed on a minimum spend, not a ticket",
      "Barasti (Mina Seyahi), Zero Gravity (Skydive Dubai), Nikki Beach (Pearl Jumeira), Bla Bla (JBR)",
      "Midweek ladies' days are far cheaper than a weekend booking",
      "Licensed venues only — 21+, ID checked at the door",
    ],
    gate: {
      kind: "spend",
      adultFrom: 150,
      note: "Typical weekday minimum spend per person; weekend day beds run several times that. Redeemable against food and drink.",
    },
    hours: "Typically 10:00 until late; music from mid-afternoon",
    bestTime: "October to May. Midweek for ladies' days and lower minimums.",
    timeNeeded: "A full day",
    gettingThere:
      "Mina Seyahi and JBR are on the tram; Palm Jumeirah clubs are a taxi. Do not drive if you are drinking — the UAE has a zero-tolerance limit.",
    nearby: ["dubai-marina-jbr", "palm-jumeirah", "dubai-night-clubs"],
    accent: "coral",
    motif: "wave",
    image: "/images/marina-pier.jpg",
    alt: "A waterfront terrace and jetty in Dubai Marina at golden hour",
    geo: { lat: 25.0900, lng: 55.1450 },
    faqs: [
      {
        q: "How much does a Dubai beach club cost?",
        a: "Reckon on AED 150–250 per person as a midweek minimum spend at the more casual clubs, and AED 400–800 for a weekend day bed at the big names. It is a minimum spend, not an entry fee — you get it back in food and drink.",
      },
      {
        q: "What is the drinking age in Dubai?",
        a: "Twenty-one, and ID is checked. Alcohol is served only in licensed venues; drinking in public or being drunk outside one is an offence, which catches visitors out more often than anything else here.",
      },
    ],
    metaTitle: "Dubai Beach Clubs | Minimum Spend, Ladies' Days & Rules",
    metaDescription:
      "How Dubai beach clubs work: minimum spend instead of entry, Barasti, Zero Gravity, Nikki Beach and Bla Bla compared, ladies' days and the drinking rules.",
    checked: "2026-09-18",
    keywords: ["beach club dubai", "nikki beach dubai", "zero gravity dubai", "barasti club dubai", "bla bla dubai", "nammos dubai", "summersalt dubai", "zero gravity club dubai", "beach night club dubai"],
  },
  {
    slug: "dubai-night-clubs",
    name: "Dubai nightclubs",
    emirate: "dubai",
    area: "Business Bay, Meydan, Sheikh Zayed Road and JBR",
    categories: ["nightlife", "events"],
    tagline: "Where the scene actually is, and the rules nobody explains",
    summary:
      "Dubai runs one of the busiest club circuits in the region, and all of it is legal, licensed and rule-bound. Venues open late, close by about three, sit inside hotels or licensed complexes, and enforce a door policy. This is how it works rather than a list of who is playing this week.",
    sections: [
      {
        heading: "The venues that last",
        paragraphs: [
          "Club ownership turns over fast here, but a handful of rooms have stayed relevant: White Dubai on the Meydan racecourse roof, Soho Garden's multi-venue complex, Base in Dubai Design District, and the big hotel rooms along Sheikh Zayed Road. Barasti and Zero Gravity carry the beach-club crowd through to the evening rather than being clubs proper.",
          "Guest DJs are booked through the winter season; between June and September the calendar thins considerably and several outdoor venues close entirely.",
        ],
      },
      {
        heading: "Door, dress and the law",
        paragraphs: [
          "Entry is usually free for women and for anyone on a table booking, and unreliable for unaccompanied groups of men — that is the door policy in plain terms and it is not negotiable at the rope. Smart dress, closed shoes for men, and photo ID for everyone.",
          "Alcohol is legal in licensed venues at 21 and over. What is not legal is drinking anywhere unlicensed, being drunk in public, or driving with any alcohol at all in your blood — the limit is zero, not a low number. Take a taxi both ways and the whole thing is straightforward.",
        ],
      },
    ],
    highlights: [
      "Licensed hotel and complex venues only — no independent bars",
      "White, Soho Garden, Base and the Sheikh Zayed Road hotel rooms",
      "Season runs October to May; summer is much quieter",
      "21+, photo ID, smart dress, and a zero alcohol limit for driving",
    ],
    gate: {
      kind: "varies",
      note: "Most rooms are free entry for women and table bookings; table minimums run from around AED 2,000. Guest-DJ nights ticket separately.",
    },
    hours: "Typically 22:00–03:00, Thursday to Saturday busiest",
    bestTime: "October to May",
    timeNeeded: "An evening",
    gettingThere:
      "Taxi or ride-hailing, both ways. Business Bay and Dubai Marina metro stations stop running before the clubs close.",
    nearby: ["dubai-beach-clubs", "dubai-marina-jbr", "coca-cola-arena"],
    accent: "coral",
    motif: "wheel",
    image: "/images/marina-night.jpg",
    alt: "Dubai Marina towers lit against the night sky",
    geo: { lat: 25.1590, lng: 55.3010 },
    faqs: [
      {
        q: "Are nightclubs legal in Dubai?",
        a: "Yes. Licensed venues — nearly always attached to a hotel or a licensed complex — serve alcohol legally to over-21s. What is illegal is drinking outside them, public drunkenness, and driving with any alcohol in your system.",
      },
      {
        q: "Do Dubai clubs charge entry?",
        a: "Usually not. Women and table bookings generally go in free, and the money is made on drinks and table minimums, which start around AED 2,000 for a group. Ticketed guest-DJ nights are the exception.",
      },
      {
        q: "Is Sharjah the same?",
        a: "No. Sharjah is completely dry — no bars, no licensed restaurants, no alcohol sales at all. Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah licence hotel venues.",
      },
    ],
    metaTitle: "Dubai Nightclubs | Venues, Door Policy & the Alcohol Rules",
    metaDescription:
      "Dubai nightlife explained: which clubs last, how door policy and table minimums work, the season, and the alcohol laws visitors most often get wrong.",
    checked: "2026-09-18",
    keywords: ["dubai night club", "night clubs in dubai", "clubs in dubai", "dubai nightlife", "night club in dubai", "white dubai", "barasti nightclub dubai", "night clubs", "clubs near me", "night clubs near me"],
  },
];
