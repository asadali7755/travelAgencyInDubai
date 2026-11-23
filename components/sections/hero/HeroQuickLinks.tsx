import Link from "next/link";
import { categoryById, categoryPath } from "@/lib/data/attractions";

/**
 * "What are you planning?" shortcuts straight under the hero buttons.
 *
 * The labels come from the category data, so a renamed category renames its
 * chip. These are the first internal links on the page, so they point at the
 * hub pages that most need the authority, and on a phone they scroll sideways
 * with the next chip peeking in so the row reads as swipeable.
 */
const CATEGORY_IDS = ["beaches", "family", "adventure", "landmarks", "nightlife", "culture"];

export function HeroQuickLinks() {
  const links = [
    { label: "Desert safari", href: "/dubai-tours/desert-safari" },
    ...CATEGORY_IDS.flatMap((id) => {
      const category = categoryById(id);
      return category ? [{ label: category.label, href: categoryPath(category.id) }] : [];
    }),
  ];

  return (
    <nav aria-label="What are you planning?" className="hero-in mt-9" style={{ animationDelay: "0.35s" }}>
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">
        What are you planning?
      </p>
      <ul className="-mx-5 mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
        {links.map((link) => (
          <li key={link.href} className="shrink-0 snap-start">
            <Link
              href={link.href}
              className="hero-chip inline-flex min-h-11 items-center rounded-full border border-white/25 bg-black/30 px-4 text-[14px] font-semibold text-white no-underline hover:border-white/60 hover:bg-black/45 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
