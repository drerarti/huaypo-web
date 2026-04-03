import type { Metadata } from "next";
import { CinematicLotCard } from "@/components/cinematic-lot-card";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";
import { siteSettings } from "@/data/site";
import { getAllLots } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `${siteSettings.brand} | Lotes disponibles`,
  description:
    "Explora lotes disponibles en Huaypo con una mirada mas aspiracional, serena y cercana a la visita.",
};

export const revalidate = 300;

export default async function LotesPage() {
  const lots = await getAllLots();
  const availableLots = lots.filter((lot) => lot.status.toLowerCase().includes("dispon")).length;
  const reservedLots = lots.filter((lot) => lot.status.toLowerCase().includes("reserv")).length;
  const soldLots = lots.filter((lot) => lot.status.toLowerCase().includes("vend")).length;
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero revisar disponibilidad de lotes en Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <main className="bg-[#F5F1E8]">
      <PageHero
        eyebrow="Lotes disponibles"
        title="Entre horizonte, silencio y montana, algunos terrenos ya parecen futuro."
        copy="Explora un inventario real de lotes en Huaypo con una lectura mas clara del paisaje, la amplitud y la vida que podria comenzar aqui."
        imageSrc={editorialMedia.lotsHero.src}
        imageAlt={editorialMedia.lotsHero.alt}
        accent="emerald"
        actions={[
          { href: "/agenda-tu-visita", label: "Agendar visita" },
          {
            href: whatsappHref,
            label: "Hablar por WhatsApp",
            variant: "secondary",
            external: true,
          },
        ]}
        highlights={[
          "Lotes para imaginar descanso, refugio y proyeccion.",
          "Estados visibles para decidir con claridad.",
          "Visitas guiadas para conocer el paisaje en persona.",
          "WhatsApp directo para resolver dudas y avanzar rapido.",
        ]}
        aside={
          <div className="w-full max-w-lg space-y-4">
            <EditorialImageCard
              src={editorialMedia.lotsStory.src}
              alt={editorialMedia.lotsStory.alt}
              eyebrow="Inventario disponible"
              title="Tierras abiertas a una vida mas lenta, mas amplia y con mas vision."
              copy="Cada lote propone una relacion distinta con el paisaje: mas horizonte, mas silencio o una cercania especial al club."
              badges={["Inventario real", "Visitas", "WhatsApp"]}
              heightClassName="h-72"
              className="float-slow"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Disponibles", value: String(availableLots) },
                { label: "Reservados", value: String(reservedLots) },
                { label: "Total", value: String(lots.length) },
              ].map((item) => (
                <div key={item.label} className="glass-pill rounded-[1.6rem] px-4 py-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8BC9C]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-serif text-3xl text-[#FAF9F6]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Inventario",
                value: `${lots.length} lotes`,
                copy: "Opciones reales para quienes buscan una entrada serena al proyecto o una ubicacion mas exclusiva.",
              },
              {
                label: "Disponibilidad",
                value: `${availableLots} disponibles`,
                copy: "Una mirada clara sobre lo que puedes visitar hoy y lo que ya empieza a moverse dentro del inventario.",
              },
              {
                label: "Seguimiento",
                value: soldLots > 0 ? `${soldLots} vendidos` : "Visitas activas",
                copy: "El siguiente paso siempre es concreto: resolver dudas, comparar mejor y coordinar una visita.",
              },
            ].map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 90}
                className="lux-card rounded-[2rem] p-7"
              >
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">{item.label}</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-[#0E0E0E]">{item.value}</h2>
                <p className="mt-4 text-[15px] leading-8 text-[#4D4A43]">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="lux-noise bg-[#0E0E0E] py-24 text-[#FAF9F6]">
        <Container>
          <SectionTitle
            eyebrow="Seleccion"
            title="Desde primeras entradas al proyecto hasta sectores de lectura mas exclusiva, cada lote tiene una energia propia."
            copy="Compara areas, etapas y sensaciones del lugar para reconocer cual de estos terrenos acompana mejor tu forma de habitar, descansar o invertir."
            tone="light"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {lots.map((lot) => (
              <CinematicLotCard key={lot.slug} lot={lot} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Siguiente paso"
        title="Si uno de estos lotes ya te llamo, es momento de dejar que el lugar confirme la intuicion."
        copy="La visita permite entender distancias, vistas, orientacion y esa sensacion dificil de nombrar que solo aparece cuando estas ahi."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Quiero visitar"
        secondaryHref={whatsappHref}
        secondaryLabel="Quiero informacion por WhatsApp"
        secondaryExternal
        backgroundImageSrc={editorialMedia.lotsHero.src}
        backgroundImageAlt={editorialMedia.lotsHero.alt}
      />
    </main>
  );
}
