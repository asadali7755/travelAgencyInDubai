import type { Metadata } from "next";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy | Travel Agency in Dubai",
  description:
    "What we collect when you enquire, why we keep it, how long we hold it, and how to ask us to delete it.",
  path: "/privacy",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

const h2 = "mt-10 text-[22px] font-extrabold tracking-tight";
const p = "mt-3 max-w-[68ch] text-[16px] leading-[1.75] text-ink/80";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-28 lg:px-10 lg:pt-36">
        <Breadcrumbs trail={trail} />
        <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.2rem)] font-extrabold leading-tight tracking-tight">
          Privacy
        </h1>

        <p className="mt-6 max-w-[68ch] rounded-[var(--radius-card)] bg-sun-tint/60 p-5 text-[15px] leading-relaxed text-ink/75">
          This page describes what the website actually does today. It is pending review by the
          operator before launch, and will need updating the moment analytics, advertising or
          accounts are switched on.
        </p>

        <h2 className={h2}>What we collect</h2>
        <p className={p}>
          Only what you type into the enquiry form: your name, email address, phone number, the
          country you are travelling from, and optionally a travel date and a message. Nothing
          else is collected, and the site does not ask you to create an account.
        </p>

        <h2 className={h2}>Why we collect it</h2>
        <p className={p}>
          To answer your enquiry and arrange the trip you asked about. We do not sell your details
          and we do not add you to a marketing list without asking you first.
        </p>

        <h2 className={h2}>Where it is stored</h2>
        <p className={p}>
          Enquiries are stored in our booking database, hosted with Supabase, and are readable
          only by staff. The site itself is hosted on Vercel, which keeps standard server logs
          including IP addresses for security and abuse prevention.
        </p>

        <h2 className={h2}>Cookies and tracking</h2>
        <p className={p}>
          The site sets no advertising or analytics cookies at the time of writing. If that
          changes — an analytics tool, a remarketing pixel, advertising — this page will be
          updated and a consent banner added before anything is switched on.
        </p>

        <h2 className={h2}>How long we keep it</h2>
        <p className={p}>
          Enquiries that turn into bookings are kept as long as the law requires us to keep
          booking and accounting records. Enquiries that never became bookings are kept while the
          trip is still plausibly happening, and removed on request at any time.
        </p>

        <h2 className={h2}>Asking us to delete your details</h2>
        <p className={p}>
          Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and ask. We will confirm what we hold
          and remove it, other than records we are legally required to retain.
        </p>

        <h2 className={h2}>Contact</h2>
        <p className={p}>
          <span className="underline decoration-dashed decoration-ink/25 underline-offset-4">
            [registered company name]
          </span>
          ,{" "}
          <span className="underline decoration-dashed decoration-ink/25 underline-offset-4">
            {site.addressDisplay}
          </span>
          . DET licence{" "}
          <span className="underline decoration-dashed decoration-ink/25 underline-offset-4">
            {site.detLicenceDisplay}
          </span>
          .
        </p>
      </div>
    </>
  );
}
