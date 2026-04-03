"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AudioToggle } from "@/components/audio-toggle-real";
import { siteSettings } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/lotes", label: "Lotes" },
  { href: "/vivir-en-huaypo", label: "Vivir en Huaypo" },
  { href: "/club", label: "Club" },
  { href: "/agenda-tu-visita", label: "Agenda tu visita" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    if (href === "/vivir-en-huaypo") {
      return pathname === "/vivir-en-huaypo" || pathname.startsWith("/huaypo");
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[linear-gradient(180deg,_rgba(4,12,10,0.96),_rgba(6,20,16,0.92))] shadow-[0_10px_34px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#D9CDAE] md:text-xs md:tracking-[0.35em]">
            <span className="md:hidden">{siteSettings.brandCompact}</span>
            <span className="hidden md:inline">{siteSettings.brand}</span>
          </span>
          <span className="font-serif text-lg text-[#F7F3E9] sm:text-xl md:text-2xl">
            {siteSettings.projectLabel}
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm text-[#E2DACA] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                  isActive(item.href)
                    ? "rounded-full border border-[rgba(247,243,233,0.18)] bg-[rgba(247,243,233,0.12)] px-4 py-2 text-[#FFF8EA]"
                    : "rounded-full px-4 py-2 text-[#EEE5D5] transition hover:bg-[rgba(247,243,233,0.08)] hover:text-[#FFF8EA]"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <AudioToggle />
          </div>
          <div className="lg:hidden">
            <AudioToggle compact />
          </div>
          <WhatsAppButton
            label="WhatsApp"
            message="Hola, quiero mas informacion sobre los lotes en Huaypo."
            className="hidden rounded-full border border-white/14 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-[#FFF8EA] transition hover:border-[#D0BC8F]/45 hover:bg-white/8 sm:inline-flex"
          />
          <Link
            href="/agenda-tu-visita"
            className="lux-button-primary hidden px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            Agenda una visita
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-[#FFF8EA] transition hover:border-[#D0BC8F]/45 hover:bg-white/8 md:hidden"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {isOpen ? (
        <div className="border-t border-white/10 bg-[linear-gradient(180deg,_rgba(3,11,9,0.995),_rgba(7,18,15,0.99))] px-4 py-5 shadow-[0_26px_80px_rgba(0,0,0,0.46)] md:hidden">
          <nav id="mobile-nav" className="mx-auto flex max-w-[1180px] flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={
                  isActive(item.href)
                    ? "rounded-[1.4rem] border border-[rgba(247,243,233,0.18)] bg-[linear-gradient(180deg,_rgba(247,243,233,0.16),_rgba(247,243,233,0.1))] px-4 py-3 text-sm font-medium text-[#FFF8EA] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_18px_rgba(255,248,234,0.08)]"
                    : "rounded-[1.4rem] border border-white/[0.1] bg-white/[0.07] px-4 py-3 text-sm font-medium text-[#F5F5F0] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-white/16 hover:bg-white/11 hover:text-[#FFFCF4] hover:shadow-[0_0_16px_rgba(255,248,234,0.06)]"
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 pt-2">
              <div className="rounded-[1.4rem] border border-white/12 bg-white/[0.06] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <AudioToggle />
              </div>
              <WhatsAppButton
                label="Escribir por WhatsApp"
                message="Hola, quiero mas informacion sobre los lotes en Huaypo."
                className="lux-button-primary w-full px-4 py-3.5 text-center text-sm font-semibold"
              />
              <Link
                href="/agenda-tu-visita"
                onClick={() => setIsOpen(false)}
                className="lux-button-secondary w-full px-4 py-3.5 text-center text-sm font-semibold"
              >
                Agendar visita
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
