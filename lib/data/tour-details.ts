/**
 * Long-form content for each tour page: itinerary, what is and is not included,
 * and the questions people actually ask before booking.
 *
 * Facts here are researched rather than assumed — Lahbab's red dunes sit about
 * 45 minutes from the city, Burj Khalifa's levels 124/125 are at roughly 456m
 * with level 148 at 555m, and the Creek abra fare is one dirham. Anything
 * commercial (our prices, our phone number) stays a bracketed placeholder.
 */

export type ItineraryStop = { time: string; title: string; body: string };

export type TourDetail = {
  intro: string;
  itinerary?: ItineraryStop[];
  includes: string[];
  excludes: string[];
  faqs: { q: string; a: string }[];
};

export const tourDetails: Record<string, TourDetail> = {
  "desert-safari": {
    intro:
      "A driver collects you from your hotel in the afternoon and heads out to the red dunes at Lahbab, roughly forty-five minutes from the city. The sand there is genuinely red — iron oxide — and the dunes are steep enough for proper dune bashing rather than a car-park loop. After the drive comes camp: camel rides, sandboarding, henna, Arabic coffee, a BBQ buffet, and the tanoura and fire shows before the run home.",
    itinerary: [
      {
        time: "15:00",
        title: "Hotel pick-up",
        body: "Your driver messages on WhatsApp when he arrives. Pick-up times shift by about thirty minutes depending on where in Dubai you are staying.",
      },
      {
        time: "16:15",
        title: "Dune bashing and the sunset stop",
        body: "Around forty minutes across the Lahbab dunes in a 4x4, then a stop on a ridge for photographs as the light goes. Tell us if anyone gets motion sick and the driver keeps it gentle.",
      },
      {
        time: "17:30",
        title: "Camp: camel ride, sandboarding, henna",
        body: "A short camel ride, boards for the dune beside camp, henna for anyone who wants it, and Arabic coffee with dates in the majlis.",
      },
      {
        time: "19:00",
        title: "BBQ dinner and live shows",
        body: "Buffet with grilled meats, salads and dessert — vegetarian and Jain options on request. Tanoura, fire and belly dance shows run while you eat.",
      },
      {
        time: "21:00",
        title: "Drop back at your hotel",
        body: "Back in Dubai between about 21:30 and 22:15 depending on your hotel.",
      },
    ],
    includes: [
      "Return hotel transfers in an air-conditioned 4x4",
      "Dune bashing, camel ride, sandboarding and henna",
      "BBQ buffet with soft drinks, tea and Arabic coffee",
      "Tanoura, fire and belly dance shows, shisha at the majlis",
    ],
    excludes: [
      "Alcoholic drinks at camp",
      "Quad biking — added when you book",
      "A private vehicle instead of a shared 4x4",
      "Tips for your driver and the camp staff",
    ],
    faqs: [
      {
        q: "Is the dune bashing safe for children and older guests?",
        a: "Yes — tell us when you book and the driver keeps the drive gentle. Children under three, pregnant guests and anyone with back or heart problems should skip the dune bashing; we can take you straight to camp instead at the same price.",
      },
      {
        q: "What should we wear?",
        a: "Loose, light clothing and shoes you do not mind getting sand in. Evenings in the desert are much cooler than the city between November and March, so bring a light jacket.",
      },
      {
        q: "Do you cater for vegetarians?",
        a: "Yes. The buffet always has vegetarian dishes, and Jain and vegan meals can be arranged if you tell us at least a day ahead.",
      },
      {
        q: "Can you collect us from Sharjah or Abu Dhabi?",
        a: "Sharjah pick-ups are usually possible for a supplement. Abu Dhabi is a long drive to the Dubai dunes — tell us where you are staying and we will say honestly whether it is worth it.",
      },
      {
        q: "What happens if the weather turns?",
        a: "Sandstorms and heavy rain are rare but they happen. If the safari cannot run safely we move you to another evening or refund you in full.",
      },
    ],
  },

  "dhow-cruise-marina": {
    intro:
      "A traditional wooden dhow, rebuilt as a two-deck restaurant, sails a slow loop through Dubai Marina. You get an international buffet, live entertainment on the lower deck and an open upper deck where most people spend the evening photographing the towers, JBR and Ain Dubai.",
    itinerary: [
      {
        time: "19:30",
        title: "Board at Dubai Marina",
        body: "Boarding opens half an hour before sailing. Transfers from your hotel can be added when you book.",
      },
      {
        time: "20:00",
        title: "Sailing and buffet service",
        body: "The dhow casts off and the buffet opens: grills, salads, Arabic mezze and dessert, with soft drinks, tea and coffee.",
      },
      {
        time: "20:45",
        title: "Tanoura show",
        body: "A tanoura performance on the lower deck while the dhow passes JBR and Ain Dubai.",
      },
      {
        time: "22:00",
        title: "Back at the berth",
        body: "The cruise returns to the Marina berth and transfers head back to the hotels.",
      },
    ],
    includes: [
      "Two-hour cruise through Dubai Marina",
      "International buffet dinner",
      "Soft drinks, tea and Arabic coffee",
      "Tanoura show and live music",
    ],
    excludes: [
      "Hotel transfers unless you add them",
      "Alcoholic drinks",
      "Gratuities",
    ],
    faqs: [
      {
        q: "Marina or Creek — which cruise is better?",
        a: "The Marina cruise is modern Dubai: towers, lights and Ain Dubai. The Creek cruise is old Dubai, quieter and more traditional. First-time visitors usually prefer the Marina; if you want the heritage side, ask us about the Creek dhow.",
      },
      {
        q: "Is the boat suitable for wheelchairs or prams?",
        a: "The lower deck is level and reachable, but the stairs to the open upper deck are steep. Tell us before booking and we will reserve a table on the lower deck.",
      },
      {
        q: "Does it sail if it rains?",
        a: "Light rain is not a problem — the lower deck is enclosed and air-conditioned. Cruises are only cancelled in unsafe conditions, and then we move or refund the booking.",
      },
    ],
  },

  "burj-khalifa-at-the-top": {
    intro:
      "At the Top puts you on levels 124 and 125, about 456 metres above Downtown Dubai, with floor-to-ceiling glass and an open-air terrace on 125. The Sky upgrade adds level 148 at 555 metres — the highest observatory in the world — where the visit is timed and includes Arabic coffee and dates.",
    includes: [
      "Timed entry to levels 124 and 125",
      "Observation deck and open-air terrace access",
      "Booking handled for you, including sunset slots",
    ],
    excludes: [
      "Level 148 unless you take the Sky upgrade",
      "Hotel transfers unless added",
      "Food and drink beyond what the ticket includes",
    ],
    faqs: [
      {
        q: "Is the sunset slot worth the extra?",
        a: "It is the slot everyone wants, so it costs more and sells out first. If it is gone, the slot about an hour after sunset gives you the city fully lit and is usually cheaper.",
      },
      {
        q: "What is the difference between At the Top and At the Top Sky?",
        a: "At the Top is levels 124 and 125 at roughly 456 metres. Sky adds level 148 at 555 metres, with a separate lift, a lounge and refreshments — most people spend thirty to forty-five minutes up there before coming down to 125.",
      },
      {
        q: "How far ahead should we book?",
        a: "In the cooler months, a week ahead for a sunset slot and two or three days for anything else. In summer you can often book the same day.",
      },
    ],
  },

  "yacht-charter": {
    intro:
      "A private yacht with crew, leaving from Dubai Marina. The standard loop runs out past Bluewaters and Ain Dubai, along the Palm Jumeirah to Atlantis, with the Burj Al Arab in view, and stops in calm water so people can swim. The boat is yours for the hours you book.",
    includes: [
      "Private yacht with captain and crew",
      "Marina departure and return",
      "Swimming stop with towels on board",
      "Soft drinks, water and ice",
    ],
    excludes: [
      "Food unless you order a catering package",
      "Alcohol — you may bring your own on most boats",
      "Fishing equipment and water toys, added on request",
    ],
    faqs: [
      {
        q: "How many people fit on board?",
        a: "It depends on the boat. Our usual charters take six to twenty guests comfortably; tell us the group size and we will match the yacht rather than squeezing you onto the wrong one.",
      },
      {
        q: "Is two hours long enough?",
        a: "Two hours covers the Marina and a look at the Palm. If you want a proper swimming stop and time at Atlantis, book three or four.",
      },
      {
        q: "What if the sea is rough?",
        a: "The captain decides on the morning of the charter. If it is not safe to sail we move you to another slot or refund in full.",
      },
    ],
  },

  "old-dubai-souks-abras": {
    intro:
      "Most of what people picture as Dubai is thirty years old. This walk is the other half: the wind-tower houses and courtyard cafés of Al Fahidi, the spice and gold souks across the water in Deira, and the abra — the small wooden ferry that still crosses Dubai Creek for one dirham.",
    includes: [
      "Guided walk through Al Fahidi historical district",
      "Abra crossing of Dubai Creek",
      "Spice souk and gold souk in Deira",
      "Arabic coffee and dates",
    ],
    excludes: [
      "Anything you buy in the souks",
      "Lunch",
      "Hotel transfers unless added",
    ],
    faqs: [
      {
        q: "How much is the abra?",
        a: "One dirham per person each way on the traditional Creek abras, paid in cash to the driver. It is still the best value in the city.",
      },
      {
        q: "Is it very hot to walk?",
        a: "Between November and March it is pleasant. From June to September we start early or move the walk to the evening — the souks are open and the heat is bearable after dark.",
      },
      {
        q: "Can we buy gold safely here?",
        a: "Yes. Gold in the Deira souk is regulated and priced by weight against the daily rate, with the making charge negotiable. Your guide will explain how the pricing works before you shop.",
      },
    ],
  },

  "abu-dhabi-grand-mosque": {
    intro:
      "A full day in the capital, an hour and a half down the coast. The centrepiece is Sheikh Zayed Grand Mosque — white marble, inlaid flowers, and the largest hand-knotted carpet in the world — followed by the Corniche and a stop at Emirates Palace.",
    includes: [
      "Air-conditioned transport from your Dubai hotel",
      "Sheikh Zayed Grand Mosque visit with dress code guidance",
      "Abu Dhabi Corniche and Emirates Palace stop",
      "English-speaking driver-guide",
    ],
    excludes: [
      "Lunch",
      "Louvre Abu Dhabi or Qasr Al Watan tickets, added on request",
      "Gratuities",
    ],
    faqs: [
      {
        q: "What is the dress code for the Grand Mosque?",
        a: "Arms and legs covered for everyone, and a headscarf for women. Long, loose clothing is the safe choice; abayas are available at the mosque if you arrive without cover.",
      },
      {
        q: "Is the mosque open every day?",
        a: "It is open to visitors daily outside prayer times, with shorter hours on Fridays. We plan the day around the current timings so you are not turned away at the gate.",
      },
      {
        q: "Can we add the Louvre or Ferrari World?",
        a: "Yes, but not both in one day with the mosque. Tell us which matters most and we will build the day around it.",
      },
    ],
  },
};
