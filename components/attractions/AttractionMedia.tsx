import Image from "next/image";
import { AttractionPoster } from "@/components/attractions/AttractionPoster";
import type { Attraction } from "@/lib/data/attractions";

/**
 * One decision in one place: show the photograph when we hold one, draw the
 * poster when we do not. Every card, hero and related strip goes through this,
 * so adding a licensed image later is a one-line data change.
 */
export function AttractionMedia({
  attraction,
  sizes,
  priority = false,
  variant = "card",
  className = "",
}: {
  attraction: Attraction;
  sizes?: string;
  priority?: boolean;
  /** Passed through to the poster so a 16:7 hero gets its own composition. */
  variant?: "card" | "wide";
  className?: string;
}) {
  if (attraction.image && attraction.alt) {
    return (
      <Image
        src={attraction.image}
        alt={attraction.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <AttractionPoster
      motif={attraction.motif}
      accent={attraction.accent}
      label={attraction.name}
      variant={variant}
      className={className}
    />
  );
}
