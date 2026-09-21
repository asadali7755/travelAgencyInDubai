import { z } from "zod";

/**
 * File upload rules for agency documents.
 *
 * Deliberately strict, and enforced on the server rather than only in the
 * browser: a multipart request does not have to come from our form. The same
 * limits are repeated on the storage bucket in migration 0008, so a direct
 * upload with a stolen token still cannot get a 40 MB executable in.
 */

export const DOCUMENT_KINDS = [
  "licence",
  "insurance",
  "brochure",
  "price_list",
  "photo",
  "other",
] as const;

/** 10 MB, matching the bucket's own file_size_limit. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/**
 * An allow-list, never a deny-list. SVG is excluded on purpose: it is an XML
 * document that can carry script, and serving one from our own origin would be
 * stored XSS even though it looks like an image.
 */
export const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export const documentMetaSchema = z
  .object({
    agency_id: z.string().uuid(),
    kind: z.enum(DOCUMENT_KINDS),
    /** Only a brochure or a photo may ever be public. Enforced again below. */
    is_public: z.coerce.boolean().default(false),
  })
  .strict()
  .refine(
    (value) => !value.is_public || value.kind === "brochure" || value.kind === "photo",
    { message: "Only brochures and photos can be shown publicly", path: ["is_public"] },
  );

/**
 * Validates the file itself. The declared Content-Type is a claim by the
 * uploader, so it is checked against the allow-list and the extension is then
 * derived from *our* map rather than from the filename they sent.
 */
export function checkFile(file: File): { ok: true; ext: string } | { ok: false; error: string } {
  if (file.size === 0) return { ok: false, error: "That file is empty." };
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Files must be 10 MB or smaller." };
  }

  const ext = ALLOWED_MIME[file.type];
  if (!ext) {
    return { ok: false, error: "Upload a JPG, PNG, WebP or PDF." };
  }

  return { ok: true, ext };
}

type DocumentRow = {
  id: string;
  kind: string;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  is_public: boolean;
  created_at: string;
};

/**
 * Note the absence of `storage_path`. Handing the path to the browser invites
 * someone to try it directly against the bucket; downloads go through a signed
 * URL issued by the API after it has checked membership.
 */
export const serializeDocument = (row: DocumentRow) => ({
  id: row.id,
  kind: row.kind,
  file_name: row.file_name,
  mime_type: row.mime_type,
  size_bytes: row.size_bytes,
  is_public: row.is_public,
  created_at: row.created_at,
});
