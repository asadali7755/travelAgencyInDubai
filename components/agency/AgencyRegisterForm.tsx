"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AGENCY_KINDS, EMIRATES } from "@/lib/validation/agency";

type State = "idle" | "sending" | "error";

const field =
  "min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] " +
  "text-ink placeholder:text-ink/40 focus:border-sea focus:outline-none";

const KIND_LABELS: Record<(typeof AGENCY_KINDS)[number], string> = {
  tour: "Tour operator / travel agency",
  visa: "Visa & PRO services",
  hotel: "Hotel or holiday apartments",
  transport: "Transport & car hire",
  law: "Law firm",
  medical: "Clinic or medical practice",
  spa: "Spa or salon",
  moving: "Movers & logistics",
  other: "Something else",
};

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
 * Registers a company profile.
 *
 * Posts to /api/agencies, which validates the same Zod schema server-side — the
 * `required` attributes here are a courtesy to the visitor, not a control. The
 * listing is created pending and a superadmin reviews it before it appears.
 */
export function AgencyRegisterForm() {
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

    const payload = {
      name: String(form.get("name") ?? "").trim(),
      kind: String(form.get("kind") ?? "other"),
      emirate: String(form.get("emirate") ?? "Dubai"),
      tagline: text("tagline"),
      about_md: text("about_md"),
      area: text("area"),
      email: text("email"),
      phone: text("phone"),
      whatsapp: text("whatsapp"),
      website: text("website"),
      licence_number: text("licence_number"),
    };

    const response = await fetch("/api/agencies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok || !body?.success) {
      setError(body?.error?.message ?? "Something went wrong. Please try again.");
      setFieldErrors(body?.error?.fields ?? {});
      setState("error");
      return;
    }

    // Straight to the management page for the company just created, and
    // refresh so the sidebar switches from "List your business" to "My business".
    router.push(`/agency/${body.data.id}`);
    router.refresh();
  }


  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-1.5 block text-[14px] font-semibold">
            Company name *
          </label>
          <input id="name" name="name" required maxLength={120} className={field} />
          <FieldError errors={fieldErrors} name="name" />
        </div>

        <div>
          <label htmlFor="kind" className="mb-1.5 block text-[14px] font-semibold">
            What you do *
          </label>
          <select id="kind" name="kind" required className={field}>
            {AGENCY_KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {KIND_LABELS[kind]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="emirate" className="mb-1.5 block text-[14px] font-semibold">
            Emirate *
          </label>
          <select id="emirate" name="emirate" required className={field}>
            {EMIRATES.map((emirate) => (
              <option key={emirate} value={emirate}>
                {emirate}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tagline" className="mb-1.5 block text-[14px] font-semibold">
            One line about you
          </label>
          <input
            id="tagline"
            name="tagline"
            maxLength={160}
            placeholder="Licensed DMC running desert and mountain tours since 2011"
            className={field}
          />
          <FieldError errors={fieldErrors} name="tagline" />
        </div>

        <div>
          <label htmlFor="area" className="mb-1.5 block text-[14px] font-semibold">
            Area
          </label>
          <input id="area" name="area" maxLength={120} placeholder="Business Bay" className={field} />
        </div>

        <div>
          <label htmlFor="licence_number" className="mb-1.5 block text-[14px] font-semibold">
            Trade licence number
          </label>
          <input id="licence_number" name="licence_number" maxLength={60} className={field} />
          <p className="mt-1.5 text-[13px] text-ink/55">Never shown publicly.</p>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-[14px] font-semibold">
            Contact email
          </label>
          <input id="email" name="email" type="email" maxLength={160} className={field} />
          <FieldError errors={fieldErrors} name="email" />
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
          <label htmlFor="about_md" className="mb-1.5 block text-[14px] font-semibold">
            About the company
          </label>
          <textarea id="about_md" name="about_md" rows={6} maxLength={6000} className={`${field} py-3`} />
          <FieldError errors={fieldErrors} name="about_md" />
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
        {state === "sending" ? "Submitting…" : "Submit for review"}
      </button>

      <p className="max-w-[62ch] text-[14px] leading-relaxed text-ink/60">
        Listings are reviewed by a person before they go live, usually within two working
        days. Upload your trade licence on the next screen and we will verify you, which puts
        a verified badge on your profile and ranks you above unverified listings.
      </p>
    </form>
  );
}
