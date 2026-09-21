import Link from "next/link";

/**
 * Minimal chrome for sign-in and sign-up: no site header, no newsletter popup,
 * nothing to click away from the one thing the page is for.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-1 items-center justify-center bg-sea-tint/50 px-5 py-16">
      <div className="w-full max-w-[420px]">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-1.5 text-xl font-bold tracking-tight text-ink no-underline"
        >
          Travel Agency <span className="text-sea">in Dubai</span>
        </Link>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
