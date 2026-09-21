/**
 * Yas Island's water park and indoor theme park, plus desert camping across the
 * emirate — grouped here only to keep abu-dhabi-outdoors.ts inside the 300-line
 * ceiling. Checked September 2026.
 */

import type { Attraction } from "./types";

export const abuDhabiYas: Attraction[] = [
  {
    slug: "yas-waterworld",
    name: "Yas Waterworld",
    emirate: "abu-dhabi",
    area: "Yas Island",
    categories: ["waterparks", "family", "kids"],
    tagline: "Emirati-themed water park with a hydromagnetic coaster on it",
    summary:
      "Forty-plus rides on Yas Island built around the story of a pearl-diving village, including a six-person tornado slide, a hydromagnetic water coaster and the largest surfable sheet wave in the region. Included in the multi-park Yas passes, which is the only sensible way to buy it.",
    sections: [
      {
        heading: "The rides worth queueing for",
        paragraphs: [
          "Dawwama is the headline — a six-person tornado that drops into a funnel and is genuinely disorienting. Bandit Bomber is a suspended roller coaster with water and laser effects fired from the track. Bubble's Barrel is a sheet wave big enough that surf lessons run on it, and Liwa Loop is the near-vertical drop capsule.",
          "For younger children the Marah Fortress play structure and the lazy river cover most of a day without anyone reaching a height limit.",
        ],
      },
      {
        heading: "Buying it",
        paragraphs: [
          "A single-park day ticket is poor value against the multi-park Yas passes, which cover Ferrari World, Warner Bros. World, SeaWorld and Yas Waterworld across several days for roughly a third less per park. If you are on Yas Island at all, buy the pass.",
        ],
      },
    ],
    highlights: [
      "40+ rides including a hydromagnetic water coaster",
      "Bubble's Barrel — the region's largest surfable sheet wave",
      "Large dedicated area for under-8s",
      "Multi-park Yas passes cut the per-park cost sharply",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 345,
      note: "Single park, single day. Two parks about AED 475, three about AED 575, four about AED 675, each valid across six days.",
    },
    hours: "Daily, roughly 10:00–18:00; extended at weekends and in holidays",
    bestTime: "March to May and September to November. Weekday mornings for the short queues.",
    timeNeeded: "A full day",
    gettingThere:
      "Yas Island, about 30 minutes from central Abu Dhabi and 70 minutes from Dubai. Free parking and free shuttles between the Yas parks.",
    nearby: ["ferrari-world-abu-dhabi", "warner-bros-world-abu-dhabi", "abu-dhabi-corniche"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 24.4880, lng: 54.5990 },
    faqs: [
      {
        q: "Is Yas Waterworld better than Aquaventure?",
        a: "Aquaventure is bigger and has the better slide count. Yas Waterworld has the more interesting theming, the surf wave and, if you are buying a multi-park Yas pass anyway, a much lower marginal cost.",
      },
      {
        q: "What is the height limit at Yas Waterworld?",
        a: "The headline rides need 1.1 to 1.3 m depending on the slide. Below that, the Marah Fortress structure and the lazy river cover a full day.",
      },
    ],
    metaTitle: "Yas Waterworld Abu Dhabi | Tickets, Rides & Yas Passes",
    metaDescription:
      "Yas Waterworld: ticket prices, the rides worth queueing for, height limits, and why the multi-park Yas Island pass costs far less per park.",
    checked: "2026-09-18",
    keywords: ["yas waterworld", "dubai water park", "abu dhabi top things to do"],
  },
  {
    slug: "warner-bros-world-abu-dhabi",
    name: "Warner Bros. World Abu Dhabi",
    emirate: "abu-dhabi",
    area: "Yas Island",
    categories: ["family", "kids", "events"],
    tagline: "Entirely indoor, which makes it the July answer",
    summary:
      "The largest indoor theme park in the world by floor area: twenty-nine rides and attractions across six lands covering Gotham City, Metropolis, Cartoon Junction, Bedrock, Dynamite Gulch and a central Warner Bros. Plaza. Fully air-conditioned, so the month you visit makes no difference.",
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "This is the Yas park aimed squarely at under-tens and at families who want theming over adrenaline. Cartoon Junction and Bedrock are built for small children; Gotham and Metropolis carry the two or three rides with real height and speed to them. There is no equivalent of Formula Rossa here and that is the point.",
          "Being wholly indoors, it is the one large UAE attraction that is genuinely better in August than in January — the queues are shorter and the temperature is irrelevant.",
        ],
      },
    ],
    highlights: [
      "Fully indoor and air-conditioned — works in peak summer",
      "29 rides across six themed lands",
      "Weighted towards under-10s rather than thrill-seekers",
      "Covered by the multi-park Yas Island passes",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 345,
      note: "Single park, single day. Multi-park Yas passes are substantially cheaper per park.",
    },
    hours: "Daily, roughly 11:00–20:00; extended at weekends",
    bestTime: "Any month — it is indoors. Weekday mornings for the shortest queues.",
    timeNeeded: "A full day",
    gettingThere:
      "Yas Island, about 30 minutes from central Abu Dhabi and 70 minutes from Dubai. Free parking and free inter-park shuttles.",
    nearby: ["ferrari-world-abu-dhabi", "yas-waterworld", "abu-dhabi-corniche"],
    accent: "coral",
    motif: "speed",
    geo: { lat: 24.4940, lng: 54.5980 },
    faqs: [
      {
        q: "Is Warner Bros. World suitable for toddlers?",
        a: "Yes — it is the most toddler-friendly of the Yas parks. Cartoon Junction and Bedrock are built for under-sixes, and being indoors means no heat and no sunburn.",
      },
      {
        q: "Which Yas Island park should we pick?",
        a: "Ferrari World for thrill rides, Warner Bros. World for young children, Yas Waterworld in the shoulder months, SeaWorld for marine life. A two-park pass at around AED 475 against AED 345 for one makes choosing only one hard to justify.",
      },
    ],
    metaTitle: "Warner Bros. World Abu Dhabi | Tickets, Rides & Ages",
    metaDescription:
      "Warner Bros. World Abu Dhabi: the world's largest indoor theme park, ticket prices, which lands suit which ages, and why it works in summer.",
    checked: "2026-09-18",
    keywords: ["abu dhabi top things to do", "mad yas island nightclub abu dhabi", "things to do in dubai"],
  },
  {
    slug: "abu-dhabi-desert-camping",
    name: "Desert Camping in Abu Dhabi",
    emirate: "abu-dhabi",
    area: "Al Wathba, Liwa and the Al Dhafra dunes",
    categories: ["camping", "adventure", "nature"],
    tagline: "Legal, free, and the best night out in the emirate",
    summary:
      "Camping in the open desert is permitted across most of Abu Dhabi's unfenced land, costs nothing, and gets you a sky most visitors never see. What matters is knowing where it is not allowed, what the ground will do to a two-wheel-drive car, and the rules that turn a good night into a fine.",
    sections: [
      {
        heading: "Where you can and cannot",
        paragraphs: [
          "Open, unfenced desert away from private land, farms and military areas is generally fine. What is not: protected reserves such as Al Wathba Wetland, anywhere signed, within sight of a residence, on the beaches inside city limits, and Bu Tinah and the other protected islands. Rangers do patrol the popular areas and fines are issued.",
          "Popular spots are the dunes off the Al Wathba and Sweihan roads for an easy night from the city, and the Liwa crescent — around two and a half hours south — for the big dunes and the genuinely dark sky. Liwa's sand is soft and steep; do not take a saloon car past the tarmac there.",
        ],
      },
      {
        heading: "The practical part",
        paragraphs: [
          "Deflate tyres to around 15 psi for soft sand and carry a compressor to reinflate before you rejoin the road. Take more water than you think, a shovel and recovery boards, and tell someone where you are going. Phone signal disappears quickly once you are off the graded tracks.",
          "Fires are allowed on open sand but must be out and cold before you leave, and every piece of rubbish goes home with you. The single biggest complaint about UAE desert camping is the litter left by campers, and it is the reason areas get fenced off.",
        ],
      },
    ],
    highlights: [
      "Free and legal in most open, unfenced desert",
      "Al Wathba and Sweihan for an easy night; Liwa for big dunes and dark sky",
      "Not permitted in reserves, on city beaches or anywhere signed",
      "Deflate tyres to about 15 psi and carry a compressor",
    ],
    gate: { kind: "free", note: "Free. Paid desert camps with facilities exist at Liwa and Al Wathba if you would rather not self-supply." },
    hours: "Any time of year, but October to March only for comfort",
    bestTime: "November to February, and around a new moon for the stars",
    timeNeeded: "Overnight",
    gettingThere:
      "Al Wathba and Sweihan are under an hour from Abu Dhabi city. Liwa is about 2.5 hours south. A 4x4 is essential anywhere off the graded track.",
    nearby: ["al-wathba-salt-lake", "mushrif-central-park", "mleiha-archaeological-centre"],
    accent: "sun",
    motif: "dune",
    image: "/images/camp-stars.jpg",
    alt: "A star-filled night sky above a quiet desert landscape",
    geo: { lat: 23.1300, lng: 53.7800 },
    faqs: [
      {
        q: "Is wild camping legal in Abu Dhabi?",
        a: "Yes, in open unfenced desert away from private property, reserves and signed areas. It is not permitted in protected reserves such as Al Wathba Wetland, on city beaches, or anywhere with a sign saying so — and those are patrolled.",
      },
      {
        q: "Where is the best camping near Abu Dhabi?",
        a: "Al Wathba and the Sweihan dunes for an easy night under an hour from the city. Liwa, about 2.5 hours south, for the big dunes and a genuinely dark sky — but it needs a proper 4x4 and some experience.",
      },
      {
        q: "Do I need a 4x4 to camp in the desert?",
        a: "Off the graded tracks, yes, with deflated tyres, a compressor and recovery gear. Several roadside camping areas can be reached in a normal car, but soft sand will strand a saloon within metres.",
      },
    ],
    metaTitle: "Camping in Abu Dhabi | Where It's Legal & Free Spots",
    metaDescription:
      "Desert camping in Abu Dhabi: where it is legal and where it is not, the best free spots at Al Wathba, Sweihan and Liwa, and the 4x4 kit you need.",
    checked: "2026-09-18",
    keywords: ["abu dhabi camping", "abu dhabi camping site", "camping spot in abu dhabi", "hidden gems in abu dhabi"],
  },
];
