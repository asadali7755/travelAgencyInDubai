import { NextRequest } from "next/server";
import { blockedByOrigin, requireAgencyMember, requireApiUser } from "@/lib/api/guards";
import { fail, ok } from "@/lib/api/respond";
import { rateLimit } from "@/lib/rate-limit";

const BUCKET = "agency-uploads";

/**
 * Issue a short-lived download link.
 *
 * The bucket is private and the storage path never reaches the browser, so this
 * is the only way to read a document — and it re-checks membership first rather
 * than trusting that whoever has the row id should have the file.
 */
export async function GET(_req: NextRequest, { params }: RouteContext<"/api/agency/documents/[id]">) {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const { id } = await params;

  const { data: doc, error } = await auth.supabase
    .from("agency_documents")
    .select("agency_id, storage_path, file_name")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error || !doc) return fail(404, "Document not found.");

  const member = await requireAgencyMember(auth.supabase, auth.userId, doc.agency_id);
  if ("error" in member) return member.error;

  // Sixty seconds: long enough to start a download, short enough that a link
  // pasted into a chat is useless by the time anyone else opens it.
  const { data: signed, error: signError } = await auth.supabase.storage
    .from(BUCKET)
    .createSignedUrl(doc.storage_path, 60, { download: doc.file_name });

  if (signError || !signed) {
    console.error("documents.sign", signError?.message);
    return fail(500, "We couldn't prepare that download.");
  }

  return ok({ url: signed.signedUrl, expiresInSeconds: 60 });
}

/**
 * Remove a document.
 *
 * A soft delete: the row is marked and the object stays in the bucket. Per
 * CLAUDE.md the database is append-only unless a human says otherwise, and a
 * trade licence that vanishes the day a listing is challenged is precisely the
 * case the rule exists for. A purge is a deliberate, human-run job.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext<"/api/agency/documents/[id]">) {
  const limited = await rateLimit(req, { key: "documents:delete", limit: 30, window: "1 h" });
  if (limited) return fail(429, "Too many requests. Please try again shortly.");

  if (blockedByOrigin(req)) return fail(403, "Request blocked.");

  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const { id } = await params;

  const { data: doc } = await auth.supabase
    .from("agency_documents")
    .select("agency_id")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (!doc) return fail(404, "Document not found.");

  const member = await requireAgencyMember(auth.supabase, auth.userId, doc.agency_id);
  if ("error" in member) return member.error;

  const { error } = await auth.supabase
    .from("agency_documents")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("documents.softDelete", error.message);
    return fail(500, "We couldn't remove that document.");
  }

  return ok({ id, status: "removed" as const });
}
