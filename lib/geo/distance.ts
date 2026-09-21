/**
 * Great-circle distance, for sorting results by how close they are to the
 * visitor.
 *
 * Haversine rather than a projected approximation: the UAE spans about 400 km
 * and a flat-earth shortcut would be wrong by several kilometres at the
 * extremes, which is enough to reorder a list. It is also four lines.
 */

const EARTH_RADIUS_KM = 6371;
const toRad = (deg: number) => (deg * Math.PI) / 180;

export type Point = { lat: number; lng: number };

export function distanceKm(a: Point, b: Point): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/**
 * How a distance reads on a card. Under a kilometre is metres, because "0.4 km
 * away" is how nobody speaks; over a hundred loses the decimal, because at that
 * range nobody cares about it.
 */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  if (km < 10) return `${km.toFixed(1)} km away`;
  return `${Math.round(km)} km away`;
}
