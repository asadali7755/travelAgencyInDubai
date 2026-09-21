"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";
type State = "idle" | "working" | "sent" | "error";

const field =
  "min-h-12 w-full rounded-[10px] border border-card-border bg-page px-4 text-[16px] " +
  "text-ink placeholder:text-ink/40 focus:border-sea focus:outline-none";

/**
 * Email-and-password auth against Supabase, in the browser.
 *
 * The anon key is all this needs and it is already public, so there is no value
 * in proxying it through a route handler. The session cookie is written by the
 * Supabase client and refreshed by middleware.ts on every subsequent request.
 *
 * `next` is read from the query string and is a path we then navigate to, so it
 * is checked to be a same-site path — an open redirect is the classic way this
 * exact pattern gets abused for phishing.
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const raw = params.get("next") ?? "/dashboard";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("working");
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();

    if (password.length < 8) {
      setError("Passwords need to be at least 8 characters.");
      setState("error");
      return;
    }

    const supabase = createClient();

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name || email.split("@")[0] },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setState("error");
        return;
      }

      setState("sent");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      // Deliberately vague: telling an attacker that the address exists but the
      // password is wrong turns the login form into an account enumerator.
      setError("That email and password combination didn't work.");
      setState("error");
      return;
    }

    router.push(next);
    router.refresh();
  }

  if (state === "sent") {
    return (
      <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6">
        <h2 className="text-[20px] font-extrabold tracking-tight">Check your email</h2>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/75">
          We&rsquo;ve sent a confirmation link. Open it on this device and you&rsquo;ll be signed in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {mode === "signup" ? (
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[14px] font-semibold">
            Your name
          </label>
          <input id="name" name="name" autoComplete="name" maxLength={60} className={field} />
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-[14px] font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-[14px] font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className={field}
        />
        {mode === "signup" ? (
          <p className="mt-1.5 text-[13px] text-ink/55">At least 8 characters.</p>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="rounded-[10px] bg-coral-tint px-4 py-3 text-[14px] text-coral-dark">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "working"}
        className="min-h-13 rounded-full bg-sea px-8 text-base font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60"
      >
        {state === "working"
          ? "One moment…"
          : mode === "signup"
            ? "Create account"
            : "Sign in"}
      </button>

      <p className="text-[14px] text-ink/65">
        {mode === "signup" ? (
          <>
            Already have an account? <Link href="/login">Sign in</Link>
          </>
        ) : (
          <>
            No account yet? <Link href="/signup">Create one</Link>
          </>
        )}
      </p>
    </form>
  );
}
