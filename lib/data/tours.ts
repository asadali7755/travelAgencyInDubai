/**
 * The canonical tour list. The home page, the tours hub, the detail pages and
 * the sitemap all read from here, so a tour is added in exactly one place.
 *
 * Shaped like the `packages` table in supabase/migrations/0001_core_schema.sql.
 * Prices are never stored here — they stay bracketed placeholders in the UI
 * until the client confirms them.
 */

export type Accent = "sun" | "sea" | "gold" | "palm" | "coral";

export type TourCategory = "desert" | "cruise" | "city" | "water" | "tickets";

export type Tour = {
  slug: string;
  title: string;
  /** Short line on cards. */
  detail: string;
  /** One paragraph, used on the hub and as the meta description base. */
  summary: string;
  category: TourCategory;
  image: string;
  alt: string;
  durationLabel: string;
  /** ISO 8601 duration for TouristTrip schema. */
  durationIso?: string;
  priceUnit: "pp" | "/hr";
  badge?: string;
  accent: Accent;
  highlights: string[];
  metaTitle: string;
  metaDescription: string;
};

export const tourCategories: { id: TourCategory | "all"; label: string }[] = [
  { id: "all", label: "All tours" },
  { id: "desert", label: "Desert safari" },
  { id: "cruise", label: "Cruises" },
  { id: "city", label: "City & sightseeing" },
  { id: "water", label: "Water & boats" },
  { id: "tickets", label: "Attraction tickets" },
];

