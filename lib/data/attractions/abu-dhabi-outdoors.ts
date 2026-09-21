/**
 * Abu Dhabi's green and wild edges — the central park, the salt lake and the
 * flamingo reserve. The Yas Island parks and the camping guidance live in
 * abu-dhabi-yas.ts. Checked September 2026.
 */

import type { Attraction } from "./types";

export const abuDhabiOutdoors: Attraction[] = [
  {
    slug: "mushrif-central-park",
    name: "Mushrif Central Park",
    emirate: "abu-dhabi",
    area: "Al Mushrif, Abu Dhabi",
    categories: ["family", "nature", "kids"],
    tagline: "The capital's best family park, for a few dirhams a head",
    summary:
      "Sixteen hectares of landscaped park in the middle of Abu Dhabi with shaded lawns, a botanical garden, a large children's play area, a splash park, an animal barn and a cafe strip. Entry is nominal, everything is maintained, and it is the answer to where to take children on a Friday.",
    sections: [
      {
        heading: "What is inside",
        paragraphs: [
          "The park is divided into distinct zones rather than being one open lawn: a shaded botanical section, a large play area graded by age, a splash pad that runs through the warmer months, an animal barn with goats and rabbits, and an events lawn used for markets and outdoor cinema through the winter.",
          "There is a women-and-children-only section, and the whole park is fenced and gated with a single entrance, which is why parents let children run here in a way they would not in an open park.",
        ],
      },
      {
        heading: "Picnics",
        paragraphs: [
          "Grass, shade and picnic tables are the main draw. Barbecues are not permitted inside the park — for that, the designated desert and beach camping areas below are the place. Food can be brought in.",
        ],
      },
    ],
    highlights: [
      "Fenced and gated with one entrance, so children can roam",
      "Splash park, animal barn and graded play areas",
      "Women-and-children-only section",
      "Nominal entry fee and plenty of shade",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 10,
      childFrom: 5,
      note: "Under-3s free. The splash park and some activities charge separately.",
    },
    hours: "Daily, roughly 08:00–22:00; later at weekends",
    bestTime: "October to April, late afternoon",
    timeNeeded: "Half a day",
    gettingThere:
      "Al Mushrif, central Abu Dhabi, about 10 minutes from the Corniche. Free parking outside.",
    nearby: ["abu-dhabi-corniche", "qasr-al-hosn", "al-wathba-salt-lake"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 24.4290, lng: 54.4030 },
    faqs: [
      {
        q: "How much is Mushrif Park Abu Dhabi?",
        a: "Around AED 10 for adults and AED 5 for children, with under-3s free. The splash park and some of the activity areas charge on top.",
      },
      {
        q: "Can you barbecue at Mushrif Park?",
        a: "No. Food can be brought in and there are picnic tables, but barbecues are not permitted. The designated desert camping areas outside the city are where that is allowed.",
      },
    ],
    metaTitle: "Mushrif Central Park Abu Dhabi | Entry Fee & Play Areas",
    metaDescription:
      "Mushrif Central Park: entry prices, the splash park, animal barn, women-and-children section and why it is the capital's best family picnic ground.",
    checked: "2026-09-18",
    keywords: ["mushrif park abu dhabi", "abu dhabi mushrif park", "family picnic spots in uae", "places to visit in abu dhabi for free"],
  },
  {
    slug: "al-wathba-salt-lake",
    name: "Al Wathba Salt Lake & Wetland Reserve",
    emirate: "abu-dhabi",
    area: "Al Wathba, 45 km south-east of Abu Dhabi",
    categories: ["nature", "adventure"],
    tagline: "A lake that turns pink, and four thousand flamingos next door",
    summary:
      "Two separate things in the same desert, half an hour apart. The salt lake is a shallow evaporating pan whose crystallised shoreline turns pink and violet in the right light; the wetland reserve beside it is a protected Ramsar site holding thousands of greater flamingos through the winter. Both are free.",
    sections: [
      {
        heading: "The pink lake",
        paragraphs: [
          "The colour is real but conditional. It comes from salt-loving algae in a shallow, hypersaline pan, and it shows best in low light — the first hour after sunrise and the last before sunset — and after a dry spell. Midday, in flat light, it can look like a grey salt flat and visitors leave disappointed.",
          "There are no facilities of any kind: no shade, no water, no toilets, no phone signal in places. It is a track off a desert road, and a normal car will do it in dry weather if you stay off the soft stuff.",
        ],
      },
      {
        heading: "The flamingos",
        paragraphs: [
          "Al Wathba Wetland Reserve is a managed protected area with hides, a visitor centre and marked trails. Greater flamingos number in the thousands from roughly October to May and thin out over the summer. It is free, it opens set hours, and unlike the salt lake it has shade and water.",
          "This is a reserve, not open desert — camping, driving off the marked route and approaching the birds are all prohibited, and enforced.",
        ],
      },
    ],
    highlights: [
      "Free, and one of the genuine hidden corners of the emirate",
      "Salt lake best in the first and last hour of light",
      "Thousands of greater flamingos from October to May",
      "Visitor centre, hides and marked trails at the wetland reserve",
    ],
    gate: { kind: "free", note: "Both are free. The reserve keeps set hours; the salt lake has no gate and no facilities." },
    hours: "Wetland reserve typically Tuesday–Sunday mornings and late afternoons, closed in summer. Salt lake open at all hours.",
    bestTime: "November to March, at sunrise or the hour before sunset",
    timeNeeded: "Half a day for both",
    gettingThere:
      "About 45 km south-east of Abu Dhabi off the E30. Own vehicle only; there is no public transport and no taxi will wait.",
    nearby: ["mushrif-central-park", "abu-dhabi-desert-camping", "al-ain-oasis"],
    accent: "coral",
    motif: "dune",
    geo: { lat: 24.2530, lng: 54.6060 },
    faqs: [
      {
        q: "Is Al Wathba salt lake really pink?",
        a: "Sometimes. The colour comes from algae in the hypersaline water and shows in low light after a dry spell. Go within an hour of sunrise or sunset; in the middle of the day it often looks grey.",
      },
      {
        q: "Do you need a 4x4 for Al Wathba?",
        a: "Not in dry weather if you stay on the graded track and off the soft sand. Take water — there is no shade and no facilities of any kind at the lake.",
      },
    ],
    metaTitle: "Al Wathba Salt Lake & Flamingos | Free, and When It's Pink",
    metaDescription:
      "Al Wathba salt lake and wetland reserve near Abu Dhabi: when the lake actually turns pink, the flamingo season, and what facilities exist (almost none).",
    checked: "2026-09-18",
    keywords: ["wathba salt lake", "hidden gems in abu dhabi", "abu dhabi view point", "places to visit in abu dhabi for free"],
  },
];
