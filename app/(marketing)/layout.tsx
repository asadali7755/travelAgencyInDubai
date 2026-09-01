import { JsonLd } from "@/components/ui/JsonLd";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { travelAgencySchema, websiteSchema } from "@/lib/seo";

/**
 * Chrome shared by every public page, plus the two site-wide schema objects.
 * Emitting them once here means each page only adds what is specific to it
 * (breadcrumbs, FAQs, the tour itself).
 */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={[travelAgencySchema(), websiteSchema()]} />
      <SiteHeader />
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
