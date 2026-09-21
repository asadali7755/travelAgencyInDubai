"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

/**
 * Side navigation on desktop, a horizontal scrolling row on a phone.
 *
 * Client only because it needs the current path to mark the active item — that
 * is the entire reason, and nothing else in the shell is a Client Component.
 */
export function DashboardNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Account sections">
      <ul className="scroll-row flex gap-2 overflow-x-auto border-b border-divider pb-3 lg:flex-col lg:border-b-0 lg:pb-0">
        {items.map((item) => {
          // Exact match, or a child path — /agency should stay lit on
          // /agency/<id> without /dashboard matching /dashboard-anything.
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[15px] no-underline transition-colors lg:rounded-[10px] ${
                  active
                    ? "bg-sea-tint font-semibold text-sea-dark"
                    : "text-ink/70 hover:bg-sand"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
