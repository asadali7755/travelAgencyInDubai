"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { nav, whatsappHref } from "@/lib/site";

/**
 * Fixed header that shrinks and gains a blurred background once the page has
 * scrolled past the top of the hero, matching the approved design.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const whatsapp = whatsappHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-page/85 py-2 shadow-[0_1px_0_var(--color-divider)] backdrop-blur-lg"
          : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-5 lg:px-10">
        <Link
          href="/"
          className={`flex min-h-11 shrink-0 items-center gap-1.5 text-xl font-bold tracking-tight no-underline lg:text-[22px] ${
            scrolled ? "text-ink" : "text-white drop-shadow-sm"
          }`}
        >
          Travel Agency <span className="text-sea-light">in Dubai</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] no-underline transition-colors ${
                scrolled ? "text-ink hover:text-sea" : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Button
            href={whatsapp}
            variant={scrolled ? "outline" : "ghost"}
            className="hidden sm:inline-flex"
          >
            <WhatsAppIcon />
            WhatsApp us
          </Button>
          <Button href="/contact">Get a free quote</Button>
        </div>
      </div>
    </header>
  );
}
