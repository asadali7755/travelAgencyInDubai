import { notFound } from "next/navigation";
import { ListingForm } from "@/components/agency/ListingForm";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

export default async function NewListingPage({
  params,
}: PageProps<"/agency/[id]/listings/new">) {
  const { id } = await params;
  const profile = await requireUser(`/agency/${id}/listings/new`);
  const memberships = await getMemberships();

  if (!memberships.some((m) => m.agencyId === id)) notFound();

  const supabase = await createServerClient();
  const [{ data: agency }, { data: categories }] = await Promise.all([
    supabase.from("agencies").select("name, emirate, status").eq("id", id).single(),
    // `categories` is public reference data, seeded in migration 0008.
    supabase.from("categories").select("id, name").order("position"),
  ]);

  if (!agency) notFound();

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, true)}
      title="Add a listing"
      subtitle={`A service offered by ${agency.name}. One listing per service per emirate.`}
    >
      <div className="max-w-[760px]">
        <ListingForm
          agencyId={id}
          categories={categories ?? []}
          defaultEmirate={agency.emirate}
        />
      </div>
    </DashboardShell>
  );
}
