import Link from "next/link";

/**
 * What a section shows before it has anything in it. A dashboard that renders
 * a blank area when empty reads as broken, so every list in the account area
 * routes through this instead.
 */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-card-border bg-surface px-6 py-12 text-center">
      <h2 className="text-[19px] font-bold tracking-tight">{title}</h2>
      <p className="mx-auto mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink/65">{body}</p>
      {action ? (
        <Link
          href={action.href}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-sea px-6 text-[15px] font-semibold text-white no-underline hover:bg-sea-dark"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
