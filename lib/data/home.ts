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

import { tours } from "./tours";
import type { Accent } from "./tours";

export type { Accent, Tour as TourCard } from "./tours";

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

/** The home page shows the whole list; the hub is where filtering happens. */
export const featuredTours = tours;

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
