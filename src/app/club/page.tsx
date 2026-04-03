import type { Metadata } from "next";
import { ClubSection } from "@/components/club-section";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `${siteSettings.brand} | Club y estilo de vida`,
  description:
    "Conoce el club de Alpinas Huaypo y el estilo de vida que eleva la propuesta del proyecto inmobiliario.",
};

const amenityStories = [
  {
    title: "Tardes que se alargan sin prisa",
    copy:
      "El calor del fuego, la conversa sin reloj y el paisaje abierto hacen que cada encuentro se sienta mas intimo y mas valioso.",
  },
  {
    title: "Pertenecer tambien es habitar",
    copy:
      "La comunidad le da continuidad al proyecto. No se trata solo de tener tierra, sino de sentir que ya existe una vida esperandote aqui.",
  },
  {
    title: "Bienestar con paisaje",
    copy:
      "Madera, piedra, aire libre y calma construyen una experiencia elegante, natural y profundamente recordable.",
  },
];

export default function ClubPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero conocer mas sobre el club y el estilo de vida en Huaypo.",
  );

  return (
    <main className="bg-[#F5F1E8]">
      <PageHero
        eyebrow="Club"
        title="El club convierte el paisaje en encuentro, pertenencia y memoria."
        copy="Aqui la tierra no termina en el lote. Se expande hacia tardes compartidas, fuego suave, sobremesas largas y una sensacion clara de bienestar."
        imageSrc={editorialMedia.clubHero.src}
        imageAlt={editorialMedia.clubHero.alt}
        accent="emerald"
        actions={[
          { href: "/agenda-tu-visita", label: "Agendar visita" },
          {
            href: whatsappHref,
            label: "Consultar por WhatsApp",
            variant: "secondary",
            external: true,
          },
        ]}
        highlights={[
          "Encuentros que vuelven el proyecto mas vivo y deseable.",
          "Una vida social serena, rodeada de paisaje.",
          "Bienestar y pertenencia como parte real del valor.",
        ]}
        aside={
          <div className="w-full max-w-lg">
            <EditorialImageCard
              src={editorialMedia.clubStory.src}
              alt={editorialMedia.clubStory.alt}
              eyebrow="Vida de club"
              title="Un refugio social donde la altura, la madera y la calma acompanan cada encuentro."
              copy="La decision se vuelve mas profunda cuando el proyecto ya tiene una atmosfera que se puede vivir antes de construir."
              badges={["Lounge", "Paisaje", "Comunidad"]}
              heightClassName="h-80"
            />
          </div>
        }
      />

      <ClubSection />

      <section className="lux-noise bg-[#0E0E0E] py-24 text-[#FAF9F6]">
        <Container>
          <SectionTitle
            eyebrow="Amenidades"
            title="Hay espacios que se recorren. Y hay espacios que cambian la forma de imaginarse dentro del proyecto."
            copy="Las amenidades no solo acompanan la experiencia: la vuelven mas intima, mas calida y mucho mas facil de desear."
            tone="light"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenityStories.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 100}
                className="lux-card-dark lux-outline rounded-[2rem] p-7"
              >
                <h3 className="font-serif text-3xl text-[#FAF9F6]">{item.title}</h3>
                <p className="mt-4 leading-8 text-[#DDD7C8]">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Coordina tu recorrido"
        title="Ven a sentir como el club y el paisaje se vuelven una sola experiencia."
        copy="Coordina una visita guiada y descubre por que este lugar se recuerda mas por la atmosfera que deja que por cualquier promesa escrita."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Agendar visita"
        secondaryHref={whatsappHref}
        secondaryLabel="Hablar por WhatsApp"
        secondaryExternal
        backgroundImageSrc={editorialMedia.clubHero.src}
        backgroundImageAlt={editorialMedia.clubHero.alt}
      />
    </main>
  );
}
