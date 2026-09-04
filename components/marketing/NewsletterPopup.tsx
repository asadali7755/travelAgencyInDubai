"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The newsletter modal.
 *
 * Deliberate choices:
 *  - It waits. Firing on load would fight the hero image for the largest
 *    contentful paint, and Google treats an interstitial shown the instant a
 *    searcher arrives as intrusive. A short delay reads as "on open" to a real
 *    visitor and avoids both.
 *  - It remembers. Dismissing or subscribing is stored, so the popup never
 *    nags the same person twice. localStorage is wrapped because a private
 *    window can throw on access rather than merely return null.
 *  - It is escapable four ways: the close button, Escape, the backdrop, and
 *    tabbing to the close button. A popup you cannot leave is the reason
 *    people hate popups.
 *  - It stays off /contact, where the visitor is already filling in a form.
 */

const STORAGE_KEY = "tad:newsletter";
const DELAY_MS = 7000;

type Status = "idle" | "sending" | "done" | "error";

function remembered(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function remember(value: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // A viewer with site data blocked simply sees it again next visit.
  }
}

export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<Element | null>(null);

  useEffect(() => {
    if (pathname === "/contact") return;
    if (remembered()) return;

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const close = useCallback(
    (reason: "dismissed" | "subscribed") => {
      remember(reason);
      setOpen(false);
      if (returnFocusTo.current instanceof HTMLElement) returnFocusTo.current.focus();
    },
    [],
  );

  // Focus, focus return, Escape, and the scroll lock all belong to "is it open".
  useEffect(() => {
    if (!open) return;

    returnFocusTo.current = document.activeElement;
    inputRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close("dismissed");
        return;
      }
      if (event.key !== "Tab") return;

      // Minimal focus trap: only the input, the submit button and the close
      // button are reachable, so cycling between the ends is enough.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(email ?? "").trim(), source: "popup" }),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setError(body?.error?.message ?? "We couldn't sign you up. Please try again.");
        return;
      }

      setStatus("done");
      remember("subscribed");
      window.setTimeout(() => close("subscribed"), 2200);
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px] motion-safe:animate-[fade-in_.25s_ease]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close("dismissed");
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        className="relative grid max-h-[92vh] w-full max-w-[860px] overflow-hidden rounded-[var(--radius-xl2)] bg-surface shadow-2xl md:grid-cols-2"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => close("dismissed")}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-sand hover:text-ink md:text-white/80 md:hover:bg-white/15 md:hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {/* Hidden on phones: a 200px sliver of photo is decoration that costs
            bandwidth and pushes the form below the fold. */}
        <div className="relative hidden md:block">
          <Image
            src="/images/city-night.jpg"
            alt=""
            fill
            sizes="430px"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-sea px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
            Dubai insider
          </span>
        </div>

        <div className="overflow-y-auto p-7 sm:p-9">
          {status === "done" ? (
            <div className="flex h-full min-h-[260px] flex-col justify-center">
              <h2 id="newsletter-title" className="text-[26px] font-extrabold leading-tight tracking-tight">
                You&rsquo;re on the list.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                The next one goes out soon. If it ever stops being useful, every email has an
                unsubscribe link at the bottom.
              </p>
            </div>
          ) : (
            <>
              <h2
                id="newsletter-title"
                className="text-[clamp(1.6rem,3.4vw,2.1rem)] font-extrabold leading-[1.15] tracking-tight"
              >
                The best of <span className="text-sea">Dubai</span>,<br />
                in your inbox
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                One short email: what is worth doing in Dubai this season, the things that have just
                opened, and any offer we can genuinely get you. Written here, not scraped.
              </p>

              <form onSubmit={onSubmit} className="mt-6">
                <label htmlFor="newsletter-email" className="text-[14px] font-semibold">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] text-ink placeholder:text-ink/40 focus:border-sea focus:outline-none"
                />

                {error ? (
                  <p role="alert" className="mt-3 rounded-[10px] bg-coral-tint px-4 py-2.5 text-[14px] text-coral-dark">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-4 min-h-13 w-full rounded-full bg-sea px-6 text-[16px] font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60"
                >
                  {status === "sending" ? "Signing you up…" : "Subscribe"}
                </button>

                <p className="mt-3 text-[13px] text-ink/55">No spam. Unsubscribe any time.</p>
              </form>

              <div className="mt-6 flex items-start gap-2.5 border-t border-divider pt-5 text-[13px] leading-relaxed text-ink/60">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-palm" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" strokeLinejoin="round" />
                </svg>
                We never sell or share your address, and we only use it to send the newsletter.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
