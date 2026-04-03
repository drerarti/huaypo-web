import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

type CtaSectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryExternal?: boolean;
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
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
  backgroundImageSrc,
  backgroundImageAlt = "Paisaje de Huaypo",
}: CtaSectionProps) {
  return (
    <section className="lux-noise relative overflow-hidden bg-[#06110E] py-24 text-[#F7F3E9]">
      {backgroundImageSrc ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-32"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(208,192,143,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(25,69,53,0.34),_transparent_34%),linear-gradient(180deg,_rgba(4,16,15,0.5),_rgba(4,16,15,0.88))]" />
      <Container>
        <Reveal className="lux-card-dark lux-outline relative rounded-[2.5rem] px-8 py-10 md:px-12 md:py-14">
          <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,_transparent,_rgba(208,192,143,0.58),_transparent)]" />
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#D7C398] sm:text-[11px] sm:tracking-[0.42em]">
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-4xl break-words font-serif text-[2.35rem] leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#DDD7C8] md:text-lg md:leading-8">
            {copy}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={primaryHref}
              className="lux-button-primary w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto"
            >
              {primaryLabel}
            </Link>
            {secondaryExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-button-secondary w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="lux-button-secondary w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
