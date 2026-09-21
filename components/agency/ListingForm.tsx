"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EMIRATES } from "@/lib/validation/agency";

type Category = { id: string; name: string };
type State = "idle" | "sending" | "error";

const field =
  "min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] " +
  "text-ink placeholder:text-ink/40 focus:border-sea focus:outline-none";

/**
 * Declared at module scope, not inside the form.
 * A component defined during render is a new type on every render, so React
 * unmounts and remounts its subtree each time — which in a form means losing
 * focus mid-typing. eslint-plugin-react-hooks catches this one.
 */
function FieldError({
  errors,
  name,
}: {
  errors: Record<string, string[] | undefined>;
  name: string;
}) {
  const message = errors[name]?.[0];
  if (!message) return null;

  return <p className="mt-1.5 text-[13px] text-coral-dark">{message}</p>;
}

/**
 * Adds one service to the directory under a company.
 *
 * Posts to /api/services, which re-validates with the same Zod schema, confirms
 * the caller is a member of the company, and forces status to 'pending'. A
 * listing cannot reach the public directory without a superadmin approving it.
 */
export function ListingForm({
  agencyId,
  categories,
  defaultEmirate,
}: {
  agencyId: string;
  categories: Category[];
  defaultEmirate: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const text = (key: string) => {
      const value = String(form.get(key) ?? "").trim();
      return value || undefined;
    };

    const response = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agency_id: agencyId,
        category_id: String(form.get("category_id") ?? ""),
        name: String(form.get("name") ?? "").trim(),
        emirate: String(form.get("emirate") ?? defaultEmirate),
        area: text("area"),
        summary: text("summary"),
        body_md: text("body_md"),
        phone: text("phone"),
        whatsapp: text("whatsapp"),
        website: text("website"),
      }),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok || !body?.success) {
      setError(body?.error?.message ?? "Something went wrong. Please try again.");
      setFieldErrors(body?.error?.fields ?? {});
      setState("error");
      return;
    }

    router.push(`/agency/${agencyId}`);
    router.refresh();
  }


  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-1.5 block text-[14px] font-semibold">
            Listing name *
          </label>
          <input id="name" name="name" required maxLength={140} className={field} />
          <FieldError errors={fieldErrors} name="name" />
        </div>

        <div>
          <label htmlFor="category_id" className="mb-1.5 block text-[14px] font-semibold">
            Category *
          </label>
          <select id="category_id" name="category_id" required className={field}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <FieldError errors={fieldErrors} name="category_id" />
        </div>

        <div>
          <label htmlFor="emirate" className="mb-1.5 block text-[14px] font-semibold">
            Emirate *
          </label>
          <select id="emirate" name="emirate" defaultValue={defaultEmirate} required className={field}>
            {EMIRATES.map((emirate) => (
              <option key={emirate} value={emirate}>
                {emirate}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="area" className="mb-1.5 block text-[14px] font-semibold">
            Area
          </label>
          <input id="area" name="area" maxLength={120} className={field} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[14px] font-semibold">
            Phone
          </label>
          <input id="phone" name="phone" inputMode="tel" className={field} />
          <FieldError errors={fieldErrors} name="phone" />
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-1.5 block text-[14px] font-semibold">
            WhatsApp
          </label>
          <input id="whatsapp" name="whatsapp" inputMode="tel" className={field} />
          <FieldError errors={fieldErrors} name="whatsapp" />
        </div>

        <div>
          <label htmlFor="website" className="mb-1.5 block text-[14px] font-semibold">
            Website
          </label>
          <input id="website" name="website" placeholder="https://" className={field} />
          <FieldError errors={fieldErrors} name="website" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="summary" className="mb-1.5 block text-[14px] font-semibold">
            One line for the card
          </label>
          <input id="summary" name="summary" maxLength={300} className={field} />
          <FieldError errors={fieldErrors} name="summary" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="body_md" className="mb-1.5 block text-[14px] font-semibold">
            Full description
          </label>
          <textarea id="body_md" name="body_md" rows={8} maxLength={8000} className={`${field} py-3`} />
          <FieldError errors={fieldErrors} name="body_md" />
        </div>
      </div>

      {error ? (
        <p role="alert" className="rounded-[10px] bg-coral-tint px-4 py-3 text-[14px] text-coral-dark">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="min-h-13 self-start rounded-full bg-sea px-8 text-base font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60"
      >
        {state === "sending" ? "Submitting…" : "Submit listing for review"}
      </button>

      <p className="max-w-[62ch] text-[14px] leading-relaxed text-ink/60">
        Listings go into a review queue and appear publicly once approved. Write about what
        you actually do — copy lifted from another site is the most common reason we reject
        one, and duplicate text is worth nothing in search anyway.
      </p>
    </form>
  );
}
