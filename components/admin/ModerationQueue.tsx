"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type QueueItem = {
  id: string;
  entity: "agency" | "service" | "package" | "blog_post" | "faq";
  title: string;
  meta: string;
  excerpt: string | null;
  createdAt: string;
};

const ENTITY_LABEL: Record<QueueItem["entity"], string> = {
  agency: "Company",
  service: "Listing",
  package: "Package",
  blog_post: "Blog post",
  faq: "Question",
};

/**
 * The review queue. Approve publishes; reject requires a reason, which the
 * company is shown on its own management screen.
 *
 * There is no delete button, deliberately. Rejected items stay in the table —
 * they are the evidence if a decision is challenged and the signal for tuning
 * the filters. Purging is a human-run job, not a button in a dashboard.
 */
export function ModerationQueue({ items }: { items: QueueItem[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  async function decide(item: QueueItem, action: "approve" | "reject") {
    const note = notes[item.id]?.trim() ?? "";

    if (action === "reject" && note.length < 5) {
      setError("Rejections need a reason — the company is shown it.");
      return;
    }

    setPending(item.id);
    setError(null);

    const response = await fetch("/api/admin/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity: item.entity,
        id: item.id,
        action,
        ...(note ? { note } : {}),
      }),
    });

    const body = await response.json().catch(() => null);
    setPending(null);

    if (!response.ok || !body?.success) {
      setError(body?.error?.message ?? "That decision didn't go through.");
      return;
    }

    // Mark it locally so the row disappears immediately, then refresh so the
    // counts at the top of the page and the queue itself come back in step.
    setDone((current) => new Set(current).add(item.id));
    router.refresh();
  }

  const visible = items.filter((item) => !done.has(item.id));

  if (visible.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-dashed border-card-border bg-surface px-6 py-12 text-center">
        <h2 className="text-[19px] font-bold tracking-tight">Queue is clear</h2>
        <p className="mt-2 text-[15px] text-ink/65">Nothing is waiting for review.</p>
      </div>
    );
  }

  return (
    <div>
      {error ? (
        <p role="alert" className="mb-5 rounded-[10px] bg-coral-tint px-4 py-3 text-[14px] text-coral-dark">
          {error}
        </p>
      ) : null}

      <ul className="flex flex-col gap-4">
        {visible.map((item) => (
          <li
            key={item.id}
            className="rounded-[var(--radius-card)] border border-card-border bg-surface p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div className="min-w-0">
                <span className="rounded-full bg-sea-tint px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-sea-dark">
                  {ENTITY_LABEL[item.entity]}
                </span>
                <h3 className="mt-2 text-[18px] font-bold text-ink">{item.title}</h3>
                <p className="mt-0.5 text-[13px] text-ink/55">{item.meta}</p>
              </div>
              <time className="text-[13px] whitespace-nowrap text-ink/50" dateTime={item.createdAt}>
                {new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </time>
            </div>

            {item.excerpt ? (
              <p className="mt-3 max-w-[76ch] text-[15px] leading-relaxed text-ink/75">
                {item.excerpt}
              </p>
            ) : null}

            <label htmlFor={`note-${item.id}`} className="mt-4 block text-[13px] font-semibold text-ink/65">
              Reason (required to reject)
            </label>
            <textarea
              id={`note-${item.id}`}
              rows={2}
              maxLength={1000}
              value={notes[item.id] ?? ""}
              onChange={(event) =>
                setNotes((current) => ({ ...current, [item.id]: event.target.value }))
              }
              className="mt-1.5 w-full rounded-[10px] border border-card-border bg-page px-4 py-2.5 text-[15px] focus:border-sea focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={pending === item.id}
                onClick={() => decide(item, "approve")}
                className="min-h-11 rounded-full bg-palm px-6 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {pending === item.id ? "Working…" : "Approve"}
              </button>
              <button
                type="button"
                disabled={pending === item.id}
                onClick={() => decide(item, "reject")}
                className="min-h-11 rounded-full border border-coral px-6 text-[15px] font-semibold text-coral-dark transition-colors hover:bg-coral-tint disabled:opacity-60"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
