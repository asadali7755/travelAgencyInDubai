/**
 * Single source of truth for the details that appear in the chrome of every page.
 *
 * Anything the client has not confirmed yet is written as a visible bracketed
 * placeholder, not an invented value. When the real details arrive they are
 * filled in here once and every page picks them up.
 */

export const site = {
  name: "Travel Agency in Dubai",
  domain: "travelagencyindubai.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelagencyindubai.com",
  email: "hello@travelagencyindubai.com",

  /** TODO(client): real numbers, licence and address. */
  phoneDisplay: "[+971 XX XXX XXXX]",
  whatsappDisplay: "[+971 XX XXX XXXX]",
  addressDisplay: "[Office address], Dubai, UAE",
  detLicenceDisplay: "[No. XXXXXX]",

  stats: [
    { value: "[XX]+", label: "Tours & experiences" },
    { value: "[XX]/7", label: "Pick-up & support" },
    { value: "[XX] min", label: "Average reply time" },
    { value: "[X,XXX]", label: "Five-star reviews" },
  ],
} as const;

export const nav = [
  { label: "Tours & experiences", href: "/dubai-tours" },
  { label: "Desert safari", href: "/dubai-tours/desert-safari" },
  { label: "Travel guide", href: "/blog/things-to-do-in-dubai" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  experiences: [
    { label: "Desert safaris", href: "/dubai-tours/desert-safari" },
    { label: "Dhow cruises", href: "/dubai-tours/cruises" },
    { label: "Yacht charters", href: "/dubai-tours/yacht-charter" },
    { label: "City tours", href: "/dubai-tours/city-tour" },
  ],
  company: [
    { label: "Travel guide", href: "/blog/things-to-do-in-dubai" },
    { label: "Get a quote", href: "/contact" },
    { label: "Terms & cancellation", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

/**
 * The WhatsApp deep link. Returns null until the client gives us a number,
 * so the button can render as disabled rather than linking somewhere wrong.
 */
export function whatsappHref(message?: string): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw) return null;

  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;

  const text = message ?? "Hello, I would like a quote for a trip to Dubai.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
