import { Destinations } from "@/components/sections/Destinations";
import { FinalCta } from "@/components/sections/FinalCta";
import { GuideTeaser } from "@/components/sections/GuideTeaser";
import { Hero } from "@/components/sections/Hero";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { Services } from "@/components/sections/Services";
import { SignatureExperiences } from "@/components/sections/SignatureExperiences";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Testimonial } from "@/components/sections/Testimonial";
import { TrustBand } from "@/components/sections/TrustBand";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pb-24 lg:pb-0">
        <Hero />
        <TrustBand />
        <SignatureExperiences />
        <Destinations />
        <Services />
        <GuideTeaser />
        <Testimonial />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
