/**
 * The "what are you planning?" taxonomy.
 *
 * These are *intents*, not a filing system. A visitor does not think "I would
 * like a landmark"; they think "we want a beach day", "where can the kids run
 * around", "where do people go out". So the labels are written the way the
 * question gets asked, and one place can belong to several — Kite Beach is a
 * beach, a family day out and a watersports spot at once.
 *
 * `keywords` are the client's own search terms from seo/keywords-source.csv,
 * attached to the category they actually belong to. They drive the intro copy,
 * the "people also search for" block and seo/keyword-map.csv. They are not
 * sprinkled into body text — a page that reads like a keyword list ranks worse
 * than one that reads like it was written by someone who has been there.
 */

import type { Accent } from "@/lib/data/tours";
import { activityCategories } from "./category-copy-activities";
import { placeCategories } from "./category-copy-places";

export type PlanCategory =
  | "beaches"
  | "nightlife"
  | "spa"
  | "family"
  | "kids"
  | "waterparks"
  | "adventure"
  | "landmarks"
  | "culture"
  | "nature"
  | "shopping"
  | "souks"
  | "dining"
  | "camping"
  | "events"
  | "wildlife";

export type CategoryMeta = {
  id: PlanCategory;
  /** Card label on the "what are you planning?" grid. */
  label: string;
  /** How it reads in a sentence: "the best <x> in Sharjah". */
  noun: string;
  /** One line under the label. */
  tagline: string;
  /** Intro paragraph on the category page. */
  blurb: string;
  accent: Accent;
  /**
   * The slug of a services-directory category that also answers this intent,
   * where one exists. Spas are the clear case: a spa is a business that
   * registers itself, not a place we write a guide to, so the category page
   * shows the registered ones alongside our own editorial.
   */
  directorySlug?: string;
  /** Client search terms this category answers. */
  keywords: string[];
};

/** Display order for the "what are you planning?" grid. */
const ORDER: PlanCategory[] = [
  "beaches",
  "family",
  "kids",
  "adventure",
  "landmarks",
  "nightlife",
  "waterparks",
  "spa",
  "culture",
  "nature",
  "shopping",
  "souks",
  "wildlife",
  "camping",
  "dining",
  "events",
];

export const planCategories: CategoryMeta[] = [
  // Ordered by how often a visitor wants them, not alphabetically. The first
  // six are what the "what are you planning?" grid shows above the fold.
  ...[...placeCategories, ...activityCategories].sort(
    (a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id),
  ),
];


const byId = new Map(planCategories.map((category) => [category.id, category]));

export const categoryById = (id: string) => byId.get(id as PlanCategory);

export const categoryLabel = (id: PlanCategory) => byId.get(id)?.label ?? id;
