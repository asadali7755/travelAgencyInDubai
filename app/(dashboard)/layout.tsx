import type { Metadata } from "next";

/**
 * The account area is never indexed. robots.ts already disallows /api, but a
 * dashboard URL that leaks into a sitemap or a shared link should still tell
 * crawlers to stay out.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardGroupLayout({ children }: LayoutProps<"/">) {
  return children;
}
