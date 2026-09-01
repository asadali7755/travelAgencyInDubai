import Link from "next/link";
import { footerLinks, site } from "@/lib/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-divider bg-sand">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <p className="text-[21px] font-bold tracking-tight">
              Travel Agency <span className="text-sea">in Dubai</span>
            </p>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink/70">
              A DET-licensed Dubai tour operator. Desert safaris, cruises, city tours, visas,
              transfers and full holidays — for visitors to Dubai and residents heading out.
            </p>
            <p className="mt-4 text-[14px] text-ink/60">
              DET licence{" "}
              <span className="underline decoration-dashed decoration-ink/30 underline-offset-4">
                {site.detLicenceDisplay}
              </span>
            </p>
          </div>

          <FooterColumn title="Experiences" links={footerLinks.experiences} />
          <FooterColumn title="Company" links={footerLinks.company} />

          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink/50">
              Contact
            </h2>
            <ul className="mt-1 flex flex-col text-[15px] text-ink/75">
              <li className="flex min-h-11 items-center">
                <span className="underline decoration-dashed decoration-ink/30 underline-offset-4">
                  {site.phoneDisplay}
                </span>
              </li>
              <li className="flex min-h-11 items-center">
                <span className="underline decoration-dashed decoration-ink/30 underline-offset-4">
                  {site.whatsappDisplay}
                </span>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex min-h-11 items-center">
                  {site.email}
                </a>
              </li>
              <li className="flex min-h-11 items-center">
                <span className="underline decoration-dashed decoration-ink/30 underline-offset-4">
                  {site.addressDisplay}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-divider pt-6 text-[13px] text-ink/55">
          © {year} {site.domain} — all prices in AED unless stated.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink/50">{title}</h2>
      <ul className="mt-1 flex flex-col text-[15px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex min-h-11 items-center text-ink/75 no-underline hover:text-sea"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
