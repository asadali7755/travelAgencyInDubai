import type { Metadata } from "next";
import { TripCalculator } from "@/components/calculator/TripCalculator";
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
    "Licensed travel agency in Dubai: desert safaris, dhow cruises, city tours, hotels and visas. Price your trip with our free Dubai cost calculator, then get a quote.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <SignatureExperiences />
      <TripCalculator />
      <Destinations />
      <Services />
      <GuideTeaser />
      <Testimonial />
      <FinalCta />
    </>
  );
}
