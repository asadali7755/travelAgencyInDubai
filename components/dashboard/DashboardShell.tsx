import Link from "next/link";
import type { ReactNode } from "react";
import { DashboardNav, type NavItem } from "@/components/dashboard/DashboardNav";
import type { SessionProfile } from "@/lib/auth/session";

/**
 * Chrome for every signed-in page: account area, agency area and admin.
 *
 * Deliberately not the marketing SiteHeader. These pages carry no ads and no
 * newsletter popup — Google's policies prohibit incentivised ad interaction and
 * the points system lives in here, so the safest line is simply no ads in the
 * authenticated area at all. See the platform skill's note on AdSense.
 */
export function DashboardShell({
  profile,
  items,
  title,
  subtitle,
  children,
}: {
  profile: SessionProfile;
  items: NavItem[];
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="border-b border-divider bg-surface">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-4 px-5 py-3 lg:px-10">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-1.5 text-[19px] font-bold tracking-tight text-ink no-underline"
          >
            Travel Agency <span className="text-sea">in Dubai</span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-[14px] text-ink/65 sm:inline">
              {profile.displayName}
            </span>
            {/* A form, not a link: sign-out is a state change and must be a POST. */}
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="min-h-11 rounded-full border border-card-border px-5 text-[14px] text-ink/75 transition-colors hover:border-sea/40"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1280px] flex-1 gap-8 px-5 py-8 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-12">
        <DashboardNav items={items} />

        <main>
          <h1 className="text-[clamp(1.8rem,3.6vw,2.4rem)] font-extrabold tracking-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-[64ch] text-[16px] leading-relaxed text-ink/70">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
