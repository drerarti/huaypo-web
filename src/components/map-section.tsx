"use client";

import { useState } from "react";
import { locationHighlights, siteLocations } from "@/data/site";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";

type MapSectionProps = {
  eyebrow?: string;
  title?: string;
  copy?: string;
};

export function MapSection({
  eyebrow = "Ubicacion",
  title = "Una visita a Huaypo ayuda a entender por que el proyecto se siente distinto.",
  copy = "La experiencia del lugar forma parte esencial de la decision. Por eso la web prioriza el mapa, los accesos y la coordinacion rapida de visitas.",
}: MapSectionProps) {
  const [activeKey, setActiveKey] = useState(siteLocations[0]?.key ?? "virgilio");
  const activeLocation =
    siteLocations.find((location) => location.key === activeKey) ?? siteLocations[0];

  return (
    <section className="bg-[#ece4d6] py-20">
      <Container>
        <SectionTitle eyebrow={eyebrow} title={title} copy={copy} />
        <div className="mt-10 flex flex-wrap gap-3">
          {siteLocations.map((location) => (
            <button
              key={location.key}
              type="button"
              onClick={() => setActiveKey(location.key)}
              className={
                activeKey === location.key
                  ? "rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-stone-50"
                  : "rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-500 hover:bg-white"
              }
            >
              {location.name}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_50px_rgba(31,24,15,0.08)]">
            <iframe
              title={`Mapa de ${activeLocation.name}`}
              src={activeLocation.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full border-0 sm:min-h-[420px]"
            />
          </div>
          <div className="space-y-5">
            <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(31,24,15,0.06)]">
              <p className="text-xs uppercase tracking-[0.32em] text-amber-700">Referencia activa</p>
              <h3 className="mt-4 font-serif text-3xl text-stone-900">{activeLocation.name}</h3>
              <p className="mt-4 leading-8 text-stone-700">{activeLocation.copy}</p>
              <a
                href={activeLocation.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
              >
                Abrir ubicacion
              </a>
            </article>
            {locationHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(31,24,15,0.06)]"
              >
                <h3 className="font-serif text-3xl text-stone-900">{item.title}</h3>
                <p className="mt-4 leading-8 text-stone-700">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
