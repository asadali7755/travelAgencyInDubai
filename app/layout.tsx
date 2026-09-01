import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { indexingAllowed, site } from "@/lib/site";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Travel Agency in Dubai | Tours, Visa & Packages",
    template: `%s | ${site.name}`,
  },
  description:
    "Licensed travel agency in Dubai offering desert safaris, dhow cruises, city tours, hotels, visas and holiday packages. Free quote on WhatsApp.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AE",
  },
  // Belt and braces alongside robots.txt while the site is on its preview URL.
  robots: indexingAllowed
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
