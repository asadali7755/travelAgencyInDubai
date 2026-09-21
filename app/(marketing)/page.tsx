import type { Metadata } from "next";
import { TripCalculator } from "@/components/calculator/TripCalculator";
import { AttractionsTeaser } from "@/components/sections/AttractionsTeaser";
import { DirectoryTeaser } from "@/components/sections/DirectoryTeaser";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";
import { Destinations } from "@/components/sections/Destinations";
import { FinalCta } from "@/components/sections/FinalCta";
import { GuideTeaser } from "@/components/sections/GuideTeaser";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SignatureExperiences } from "@/components/sections/SignatureExperiences";
import { Testimonial } from "@/components/sections/Testimonial";
import { TrustBand } from "@/components/sections/TrustBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { attractions } from "@/lib/data/attractions";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/seo-schema";

export const metadata: Metadata = pageMetadata({
  title: "Travel Agency in Dubai | Tours, Visa & Packages",
  description:
    "Licensed Dubai travel agency: 72 UAE attractions with real prices, packages from AED 150, desert safaris, visas and a free trip cost calculator.",
  path: "/",
});

export default function HomePage() {
  // The newest verification date anywhere on the site. The home page summarises
  // the whole of it, so that is the honest freshness signal for it.
  const lastChecked = attractions.map((a) => a.checked).sort().at(-1) ?? "2026-09-18";

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "Travel Agency in Dubai | Tours, Visa & Packages",
          description:
            "Licensed Dubai travel agency: 72 UAE attractions with real prices, packages from AED 150, desert safaris, visas and a free trip cost calculator.",
          checked: lastChecked,
          image: "/images/dunes-sunset.jpg",
        })}
      />
      <Hero />
      <TrustBand />
      <SignatureExperiences />
      <AttractionsTeaser />
      <PackagesTeaser />
      <TripCalculator />
      <Destinations />
      <Services />
      <DirectoryTeaser />
      <GuideTeaser />
      <Testimonial />
      <FinalCta />
    </>
  );
}
