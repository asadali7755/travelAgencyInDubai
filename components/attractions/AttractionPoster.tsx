import type { Accent } from "@/lib/data/tours";
import type { PosterMotif } from "@/lib/data/attractions";

/**
 * Original poster artwork for attractions we do not hold a photograph of.
 *
 * Drawn rather than sourced on purpose: a stock photo of Ferrari World or the
 * Louvre Abu Dhabi is somebody's copyright, and "it was on a search results
 * page" is not a licence. Everything here is geometry we wrote, so there is
 * nothing to clear and nothing to attribute.
 *
 * When a licensed photograph arrives, set `image` on the attraction and the
 * card and hero swap to it automatically — see public/images/SOURCING.md.
 */

type Stops = { from: string; to: string; ink: string };

const palette: Record<Accent, Stops> = {
  sea: { from: "var(--color-sea)", to: "var(--color-sea-dark)", ink: "var(--color-sea-light)" },
  sun: { from: "var(--color-sun)", to: "var(--color-sun-dark)", ink: "var(--color-gold-tint)" },
  gold: { from: "var(--color-gold)", to: "var(--color-gold-dark)", ink: "var(--color-gold-tint)" },
  palm: { from: "var(--color-palm)", to: "#1d5433", ink: "var(--color-palm-tint)" },
  coral: { from: "var(--color-coral)", to: "var(--color-coral-dark)", ink: "var(--color-coral-tint)" },
};

/** Each motif is a single path group drawn on the 800×600 stage. */
function Motif({ motif, ink }: { motif: PosterMotif; ink: string }) {
  const solid = { fill: ink, opacity: 0.9 };
  const soft = { fill: ink, opacity: 0.45 };

  switch (motif) {
    case "tower":
      return (
        <g>
          <path d="M360 600 L385 210 L400 120 L415 210 L440 600 Z" {...solid} />
          <path d="M300 600 L320 300 L340 600 Z" {...soft} />
          <path d="M460 600 L480 300 L500 600 Z" {...soft} />
          <rect x="398" y="60" width="4" height="70" {...solid} />
        </g>
      );
    case "dome":
      return (
        <g>
          <path d="M280 430 A120 120 0 0 1 520 430 Z" {...solid} />
          <path d="M160 470 A80 80 0 0 1 320 470 Z" {...soft} />
          <path d="M480 470 A80 80 0 0 1 640 470 Z" {...soft} />
          <rect x="150" y="430" width="500" height="170" {...solid} />
          <rect x="120" y="230" width="16" height="370" {...soft} />
          <rect x="664" y="230" width="16" height="370" {...soft} />
        </g>
      );
    case "arch":
      return (
        <g>
          <path d="M240 600 L240 330 A160 160 0 0 1 560 330 L560 600 L500 600 L500 340 A100 100 0 0 0 300 340 L300 600 Z" {...solid} />
          <rect x="120" y="500" width="560" height="14" {...soft} />
        </g>
      );
    case "wave":
      // Everything below about y=390 disappears under the card's bottom
      // gradient, so the sun and the first two crests are deliberately kept in
      // the upper half — a motif you cannot see is a solid colour block.
      return (
        <g>
          <circle cx="600" cy="160" r="58" {...soft} />
          <path d="M0 250 Q100 210 200 250 T400 250 T600 250 T800 250" fill="none" stroke={ink} strokeWidth="8" opacity="0.35" />
          <path d="M0 330 Q100 290 200 330 T400 330 T600 330 T800 330 L800 600 L0 600 Z" {...solid} />
          <path d="M0 410 Q100 370 200 410 T400 410 T600 410 T800 410 L800 600 L0 600 Z" {...soft} />
        </g>
      );
    case "dune":
      return (
        <g>
          <path d="M0 480 Q200 360 420 460 T800 420 L800 600 L0 600 Z" {...solid} />
          <path d="M0 540 Q240 460 520 540 T800 510 L800 600 L0 600 Z" {...soft} />
          <circle cx="620" cy="180" r="56" {...soft} />
        </g>
      );
    case "garden":
      return (
        <g>
          <circle cx="240" cy="330" r="70" {...solid} />
          <circle cx="400" cy="270" r="95" {...soft} />
          <circle cx="560" cy="340" r="78" {...solid} />
          <path d="M0 470 Q200 430 400 470 T800 460 L800 600 L0 600 Z" {...soft} />
        </g>
      );
    case "wheel":
      return (
        <g>
          <circle cx="400" cy="300" r="160" fill="none" stroke={ink} strokeWidth="16" opacity="0.9" />
          <circle cx="400" cy="300" r="90" fill="none" stroke={ink} strokeWidth="8" opacity="0.45" />
          <path d="M400 140 L400 460 M240 300 L560 300 M287 187 L513 413 M513 187 L287 413" stroke={ink} strokeWidth="6" opacity="0.45" />
          <path d="M0 500 L800 500 L800 600 L0 600 Z" {...soft} />
        </g>
      );
    case "mountain":
      return (
        <g>
          <path d="M0 600 L220 260 L360 440 L470 300 L800 600 Z" {...solid} />
          <path d="M0 600 L160 400 L300 600 Z" {...soft} />
        </g>
      );
    case "speed":
      return (
        <g>
          <path d="M80 380 h300 M140 440 h300 M200 320 h300" stroke={ink} strokeWidth="18" opacity="0.45" strokeLinecap="round" />
          <path d="M420 300 q120 -40 240 40 q-60 90 -240 60 Z" {...solid} />
          <circle cx="500" cy="420" r="46" {...solid} />
          <circle cx="640" cy="420" r="46" {...solid} />
        </g>
      );
    case "gallery":
      // A perforated dome: two concentric rings with light falling through as
      // scattered points. Stands in for the Louvre's roof and the Museum of the
      // Future's torus without depicting either building.
      return (
        <g>
          <circle cx="400" cy="300" r="200" fill="none" stroke={ink} strokeWidth="16" opacity="0.9" />
          <circle cx="400" cy="300" r="140" fill="none" stroke={ink} strokeWidth="6" opacity="0.5" />
          <circle cx="400" cy="300" r="80" fill="none" stroke={ink} strokeWidth="4" opacity="0.35" />
          {[
            [318, 232, 9], [430, 206, 7], [486, 296, 10], [352, 358, 8],
            [452, 372, 6], [400, 168, 8], [272, 306, 7], [376, 268, 5],
            [440, 320, 6], [330, 410, 5],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} {...soft} />
          ))}
        </g>
      );
  }
}

