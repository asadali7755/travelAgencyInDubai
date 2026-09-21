import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { sanitizeHtml } from "@/lib/sanitize";
import { getCategory, getListing, getListings } from "@/lib/services/directory";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/seo-schema";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: PageProps<"/services/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const listing = await getListing(category, slug);
  if (!listing) return { title: "Listing not found" };

  return pageMetadata({
    title: `${listing.name} | ${listing.categoryName} in ${listing.emirate}`,
    description:
      listing.summary ??
      `${listing.name} — ${listing.categoryName.toLowerCase()} in ${[listing.area, listing.emirate].filter(Boolean).join(", ")}. Contact details and what they do.`,
    path: `/services/${listing.categorySlug}/${listing.slug}`,
  });
}

/**
 * One business profile.
 *
 * `bodyMd` is written by whoever registered the company, so it is untrusted by
 * definition and goes through lib/sanitize.ts before it reaches the DOM. That
 * is the only dangerouslySetInnerHTML on the public site and it is why the
 * sanitiser exists.
 */
export default async function ServiceListingPage({
  params,
}: PageProps<"/services/[category]/[slug]">) {
  const { category: categorySlug, slug } = await params;
  const [listing, category] = await Promise.all([
    getListing(categorySlug, slug),
    getCategory(categorySlug),
  ]);

  if (!listing || !category) notFound();

  const alsoIn = (await getListings({ category: categorySlug, limit: 4 })).filter(
    (other) => other.id !== listing.id,
  );

  const path = `/services/${listing.categorySlug}/${listing.slug}`;
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services directory", path: "/services" },
    { name: category.name, path: `/services/${category.slug}` },
    { name: listing.name, path },
  ];

  const contacts: { label: string; value: string; href: string }[] = [
    ...(listing.phone ? [{ label: "Phone", value: listing.phone, href: `tel:${listing.phone}` }] : []),
    ...(listing.whatsapp
      ? [
          {
            label: "WhatsApp",
            value: listing.whatsapp,
            href: `https://wa.me/${listing.whatsapp.replace(/\D/g, "")}`,
          },
        ]
      : []),
    ...(listing.website
      ? [{ label: "Website", value: listing.website, href: listing.website }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          localBusinessSchema({
            name: listing.name,
            path,
            summary: listing.summary,
            emirate: listing.emirate,
            area: listing.area,
            phone: listing.phone,
            website: listing.website,
            image: listing.heroImage,
          }),
        ]}
      />

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-dark">
              {listing.categoryName} · {[listing.area, listing.emirate].filter(Boolean).join(", ")}
            </p>
            {listing.isVerified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-palm-tint px-3 py-1 text-[12px] font-bold text-palm">
                <ShieldCheckIcon className="h-4 w-4" />
                Licence verified
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 max-w-[20ch] text-[clamp(2.1rem,4.6vw,3.2rem)] font-extrabold leading-[1.05] tracking-tight">
            {listing.name}
          </h1>
          {listing.summary ? (
            <p data-speakable className="mt-5 max-w-[66ch] text-[18px] leading-relaxed text-ink/75">
              {listing.summary}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 lg:grid-cols-[1fr_320px] lg:px-10 lg:py-20">
        <div>
          {listing.bodyMd ? (
            <Reveal>
              <div
                className="max-w-[68ch] text-[17px] leading-relaxed text-ink/80 [&_h2]:mt-8 [&_h2]:text-[22px] [&_h2]:font-bold [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
                // Sanitised by lib/sanitize.ts. This is the one place the public
                // site renders author-supplied markup, and it never bypasses it.
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(listing.bodyMd) }}
              />
            </Reveal>
          ) : (
            <p className="text-[17px] leading-relaxed text-ink/70">
              This business has not written a full description yet. The contact details
              alongside are the ones they gave us.
            </p>
          )}

          {!listing.isVerified ? (
            <p className="mt-10 max-w-[68ch] rounded-[var(--radius-card)] bg-sun-tint px-5 py-4 text-[14px] leading-relaxed text-ink/80">
              <strong className="font-semibold">Not yet verified.</strong> We have not seen a
              trade licence for this company. That does not mean anything is wrong — most
              listings simply have not sent one — but check credentials yourself before paying
              anybody a deposit.
            </p>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-[18px] font-extrabold tracking-tight">Get in touch</h2>
            <span className="mt-3 block h-1 w-12 rounded-full bg-sea" />

            {contacts.length ? (
              <dl className="mt-5 flex flex-col gap-4">
                {contacts.map((contact) => (
                  <div key={contact.label}>
                    <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/50">
                      {contact.label}
                    </dt>
                    <dd className="mt-1 break-words text-[15px]">
                      {/* rel on an outbound link the business controls. */}
                      <a href={contact.href} rel="nofollow noopener" target="_blank">
                        {contact.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-[15px] leading-relaxed text-ink/65">
                No public contact details. Send us an enquiry and we will pass it on.
              </p>
            )}

            <Button href="/contact" size="lg" className="mt-6 w-full">
              Enquire through us
            </Button>
          </div>
        </aside>
      </div>

      {alsoIn.length ? (
        <section className="bg-page">
          <div className="mx-auto max-w-[1280px] px-5 pb-20 lg:px-10 lg:pb-24">
            <Reveal>
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
                Other {category.name.toLowerCase()}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {alsoIn.slice(0, 3).map((other, i) => (
                <Reveal key={other.id} delayMs={i * 80}>
                  <ServiceCard listing={other} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
