import type { NavItem } from "@/components/dashboard/DashboardNav";
import type { Role } from "@/lib/auth/session";

/**
 * What a signed-in person can see in the sidebar.
 *
 * Purely cosmetic. Hiding the admin link from a normal user is a courtesy, not
 * a control — /admin is guarded by requireSuperadmin() in its layout and by RLS
 * on every table it reads.
 */
export function accountNav(role: Role, hasAgency: boolean): NavItem[] {
  const items: NavItem[] = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/enquiries", label: "My enquiries" },
    { href: "/dashboard/profile", label: "Profile" },
    { href: "/agency", label: hasAgency ? "My business" : "List your business" },
  ];

  if (role === "superadmin") items.push({ href: "/admin", label: "Admin" });

  return items;
}

export function adminNav(): NavItem[] {
  return [
    { href: "/admin", label: "Overview" },
    { href: "/admin/moderation", label: "Moderation queue" },
    { href: "/admin/keywords", label: "Keywords" },
    { href: "/admin/agencies", label: "Companies" },
    { href: "/admin/leads", label: "Enquiries" },
    { href: "/dashboard", label: "Back to my account" },
  ];
}
