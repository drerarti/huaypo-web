import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";

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
};

function ActionLink({ action }: { action: Action }) {
  const className =
    action.variant === "secondary"
      ? "rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-stone-50 transition hover:border-white/40 hover:bg-white/5"
      : "rounded-full bg-amber-300 px-5 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-amber-200";

  if (action.external) {
    return (
      <a href={action.href} className={className} target="_blank" rel="noreferrer">
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
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#171b14] text-stone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(180,145,88,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(112,132,87,0.2),_transparent_30%),linear-gradient(145deg,_rgba(17,19,14,0.95),_rgba(17,19,14,0.7))]" />
      <Container
        className={`relative grid gap-10 py-16 sm:gap-12 sm:py-20 md:py-28 ${
          aside ? "md:grid-cols-[1.1fr_0.9fr]" : ""
        }`}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.38em] text-amber-200">{eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 md:text-lg md:leading-8">
            {copy}
          </p>
          {actions ? (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {actions.map((action) => (
                <ActionLink key={`${action.href}-${action.label}`} action={action} />
              ))}
            </div>
          ) : null}
          {highlights ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-stone-200 backdrop-blur-sm"
                >
                  {highlight}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {aside ? <div className="flex items-center justify-center">{aside}</div> : null}
      </Container>
    </section>
  );
}
