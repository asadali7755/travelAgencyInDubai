/**
 * Dubai’s tower landmarks — the tallest building, the museum on Sheikh Zayed
 * Road and the frame in Zabeel Park. The island, fountain and Marina live in
 * dubai-coast.ts; the souks and gardens in dubai-experiences.ts.
 *
 * Every price is the published gate price checked in September 2026. Where a
 * venue prices by time slot the cheapest off-peak adult ticket is used, and the
 * peak surcharge is stated in `note` so the number is never misleading.
 */

import type { Attraction } from "./types";

export const dubaiLandmarks: Attraction[] = [
  {
    slug: "burj-khalifa",
    name: "Burj Khalifa",
    emirate: "dubai",
    area: "Downtown Dubai",
    categories: ["landmarks"],
    tagline: "The tallest building on earth, and the view down from level 124",
    summary:
      "At 828 metres the Burj Khalifa has held the tallest-building record since 2010, and the observation decks on levels 124, 125 and 148 are the reason most first-time visitors come to Downtown at all. Book a slot rather than turning up: the deck sells out days ahead between November and March.",
    sections: [
      {
        heading: "What you actually see",
        paragraphs: [
          "The lift from the Dubai Mall concourse climbs to level 124 in about a minute, which is quick enough that your ears pop and slow enough to watch the floor counter run. Level 124 is open-air on one side, so you get the wind and the sound of the city rather than a view through glass. Level 125, one floor up, is enclosed and quieter, and it is where most people end up sitting on the benches watching the light change.",
          "The Sky experience on level 148 sits at 555 metres and is a different product: a smaller, carpeted lounge with a terrace, a served refreshment, and far fewer people in it. Whether it is worth roughly double depends entirely on how much you dislike crowds.",
        ],
      },
      {
        heading: "Timing it properly",
        paragraphs: [
          "The prime-hour window, broadly four to seven in the evening, costs more precisely because it is the good one — you arrive in daylight, watch the sun go down over the Gulf and leave with the city lit. If the budget matters more than the photograph, a mid-morning slot is half the price and the desert haze usually burns off by ten.",
          "Allow forty minutes between your booked time and actually reaching the lift. The entrance is at the lower-ground level of Dubai Mall near the aquarium, security queues build at weekends, and a missed slot is not refunded.",
        ],
      },
    ],
    highlights: [
      "Observation decks at 452 m (levels 124/125) and 555 m (level 148)",
      "Open-air terrace on level 124 — not a sealed glass box",
      "Entrance inside Dubai Mall, so the fountain show is a five-minute walk",
      "Timed entry: off-peak slots are roughly a third cheaper than prime hours",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 173,
      childFrom: 140,
      note: "Prime-hour slots (about 4–7 pm) from AED 250 adult. Level 148 from AED 400. Under-4s free.",
    },
    hours: "Daily, roughly 09:00–23:00; last entry about an hour before close",
    bestTime: "November to March for clear air; late afternoon for the sunset change-over",
    timeNeeded: "1.5–2 hours including security and the queue",
    gettingThere:
      "Burj Khalifa/Dubai Mall metro on the Red Line, then the 800 m air-conditioned link bridge into the mall. Taxi drop-off is at Dubai Mall's Grand Drive entrance.",
    nearby: ["dubai-fountain", "dubai-frame", "museum-of-the-future"],
    accent: "sea",
    motif: "tower",
    image: "/images/burj-downtown.jpg",
    alt: "The Burj Khalifa rising over Downtown Dubai at dusk",
    geo: { lat: 25.1972, lng: 55.2744 },
    faqs: [
      {
        q: "Is level 148 worth the extra money?",
        a: "If you are travelling with children or on a tight budget, no — the view from 124 is the same city from 100 metres lower. If you want to sit down, avoid the crush and take photographs without someone's elbow in the frame, it is the one upgrade at Burj Khalifa that genuinely changes the experience.",
      },
      {
        q: "Can you buy Burj Khalifa tickets on the day?",
        a: "Between June and September, usually yes. From November to March the prime-hour slots often sell out three to five days ahead, and on public holidays the whole day can go. Book online before you fly.",
      },
      {
        q: "How long is the queue?",
        a: "Thirty to forty-five minutes at peak times even with a timed ticket, because everyone with a 5 pm slot arrives at 4:55. Arrive twenty minutes early and you will walk through.",
      },
    ],
    metaTitle: "Burj Khalifa Tickets & Visitor Guide | Levels 124, 125, 148",
    metaDescription:
      "Burj Khalifa ticket prices, opening hours, the difference between levels 124, 125 and 148, and which time slot is actually worth booking.",
    checked: "2026-09-18",
  },
  {
    slug: "museum-of-the-future",
    name: "Museum of the Future",
    emirate: "dubai",
    area: "Sheikh Zayed Road, Trade Centre",
    categories: ["landmarks", "culture"],
    tagline: "A torus of Arabic calligraphy with seven floors of speculative design inside",
    summary:
      "The silver ring on Sheikh Zayed Road is the most photographed building in Dubai after the Burj Khalifa, and unusually the inside earns the outside. Each floor is a separate designed environment rather than a gallery of objects, and the whole thing takes about two hours to walk.",
    sections: [
      {
        heading: "How the building is organised",
        paragraphs: [
          "You start at the top and work down. The upper floor is staged as an orbital station in the 2070s, complete with a lift briefing that commits fully to the premise. Below it sits a darkened room of preserved species — a digital ark, presented more as a cathedral than a museum case. Lower still are floors on wellbeing and on future technologies, and the ground floors are given over to children.",
          "The Arabic calligraphy wrapping the façade is not decoration bolted on afterwards: the windows are the letterforms, which is why the interior light falls in those shapes. It is worth walking the perimeter outside before you go in.",
        ],
      },
      {
        heading: "Who it suits",
        paragraphs: [
          "It rewards people who like being inside an idea rather than reading about one. If your travelling companion wants artefacts, dates and provenance, the Louvre Abu Dhabi will suit them better and the two make a natural pair across a trip.",
          "Photography is allowed throughout and the building is built for it, which does mean the popular corners have small queues of people waiting their turn on a staircase.",
        ],
      },
    ],
    highlights: [
      "Seven floors, each a fully designed environment rather than a display case",
      "Arabic calligraphy façade — the windows are the text",
      "Children's floor for under-10s included in general admission",
      "Directly on the Red Line, so no parking problem",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 149,
      childFrom: null,
      note: "Standard admission AED 149–159; the Pioneer pass is about AED 399. Under-4s free.",
    },
    hours: "Daily 10:00–18:00, last entry around 17:00; timed slots",
    bestTime: "Weekday mornings — weekend afternoons are the busiest slots of the week",
    timeNeeded: "2 hours",
    gettingThere:
      "Emirates Towers metro on the Red Line, then a signposted five-minute walk over the footbridge. Parking on site is limited and fills by midday.",
    nearby: ["burj-khalifa", "dubai-fountain", "dubai-frame"],
    accent: "sea",
    motif: "gallery",
    geo: { lat: 25.2197, lng: 55.2820 },
    faqs: [
      {
        q: "Do I need to book Museum of the Future in advance?",
        a: "Yes. It sells by timed slot and weekend slots routinely go several days ahead. It is one of the few Dubai attractions where turning up without a ticket regularly means being turned away.",
      },
      {
        q: "Is it suitable for young children?",
        a: "The lower floors are built for them and work well for ages three to ten. The upper floors are dark, quiet and conceptual, and small children tend to lose interest quickly.",
      },
    ],
    metaTitle: "Museum of the Future Dubai | Tickets & What to Expect",
    metaDescription:
      "What is actually inside the Museum of the Future, floor by floor, plus 2026 ticket prices, opening hours and why you must book a timed slot in advance.",
    checked: "2026-09-18",
  },
  {
    slug: "dubai-frame",
    name: "Dubai Frame",
    emirate: "dubai",
    area: "Zabeel Park, Al Kifaf",
    categories: ["landmarks", "family"],
    tagline: "Old Dubai through one pane, new Dubai through the other",
    summary:
      "A 150-metre gilded rectangle standing in Zabeel Park, positioned so that the view north is the low-rise city of the 1970s and the view south is the skyline built since. The glass-floored bridge between the two towers is the bit everybody remembers, and the whole visit costs less than a mall lunch.",
    sections: [
      {
        heading: "The idea behind it",
        paragraphs: [
          "The Frame is the rare Dubai attraction whose concept does the work rather than its scale. Standing on the sky bridge you turn 180 degrees and travel fifty years: Deira, Karama and Bur Dubai on one side, low and sand-coloured, and Sheikh Zayed Road's glass wall on the other. It makes the pace of the city legible in a way that a taller tower does not.",
          "A short gallery on the ground floor covers Dubai's history before you go up, and a projection room at the end imagines the city decades from now. Neither is long, and the building does not pretend they are the main event.",
        ],
      },
      {
        heading: "The glass floor",
        paragraphs: [
          "Panels in the centre of the 93-metre bridge turn opaque and then clear as you step on them. If heights bother you, the solid walkway along the edge gets you across without incident — nobody is forced onto the glass.",
        ],
      },
    ],
    highlights: [
      "150 m tall, 93 m wide, with a glass-floored sky bridge between the towers",
      "Old Dubai to the north, new Dubai to the south, from the same spot",
      "Among the cheapest paid views in the city",
      "Inside Zabeel Park, so the ticket buys an afternoon rather than an hour",
    ],
    gate: {
      kind: "ticket",
      adultFrom: 42,
      childFrom: 25,
      note: "Child rate covers ages 3–11. Under-3s free. Zabeel Park entry is included.",
    },
    hours: "Daily 09:00–21:00, last entry about 20:30",
    bestTime: "An hour before sunset — both views are lit and the bridge is not yet full",
    timeNeeded: "1 hour, or half a day if you stay in Zabeel Park",
    gettingThere:
      "Al Jafiliya metro on the Red Line, then about a ten-minute walk through Zabeel Park gate four. Taxis can drop at the Frame's own gate.",
    nearby: ["al-fahidi-historic-district", "burj-khalifa", "museum-of-the-future"],
    accent: "gold",
    motif: "arch",
    geo: { lat: 25.2354, lng: 55.3007 },
    faqs: [
      {
        q: "Is Dubai Frame worth visiting if I am already doing Burj Khalifa?",
        a: "They do different jobs. The Burj Khalifa shows you how big Dubai is; the Frame shows you how fast it changed. At around a quarter of the price, it is an easy addition rather than a competitor.",
      },
      {
        q: "Is the glass floor safe for children?",
        a: "Yes, and children are usually the ones queuing to jump on it. There is a solid path along the side for anyone who would rather not.",
      },
    ],
    metaTitle: "Dubai Frame Tickets, Timings & Glass Floor Guide",
    metaDescription:
      "Dubai Frame ticket prices for 2026, opening hours, how to reach it by metro, and why the view north matters as much as the skyline view south.",
    checked: "2026-09-18",
  },
];
