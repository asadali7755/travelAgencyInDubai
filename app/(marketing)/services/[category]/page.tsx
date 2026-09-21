import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/FinalCta";
import { DirectoryBrowser } from "@/components/services/DirectoryBrowser";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
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
 * One directory category, across all seven emirates.
 *
 * Statically rendered and revalidated: the emirate filter runs in the browser
 * rather than as a `?emirate=` search param, so this is one strong URL per
 * category instead of eight near-duplicates competing with each other — and the
 * page can be cached, which it could not while it read search params.
 */
export default async function ServiceCategoryPage({
  params,
}: PageProps<"/services/[category]">) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const listings = await getListings({ category: category.slug });

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
          <p data-speakable className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-ink/75">
            {listings.length}{" "}
            {listings.length === 1 ? "business" : "businesses"} listed across all seven
            emirates. Verified companies — the ones whose trade licence we have checked — are
            shown first, and listing a business costs nothing.
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
          <DirectoryBrowser listings={listings} categoryName={category.name} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
