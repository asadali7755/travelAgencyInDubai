import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "onSea";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-sea text-white hover:bg-sea-dark",
  outline: "border border-sea text-sea hover:bg-sea-tint",
  ghost: "border border-white/70 text-white hover:bg-white/15",
  onSea: "bg-white text-sea hover:bg-white/90",
};

/** Size owns both padding and font-size so two type utilities never collide. */
const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 text-[15px]",
  lg: "min-h-13 px-8 text-base",
};

type Props = {
  children: ReactNode;
  href?: string | null;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Needed when the button shows only an icon. */
  ariaLabel?: string;
};

/**
 * Renders a link when it has somewhere to go, and a disabled button when it does
 * not — which is what happens to the WhatsApp buttons until the client gives us
 * a number. A dead <a href="#"> would look identical and mislead the visitor.
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
}: Props) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-label={ariaLabel}
        className={`${classes} cursor-not-allowed opacity-60`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={`${classes} no-underline`}>
      {children}
    </Link>
  );
}
