/**
 * A row of headline numbers. Used on the account overview, the agency overview
 * and the admin dashboard, so the three read as one system.
 */
export function StatTiles({
  tiles,
}: {
  tiles: { label: string; value: string | number; hint?: string }[];
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="rounded-[var(--radius-card)] border border-card-border bg-surface p-5"
        >
          <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/50">
            {tile.label}
          </dt>
          <dd className="mt-2 text-[28px] font-extrabold leading-none tracking-tight">
            {tile.value}
          </dd>
          {tile.hint ? (
            <p className="mt-2 text-[13px] leading-snug text-ink/55">{tile.hint}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
