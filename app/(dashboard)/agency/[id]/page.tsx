import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentUploader } from "@/components/agency/DocumentUploader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Background and text colour are separate fields rather than one class string.
 * Tailwind only generates a class it can read as a literal, so slicing a
 * combined string apart at runtime is a reliable way to ship a colour that
 * never got compiled.
 */
const STATUS_COPY: Record<string, { label: string; bg: string; text: string; body: string }> = {
  pending: {
    label: "Awaiting review",
    bg: "bg-gold-tint",
    text: "text-gold-dark",
    body: "A person is checking your details. This usually takes under two working days. Upload your trade licence below to speed it up.",
  },
  approved: {
    label: "Live in the directory",
    bg: "bg-palm-tint",
    text: "text-palm",
    body: "Your profile is public and appears in search and category pages.",
  },
  rejected: {
    label: "Needs changes",
    bg: "bg-coral-tint",
    text: "text-coral-dark",
    body: "We could not publish this as submitted. The reason is below — fix it and it goes back into the queue.",
  },
};

/**
 * The company management screen: state, enquiries, listings and documents.
 *
 * Every query here runs as the signed-in user, so RLS decides what comes back.
 * A membership check is still done explicitly, because a non-member would
 * otherwise see an empty page rather than a 404 and learn that the id exists.
 */
export default async function AgencyManagePage({ params }: PageProps<"/agency/[id]">) {
  const { id } = await params;
  const profile = await requireUser(`/agency/${id}`);
  const memberships = await getMemberships();

  if (!memberships.some((m) => m.agencyId === id)) notFound();

  const supabase = await createServerClient();

  const [{ data: agency }, { data: documents }, { data: services }, { count: leadCount }] =
    await Promise.all([
      supabase
        .from("agencies")
        .select("id, name, slug, kind, emirate, area, status, is_verified, review_note, tagline")
        .eq("id", id)
        .single(),
      supabase
        .from("agency_documents")
        .select("id, kind, file_name, size_bytes, is_public, created_at")
        .eq("agency_id", id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false }),
      supabase
        .from("services")
        .select("id, name, emirate, status, created_at")
        .eq("agency_id", id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("agency_id", id),
    ]);

  if (!agency) notFound();

  const status = STATUS_COPY[agency.status] ?? {
    label: agency.status,
    bg: "bg-sand",
    text: "text-ink/60",
    body: "",
  };

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, true)}
      title={agency.name}
      subtitle={agency.tagline ?? undefined}
    >
      <div className={`rounded-[var(--radius-card)] px-5 py-4 ${status.bg}`}>
        <span
          className={`inline-block rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${status.text}`}
        >
          {status.label}
        </span>
        {status.body ? (
          <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-ink/80">
            {status.body}
          </p>
        ) : null}
        {agency.status === "rejected" && agency.review_note ? (
          <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-ink/85">
            <strong className="font-semibold">Reviewer&rsquo;s note:</strong> {agency.review_note}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <StatTiles
          tiles={[
            { label: "Verification", value: agency.is_verified ? "Verified" : "Not yet", hint: agency.is_verified ? "Badge shown on your profile" : "Upload your trade licence" },
            { label: "Listings", value: services?.length ?? 0, hint: "Services in the directory" },
            { label: "Documents", value: documents?.length ?? 0 },
            { label: "Enquiries", value: leadCount ?? 0, hint: "Routed to this company" },
          ]}
        />
      </div>

      <section className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[21px] font-extrabold tracking-tight">Your listings</h2>
          {agency.status === "approved" ? (
            <Link href={`/agency/${id}/listings/new`}>Add a listing</Link>
          ) : null}
        </div>

        <ul className="mt-5 rounded-[var(--radius-card)] border border-card-border bg-surface">
          {!services?.length ? (
            <li className="px-5 py-8 text-center text-[15px] text-ink/55">
              {agency.status === "approved"
                ? "No listings yet. Add the services you want visitors to find."
                : "You can add listings once your company profile is approved."}
            </li>
          ) : (
            services.map((service) => (
              <li
                key={service.id}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-divider px-5 py-4 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-ink">{service.name}</p>
                  <p className="mt-0.5 text-[13px] text-ink/55">{service.emirate}</p>
                </div>
                <span className="rounded-full bg-sand px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-ink/65">
                  {service.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-[21px] font-extrabold tracking-tight">Documents</h2>
        <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-ink/70">
          Your trade licence and insurance certificate stay private — only you and our
          reviewers can open them, through a link that expires after a minute. Brochures and
          photos can be shown on your public profile.
        </p>
        <div className="mt-5">
          <DocumentUploader agencyId={id} initialDocuments={documents ?? []} />
        </div>
      </section>
    </DashboardShell>
  );
}