/**
 * The window onto the 800x600 stage.
 *
 * `slice` fills the container by cropping, which is right for a card at 4:3 —
 * the stage and the card are the same shape, so nothing is lost. A 16:7 hero
 * crops the same art so hard that a motif becomes an abstract curve, so wide
 * containers get their own viewBox: the middle band of the stage, y 150-450,
 * which is exactly where every motif puts its subject.
 */
const VIEW_BOX: Record<"card" | "wide", string> = {
  card: "0 0 800 600",
  wide: "100 150 600 300",
};

/**
 * Fills its container the way next/image with `fill` does, so a card can swap
 * between a photograph and a poster without changing its layout.
 */
export function AttractionPoster({
  motif,
  accent,
  label,
  variant = "card",
  className = "",
}: {
  motif: PosterMotif;
  accent: Accent;
  /** Read by assistive tech in place of a photo's alt text. */
  label: string;
  /** "wide" for the 16:7 hero; "card" for anything roughly 4:3. */
  variant?: "card" | "wide";
  className?: string;
}) {
  const stops = palette[accent];
  const id = `poster-${motif}-${accent}-${variant}`;

  return (
    <svg
      viewBox={VIEW_BOX[variant]}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Illustration representing ${label}`}
      className={`h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={stops.from} />
          <stop offset="100%" stopColor={stops.to} />
        </linearGradient>
      </defs>
      {/* Oversized so the gradient still covers the frame once a wide viewBox
          has been scaled up past the edges of the stage. */}
      <rect x="-400" y="-300" width="1600" height="1200" fill={`url(#${id})`} />
      <Motif motif={motif} ink={stops.ink} />
    </svg>
  );
}
