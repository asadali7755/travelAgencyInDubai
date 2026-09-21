import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { EMIRATES } from "@/lib/validation/agency";
import { getCategories, getCategory, getListings } from "@/lib/services/directory";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/seo-schema";

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category not found" };

  return pageMetadata({
    title: `${category.name} in the UAE | Verified Directory`,
    description: `${category.name} across Dubai, Abu Dhabi, Sharjah and the northern emirates. Contact details, areas covered and which companies we have verified.`,
    path: `/services/${category.slug}`,
  });
}

/**
 * One directory category, optionally narrowed to an emirate.
 *
 * The emirate filter is a query string rather than a route segment: a page per
 * category *and* emirate would be 63 thin pages competing with each other,
 * which is worse for ranking than one strong page with filters on it.
 */
export default async function ServiceCategoryPage({
  params,
  searchParams,
}: PageProps<"/services/[category]">) {
  const { category: slug } = await params;
  const query = await searchParams;
  const category = await getCategory(slug);
  if (!category) notFound();

  const raw = typeof query.emirate === "string" ? query.emirate : undefined;
  const emirate = EMIRATES.find((value) => value === raw);

  const listings = await getListings({ category: category.slug, emirate });

  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services directory", path: "/services" },
    { name: category.name, path: `/services/${category.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          itemListSchema(
            listings.map((l) => ({
              name: l.name,
              path: `/services/${l.categorySlug}/${l.slug}`,
            })),
            `${category.name} in the UAE`,
          ),
        ]}
      />

      <section className="bg-sand">
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.03] tracking-tight">
            {category.name} in the UAE
          </h1>
          <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-ink/75">
            {listings.length}{" "}
            {listings.length === 1 ? "business" : "businesses"} listed
            {emirate ? ` in ${emirate}` : " across all seven emirates"}. Verified companies —
            the ones whose trade licence we have checked — are shown first.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
          <nav aria-label="Filter by emirate" className="flex flex-wrap gap-2.5 border-y border-divider py-5">
            <Link
              href={`/services/${category.slug}`}
              aria-current={!emirate ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-full border px-5 text-[14px] no-underline transition-colors ${
                !emirate
                  ? "border-sea bg-sea font-semibold text-white"
                  : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
              }`}
            >
              All emirates
            </Link>
            {EMIRATES.map((value) => (
              <Link
                key={value}
                href={`/services/${category.slug}?emirate=${encodeURIComponent(value)}`}
                aria-current={emirate === value ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-full border px-5 text-[14px] no-underline transition-colors ${
                  emirate === value
                    ? "border-sea bg-sea font-semibold text-white"
                    : "border-card-border bg-surface text-ink/75 hover:border-sea/40"
                }`}
              >
                {value}
              </Link>
            ))}
          </nav>

          {listings.length === 0 ? (
            <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-card-border bg-surface px-6 py-12 text-center">
              <h2 className="text-[19px] font-bold tracking-tight">Nothing listed here yet</h2>
              <p className="mx-auto mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink/65">
                No approved {category.name.toLowerCase()} in this filter. If this is your line
                of work, a profile is free and takes about five minutes.
              </p>
              <Link
                href="/list-your-business"
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-sea px-6 text-[15px] font-semibold text-white no-underline hover:bg-sea-dark"
              >
                List your business
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing, i) => (
                <Reveal key={listing.id} delayMs={(i % 3) * 80}>
                  <ServiceCard listing={listing} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
