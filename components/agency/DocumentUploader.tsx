"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DOCUMENT_KINDS, MAX_UPLOAD_BYTES } from "@/lib/validation/upload";

type Doc = {
  id: string;
  kind: string;
  file_name: string;
  size_bytes: number;
  is_public: boolean;
  created_at: string;
};

const KIND_LABELS: Record<string, string> = {
  licence: "Trade licence",
  insurance: "Insurance certificate",
  brochure: "Brochure",
  price_list: "Price list",
  photo: "Photo",
  other: "Other",
};

const kb = (bytes: number) =>
  bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;

/**
 * Upload and manage a company's files.
 *
 * The bucket is private, so a document is never linked directly — "Download"
 * asks the API for a sixty-second signed URL, which re-checks membership before
 * issuing it. Removing a file is a soft delete; the object stays in storage
 * because a licence that disappears mid-dispute is exactly what the audit trail
 * is for.
 */
export function DocumentUploader({
  agencyId,
  initialDocuments,
}: {
  agencyId: string;
  initialDocuments: Doc[];
}) {
  const router = useRouter();
  const [docs, setDocs] = useState<Doc[]>(initialDocuments);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");

    if (!(file instanceof File) || file.size === 0) {
      setError("Choose a file first.");
      setBusy(false);
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("Files must be 10 MB or smaller.");
      setBusy(false);
      return;
    }

    data.set("agency_id", agencyId);
    data.set("is_public", data.get("is_public") === "on" ? "true" : "false");

    const response = await fetch("/api/agency/documents", { method: "POST", body: data });
    const body = await response.json().catch(() => null);

    if (!response.ok || !body?.success) {
      setError(body?.error?.message ?? "That upload didn't work. Please try again.");
      setBusy(false);
      return;
    }

    setDocs((current) => [body.data, ...current]);
    form.reset();
    setBusy(false);
    router.refresh();
  }

  async function download(id: string) {
    const response = await fetch(`/api/agency/documents/${id}`);
    const body = await response.json().catch(() => null);
    if (!response.ok || !body?.success) {
      setError("We couldn't prepare that download.");
      return;
    }
    window.open(body.data.url, "_blank", "noopener,noreferrer");
  }

  async function remove(id: string) {
    const response = await fetch(`/api/agency/documents/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("We couldn't remove that document.");
      return;
    }
    setDocs((current) => current.filter((doc) => doc.id !== id));
    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="rounded-[var(--radius-card)] border border-card-border bg-surface p-5"
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
          <div>
            <label htmlFor="file" className="mb-1.5 block text-[14px] font-semibold">
              File
            </label>
            <input
              id="file"
              name="file"
              type="file"
              required
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="w-full text-[15px] file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-sea-tint file:px-5 file:text-[14px] file:font-semibold file:text-sea-dark"
            />
            <p className="mt-1.5 text-[13px] text-ink/55">JPG, PNG, WebP or PDF, up to 10 MB.</p>
          </div>

          <div>
            <label htmlFor="kind" className="mb-1.5 block text-[14px] font-semibold">
              What it is
            </label>
            <select
              id="kind"
              name="kind"
              defaultValue="licence"
              className="min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] focus:border-sea focus:outline-none"
            >
              {DOCUMENT_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {KIND_LABELS[kind]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-4 flex items-start gap-3 text-[14px] leading-relaxed text-ink/75">
          <input type="checkbox" name="is_public" className="mt-1 h-4 w-4 shrink-0" />
          <span>
            Show this on my public profile. Only brochures and photos may be public — licences
            and insurance certificates stay private whatever this is set to.
          </span>
        </label>

        {error ? (
          <p role="alert" className="mt-4 rounded-[10px] bg-coral-tint px-4 py-3 text-[14px] text-coral-dark">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 min-h-12 rounded-full bg-sea px-7 text-[15px] font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
      </form>

      <ul className="mt-6 rounded-[var(--radius-card)] border border-card-border bg-surface">
        {docs.length === 0 ? (
          <li className="px-5 py-8 text-center text-[15px] text-ink/55">
            No documents yet. Upload your trade licence to get verified.
          </li>
        ) : (
          docs.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-divider px-5 py-4 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-ink">{doc.file_name}</p>
                <p className="mt-0.5 text-[13px] text-ink/55">
                  {KIND_LABELS[doc.kind] ?? doc.kind} · {kb(doc.size_bytes)} ·{" "}
                  {doc.is_public ? "Public" : "Private"}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => download(doc.id)}
                  className="min-h-11 rounded-full border border-card-border px-4 text-[14px] text-ink/75 hover:border-sea/40"
                >
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => remove(doc.id)}
                  className="min-h-11 rounded-full border border-card-border px-4 text-[14px] text-coral-dark hover:border-coral/50"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
