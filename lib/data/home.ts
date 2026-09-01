/**
 * Content for the home page.
 *
 * Hard-coded for now so the page can ship before Supabase is wired up; the
 * shapes deliberately mirror the `packages` and `categories` tables in
 * supabase/migrations/0001_core_schema.sql, so swapping the source later is a
 * change of import, not a change of markup.
 *
 * Prices stay as bracketed placeholders until the client confirms them.
 */

export type Accent = "sun" | "sea" | "gold" | "palm" | "coral";

export type HeroSlide = {
  image: string;
  alt: string;
  label: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/dunes-sunset.jpg",
    alt: "Red desert dunes outside Dubai at sunset",
    label: "The desert at golden hour",
  },
  {
    image: "/images/marina-night.jpg",
    alt: "Dubai Marina towers lit up after dark",
    label: "The Marina after dark",
  },
  {
    image: "/images/dhow-cruise.jpg",
    alt: "A dhow cruise boat lit with lanterns on Dubai Creek",
    label: "Dinner on the water",
  },
];

export type TourCard = {
  slug: string;
  title: string;
  detail: string;
  image: string;
  alt: string;
  priceUnit: "pp" | "/hr";
  badge?: string;
  accent: Accent;
};

export const featuredTours: TourCard[] = [
  {
    slug: "desert-safari",
    title: "Evening Desert Safari",
    detail: "6–7 hrs · dune bashing, camels, BBQ camp · hotel pick-up",
    image: "/images/dune-bashing.jpg",
    alt: "A 4x4 throwing up sand while dune bashing at sunset",
    priceUnit: "pp",
    badge: "Best seller",
    accent: "sun",
  },
  {
    slug: "dhow-cruise-marina",
    title: "Marina Dhow Dinner Cruise",
    detail: "2 hrs · international buffet, live show · transfers optional",
    image: "/images/dhow-cruise.jpg",
    alt: "A lit dhow cruising past the Dubai Marina bridge at night",
    priceUnit: "pp",
    accent: "sea",
  },
  {
    slug: "burj-khalifa-at-the-top",
    title: "Burj Khalifa: At the Top",
    detail: "Levels 124–125 · timed entry, sunset slots go first",
    image: "/images/burj-downtown.jpg",
    alt: "Burj Khalifa rising over the Downtown Dubai skyline at dusk",
    priceUnit: "pp",
    badge: "Skip the line",
    accent: "gold",
  },
  {
    slug: "yacht-charter",
    title: "Private Yacht Charter",
    detail: "2–6 hrs · Palm, Marina & Atlantis loop · up to 20 guests",
    image: "/images/yacht-marina.jpg",
    alt: "A private yacht moored in Dubai Marina",
    priceUnit: "/hr",
    badge: "Private",
    accent: "palm",
  },
  {
    slug: "old-dubai-souks-abras",
    title: "Old Dubai, Souks & Abras",
    detail: "4 hrs · Al Fahidi, spice & gold souks, creek crossing",
    image: "/images/spice-souk.jpg",
    alt: "Spices piled in open sacks in the Deira spice souk",
    priceUnit: "pp",
    accent: "coral",
  },
  {
    slug: "abu-dhabi-grand-mosque",
    title: "Abu Dhabi & Grand Mosque",
    detail: "9 hrs · Grand Mosque, Corniche, Emirates Palace stop",
    image: "/images/grand-mosque.jpg",
    alt: "The white marble domes of Sheikh Zayed Grand Mosque",
    priceUnit: "pp",
    badge: "Day trip",
    accent: "sea",
  },
];

export type Destination = {
  name: string;
  sub: string;
  image: string;
  alt: string;
};

export const destinations: Destination[] = [
  {
    name: "Palm Jumeirah",
    sub: "Atlantis, The View, beach clubs",
    image: "/images/palm-aerial.jpg",
    alt: "Palm Jumeirah from the air at sunset",
  },
  {
    name: "Dubai Marina",
    sub: "Dhow dinners & yacht charters",
    image: "/images/marina-towers.jpg",
    alt: "Dubai Marina towers at night",
  },
  {
    name: "Old Dubai & the Creek",
    sub: "Souks, abras, Al Fahidi lanes",
    image: "/images/creek-alseef.jpg",
    alt: "Dhows moored on Dubai Creek at Al Seef",
  },
  {
    name: "Hatta",
    sub: "Kayaks, wadi hikes, mountain air",
    image: "/images/hatta-oasis.jpg",
    alt: "The Hatta oasis below the bare Hajar mountains",
  },
  {
    name: "Abu Dhabi",
    sub: "Grand Mosque & Louvre day trips",
    image: "/images/mosque-day.jpg",
    alt: "Sheikh Zayed Grand Mosque in daylight",
  },
  {
    name: "Musandam, Oman",
    sub: "Full-day fjord dhow cruise",
    image: "/images/musandam.jpg",
    alt: "A dhow between the cliffs of the Musandam fjords",
  },
  {
    name: "Miracle Garden",
    sub: "Seasonal — November to May",
    image: "/images/miracle-garden.jpg",
    alt: "Flower arches at Dubai Miracle Garden",
  },
];

export type Service = {
  title: string;
  body: string;
  accent: Accent;
};

export const services: Service[] = [
  {
    title: "UAE visit visas",
    body: "30 and 60-day visit visas, express processing and extensions inside the UAE — documents checked before you pay.",
    accent: "sea",
  },
  {
    title: "Airport transfers",
    body: "Meet-and-greet at DXB, DWC and Sharjah, flight tracking included — your driver waits if the flight doesn't.",
    accent: "sun",
  },
  {
    title: "Hotels & stays",
    body: "From Deira three-stars to Palm resorts, at rates we negotiate directly — tell us the budget, we'll shortlist three.",
    accent: "gold",
  },
  {
    title: "Holiday packages",
    body: "Full Dubai itineraries for visitors — and outbound escapes for UAE residents: Maldives, Georgia, Baku, Zanzibar.",
    accent: "palm",
  },
];
