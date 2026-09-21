import { AgencyRegisterForm } from "@/components/agency/AgencyRegisterForm";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { accountNav } from "@/lib/auth/nav";
import { getMemberships, requireUser } from "@/lib/auth/session";

export default async function NewAgencyPage() {
  const profile = await requireUser("/agency/new");
  const memberships = await getMemberships();

  return (
    <DashboardShell
      profile={profile}
      items={accountNav(profile.role, memberships.length > 0)}
      title="Register your company"
      subtitle="Everything marked with a star is required. The rest can be filled in later from the management screen."
    >
      <div className="max-w-[760px]">
        <AgencyRegisterForm />
      </div>
    </DashboardShell>
  );
}
