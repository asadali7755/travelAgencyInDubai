import type { Accent } from "@/lib/data/home";

/**
 * Accent colours are picked per card and per section, so the class names have to
 * be written out in full — Tailwind cannot see a class it never reads as a
 * literal string.
 *
 * `chip` deliberately puts ink text on the warm tones. White on sun, gold or
 * coral falls below 4.5:1; the design's own contrast note makes the same call.
 */
export const accentClasses: Record<
  Accent,
  { bar: string; chip: string; tint: string; text: string; rule: string }
> = {
  sun: {
    bar: "bg-sun",
    chip: "bg-sun text-ink",
    tint: "bg-sun-tint",
    text: "text-sun-dark",
    rule: "bg-sun",
  },
  sea: {
    bar: "bg-sea",
    chip: "bg-sea text-white",
    tint: "bg-sea-tint",
    text: "text-sea-dark",
    rule: "bg-sea",
  },
  gold: {
    bar: "bg-gold",
    chip: "bg-gold text-ink",
    tint: "bg-gold-tint",
    text: "text-gold-dark",
    rule: "bg-gold",
  },
  palm: {
    bar: "bg-palm",
    chip: "bg-palm text-white",
    tint: "bg-palm-tint",
    text: "text-palm",
    rule: "bg-palm",
  },
  coral: {
    bar: "bg-coral",
    chip: "bg-coral text-ink",
    tint: "bg-coral-tint",
    text: "text-coral-dark",
    rule: "bg-coral",
  },
};
