/**
 * Dubai's free public beaches and beach parks. Checked September 2026.
 *
 * The beach clubs and clubs proper live in dubai-nightlife.ts — they charge a
 * minimum spend rather than an entry fee and carry a different set of rules,
 * and separating them keeps both files inside the 300-line ceiling.
 */

import type { Attraction } from "./types";

export const dubaiBeaches: Attraction[] = [
  {
    slug: "kite-beach",
    name: "Kite Beach",
    emirate: "dubai",
    area: "Umm Suqeim 3, Jumeirah",
    categories: ["beaches", "family", "waterparks"],
    tagline: "Free sand, a running track, and the Burj Al Arab in every photo",
    summary:
      "The most used public beach in Dubai and the best organised: free entry, lifeguards, showers, a 14-kilometre running track behind it, food trucks along the back, and kitesurfers out front most afternoons. The Burj Al Arab sits in the frame from almost anywhere on the sand.",
    sections: [
      {
        heading: "What is actually there",
        paragraphs: [
          "Kite Beach is a working public beach rather than a strip of empty sand. Behind the beach runs a soft-surface track used by half of Jumeirah at six in the morning and again after dark, with outdoor gym equipment, a skate park and a row of food kiosks. On the sand there are volleyball nets, kayak and paddleboard hire, and the kitesurfing school the beach is named after.",
          "Changing rooms and showers are free. Sunbed and umbrella hire is the only thing on the beach itself that costs money, and plenty of people simply bring a towel.",
        ],
      },
      {
        heading: "Timing and etiquette",
        paragraphs: [
          "From October to April it is usable all day. May to September, the sand is genuinely too hot to walk on barefoot at midday and the sea reaches bath temperature — go before eight or after five. Some stretches are floodlit until midnight in summer, which is when residents actually swim.",
          "Swimwear is fine on the beach. Walking off it into a supermarket in it is not — cover up once you leave the sand. That is a rule everywhere in the UAE and it is the one visitors trip over.",
        ],
      },
    ],
    highlights: [
      "Free entry, lifeguarded, with free showers and changing rooms",
      "14 km running and cycling track along the back",
      "Kitesurfing, kayaks and paddleboards for hire",
      "Food trucks, skate park and beach volleyball",
    ],
    gate: {
      kind: "free",
      note: "The beach is free. Sunbeds, watersports hire and the food trucks are the only paid parts.",
    },
    hours: "Open at all hours; lifeguards on duty daylight hours, part floodlit until late",
    bestTime: "October to April all day; before 08:00 or after 17:00 in summer",
    timeNeeded: "Half a day",
    gettingThere:
      "Umm Suqeim 3 on Jumeirah Beach Road, about 20 minutes from Downtown. Paid street parking; no metro nearby, so taxi or drive.",
    nearby: ["jumeirah-public-beach", "palm-jumeirah", "dubai-marina-jbr"],
    accent: "sea",
    motif: "wave",
    image: "/images/lamer-beach.jpg",
    alt: "Calm shallow water and pale sand on a Dubai public beach",
    geo: { lat: 25.1413, lng: 55.1938 },
    faqs: [
      {
        q: "Is Kite Beach free?",
        a: "Yes. Entry, lifeguards, showers and changing rooms all cost nothing. Only sunbeds, watersports hire and food are paid.",
      },
      {
        q: "Can women swim at Kite Beach?",
        a: "Yes, ordinary swimwear is normal here and nobody will comment. If you would prefer a women-only beach, Sunset Beach has segregated days and Al Mamzar Beach Park runs ladies' days midweek.",
      },
    ],
    metaTitle: "Kite Beach Dubai | Free Public Beach, Parking & Watersports",
    metaDescription:
      "Kite Beach Dubai: free entry, lifeguards, showers, the 14 km track, kitesurfing and food trucks. Best times to go and where to park.",
    checked: "2026-09-18",
    keywords: ["kite beach dubai", "kite beach dubai united arab emirates", "jumeirah beach"],
  },
  {
    slug: "jumeirah-public-beach",
    name: "Jumeirah Public Beach",
    emirate: "dubai",
    area: "Jumeirah 1, near La Mer",
    categories: ["beaches", "family"],
    tagline: "The quiet stretch locals use, ten minutes from Downtown",
    summary:
      "The original Dubai beach and still the least commercial of the free ones: a long, low-key stretch of Jumeirah 1 with shallow water, a park behind it and none of the noise of Kite Beach or JBR. Entry costs nothing and parking is easy outside weekends.",
    sections: [
      {
        heading: "Why people come here instead",
        paragraphs: [
          "Jumeirah's public beach is what the others were before they were developed — wide sand, a gentle shelving bottom that suits small children, and a row of low villas behind rather than towers. There are showers and toilets, a lifeguard in daylight, and very little else, which is the point.",
          "The park strip behind the beach has shaded grass and barbecue areas and is free to use. Families arrive around four, set up, and stay past sunset.",
        ],
      },
    ],
    highlights: [
      "Free, lifeguarded, and quieter than Kite Beach or JBR",
      "Shallow, gently shelving water for small children",
      "Shaded grass and barbecue spots in the strip behind",
      "Ten minutes from Downtown by car",
    ],
    gate: { kind: "free", note: "Free entry and free parking outside the busiest weekend hours." },
    hours: "Open at all hours; lifeguards during daylight",
    bestTime: "Late afternoon, October to April",
    timeNeeded: "2–3 hours",
    gettingThere:
      "Jumeirah Beach Road, Jumeirah 1, about 10 minutes from Downtown. Free street parking; nearest metro is a taxi ride away.",
    nearby: ["kite-beach", "dubai-frame", "al-mamzar-beach-park"],
    accent: "sea",
    motif: "wave",
    geo: { lat: 25.2320, lng: 55.2610 },
    faqs: [
      {
        q: "What should I wear on a Dubai public beach?",
        a: "Swimwear on the sand is completely normal. Cover shoulders and knees the moment you step off the beach — into a shop, a café or a taxi. Topless sunbathing is illegal anywhere in the UAE.",
      },
      {
        q: "Is Jumeirah beach good for young children?",
        a: "It is the best of the free Dubai beaches for it. The water shelves gently, there is no surf to speak of, and the crowd is mostly families rather than the volleyball-and-music scene at Kite Beach.",
      },
    ],
    metaTitle: "Jumeirah Public Beach Dubai | Free Entry & Quiet Sand",
    metaDescription:
      "Jumeirah public beach: free, lifeguarded, shallow water for children and shaded barbecue spots behind. What to wear and when to go.",
    checked: "2026-09-18",
    keywords: ["jumeirah beach", "dubai jumeirah beach", "jumeirah beach dubai united arab emirates"],
  },
  {
    slug: "al-mamzar-beach-park",
    name: "Al Mamzar Beach Park",
    emirate: "dubai",
    area: "Al Mamzar, on the Sharjah border",
    categories: ["beaches", "family", "nature"],
    tagline: "Five beaches, 100 hectares of lawn, and barbecue pits you can book",
    summary:
      "A large municipal beach park on the creek between Dubai and Sharjah with five separate beaches, huge stretches of irrigated lawn, barbecue areas, a pool, chalets to rent and shaded picnic spots. Entry is a few dirhams and it is the best family picnic ground in the city.",
    sections: [
      {
        heading: "What the entry fee buys",
        paragraphs: [
          "Al Mamzar is the answer to the question of where families in Dubai actually spend a Saturday. The park covers around a hundred hectares of planted parkland wrapped around five beaches, all of it maintained, shaded and supervised. Inside there are barbecue pits, children's play areas, a swimming pool, a small train that loops the grounds, and air-conditioned chalets that can be rented by the day for a group.",
          "The beaches are lifeguarded and the water is calm because the park sits inside the creek mouth. Two of the five are usually kept quieter than the rest.",
        ],
      },
      {
        heading: "Ladies' days",
        paragraphs: [
          "Parts of the park run women-and-children-only days midweek — usually Mondays, though it is worth confirming. It is genuinely enforced, and it is why a lot of families who would not otherwise use a public beach use this one.",
        ],
      },
    ],
    highlights: [
      "Five beaches inside one supervised park",
      "Barbecue pits, huge lawns and shaded picnic areas",
      "Rentable chalets and a swimming pool",
      "Women-and-children-only days midweek",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 5,
      note: "Around AED 5 per person on foot, AED 30 per car. Chalets and the pool are charged separately.",
    },
    hours: "Daily, roughly 08:00–22:00; later at weekends",
    bestTime: "October to April. Weekdays are near empty.",
    timeNeeded: "A full day",
    gettingThere:
      "Al Mamzar, on the Dubai–Sharjah border. Al Qiyadah metro on the Green Line then a short taxi, or drive and park inside.",
    nearby: ["al-fahidi-historic-district", "jumeirah-public-beach", "al-khan-beach"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 25.3020, lng: 55.3430 },
    faqs: [
      {
        q: "How much is Al Mamzar Beach Park?",
        a: "Around AED 5 a head walking in, or AED 30 for a car with everyone in it. Chalets, the pool and barbecue bookings cost extra and are worth reserving at weekends.",
      },
      {
        q: "Can you barbecue at Al Mamzar?",
        a: "Yes — there are dedicated pits and it is one of the few places in Dubai where it is allowed and set up for. Bring your own charcoal and take the rubbish with you.",
      },
    ],
    metaTitle: "Al Mamzar Beach Park Dubai | Entry Fee, Barbecue & Chalets",
    metaDescription:
      "Al Mamzar Beach Park: five beaches, barbecue pits, chalets and ladies' days. Entry around AED 5 per person or AED 30 per car.",
    checked: "2026-09-18",
    keywords: ["al mamzar beach", "al mamzar beach park sharjah", "al mamzar park sharjah", "family picnic spots in uae"],
  },
];
