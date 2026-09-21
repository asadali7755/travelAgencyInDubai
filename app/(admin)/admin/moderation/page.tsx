import { ModerationQueue, type QueueItem } from "@/components/admin/ModerationQueue";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { adminNav } from "@/lib/auth/nav";
import { requireSuperadmin } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Everything awaiting a decision, in one list, oldest first.
 *
 * Oldest first on purpose: a queue sorted newest-first quietly starves the
 * submissions nobody got to, and a company waiting two weeks for approval is
 * the fastest way to lose it.
 */
export default async function ModerationPage() {
  const profile = await requireSuperadmin("/admin/moderation");
  const supabase = await createServerClient();

  const [agencies, services, posts, faqs] = await Promise.all([
    supabase
      .from("agencies")
      .select("id, name, kind, emirate, tagline, created_at")
      .eq("status", "pending")
      .is("deleted_at", null)
      .order("created_at")
      .limit(50),
    supabase
      .from("services")
      .select("id, name, emirate, area, summary, created_at")
      .eq("status", "pending")
      .is("deleted_at", null)
      .order("created_at")
      .limit(50),
    supabase
      .from("blog_posts")
      .select("id, title, guest_name, excerpt, created_at")
      .eq("status", "pending")
      .is("deleted_at", null)
      .order("created_at")
      .limit(50),
    supabase
      .from("faqs")
      .select("id, question, guest_name, answer_md, created_at")
      .eq("status", "pending")
      .is("deleted_at", null)
      .order("created_at")
      .limit(50),
  ]);

  const items: QueueItem[] = [
    ...(agencies.data ?? []).map((row) => ({
      id: row.id,
      entity: "agency" as const,
      title: row.name,
      meta: `${row.kind} · ${row.emirate}`,
      excerpt: row.tagline,
      createdAt: row.created_at,
    })),
    ...(services.data ?? []).map((row) => ({
      id: row.id,
      entity: "service" as const,
      title: row.name,
      meta: [row.area, row.emirate].filter(Boolean).join(", "),
      excerpt: row.summary,
      createdAt: row.created_at,
    })),
    ...(posts.data ?? []).map((row) => ({
      id: row.id,
      entity: "blog_post" as const,
      title: row.title,
      meta: row.guest_name ? `Guest: ${row.guest_name}` : "Registered author",
      excerpt: row.excerpt,
      createdAt: row.created_at,
    })),
    ...(faqs.data ?? []).map((row) => ({
      id: row.id,
      entity: "faq" as const,
      title: row.question,
      meta: row.guest_name ? `Asked by ${row.guest_name}` : "Asked by a member",
      excerpt: row.answer_md ? row.answer_md.slice(0, 280) : "No answer written yet",
      createdAt: row.created_at,
    })),
  ].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return (
    <DashboardShell
      profile={profile}
      items={adminNav()}
      title="Moderation queue"
      subtitle="Oldest first. Approving publishes immediately; rejecting needs a reason, and the submitter is shown it."
    >
      <ModerationQueue items={items} />
    </DashboardShell>
  );
}
