import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { HeroBackground } from "@/components/hero-background";
import { Reveal } from "@/components/reveal";

type Action = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  actions?: Action[];
  highlights?: string[];
  aside?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  accent?: "forest" | "emerald";
  fullHeight?: boolean;
};

function ActionLink({ action }: { action: Action }) {
  const className =
    action.variant === "secondary"
      ? "lux-button-secondary w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto"
      : "lux-button-primary w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto";

  if (action.external) {
    return (
      <a href={action.href} className={className} target="_blank" rel="noopener noreferrer">
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  actions,
  highlights,
  aside,
  imageSrc,
  imageAlt,
  accent = "forest",
  fullHeight = false,
}: PageHeroProps) {
  return (
    <section
      className={`lux-noise relative overflow-hidden bg-[#06110E] text-[#F7F3E9] ${
        fullHeight ? "min-h-[100svh]" : ""
      }`}
    >
      <HeroBackground imageSrc={imageSrc} imageAlt={imageAlt} accent={accent} />
      <Container
        className={`relative grid gap-12 py-20 sm:gap-14 sm:py-24 lg:py-28 ${
          fullHeight ? "min-h-[100svh] items-center" : ""
        } ${
          aside ? "lg:grid-cols-[1.02fr_0.98fr]" : ""
        }`}
      >
        <Reveal className="max-w-4xl">
          <div className="inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-[rgba(247,243,233,0.14)] bg-[rgba(247,243,233,0.05)] px-4 py-2 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D1C197] shadow-[0_0_24px_rgba(208,192,143,0.72)]" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#D8D0BD] sm:text-[11px] sm:tracking-[0.44em]">
              {eyebrow}
            </p>
          </div>
          <h1 className="mt-8 max-w-5xl break-words font-serif text-[2.85rem] leading-[0.94] tracking-[-0.04em] text-[#F7F3E9] sm:text-[4.1rem] md:text-[5.9rem] lg:text-[7rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#E2DACA] md:text-lg md:leading-8">
            {copy}
          </p>
          {actions ? (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {actions.map((action) => (
                <ActionLink key={`${action.href}-${action.label}`} action={action} />
              ))}
            </div>
          ) : null}
          {highlights ? (
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <Reveal
                  key={highlight}
                  delay={index * 80}
                  className="glass-pill min-w-0 rounded-[1.8rem] border border-[rgba(247,243,233,0.14)] px-4 py-4 text-sm leading-7 text-[#F0E8D7] sm:px-5"
                >
                  <span className="mr-3 text-[#D1C197]">0{index + 1}</span>
                  {highlight}
                </Reveal>
              ))}
            </div>
          ) : null}

          {fullHeight ? (
            <Reveal delay={220} className="mt-12 flex items-center gap-4 text-[#D8D0BD]">
              <div className="relative flex h-12 w-7 items-start justify-center rounded-full border border-[rgba(247,243,233,0.18)] bg-[rgba(247,243,233,0.03)]">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#D1C197] shadow-[0_0_16px_rgba(208,192,143,0.55)] animate-[hero-scroll_2.2s_ease-in-out_infinite]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#D8D0BD] sm:text-[11px] sm:tracking-[0.42em]">
                Explora el proyecto
              </p>
            </Reveal>
          ) : null}
        </Reveal>
        {aside ? (
          <Reveal delay={140} className="flex items-center justify-center lg:justify-end">
            {aside}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
