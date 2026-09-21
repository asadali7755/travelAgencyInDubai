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
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Travel Agency in Dubai | Tours, Visa & Packages",
  description:
    "Licensed Dubai travel agency: UAE attractions with real prices, tour packages from AED 150, desert safaris, visas and a free trip cost calculator. Get a quote today.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
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
