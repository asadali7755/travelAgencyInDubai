/**
 * Category copy for the "where shall we go" half of the taxonomy — places you
 * visit rather than things you do. Split from category-copy-activities.ts only
 * to keep both inside the project's 300-line ceiling; `categories.ts` joins
 * them back together and is the file everything else imports.
 */

import type { CategoryMeta } from "./categories";

export const placeCategories: CategoryMeta[] = [
  {
    id: "beaches",
    label: "Beach day",
    noun: "beaches",
    tagline: "Public sand, beach parks and beach clubs",
    blurb:
      "The UAE's public beaches are free, lifeguarded and genuinely good, which surprises people who have been told everything here costs money. Beach parks charge a few dirhams for grass, showers and barbecue pits; beach clubs charge properly and give you a pool and a day bed for it. All three are below.",
    accent: "sea",
    keywords: [],
  },
  {
    id: "landmarks",
    label: "Landmarks & views",
    noun: "landmarks",
    tagline: "The towers, the frames and the viewpoints",
    blurb:
      "The buildings people fly here to stand under, plus the places to stand and look at them from — including the free ones, which are usually the better photograph.",
    accent: "gold",
    keywords: ["main attractions in dubai", "dubai tourist attractions", "famous places in dubai"],
  },
  {
    id: "culture",
    label: "Culture & heritage",
    noun: "museums and heritage sites",
    tagline: "Forts, museums, mosques and old towns",
    blurb:
      "The part of the country that predates the skyline, and the museums built to explain it. Sharjah and Al Ain hold most of it, entry is usually under AED 20, and several of the best are free.",
    accent: "gold",
    keywords: [],
  },
  {
    id: "nature",
    label: "Parks & nature",
    noun: "parks and nature reserves",
    tagline: "Gardens, mangroves, wadis and salt lakes",
    blurb:
      "Mangrove channels you can kayak through, a salt lake that turns pink, wadis with water in them year round, and the municipal parks that are the reason UAE cities are liveable in February.",
    accent: "palm",
    keywords: ["sharjah national park", "al ain oasis", "wadi wurayah fujairah"],
  },
  {
    id: "shopping",
    label: "Malls & shopping",
    noun: "malls",
    tagline: "The big malls, the outlets and the cheap ones",
    blurb:
      "Malls here are civic space as much as retail — air conditioning, an aquarium, an ice rink and somewhere to walk in August. The outlet centres and the older Sharjah and Abu Dhabi malls are where the actual bargains are.",
    accent: "sea",
    keywords: [],
  },
  {
    id: "souks",
    label: "Souks & markets",
    noun: "souks and markets",
    tagline: "Gold, spice, fish and Friday markets",
    blurb:
      "Where the prices are negotiable and the produce is off a boat that morning. Fish markets open before dawn and are half the point; the Friday Market on the Fujairah road sells carpets and pottery seven days a week despite the name.",
    accent: "gold",
    keywords: ["spice souk dubai", "gold souk deira"],
  },
  {
    id: "wildlife",
    label: "Zoos & aquariums",
    noun: "zoos and aquariums",
    tagline: "Aquariums, safari parks and wildlife centres",
    blurb:
      "The UAE has more of these than you would expect, and they vary enormously in how the animals are kept. The ones below are the ones worth your money; where a place has a record we would rather you knew about, it says so.",
    accent: "palm",
    keywords: ["sharjah aquarium", "al ain zoo"],
  },
];