export const tours: Tour[] = [
  {
    slug: "desert-safari",
    title: "Evening Desert Safari",
    detail: "6–7 hrs · dune bashing, camels, BBQ camp · hotel pick-up",
    summary:
      "The classic Dubai evening: a 4x4 out to the red dunes at Lahbab, forty minutes of dune bashing, then camp for camel rides, sandboarding, a BBQ buffet and the tanoura and fire shows.",
    category: "desert",
    image: "/images/dune-bashing.jpg",
    alt: "A 4x4 throwing up sand while dune bashing on the red dunes at sunset",
    durationLabel: "6–7 hours",
    durationIso: "PT7H",
    priceUnit: "pp",
    badge: "Best seller",
    accent: "sun",
    highlights: [
      "Red dunes at Lahbab, about 45 minutes from the city",
      "Hotel pick-up and drop-off across Dubai",
      "BBQ buffet with vegetarian and Jain options",
      "Tanoura, fire and belly dance shows at camp",
    ],
    metaTitle: "Desert Safari Dubai | Evening Safari with BBQ Dinner",
    metaDescription:
      "Book an evening desert safari in Dubai: dune bashing on the Lahbab red dunes, camel rides, sandboarding, BBQ dinner and live shows. Hotel pick-up included.",
  },
  {
    slug: "dhow-cruise-marina",
    title: "Marina Dhow Dinner Cruise",
    detail: "2 hrs · international buffet, live show · transfers optional",
    summary:
      "Two hours on a traditional wooden dhow through Dubai Marina, with an international buffet, live entertainment and an open upper deck for the skyline.",
    category: "cruise",
    image: "/images/dhow-cruise.jpg",
    alt: "A dhow lit with lanterns cruising past the Dubai Marina towers at night",
    durationLabel: "2 hours",
    durationIso: "PT2H",
    priceUnit: "pp",
    accent: "sea",
    highlights: [
      "Sails the Marina past JBR and Ain Dubai",
      "International buffet with soft drinks",
      "Tanoura show and live music on board",
      "Open upper deck for photographs",
    ],
    metaTitle: "Dhow Cruise Dubai Marina | Dinner Cruise & Live Show",
    metaDescription:
      "Two-hour dhow cruise through Dubai Marina with an international buffet dinner, live entertainment and skyline views from the open upper deck.",
  },
  {
    slug: "burj-khalifa-at-the-top",
    title: "Burj Khalifa: At the Top",
    detail: "Levels 124–125 · timed entry, sunset slots go first",
    summary:
      "Timed entry to the observation decks on levels 124 and 125, about 456 metres up, with an open-air terrace on 125. Level 148 — the world's highest observatory at 555 metres — can be added.",
    category: "tickets",
    image: "/images/burj-downtown.jpg",
    alt: "Burj Khalifa rising above the Downtown Dubai skyline at dusk",
    durationLabel: "1–2 hours",
    durationIso: "PT2H",
    priceUnit: "pp",
    badge: "Skip the line",
    accent: "gold",
    highlights: [
      "Levels 124 and 125 at roughly 456 metres",
      "Open-air terrace on level 125",
      "Level 148 at 555 metres available as an upgrade",
      "Sunset slots sell out first — book early",
    ],
    metaTitle: "Burj Khalifa Tickets | At the Top Levels 124, 125 & 148",
    metaDescription:
      "Book Burj Khalifa At the Top tickets for levels 124 and 125, with level 148 — the world's highest observatory — as an upgrade. Sunset slots go first.",
  },
  {
    slug: "yacht-charter",
    title: "Private Yacht Charter",
    detail: "2–6 hrs · Palm, Marina & Atlantis loop · up to 20 guests",
    summary:
      "Your own crewed yacht from Dubai Marina, running the Palm Jumeirah and Atlantis loop with a swimming stop, for anything from a family afternoon to a group celebration.",
    category: "water",
    image: "/images/yacht-marina.jpg",
    alt: "A private yacht moored in Dubai Marina",
    durationLabel: "2–6 hours",
    durationIso: "PT4H",
    priceUnit: "/hr",
    badge: "Private",
    accent: "palm",
    highlights: [
      "Departs Dubai Marina with crew on board",
      "Palm Jumeirah, Atlantis and Burj Al Arab loop",
      "Swimming stop in calm water",
      "Groups of 6 to 20 guests",
    ],
    metaTitle: "Dubai Yacht Charter | Private Boat Hire from the Marina",
    metaDescription:
      "Charter a private yacht in Dubai Marina with crew: the Palm Jumeirah and Atlantis loop, a swimming stop, and space for groups of six to twenty.",
  },
  {
    slug: "old-dubai-souks-abras",
    title: "Old Dubai, Souks & Abras",
    detail: "4 hrs · Al Fahidi, spice & gold souks, creek crossing",
    summary:
      "The half of Dubai the skyline hides: the wind-tower lanes of Al Fahidi, the spice and gold souks of Deira, and a one-dirham abra crossing of the Creek.",
    category: "city",
    image: "/images/spice-souk.jpg",
    alt: "Open sacks of spices in the Deira spice souk",
    durationLabel: "4 hours",
    durationIso: "PT4H",
    priceUnit: "pp",
    accent: "coral",
    highlights: [
      "Al Fahidi historical district and its wind towers",
      "Spice souk and gold souk in Deira",
      "Abra crossing of Dubai Creek",
      "Arabic coffee and dates along the way",
    ],
    metaTitle: "Old Dubai Tour | Souks, Al Fahidi & Abra Creek Crossing",
    metaDescription:
      "A four-hour guided walk through old Dubai: Al Fahidi's wind-tower lanes, the Deira spice and gold souks, and an abra crossing of the Creek.",
  },
  {
    slug: "abu-dhabi-grand-mosque",
    title: "Abu Dhabi & Grand Mosque",
    detail: "9 hrs · Grand Mosque, Corniche, Emirates Palace stop",
    summary:
      "A full day in the capital: Sheikh Zayed Grand Mosque, the Corniche, a stop at Emirates Palace, and the drive down along the coast from Dubai.",
    category: "city",
    image: "/images/grand-mosque.jpg",
    alt: "The white marble domes of Sheikh Zayed Grand Mosque",
    durationLabel: "9 hours",
    durationIso: "PT9H",
    priceUnit: "pp",
    badge: "Day trip",
    accent: "sea",
    highlights: [
      "Sheikh Zayed Grand Mosque, with dress code guidance",
      "Abu Dhabi Corniche and the skyline",
      "Emirates Palace photo stop",
      "Air-conditioned transport from your Dubai hotel",
    ],
    metaTitle: "Abu Dhabi Day Trip from Dubai | Grand Mosque Tour",
    metaDescription:
      "Full-day Abu Dhabi tour from Dubai: Sheikh Zayed Grand Mosque, the Corniche and an Emirates Palace stop, with hotel pick-up and an air-conditioned drive.",
  },
];

export const tourBySlug = (slug: string) => tours.find((tour) => tour.slug === slug);
