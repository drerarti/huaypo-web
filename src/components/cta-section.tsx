import Link from "next/link";
import { Container } from "@/components/container";

type CtaSectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryExternal?: boolean;
};

export function CtaSection({
  eyebrow,
  title,
  copy,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  secondaryExternal,
}: CtaSectionProps) {
  return (
    <section className="bg-[#171b14] py-20 text-stone-50">
      <Container>
        <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.2)] md:px-12 md:py-14">
          <p className="text-xs uppercase tracking-[0.38em] text-amber-200">{eyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 md:text-lg md:leading-8">
            {copy}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-amber-200"
            >
              {primaryLabel}
            </Link>
            {secondaryExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-stone-50 transition hover:border-white/35 hover:bg-white/5"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-stone-50 transition hover:border-white/35 hover:bg-white/5"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
