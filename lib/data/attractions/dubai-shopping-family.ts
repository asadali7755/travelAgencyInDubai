/**
 * Dubai's malls, its safari park, its arena and its spa scene — the indoor half
 * of the city, which is most of it for four months of the year.
 * Checked September 2026.
 */

import type { Attraction } from "./types";

export const dubaiShoppingFamily: Attraction[] = [
  {
    slug: "the-dubai-mall",
    name: "The Dubai Mall",
    emirate: "dubai",
    area: "Downtown Dubai",
    categories: ["shopping", "family", "kids", "wildlife"],
    tagline: "1,200 shops, an aquarium, an ice rink and free air conditioning",
    summary:
      "One of the largest malls in the world by area and the busiest visitor attraction in the UAE. Free to walk into, and inside it are an aquarium with a walk-through tunnel, an Olympic ice rink, a waterfall, a dinosaur skeleton and the entrance to the Burj Khalifa.",
    sections: [
      {
        heading: "Treat it as a district, not a shop",
        paragraphs: [
          "Dubai Mall is civic space as much as retail. In August it is where people walk. The aquarium's 48-metre tunnel is visible for free from the ground floor — the ticket buys you the tunnel and the underwater zoo above it — and the ice rink, the waterfall sculpture and the 155-million-year-old diplodocus skeleton cost nothing to look at.",
          "Allow far longer than you think to cross it. The Burj Khalifa entrance is at the lower-ground level near the aquarium, and the fountain promenade runs along the back.",
        ],
      },
      {
        heading: "The other malls, briefly",
        paragraphs: [
          "Mall of the Emirates has the indoor ski slope and is easier to navigate. Ibn Battuta is themed by region and is the most interesting building of the three. Dubai Outlet Village and Dubai Outlet Mall, out on the Al Ain road, are where last season's stock goes at 30–80% off and are worth the drive if you are actually shopping rather than sightseeing.",
        ],
      },
    ],
    highlights: [
      "Free entry; the aquarium tunnel is visible from the concourse at no cost",
      "Olympic-size ice rink and a large indoor theme park for children",
      "Burj Khalifa entrance and the fountain promenade are both inside",
      "Directly on the Red Line with a covered walkway from the station",
    ],
    gate: {
      kind: "free",
      note: "The mall is free. Aquarium tickets start around AED 140; the ice rink, VR park and theme park each charge separately.",
    },
    hours: "Daily, roughly 10:00–00:00; later at weekends",
    bestTime: "Weekday mornings. Weekend evenings are extremely busy.",
    timeNeeded: "Half a day",
    gettingThere:
      "Burj Khalifa/Dubai Mall metro on the Red Line, then the 800 m air-conditioned link bridge. Parking is free but fills from mid-afternoon at weekends.",
    nearby: ["burj-khalifa", "dubai-fountain", "dubai-outlet-village"],
    accent: "sea",
    motif: "tower",
    image: "/images/burj-downtown.jpg",
    alt: "Downtown Dubai towers rising above the Burj Lake at dusk",
    geo: { lat: 25.1980, lng: 55.2796 },
    faqs: [
      {
        q: "Which is the best mall in Dubai?",
        a: "Dubai Mall for scale and for everything attached to it. Mall of the Emirates if you actually want to shop without walking five kilometres. Ibn Battuta if you want the building to be the reason you went.",
      },
      {
        q: "Do you have to pay to see the Dubai Aquarium?",
        a: "No, not to see it. The 750,000-litre tank is visible from the mall concourse for free. The ticket buys the walk-through tunnel and the Underwater Zoo above it.",
      },
    ],
    metaTitle: "The Dubai Mall | Free Entry, Aquarium, Ice Rink & Tips",
    metaDescription:
      "The Dubai Mall guide: what's free, the aquarium you can see without a ticket, the ice rink, and how it compares to Mall of the Emirates and the outlets.",
    checked: "2026-09-18",
    keywords: ["malls in dubai", "dubai mall", "things to do in dubai"],
  },
  {
    slug: "dubai-outlet-village",
    name: "Dubai Outlet Village",
    emirate: "dubai",
    area: "Al Ain Road, Dubailand",
    categories: ["shopping"],
    tagline: "Tuscan-styled outlet centre where last season actually is cheaper",
    summary:
      "An open-air outlet mall on the Al Ain road built to look like an Italian hill town, with around a hundred brand outlets discounting previous-season stock by roughly 30 to 80 per cent. Free entry, free parking, and genuinely quiet on a weekday.",
    sections: [
      {
        heading: "Worth the drive?",
        paragraphs: [
          "If you are sightseeing, no — it is forty minutes out of the city and there is nothing else there. If you are shopping, yes: the discounts are real rather than the mall-wide fake sales, and the stock is mostly previous-season rather than outlet-made-for-outlet.",
          "It is open-air, so it is comfortable from November to March and unpleasant in July. The neighbouring Dubai Outlet Mall is indoor, larger and less attractive, and often has the better bargain.",
        ],
      },
    ],
    highlights: [
      "Around 100 brand outlets at 30–80% off",
      "Free entry and free parking",
      "Open-air, so best November to March",
      "Dubai Outlet Mall next door is indoor and often cheaper still",
    ],
    gate: { kind: "free", note: "Free entry and parking." },
    hours: "Daily, roughly 10:00–22:00",
    bestTime: "Weekday mornings, November to March. Peak sales in January and during the shopping festival.",
    timeNeeded: "2–3 hours",
    gettingThere:
      "Al Ain Road (E66), about 40 minutes from Downtown. No metro — drive or take a taxi.",
    nearby: ["the-dubai-mall", "global-village", "dubai-miracle-garden"],
    accent: "gold",
    motif: "arch",
    geo: { lat: 25.0840, lng: 55.3740 },
    faqs: [
      {
        q: "Are Dubai outlet malls actually cheaper?",
        a: "Yes, materially — 30 to 80 per cent off previous-season stock rather than a mall-wide promotion. The trade is that the range is what did not sell, and it is a long drive.",
      },
    ],
    metaTitle: "Dubai Outlet Village | Discounts, Hours & Getting There",
    metaDescription:
      "Dubai Outlet Village: around 100 outlets at 30–80% off, free entry and parking, and whether it beats Dubai Outlet Mall next door.",
    checked: "2026-09-18",
    keywords: ["dubai outlet village", "malls in dubai", "abu dhabi cheap shopping"],
  },
  {
    slug: "dubai-safari-park",
    name: "Dubai Safari Park",
    emirate: "dubai",
    area: "Al Warqa 5",
    categories: ["wildlife", "family", "kids"],
    tagline: "119 hectares, 3,000 animals, and a drive-through African village",
    summary:
      "A large municipal zoo and safari park on the eastern edge of the city, organised into an African village, an Asian village, an Arabian desert section and an explorer village with a drive-through safari. It runs a season rather than a full year and closes through the hottest months.",
    sections: [
      {
        heading: "How it is laid out",
        paragraphs: [
          "The park is walked rather than driven for most of its area, with an electric shuttle between the villages for anyone who would rather not. The African village holds the primates and big cats, the Asian village the elephants and tigers, and the Arabian desert section the species you would actually meet in the Emirates — oryx, gazelle, sand cat.",
          "The Safari Journey is a separate guided drive-through in an enclosed vehicle through open-range enclosures, and it is the part worth booking rather than assuming.",
        ],
      },
      {
        heading: "The season",
        paragraphs: [
          "Dubai Safari Park opens roughly October to May and closes for the summer, for the obvious reason. Go at opening: the animals are active in the first two hours and asleep for most of the rest.",
        ],
      },
    ],
    highlights: [
      "Around 3,000 animals across four themed villages",
      "Drive-through Safari Journey through open-range enclosures",
      "Arabian desert section with oryx, gazelle and sand cat",
      "Seasonal — open roughly October to May",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 50,
      childFrom: 20,
      note: "Basic entry; the Safari Journey and feeding experiences are extra. Under-3s free.",
    },
    hours: "Seasonal, roughly October to May, daily around 09:00–17:00",
    bestTime: "At opening, on a weekday, in the cooler months",
    timeNeeded: "Half a day",
    gettingThere:
      "Al Warqa 5, off the Dubai–Hatta road, about 25 minutes from Downtown. Free parking; no metro.",
    nearby: ["global-village", "the-dubai-mall", "dubai-miracle-garden"],
    accent: "palm",
    motif: "garden",
    geo: { lat: 25.1730, lng: 55.4260 },
    faqs: [
      {
        q: "Is Dubai Safari Park open all year?",
        a: "No. It runs a season of roughly October to May and closes through the summer. Check before planning a trip around it.",
      },
      {
        q: "How long do you need at Dubai Safari Park?",
        a: "Three to four hours for the villages on foot, more if you add the Safari Journey. Arrive at opening — by midday most of the animals have found shade.",
      },
    ],
    metaTitle: "Dubai Safari Park | Tickets, Season Dates & What to See",
    metaDescription:
      "Dubai Safari Park: ticket prices, the October–May season, the four villages, the drive-through Safari Journey and the best time of day to arrive.",
    checked: "2026-09-18",
    keywords: ["dubai safari park", "dubai safari", "things to do in dubai"],
  },
  {
    slug: "coca-cola-arena",
    name: "Coca-Cola Arena",
    emirate: "dubai",
    area: "City Walk, Al Wasl",
    categories: ["events"],
    tagline: "The 17,000-seat room international tours actually book",
    summary:
      "The largest indoor, fully air-conditioned arena in the region and the venue that made Dubai a standard stop on world tours. Seventeen thousand seats, a central location at City Walk, and a calendar that runs concerts, comedy, boxing and family shows through the year.",
    sections: [
      {
        heading: "What plays here",
        paragraphs: [
          "Since opening in 2019 the arena has taken the arena-scale acts that previously skipped the Gulf, alongside stand-up tours, basketball, boxing and children's shows. Being indoors and climate-controlled means it runs a full summer calendar when the outdoor venues cannot.",
          "For bigger shows the alternative is Etihad Arena on Yas Island in Abu Dhabi, at around 18,000 seats, and outdoor festival sites for the winter season. Dubai Opera in Downtown is the smaller, seated room for classical, musicals and jazz.",
        ],
      },
      {
        heading: "Buying tickets",
        paragraphs: [
          "Tickets go through the arena's own site and the regional ticketing platforms. Resale through unofficial channels is common and is a bad idea — entry is scanned and duplicate barcodes are simply refused at the door.",
        ],
      },
    ],
    highlights: [
      "17,000 seats, indoor and air-conditioned, so it runs all summer",
      "At City Walk, ten minutes from Downtown",
      "Concerts, comedy, boxing and family shows",
      "Etihad Arena on Yas Island and Dubai Opera are the alternatives",
    ],
    gate: {
      kind: "varies",
      note: "Priced per event. There is nothing to see when a show is not on — the arena is not open to walk around.",
    },
    hours: "Event nights only; doors usually 90 minutes before",
    bestTime: "Whenever the act you want is playing",
    timeNeeded: "An evening",
    gettingThere:
      "City Walk, Al Wasl. Taxi or ride-hailing; the nearest metro is a short taxi away and the queue afterwards is long, so pre-book the ride home.",
    nearby: ["dubai-frame", "the-dubai-mall", "dubai-night-clubs"],
    accent: "coral",
    motif: "wheel",
    geo: { lat: 25.2093, lng: 55.2650 },
    faqs: [
      {
        q: "Where do concerts happen in Dubai?",
        a: "Coca-Cola Arena at City Walk for arena tours, Dubai Opera for seated and classical, Etihad Arena on Yas Island for the biggest shows, and outdoor festival sites through the winter season only.",
      },
      {
        q: "Can you visit the arena when nothing is on?",
        a: "No. It is a working venue with no daytime tours, so there is nothing to see unless you hold a ticket.",
      },
    ],
    metaTitle: "Coca-Cola Arena Dubai | Concerts, Tickets & Getting There",
    metaDescription:
      "Coca-Cola Arena: 17,000 seats at City Walk, what plays there, how to buy tickets safely, and the alternatives at Etihad Arena and Dubai Opera.",
    checked: "2026-09-18",
    keywords: ["concerts in dubai", "coca cola arena dubai", "dubai opera", "etihad arena yas island"],
  },
];
