import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/sections/FaqList";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "List Your Business Free | UAE Travel & Services Directory",
  description:
    "Add your travel agency, visa service, clinic, law firm, spa or moving company to the UAE directory. Free profile, verified badge, enquiries straight to you.",
  path: "/list-your-business",
  image: "/images/marina-night.jpg",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "List your business", path: "/list-your-business" },
];

const steps = [
  {
    title: "Create an account",
    body: "Email and a password. Thirty seconds, no card, and the same account manages every business you register.",
  },
  {
    title: "Fill in your profile",
    body: "Company name, what you do, which emirate, contact details and a description in your own words. Copy lifted from another site is the most common reason we reject a listing — and duplicate text is worth nothing in search anyway.",
  },
  {
    title: "Upload your trade licence",
    body: "Optional, but it is what earns the verified badge. Licences are stored privately and only ever opened through a link that expires after a minute.",
  },
  {
    title: "We review it",
    body: "A person, usually within two working days. If something needs changing you get told exactly what, on your own management screen.",
  },
  {
    title: "Add your services",
    body: "One listing per service per emirate, each with its own page in the directory. Enquiries route to you and appear in your dashboard.",
  },
];

const included = [
  "A public profile page with your own URL",
  "Unlimited service listings across all seven emirates",
  "Verified badge once we have checked your trade licence",
  "Enquiries routed to you and visible in your dashboard",
  "Private document storage for licences, insurance and brochures",
  "Structured data on every page, so search engines read your details correctly",
];

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes. The profile, the listings, the verification and the enquiries cost nothing. There is no paid tier holding back features and no commission on business you get through the directory.",
  },
  {
    q: "What kinds of business can list?",
    a: "Anything a visitor or a UAE resident would look for: tour operators, visa and PRO services, hotels and holiday homes, car hire and transport, law firms, clinics, spas, salons, movers and logistics. If it is licensed in the UAE, it belongs here.",
  },
  {
    q: "Why do you want my trade licence?",
    a: "So the verified badge means something. Anyone can type a company name into a form; a licence is the only cheap way to confirm the business exists and does what it claims. It is stored privately and never shown on your profile.",
  },
  {
    q: "Can you reject my listing?",
    a: "Yes, and the two usual reasons are copied text and claims we cannot check — 'the best in Dubai', 'government approved' when you are not. You will be told which and can resubmit.",
  },
  {
    q: "Who owns the content I upload?",
    a: "You do. You are giving us permission to display it in the directory, nothing more. Ask us to take a listing down and we will.",
  },
  {
    q: "How do enquiries reach me?",
    a: "A visitor uses the form on your listing or on the site generally; the enquiry is stamped with your company and appears in your dashboard, and we pass on the contact details. Nothing is held back to force a payment.",
  },
];

export default function ListYourBusinessPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(faqs)]} />

      <section className="bg-sea-tint/60">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
            Put your business in front of the people already looking
          </h1>
          <p data-speakable className="mt-6 max-w-[64ch] text-[18px] leading-relaxed text-ink/75">
            A free profile in the UAE travel and services directory. Travel agencies, visa
            agents, clinics, law firms, spas, movers and car hire — every listing reviewed by a
            person, and verified against a trade licence if you send one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup?next=/agency/new"
              className="inline-flex min-h-13 items-center rounded-full bg-sea px-8 text-base font-semibold text-white no-underline hover:bg-sea-dark"
            >
              Register your company
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-13 items-center rounded-full border border-sea px-8 text-base font-semibold text-sea no-underline hover:bg-sea-tint"
            >
              Browse the directory
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
              How it works
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-sea" />
          </Reveal>

          <ol className="mt-10 border-t border-divider">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-2 border-b border-divider py-6 sm:grid-cols-[64px_1fr] sm:gap-6"
              >
                <span className="text-[28px] font-extrabold leading-none text-sea/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[19px] font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-ink/75">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold tracking-tight">
              What you get, at no cost
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {included.map((item, i) => (
              <Reveal key={item} delayMs={(i % 2) * 70}>
                <li className="flex gap-3 text-[17px] leading-relaxed text-ink/85">
                  <span aria-hidden className="mt-0.5 font-bold text-palm">
                    ✓
                  </span>
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 max-w-[68ch] rounded-[var(--radius-card)] bg-surface px-5 py-4 text-[15px] leading-relaxed text-ink/75">
            <strong className="font-semibold">One thing we will not do.</strong> We do not sell
            the verified badge, we do not sell placement above verified businesses, and we do
            not hold your enquiries back behind a payment. A directory that does any of those
            stops being useful to the visitor, and a directory that is not useful to the
            visitor is worth nothing to you either.
          </p>
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-10 lg:py-24">
          <FaqList faqs={faqs} heading="Questions from business owners" />
        </div>
      </div>

      <section className="bg-sea">
        <div className="mx-auto max-w-[1280px] px-5 py-16 text-center lg:px-10 lg:py-20">
          <h2 className="mx-auto max-w-[20ch] text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-tight text-white">
            Five minutes now, listed this week
          </h2>
          <Link
            href="/signup?next=/agency/new"
            className="mt-7 inline-flex min-h-13 items-center rounded-full bg-white px-8 text-base font-semibold text-sea no-underline hover:bg-white/90"
          >
            Register your company
          </Link>
        </div>
      </section>
    </>
  );
}
