import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Tour } from "@/lib/data/tours";

/**
 * One face of the ring. A real link, so every tour stays crawlable and opens
 * in a new tab on middle-click; a side card first turns to the front instead
 * of navigating, because tapping something half-turned away and landing on a
 * new page is not what anyone expects.
 */
export function OrbitCard({
  tour,
  index,
  distance,
  onSelect,
  wasDrag,
}: {
  tour: Tour;
  index: number;
  /** Steps from the front card: 0 is the front. Drives the fade-back. */
  distance: number;
  onSelect: (index: number) => void;
  wasDrag: () => boolean;
}) {
  const front = distance === 0;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // detail === 0 is a keyboard activation, which can never be a drag.
    if (event.detail !== 0 && wasDrag()) {
      event.preventDefault();
      return;
    }
    if (!front) {
      event.preventDefault();
      onSelect(index);
    }
  };

  return (
    <Link
      href={`/dubai-tours/${tour.slug}`}
      onClick={onClick}
      draggable={false}
      tabIndex={front ? 0 : -1}
      aria-hidden={front ? undefined : true}
      data-dist={Math.min(distance, 3)}
      style={{ "--i": index } as React.CSSProperties}
      className="orbit-card block overflow-hidden rounded-[22px] bg-ink text-white no-underline shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
    >
      <Image
        src={tour.image}
        alt={tour.alt}
        fill
        draggable={false}
        sizes="(max-width: 768px) 220px, 280px"
        className="pointer-events-none select-none object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
      />
      <span aria-hidden className="orbit-shade" />
      <span className="absolute inset-x-0 bottom-0 p-5">
        <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
          {tour.durationLabel}
        </span>
        <span className="mt-1.5 block text-[21px] font-extrabold leading-tight">{tour.title}</span>
      </span>
    </Link>
  );
}
