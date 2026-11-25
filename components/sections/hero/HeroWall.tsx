import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { attractionPath, attractions, emirateById } from "@/lib/data/attractions";
import { tours } from "@/lib/data/tours";

type Tile = { name: string; sub: string; image: string; href: string };

const COLUMNS = 4;
/**
 * Six photographs a column. Each column holds its set twice for the loop, so
 * this decides how tall the moving layers are — and on an integrated laptop
 * GPU, eleven a column made them heavy enough to drop frames.
 */
const PER_COLUMN = 6;
/** Seconds per loop. Uneven, so the columns never line up with each other. */
const DURATIONS = [52, 64, 46, 58];

/**
 * One tile per distinct photograph on the site, each linking to its page,
 * capped at PER_COLUMN a column. Built from the data, so the wall follows it.
 */
function wallTiles(): Tile[] {
  const seen = new Set<string>();
  const all: Tile[] = [
    ...attractions.flatMap((a) =>
      a.image
        ? [{ name: a.name, sub: emirateById(a.emirate)?.name ?? "UAE", image: a.image, href: attractionPath(a) }]
        : [],
    ),
    ...tours.map((t) => ({ name: t.title, sub: "Tour", image: t.image, href: `/dubai-tours/${t.slug}` })),
  ];
  return all
    .filter((tile) => !seen.has(tile.image) && seen.add(tile.image))
    .slice(0, COLUMNS * PER_COLUMN);
}

/**
 * The hero's 3D photo wall: columns of real places drifting up and down on a
 * tilted plane, lit by a spotlight that follows the mouse (app/hero.css).
 * `--c` is the column index, which each column uses to pivot about the centre
 * of the whole wall.
 *
 * Each column holds its tiles twice and slides by exactly half its height, so
 * the loop is seamless. The second copy is aria-hidden and out of the tab
 * order: a screen reader or a keyboard user meets each place once.
 */
export function HeroWall() {
  const tiles = wallTiles();
  const columns = Array.from({ length: COLUMNS }, (_, c) => tiles.filter((_, i) => i % COLUMNS === c));

  return (
    <div className="hero-wall" role="group" aria-label="Places to explore">
      <div className="hero-wall-plane">
        {columns.map((column, c) => (
          <div key={c} className="hero-wall-col" data-col={c}>
            <ul
              className="hero-wall-track"
              style={{ animationDuration: `${DURATIONS[c]}s`, "--c": c } as CSSProperties}
              data-reverse={c % 2 === 1}
            >
              {[0, 1].map((copy) =>
                column.map((tile) => (
                  <li key={`${copy}-${tile.image}`} aria-hidden={copy === 1 || undefined}>
                    <Link
                      href={tile.href}
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="hero-tile block overflow-hidden rounded-[18px] no-underline"
                    >
                      <Image
                        src={tile.image}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                      <span className="hero-tile-label">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                          {tile.sub}
                        </span>
                        <span className="block text-[15px] font-bold leading-tight text-white">
                          {tile.name}
                        </span>
                      </span>
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
      <span className="hero-wall-dim" aria-hidden />
      <span className="hero-spot" data-pointer-target aria-hidden />
    </div>
  );
}
