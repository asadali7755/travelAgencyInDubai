import type { Metadata } from "next";
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
    "Licensed travel agency in Dubai offering desert safaris, dhow cruises, city tours, hotels, visas and holiday packages. Free quote on WhatsApp.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <SignatureExperiences />
      <Destinations />
      <Services />
      <GuideTeaser />
      <Testimonial />
      <FinalCta />
    </>
  );
}
