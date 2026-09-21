import { NextRequest } from "next/server";
import { blockedByOrigin, requireAgencyMember, requireApiUser } from "@/lib/api/guards";
import { fail, ok } from "@/lib/api/respond";
import { rateLimit } from "@/lib/rate-limit";
import { checkFile, documentMetaSchema, serializeDocument } from "@/lib/validation/upload";

const BUCKET = "agency-uploads";
const COLUMNS = "id, kind, file_name, mime_type, size_bytes, is_public, created_at";

/** The documents this company has uploaded. Membership is enforced by RLS too. */
export async function GET(req: NextRequest) {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const agencyId = req.nextUrl.searchParams.get("agency_id");
  if (!agencyId) return fail(400, "Missing agency_id.");

  const member = await requireAgencyMember(auth.supabase, auth.userId, agencyId);
  if ("error" in member) return member.error;

  const { data, error } = await auth.supabase
    .from("agency_documents")
    .select(COLUMNS)
    .eq("agency_id", agencyId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("documents.list", error.message);
    return fail(500, "We couldn't load your documents.");
  }

  return ok((data ?? []).map(serializeDocument));
}

/**
 * Upload a document.
 *
 * multipart -> validate metadata -> validate the file -> store under the
 * company's own folder -> index the row.
 *
 * The stored filename is generated, never taken from the upload: a name like
 * `../../other-agency/licence.pdf` is a directory traversal, and the original
 * is kept in a column for display instead.
 */
export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, { key: "documents:create", limit: 20, window: "1 h" });
  if (limited) return fail(429, "Too many uploads. Please try again later.");

  if (blockedByOrigin(req)) return fail(403, "Request blocked.");

  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, "Invalid upload.");
  }

  const parsed = documentMetaSchema.safeParse({
    agency_id: form.get("agency_id"),
    kind: form.get("kind"),
    is_public: form.get("is_public") === "true",
  });
  if (!parsed.success) {
    return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  }

  const file = form.get("file");
  if (!(file instanceof File)) return fail(400, "Attach a file.");

  const checked = checkFile(file);
  if (!checked.ok) return fail(400, checked.error);

  const member = await requireAgencyMember(auth.supabase, auth.userId, parsed.data.agency_id);
  if ("error" in member) return member.error;

  const storagePath = `${parsed.data.agency_id}/${crypto.randomUUID()}.${checked.ext}`;

  const { error: uploadError } = await auth.supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      // Never overwrite. A generated UUID should not collide, and if it somehow
      // did, silently replacing another company's file is the worst outcome.
      upsert: false,
    });

  if (uploadError) {
    console.error("documents.upload", uploadError.message);
    return fail(500, "We couldn't store that file. Please try again.");
  }

  const { data, error } = await auth.supabase
    .from("agency_documents")
    .insert({
      agency_id: parsed.data.agency_id,
      uploaded_by: auth.userId,
      kind: parsed.data.kind,
      is_public: parsed.data.is_public,
      storage_path: storagePath,
      // Truncated and stripped of path separators before it is ever displayed.
      file_name: file.name.replace(/[/\\]/g, "_").slice(0, 160),
      mime_type: file.type,
      size_bytes: file.size,
    })
    .select(COLUMNS)
    .single();

  if (error || !data) {
    // The object is in the bucket but unindexed. Remove it rather than leave an
    // orphan nobody can see, list or delete.
    await auth.supabase.storage.from(BUCKET).remove([storagePath]);
    console.error("documents.index", error?.message);
    return fail(500, "We couldn't save that upload. Please try again.");
  }

  return ok(serializeDocument(data), 201);
}
