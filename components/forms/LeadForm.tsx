"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { tours } from "@/lib/data/tours";

const COUNTRIES = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "PK", name: "Pakistan" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "RU", name: "Russia" },
  { code: "CN", name: "China" },
  { code: "US", name: "United States" },
  { code: "OTHER", name: "Somewhere else" },
];

type State = "idle" | "sending" | "sent" | "error";

const field =
  "min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] " +
  "text-ink placeholder:text-ink/40 focus:border-sea focus:outline-none";

export function LeadForm() {
  const params = useSearchParams();
  const preselected = params.get("tour") ?? "";
  // Written by the home-page calculator so the visitor does not retype their
  // brief. Sliced because the message column is capped at 1,000 characters and
  // a query string is user-editable.
  const plan = (params.get("plan") ?? "").slice(0, 400);

  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot: real people never fill a field they cannot see.
    if (form.get("company")) {
      setState("sent");
      return;
    }

    const interest = String(form.get("interest") ?? "").trim();
    const note = String(form.get("message") ?? "").trim();

    const payload = {
      full_name: String(form.get("full_name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      country: String(form.get("country") ?? "AE").slice(0, 2),
      travel_date: String(form.get("travel_date") ?? "") || undefined,
      message: [interest ? `Interested in: ${interest}` : "", note].filter(Boolean).join("\n\n"),
      source: interest || (plan ? "trip-calculator" : "contact-page"),
    };

    setState("sending");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok) {
        setState("error");
        setError(body?.error?.message ?? "We couldn't send that. Please try again.");
        setFieldErrors(body?.error?.fields ?? {});
        return;
      }

      setState("sent");
    } catch {
      setState("error");
      setError("We couldn't reach the server. Please try again, or message us on WhatsApp.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-[var(--radius-card)] border border-palm/30 bg-palm-tint p-8">
        <h2 className="text-[24px] font-extrabold tracking-tight">Thank you — that reached us.</h2>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/75">
          We read every enquiry ourselves and reply with a plan and a price, usually the same day.
          If it is urgent, WhatsApp is the fastest way to reach us.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

      <Field label="Your name" error={fieldErrors.full_name}>
        <input name="full_name" required autoComplete="name" className={field} placeholder="Full name" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={fieldErrors.email}>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone or WhatsApp" error={fieldErrors.phone}>
          <input
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            className={field}
            placeholder="+971 …"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Where are you travelling from?" error={fieldErrors.country}>
          <select name="country" defaultValue="AE" className={field}>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Travel date" error={fieldErrors.travel_date} optional>
          <input name="travel_date" type="date" className={field} />
        </Field>
      </div>

      <Field label="What are you interested in?">
        <select name="interest" defaultValue={preselected} className={field}>
          <option value="">Not sure yet — help me plan</option>
          {tours.map((tour) => (
            <option key={tour.slug} value={tour.slug}>
              {tour.title}
            </option>
          ))}
          <option value="visa">UAE visit visa</option>
          <option value="hotel">Hotel booking</option>
          <option value="transfer">Airport transfer</option>
          <option value="package">Full holiday package</option>
        </select>
      </Field>

      <Field label="Anything else we should know?" error={fieldErrors.message} optional>
        <textarea
          name="message"
          rows={4}
          defaultValue={plan}
          className={`${field} min-h-32 py-3 leading-relaxed`}
          placeholder="How many people, which dates, where you're staying…"
        />
      </Field>

      {error ? (
        <p role="alert" className="rounded-[10px] bg-coral-tint px-4 py-3 text-[15px] text-coral-dark">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="min-h-13 rounded-full bg-sea px-8 text-[16px] font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send my enquiry"}
      </button>

      <p className="text-[13px] leading-relaxed text-ink/55">
        We use your details to answer this enquiry and nothing else. No card is needed to ask.
      </p>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  error?: string[];
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-ink/45">(optional)</span> : null}
      </span>
      {children}
      {error?.length ? <span className="text-[13px] text-coral-dark">{error[0]}</span> : null}
    </label>
  );
}
