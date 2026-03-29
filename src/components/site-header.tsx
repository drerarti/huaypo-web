"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteSettings } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/lotes", label: "Lotes" },
  { href: "/huaypo", label: "Vivir en Huaypo" },
  { href: "/club", label: "Club" },
  { href: "/agenda-tu-visita", label: "Agenda tu visita" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(24,27,20,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.28em] text-stone-300 md:text-xs md:tracking-[0.35em]">
            <span className="md:hidden">{siteSettings.brandCompact}</span>
            <span className="hidden md:inline">{siteSettings.brand}</span>
          </span>
          <span className="font-serif text-lg text-stone-50 sm:text-xl md:text-2xl">
            {siteSettings.projectLabel}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-stone-200 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "whitespace-nowrap text-white"
                  : "whitespace-nowrap transition hover:text-white"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <WhatsAppButton
            label="WhatsApp"
            message="Hola, quiero mas informacion sobre los lotes en Huaypo."
            className="hidden rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-white/25 hover:bg-white/5 sm:inline-flex"
          />
          <Link
            href="/agenda-tu-visita"
            className="hidden rounded-full border border-amber-300/60 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-200/10 md:inline-flex"
          >
            Agenda una visita
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-stone-100 transition hover:border-white/25 hover:bg-white/5 md:hidden"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
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
        <div className="border-t border-white/10 bg-[#171b14] px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={
                  pathname === item.href
                    ? "rounded-2xl bg-white/8 px-4 py-3 text-sm font-medium text-white"
                    : "rounded-2xl px-4 py-3 text-sm font-medium text-stone-200 transition hover:bg-white/5 hover:text-white"
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-3 pt-2">
              <WhatsAppButton
                label="Escribir por WhatsApp"
                message="Hola, quiero mas informacion sobre los lotes en Huaypo."
                className="rounded-full bg-amber-300 px-4 py-3 text-center text-sm font-semibold text-stone-900"
              />
              <Link
                href="/agenda-tu-visita"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/12 px-4 py-3 text-center text-sm font-semibold text-stone-100"
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
