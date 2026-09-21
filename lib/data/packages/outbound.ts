/**
 * Outbound holidays for UAE residents — the second half of the business.
 *
 * Unlike the inbound packages these are normally sold *with* flights, because
 * that is how the market quotes them, so `priceBasis` says so explicitly and
 * the inclusions list the fare. Indicative market rates checked September 2026.
 */

import type { Package } from "./types";

export const outboundPackages: Package[] = [
  {
    slug: "azerbaijan-baku-4-day",
    title: "Baku Short Break — 4 days, 3 nights",
    kind: "outbound",
    countryCode: "AZ",
    countryName: "Azerbaijan",
    places: ["Baku", "Gobustan", "Absheron"],
    durationDays: 4,
    durationNights: 3,
    durationIso: "P4D",
    tagline: "The cheapest real holiday out of Dubai, and a three-hour flight",
    summary:
      "A walled medieval old city, Zaha Hadid's Heydar Aliyev Centre, mud volcanoes in the desert and a currency that makes dinner feel free. Three hours from Dubai and the most consistently good-value short break the UAE market sells.",
    highlights: [
      "Icherisheher — the walled old city, a UNESCO World Heritage site",
      "Heydar Aliyev Centre and the Flame Towers",
      "Gobustan rock art and the mud volcanoes",
      "Absheron peninsula — the fire temple and the burning hillside",
      "Food and taxis at a fraction of Dubai prices",
    ],
    inclusions: [
      "Return economy flights from Dubai",
      "3 nights' accommodation with breakfast, twin sharing",
      "Return airport transfers",
      "Baku city tour with a guide",
      "Gobustan and mud volcanoes day tour",
      "Visa assistance",
    ],
    exclusions: ["Azerbaijan e-visa fee", "Lunches and dinners", "Travel insurance", "Tips"],
    itinerary: [
      { label: "Day 1", title: "Arrive Baku", body: "Evening flight from Dubai, transfer to the hotel. The old city is walkable from most central hotels if you still have energy." },
      { label: "Day 2", title: "The city", body: "Guided day through Icherisheher, the Maiden Tower, the Palace of the Shirvanshahs, then the Heydar Aliyev Centre and the boulevard along the Caspian." },
      { label: "Day 3", title: "Gobustan and the volcanoes", body: "South to the Gobustan petroglyphs — thousands of rock carvings, some twelve thousand years old — then across broken ground to the mud volcanoes." },
      { label: "Day 4", title: "Return", body: "Free morning, transfer and flight back to Dubai." },
    ],
    tiers: [
      { id: "three-star", label: "3-star central", detail: "Central 3-star with breakfast.", adult: 999, child: 750 },
      { id: "four-star", label: "4-star", detail: "4-star near the boulevard or the old city.", adult: 1299, child: 950 },
      { id: "five-star", label: "5-star", detail: "5-star with a Caspian or Flame Towers view.", adult: 1899, child: 1350 },
    ],
    priceBasis: "per adult, twin sharing, including return economy flights from Dubai",
    seasonNote:
      "April–June and September–October are the good months. Winter is cold and wet; August is hot and humid on the coast.",
    addOns: [
      { label: "Absheron peninsula half-day tour", priceAed: 180 },
      { label: "Qabala or Sheki day trip", priceAed: 320, note: "Long day, mountain scenery" },
      { label: "Single-occupancy supplement, 4-star", priceAed: 550, note: "Per stay" },
    ],
    attractions: [],
    accent: "sea",
    image: "/images/city-night.jpg",
    alt: "A city skyline lit after dark",
    faqs: [
      { q: "Do UAE residents need a visa for Azerbaijan?", a: "Most nationalities apply for an ASAN e-visa online, usually issued within three working days. We handle the application as part of the package; the government fee is paid separately." },
      { q: "Is Baku expensive?", a: "No, and that is the point of the trip. Outside the hotel, a good dinner for two runs well under what one main course costs in Dubai Marina." },
    ],
    metaTitle: "Baku Package from Dubai | 4 Days from AED 999 with Flights",
    metaDescription:
      "Four-day Baku holiday from Dubai with return flights, three nights' hotel, the old city tour and Gobustan mud volcanoes. From AED 999 per person.",
    checked: "2026-09-18",
  },
  {
    slug: "georgia-tbilisi-5-day",
    title: "Georgia — Tbilisi & Kazbegi, 5 days, 4 nights",
    kind: "outbound",
    countryCode: "GE",
    countryName: "Georgia",
    places: ["Tbilisi", "Mtskheta", "Kazbegi", "Gudauri"],
    durationDays: 5,
    durationNights: 4,
    durationIso: "P5D",
    tagline: "Caucasus mountains, sulphur baths and the best-value wine country in the region",
    summary:
      "Old Tbilisi's balconied lanes and sulphur baths, the ancient capital at Mtskheta, and a drive up the Georgian Military Highway to a church standing alone at 2,170 metres under Mount Kazbek. Three and a half hours from Dubai.",
    highlights: [
      "Old Tbilisi, the sulphur bath district and the cable car to Narikala",
      "Mtskheta — the ancient capital, UNESCO listed",
      "Georgian Military Highway to Gudauri and Kazbegi",
      "Gergeti Trinity Church at 2,170 m below Mount Kazbek",
      "Kakheti wine country as an optional day",
    ],
    inclusions: [
      "Return economy flights from Dubai",
      "4 nights' accommodation with breakfast, twin sharing",
      "Return airport transfers",
      "Tbilisi and Mtskheta guided day tour",
      "Full-day Kazbegi tour with 4x4 transfer to the church",
      "Visa assistance where required",
    ],
    exclusions: ["Lunches and dinners", "Travel insurance", "Sulphur bath entry", "Tips"],
    itinerary: [
      { label: "Day 1", title: "Arrive Tbilisi", body: "Transfer to the hotel. Old Tbilisi is compact and the evening is best spent walking it." },
      { label: "Day 2", title: "Tbilisi and Mtskheta", body: "The old town, Narikala fortress by cable car and the bath district, then out to Mtskheta for Svetitskhoveli Cathedral and the hilltop Jvari Monastery." },
      { label: "Day 3", title: "Kazbegi", body: "North on the Georgian Military Highway past Ananuri fortress and the Gudauri ski plateau, then a 4x4 up to Gergeti Trinity Church, alone on its ridge under Mount Kazbek." },
      { label: "Day 4", title: "Free day or Kakheti", body: "A free day in Tbilisi, or add the Kakheti wine region — Signagi, a working winery and a qvevri tasting." },
      { label: "Day 5", title: "Return", body: "Transfer and flight back to Dubai." },
    ],
    tiers: [
      { id: "three-star", label: "3-star central", detail: "Central 3-star or guesthouse in the old town.", adult: 1750, child: 1300 },
      { id: "four-star", label: "4-star", detail: "4-star in Tbilisi with breakfast.", adult: 2050, child: 1500 },
      { id: "five-star", label: "5-star", detail: "5-star on Rustaveli or overlooking the river.", adult: 3200, child: 2250 },
    ],
    priceBasis: "per adult, twin sharing, including return economy flights from Dubai",
    seasonNote:
      "May–June and September–October are ideal. The Kazbegi road can close in winter snow, and we swap the day rather than run it unsafely.",
    addOns: [
      { label: "Kakheti wine region day tour", priceAed: 290 },
      { label: "Sulphur bath, private room", priceAed: 120, note: "Per hour, up to four people" },
      { label: "Single-occupancy supplement, 4-star", priceAed: 700, note: "Per stay" },
    ],
    attractions: [],
    accent: "palm",
    image: "/images/hatta-oasis.jpg",
    alt: "Still water below steep mountain slopes",
    faqs: [
      { q: "Do UAE residents need a visa for Georgia?", a: "Many nationalities enter visa-free for up to a year, and UAE residence often qualifies where the passport alone would not. We confirm your specific case before booking rather than guessing." },
      { q: "Is the Kazbegi day worth it?", a: "It is the reason most people book Georgia. Four hours of driving for one church sounds thin until you are standing at 2,170 metres with Kazbek behind it." },
    ],
    metaTitle: "Georgia Package from Dubai | Tbilisi & Kazbegi, 5 Days",
    metaDescription:
      "Five-day Georgia holiday from Dubai with flights, four nights' hotel, Tbilisi and Mtskheta tours and a full day to Kazbegi. From AED 1,750 per person.",
    checked: "2026-09-18",
  },
  {
    slug: "turkey-istanbul-cappadocia-6-day",
    title: "Turkey — Istanbul & Cappadocia, 6 days, 5 nights",
    kind: "outbound",
    countryCode: "TR",
    countryName: "Türkiye",
    places: ["Istanbul", "Cappadocia"],
    durationDays: 6,
    durationNights: 5,
    durationIso: "P6D",
    tagline: "Two continents, then a balloon over a valley of carved rock",
    summary:
      "Three nights in Istanbul for the Hagia Sophia, the Blue Mosque and the Bosphorus, then a domestic flight to Cappadocia for the cave dwellings, underground cities and the dawn balloon launch that everyone comes for.",
    highlights: [
      "Hagia Sophia, the Blue Mosque and Topkapı Palace",
      "Bosphorus cruise between Europe and Asia",
      "Grand Bazaar and the Spice Bazaar",
      "Göreme open-air museum and the fairy chimneys",
      "Optional dawn hot-air balloon over the valleys",
    ],
    inclusions: [
      "Return economy flights from Dubai",
      "Domestic flight Istanbul–Cappadocia",
      "5 nights' accommodation with breakfast (3 Istanbul, 2 Cappadocia cave hotel)",
      "All airport and intercity transfers",
      "Istanbul old city guided tour",
      "Cappadocia north and south valley tours",
    ],
    exclusions: [
      "Hot-air balloon flight (add-on)",
      "Museum and palace entry fees",
      "Lunches and dinners",
      "Travel insurance",
    ],
    itinerary: [
      { label: "Day 1", title: "Arrive Istanbul", body: "Transfer to a Sultanahmet or Beyoğlu hotel. Evening free." },
      { label: "Day 2", title: "The old city", body: "Hagia Sophia, the Blue Mosque, the Hippodrome and Topkapı Palace on foot with a guide, finishing at the Grand Bazaar." },
      { label: "Day 3", title: "Bosphorus and the bazaars", body: "A morning cruise up the strait past the palaces and the fortresses, then the Spice Bazaar and a free afternoon." },
      { label: "Day 4", title: "Fly to Cappadocia", body: "Morning flight, then the south valley: Göreme open-air museum, the rock churches and Uçhisar castle. Cave hotel for two nights." },
      { label: "Day 5", title: "Valleys and underground", body: "Optional balloon at dawn, then the north valleys, Avanos pottery and one of the underground cities." },
      { label: "Day 6", title: "Return", body: "Flight to Istanbul and onward to Dubai." },
    ],
    tiers: [
      { id: "three-star", label: "3-star / cave standard", detail: "3-star in Istanbul, standard cave room in Cappadocia.", adult: 2150, child: 1600 },
      { id: "four-star", label: "4-star", detail: "4-star Sultanahmet, deluxe cave room.", adult: 2750, child: 1950 },
      { id: "five-star", label: "5-star", detail: "5-star Bosphorus-side, premium cave suite.", adult: 4200, child: 2900 },
    ],
    priceBasis: "per adult, twin sharing, including return economy flights from Dubai",
    seasonNote:
      "April–May and September–October are best. Cappadocia balloons are cancelled for wind more often in winter, so build in a spare morning.",
    addOns: [
      { label: "Cappadocia hot-air balloon at dawn", priceAed: 750, note: "Per person; weather dependent, refunded if cancelled" },
      { label: "Istanbul museum pass", priceAed: 260 },
      { label: "Single-occupancy supplement, 4-star", priceAed: 950, note: "Per stay" },
    ],
    attractions: [],
    accent: "sun",
    image: "/images/camp-stars.jpg",
    alt: "A night sky full of stars above a quiet landscape",
    faqs: [
      { q: "Is the balloon flight guaranteed?", a: "No, and no honest operator will say otherwise. Flights are grounded for wind and it is entirely a safety call. Build a spare morning into the Cappadocia leg and you will usually fly; if it is cancelled the fee is refunded." },
      { q: "Do UAE residents need a Turkish visa?", a: "Many nationalities get an e-visa in minutes; several enter visa-free. UAE residence helps in some cases. We check your passport specifically before we quote." },
    ],
    metaTitle: "Turkey from Dubai | Istanbul & Cappadocia, 6 Days",
    metaDescription:
      "Six-day Türkiye holiday from Dubai: three nights Istanbul, two in a Cappadocia cave hotel, flights, transfers and tours. From AED 2,150 per person.",
    checked: "2026-09-18",
  },
  {
    slug: "thailand-bangkok-phuket-6-day",
    title: "Thailand — Bangkok & Phuket, 6 days, 5 nights",
    kind: "outbound",
    countryCode: "TH",
    countryName: "Thailand",
    places: ["Bangkok", "Phuket"],
    durationDays: 6,
    durationNights: 5,
    durationIso: "P6D",
    tagline: "Two nights of temples and traffic, three of limestone islands",
    summary:
      "The standard and still the best way to do a first Thailand trip out of Dubai: two nights in Bangkok for the Grand Palace and the river, then a domestic hop south to Phuket for the beaches and a boat day through Phang Nga Bay.",
    highlights: [
      "Grand Palace and Wat Pho's reclining Buddha",
      "Chao Phraya river boats and the canal klongs",
      "Phang Nga Bay by longtail through the limestone karsts",
      "Phi Phi islands day trip as an option",
      "Old Phuket Town's Sino-Portuguese shophouses",
    ],
    inclusions: [
      "Return economy flights from Dubai",
      "Domestic flight Bangkok–Phuket",
      "5 nights' accommodation with breakfast (2 Bangkok, 3 Phuket)",
      "All airport transfers",
      "Bangkok temples and river half-day tour",
      "Phang Nga Bay full-day boat tour with lunch",
    ],
    exclusions: ["Thai visa where applicable", "Most meals", "Travel insurance", "Optional island trips"],
    itinerary: [
      { label: "Day 1", title: "Arrive Bangkok", body: "Overnight flight lands in the morning; transfer and check-in, afternoon free." },
      { label: "Day 2", title: "Temples and the river", body: "The Grand Palace and Wat Pho in the cooler morning hours, then the Chao Phraya by public express boat and the canals by longtail." },
      { label: "Day 3", title: "Fly to Phuket", body: "Morning flight south, transfer to the west coast. The rest of the day is the beach." },
      { label: "Day 4", title: "Phang Nga Bay", body: "A full day by boat through the limestone karsts — sea caves, hongs and the islands the bay is famous for — with lunch aboard." },
      { label: "Day 5", title: "Free day", body: "Beach, or add the Phi Phi islands, or spend it in Old Phuket Town among the shophouses and the coffee." },
      { label: "Day 6", title: "Return", body: "Transfer to Phuket airport and fly back to Dubai." },
    ],
    tiers: [
      { id: "three-star", label: "3-star", detail: "3-star Bangkok, 3-star near the beach in Phuket.", adult: 2450, child: 1800 },
      { id: "four-star", label: "4-star", detail: "4-star riverside Bangkok, 4-star beachfront Phuket.", adult: 3100, child: 2200 },
      { id: "five-star", label: "5-star", detail: "5-star both legs, beachfront resort in Phuket.", adult: 4600, child: 3200 },
    ],
    priceBasis: "per adult, twin sharing, including return economy flights from Dubai",
    seasonNote:
      "November to March is dry season on the Andaman coast. May to October brings monsoon swell and some boat days are cancelled.",
    addOns: [
      { label: "Phi Phi islands day trip by speedboat", priceAed: 320 },
      { label: "Bangkok floating market half day", priceAed: 190 },
      { label: "Single-occupancy supplement, 4-star", priceAed: 1200, note: "Per stay" },
    ],
    attractions: [],
    accent: "coral",
    image: "/images/lamer-beach.jpg",
    alt: "A calm beach with clear shallow water",
    faqs: [
      { q: "Is Phuket worth it in the monsoon?", a: "Hotels are half price and the rain usually comes in bursts rather than all day, but the boat days are the risk — Phang Nga and Phi Phi are cancelled for swell. If the islands are the reason you are going, travel November to March." },
      { q: "Can we swap Phuket for Krabi or Samui?", a: "Yes. Krabi prices similarly and Samui is on the other coast, which flips the good season. Tell us when you want to travel and we will point you at the right one." },
    ],
    metaTitle: "Thailand Package from Dubai | Bangkok & Phuket, 6 Days",
    metaDescription:
      "Six-day Thailand holiday from Dubai with flights, two nights Bangkok, three in Phuket, temple tours and a Phang Nga Bay boat day. From AED 2,450.",
    checked: "2026-09-18",
  },
];
