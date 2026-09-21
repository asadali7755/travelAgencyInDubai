import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="rounded-[var(--radius-card)] border border-card-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
      <h1 className="text-[26px] font-extrabold tracking-tight">Create an account</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
        Free. It keeps your enquiry history in one place, and it is how travel agencies and
        service businesses list themselves in the directory.
      </p>

      <div className="mt-6">
        <Suspense fallback={<div className="h-72" aria-hidden />}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </div>
  );
}
