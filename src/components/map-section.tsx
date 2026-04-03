"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { locationHighlights, siteLocations } from "@/data/site";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";

type MapSectionProps = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  dark?: boolean;
};

export function MapSection({
  eyebrow = "Ubicacion",
  title = "Una visita a Huaypo ayuda a entender por que el proyecto se siente distinto.",
  copy = "El mapa orienta. La visita termina de revelar la escala del paisaje, la serenidad del entorno y el lugar exacto donde todo empieza a sentirse real.",
  dark = false,
}: MapSectionProps) {
  const [activeKey, setActiveKey] = useState(siteLocations[0]?.key ?? "virgilio");
  const activeLocation =
    siteLocations.find((location) => location.key === activeKey) ?? siteLocations[0];

  return (
    <section
      className={
        dark
          ? "lux-noise bg-[#06110E] py-24 text-[#F7F3E9]"
          : "bg-[#ECE4D6] py-24 text-[#0E0E0E]"
      }
    >
      <Container>
        <SectionTitle eyebrow={eyebrow} title={title} copy={copy} tone={dark ? "light" : "dark"} />
        <div className="mt-10 flex flex-wrap gap-3">
          {siteLocations.map((location) => (
            <button
              key={location.key}
              type="button"
              onClick={() => setActiveKey(location.key)}
              className={
                activeKey === location.key
                  ? dark
                    ? "rounded-full border border-[#C6A96B]/45 bg-[#FAF9F6]/10 px-4 py-2.5 text-sm font-semibold text-[#FAF9F6]"
                    : "rounded-full bg-[#0E0E0E] px-4 py-2.5 text-sm font-semibold text-[#FAF9F6]"
                  : dark
                    ? "rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-[#D8D1C0] transition hover:border-[#C6A96B]/45 hover:bg-white/5"
                    : "rounded-full border border-[#CFC4B2] bg-[#FBF8F1] px-4 py-2.5 text-sm font-semibold text-[#2E2B26] transition hover:border-[#A18D66] hover:bg-white"
              }
            >
              {location.name}
            </button>
          ))}
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal
            className={
              dark
                ? "lux-card-dark lux-outline overflow-hidden rounded-[2.4rem] p-3"
                : "lux-card overflow-hidden rounded-[2.4rem] p-3"
            }
          >
            <div className="overflow-hidden rounded-[2rem]">
              <iframe
                title={`Mapa de ${activeLocation.name}`}
                src={activeLocation.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[340px] w-full border-0 sm:min-h-[460px]"
              />
            </div>
          </Reveal>
          <div className="space-y-5">
            <Reveal
              delay={60}
              className={
                dark
                  ? "lux-card-dark lux-outline rounded-[2rem] p-7"
                  : "lux-card rounded-[2rem] p-7"
              }
            >
              <p
                className={
                  dark
                    ? "text-[10px] uppercase tracking-[0.22em] text-[#D8C69E] sm:text-[11px] sm:tracking-[0.34em]"
                    : "text-[10px] uppercase tracking-[0.22em] text-[#8E6E35] sm:text-[11px] sm:tracking-[0.34em]"
                }
              >
                Referencia activa
              </p>
              <h3
                className={
                  dark
                    ? "mt-4 break-words font-serif text-[2.2rem] leading-tight text-[#FAF9F6] sm:text-4xl"
                    : "mt-4 break-words font-serif text-[2.2rem] leading-tight text-[#0E0E0E] sm:text-4xl"
                }
              >
                {activeLocation.name}
              </h3>
              <p className={dark ? "mt-4 leading-8 text-[#DDD7C8]" : "mt-4 leading-8 text-[#4D4A43]"}>
                {activeLocation.copy}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={activeLocation.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-button-primary inline-flex px-5 py-3.5 text-sm font-semibold"
                >
                  Abrir ubicacion
                </a>
                <Link
                  href="/agenda-tu-visita"
                  className={`inline-flex px-5 py-3.5 text-sm font-semibold ${
                    dark ? "lux-button-secondary" : "lux-button-secondary-light"
                  }`}
                >
                  Agendar visita
                </Link>
              </div>
            </Reveal>
            {locationHighlights.map((item) => (
              <Reveal
                key={item.title}
                className={
                  dark
                    ? "lux-card-dark lux-outline rounded-[1.85rem] p-6"
                    : "lux-card rounded-[1.85rem] p-6"
                }
              >
                <h3
                  className={
                    dark
                      ? "break-words font-serif text-[2rem] text-[#FAF9F6] sm:text-3xl"
                      : "break-words font-serif text-[2rem] text-[#0E0E0E] sm:text-3xl"
                  }
                >
                  {item.title}
                </h3>
                <p className={dark ? "mt-4 leading-8 text-[#DDD7C8]" : "mt-4 leading-8 text-[#4D4A43]"}>
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
