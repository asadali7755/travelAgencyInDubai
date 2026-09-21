import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

// Signed-in pages must never be indexed, and there is nothing here for a
// crawler to rank anyway.
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
      <h1 className="text-[26px] font-extrabold tracking-tight">Sign in</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
        Your enquiries, your saved trips, and — if you run a business — your listings.
      </p>

      <div className="mt-6">
        {/* useSearchParams needs a boundary or the whole route opts out of static rendering. */}
        <Suspense fallback={<div className="h-64" aria-hidden />}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
    </div>
  );
}
