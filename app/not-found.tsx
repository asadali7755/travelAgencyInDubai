import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 already carries the status code; the meta tag stops a soft-404 being
  // indexed if the status is ever lost behind a proxy or a static host.
  robots: { index: false, follow: true },
};

const routes = [
  { href: "/uae-attractions", label: "UAE attractions", hint: "72 places across all seven emirates" },
  { href: "/things-to-do", label: "Things to do", hint: "Beaches, family days, nightlife, camping" },
  { href: "/packages", label: "Packages & prices", hint: "Day tours and holidays with real prices" },
  { href: "/services", label: "Services directory", hint: "Licensed UAE businesses" },
  { href: "/about", label: "About us", hint: "Who writes this and how it is checked" },
  { href: "/contact", label: "Get a quote", hint: "Same-day reply, no card needed" },
];

/**
 * The 404.
 *
 * Next's default is a bare line of text, which sends anyone who mistypes a URL
 * or follows a stale link straight back out. Six routes and a sentence keeps
 * most of them on the site, and links from here pass nothing on — a dead end is
 * the one page where internal links are purely for the reader.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-page px-5 py-24">
      <div className="w-full max-w-[720px]">
        <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-sea-dark">
          404
        </p>
        <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
          That page isn&rsquo;t here
        </h1>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-ink/75">
          Either the link was wrong or we moved something. Nothing is lost — here is where
          most people were heading.
        </p>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="flex h-full min-h-16 flex-col justify-center rounded-[var(--radius-card)] border border-card-border bg-surface px-5 py-3 no-underline transition-colors hover:border-sea/40"
              >
                <span className="text-[16px] font-bold text-ink">{route.label}</span>
                <span className="mt-0.5 text-[13px] leading-snug text-ink/60">
                  {route.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
