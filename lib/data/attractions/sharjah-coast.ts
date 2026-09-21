/**
 * Sharjah's coastlines — the Gulf side at Al Khan and Al Montazah, and the
 * east-coast exclave at Khor Fakkan on the Gulf of Oman. Checked September 2026.
 */

import type { Attraction } from "./types";

export const sharjahCoast: Attraction[] = [
  {
    slug: "khor-fakkan-beach",
    name: "Khor Fakkan",
    emirate: "sharjah",
    area: "Khor Fakkan, Sharjah east-coast exclave",
    categories: ["beaches", "family", "nature", "waterparks"],
    tagline: "A crescent beach, a mountain waterfall and an amphitheatre in the rock",
    summary:
      "Sharjah's east-coast exclave on the Gulf of Oman, and the best beach town in the country: a clean crescent of sand with a corniche behind it, a 150-metre artificial waterfall cut into the mountain above, an amphitheatre carved into the hillside, and snorkelling off Shark Island. All of it free.",
    sections: [
      {
        heading: "The beach and the corniche",
        paragraphs: [
          "The bay curves between two headlands with the Hajar mountains rising straight behind it, which is why the water is clearer and cooler than anything on the Dubai side. The beach is free, lifeguarded, and backed by a landscaped corniche with playgrounds, showers and shaded seating. Shark Island sits a few hundred metres offshore and is a genuine snorkelling site — no sharks, despite the name.",
          "The town has been heavily redeveloped in the last few years and it shows: the promenade, the lighting and the facilities are better than most paid beaches elsewhere.",
        ],
      },
      {
        heading: "The waterfall and the amphitheatre",
        paragraphs: [
          "Above the town, an artificial waterfall drops around 150 metres down the mountain face, lit after dark and free to visit, with a café terrace facing it. Beside it, the Khor Fakkan Amphitheatre is cut into the hillside in a deliberate echo of a Roman theatre and seats several thousand for concerts and events.",
          "Al Rabi tower and the Al Suhub rest house higher up the mountain give the view back down over the whole bay, and are worth the short drive.",
        ],
      },
    ],
    highlights: [
      "Free, lifeguarded crescent beach on the Gulf of Oman",
      "Snorkelling off Shark Island, a few hundred metres out",
      "150 m artificial waterfall, lit after dark, free",
      "Hillside amphitheatre and mountain viewpoints above the bay",
    ],
    gate: { kind: "free", note: "Beach, corniche, waterfall and viewpoints are all free. Only watersports hire and parking in some areas charge." },
    hours: "Open at all hours; lifeguards in daylight, waterfall lit in the evening",
    bestTime: "October to April. The water is clearest in winter.",
    timeNeeded: "A full day from Dubai",
    gettingThere:
      "About two hours from Dubai across the Hajar mountains on the E102, or 45 minutes north from Fujairah city. Own vehicle.",
    nearby: ["snoopy-island", "al-bidyah-mosque", "al-khan-beach"],
    accent: "sea",
    motif: "wave",
    image: "/images/musandam.jpg",
    alt: "Steep rocky headlands dropping into clear blue water",
    geo: { lat: 25.3390, lng: 56.3520 },
    faqs: [
      {
        q: "Is Khor Fakkan in Sharjah or Fujairah?",
        a: "Sharjah. It is one of three Sharjah exclaves on the east coast, which means it is dry — no alcohol is sold or served there, unlike in neighbouring Fujairah.",
      },
      {
        q: "Can you snorkel at Khor Fakkan?",
        a: "Yes, off Shark Island a few hundred metres from the beach. There is coral and reef fish, and the visibility is far better than on the Arabian Gulf side. Bring your own gear — hire is limited.",
      },
      {
        q: "Is the Khor Fakkan waterfall real?",
        a: "It is artificial, built as part of the town's redevelopment, and it is 150 metres high and lit at night. Free to visit, with a café terrace facing it.",
      },
    ],
    metaTitle: "Khor Fakkan Sharjah | Free Beach, Waterfall & Snorkelling",
    metaDescription:
      "Khor Fakkan: a free lifeguarded beach on the Gulf of Oman, snorkelling at Shark Island, the 150 m waterfall and the hillside amphitheatre.",
    checked: "2026-09-18",
    keywords: ["khorfakkan beach sharjah", "best beach in sharjah", "places to visit in sharjah for free", "best beach fujairah"],
  },
  {
    slug: "al-khan-beach",
    name: "Al Khan Beach",
    emirate: "sharjah",
    area: "Al Khan, Sharjah",
    categories: ["beaches", "family"],
    tagline: "Sharjah's free city beach, with the Dubai skyline across the water",
    summary:
      "A long, clean public beach on the Sharjah lagoon with a paved corniche, shaded seating, showers and a view across to the Dubai skyline. Free, lifeguarded, and considerably quieter than anything comparable in Dubai. Sharjah's modesty rules apply on the sand.",
    sections: [
      {
        heading: "What to expect",
        paragraphs: [
          "Al Khan is a proper municipal beach: swept sand, a running and cycling path behind, playgrounds, showers and changing rooms, and a row of cafés along the corniche. It faces west, so the sunset over the water with the Dubai towers on the horizon is the reason people come at five o'clock.",
          "Sharjah Aquarium and the Sharjah Maritime Museum sit at the northern end of the same beach, which makes an easy combined afternoon.",
        ],
      },
      {
        heading: "The dress code, which is different here",
        paragraphs: [
          "Sharjah applies a decency law that goes further than Dubai's. On the beach, swimwear should be modest — one-piece or shorts and a top rather than a bikini — and covering up off the sand is not optional. Families use this beach precisely because those rules are observed, and visitors who ignore them get asked to cover up.",
        ],
      },
    ],
    highlights: [
      "Free, lifeguarded, with showers and changing rooms",
      "Dubai skyline across the water at sunset",
      "Sharjah Aquarium and Maritime Museum at the north end",
      "Modest swimwear expected — Sharjah's rules are stricter than Dubai's",
    ],
    gate: { kind: "free", note: "Free entry and free parking along the corniche." },
    hours: "Open at all hours; lifeguards during daylight",
    bestTime: "Late afternoon, October to April",
    timeNeeded: "2–3 hours",
    gettingThere:
      "Al Khan, on the Sharjah lagoon, about 25 minutes from Dubai Deira. Drive or taxi — Sharjah has no metro.",
    nearby: ["sharjah-aquarium", "al-noor-island", "al-mamzar-beach-park"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.3300, lng: 55.3720 },
    faqs: [
      {
        q: "Can you wear a bikini in Sharjah?",
        a: "Not comfortably. Sharjah's decency law is stricter than Dubai's and modest swimwear — a one-piece, or shorts and a top — is what is expected on the beach. Cover up entirely once you leave the sand.",
      },
      {
        q: "What is the best beach in Sharjah?",
        a: "Al Khan for a city beach with facilities and the Dubai view. Khor Fakkan on the east coast if you can spare the drive — clearer water, mountains behind it and snorkelling offshore.",
      },
    ],
    metaTitle: "Al Khan Beach Sharjah | Free Entry, Facilities & Dress Code",
    metaDescription:
      "Al Khan Beach: Sharjah's free lifeguarded city beach with showers, a corniche and the Dubai skyline opposite. Plus the dress rules that differ from Dubai.",
    checked: "2026-09-18",
    keywords: ["al khan beach sharjah", "best beach in sharjah", "places to visit in sharjah for free", "al noor island sharjah"],
  },
  {
    slug: "sharjah-fish-market",
    name: "Sharjah Fish Market",
    emirate: "sharjah",
    area: "Al Mina Road, Sharjah",
    categories: ["souks", "dining"],
    tagline: "The biggest catch on the coast, and a cook shop to grill it",
    summary:
      "The largest fish market in the northern emirates and a working one: boats land at dawn, the hall fills, and prices are per kilo and negotiable. As at Mina Zayed, you can have your fish cleaned on site and cooked at one of the stalls for a few dirhams more.",
    sections: [
      {
        heading: "Going early",
        paragraphs: [
          "The market runs all day but the catch and the prices are both best between six and nine in the morning, when the boats have just unloaded. Hammour, sheri, kingfish, prawns and crab are the usual. Bargaining is expected and the first price is not the price.",
          "The vegetable and fruit souk and the date market are in the same complex, and the meat hall next door. The whole thing is free to walk around and is one of the more interesting hours in the emirate.",
        ],
      },
    ],
    highlights: [
      "Largest fish market in the northern emirates",
      "Cleaning and cooking available on site",
      "Fruit, vegetable, date and meat souks in the same complex",
      "Free to enter; prices per kilo and negotiable",
    ],
    gate: { kind: "free", note: "Free to enter. Cleaning and cooking cost a few dirhams per kilo." },
    hours: "Daily from around 05:00; freshest before 09:00",
    bestTime: "Early morning",
    timeNeeded: "1–2 hours",
    gettingThere:
      "Al Mina Road near the Sharjah corniche, about 25 minutes from Dubai Deira. Free parking.",
    nearby: ["al-khan-beach", "sharjah-museum-of-islamic-civilization", "al-noor-island"],
    accent: "gold",
    motif: "wave",
    image: "/images/spice-souk.jpg",
    alt: "Sacks and displays of goods in a covered souk",
    geo: { lat: 25.3670, lng: 55.3850 },
    faqs: [
      {
        q: "What time does Sharjah fish market open?",
        a: "From around five in the morning. Go before nine for the fresh catch and the best prices — by the afternoon the selection has thinned considerably.",
      },
    ],
    metaTitle: "Sharjah Fish Market | Opening Times, Prices & Cook Shops",
    metaDescription:
      "Sharjah fish market: the biggest catch in the northern emirates, when to go, how the cleaning and cooking stalls work, and the souks next door.",
    checked: "2026-09-18",
    keywords: ["sharjah fish market", "best restaurant in sharjah", "cheapest market in abu dhabi"],
  },
];
