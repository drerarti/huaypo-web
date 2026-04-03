import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";
import { huaypoStories, siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `${siteSettings.brand} | Vivir en Huaypo`,
  description:
    "Descubre la experiencia de vivir e invertir en Huaypo con una mirada serena, natural y aspiracional.",
};

const lifestyleNotes = [
  {
    title: "Luz que cambia la manera de quedarse",
    copy:
      "La manana abre con horizonte. La tarde cae con una serenidad que vuelve mas profunda la idea de tener un lugar propio aqui.",
  },
  {
    title: "Valor que madura con el paisaje",
    copy:
      "La tranquilidad seduce hoy. La proyeccion patrimonial aparece despues, como una consecuencia natural de haber elegido bien el territorio.",
  },
];

export default function HuaypoPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero conocer mas sobre vivir en Huaypo y los lotes disponibles.",
  );

  return (
    <main className="bg-[#F5F1E8]">
      <PageHero
        eyebrow="Vivir en Huaypo"
        title="Entre horizonte, silencio y montana, el futuro toma otra forma."
        copy="Huaypo tiene algo dificil de fingir: una calma amplia, silenciosa y luminosa que vuelve mas clara la idea de vivir, invertir y volver."
        imageSrc={editorialMedia.huaypoHero.src}
        imageAlt="Atmósfera natural de Huaypo"
        accent="forest"
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
          "Un paisaje que devuelve aire y perspectiva.",
          "Silencio, distancia del ruido y cercania a lo esencial.",
          "Una inversion que tambien se disfruta.",
        ]}
        aside={
          <div className="w-full max-w-lg space-y-4">
            <EditorialImageCard
              src={editorialMedia.huaypoStory.src}
              alt={editorialMedia.huaypoStory.alt}
              eyebrow="Sensacion del lugar"
              title="El terreno cambia de valor cuando el entorno tambien transforma tu manera de estar."
              copy="No se trata solo de mirar la laguna o la montana. Se trata de sentir que el paisaje te devuelve una version mas calma de ti mismo."
              badges={["Laguna", "Altura", "Pausa"]}
              heightClassName="h-80"
            />
          </div>
        }
      />

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <EditorialImageCard
              src={editorialMedia.homeStory.src}
              alt={editorialMedia.homeStory.alt}
              eyebrow="Entorno"
              title="Un territorio pensado para desconectarte del ruido y acercarte a lo esencial."
              copy="Entre madera, cielo y relieve, la idea de una casa de descanso deja de ser lejana y empieza a tomar forma."
              badges={["Refugio", "Horizonte", "Vida pausada"]}
              heightClassName="min-h-[28rem] h-full"
            />
          </Reveal>

          <div className="space-y-5">
            <SectionTitle
              eyebrow="Narrativa"
              title="No es un punto en el mapa. Es una forma distinta de llegar a lo esencial."
              copy="Huaypo entra en la historia de quien lo conoce como una promesa de aire, tiempo mejor vivido y una propiedad que se siente coherente con lo que anhela."
            />
            {huaypoStories.map((story, index) => (
              <Reveal
                key={story.title}
                delay={index * 90}
                className="lux-card rounded-[2rem] p-7"
              >
                <h3 className="font-serif text-3xl text-[#0E0E0E]">{story.title}</h3>
                <p className="mt-4 leading-8 text-[#4D4A43]">{story.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="lux-noise bg-[#0E0E0E] py-24 text-[#FAF9F6]">
        <Container>
          <SectionTitle
            eyebrow="Calidad de vida"
            title="Entre laguna, montana y silencio, la vida encuentra una escala mas honda."
            copy="Aqui el descanso no se siente forzado. Surge solo, como surge la certeza de estar frente a un lugar con alma y futuro."
            tone="light"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {lifestyleNotes.map((note, index) => (
              <Reveal
                key={note.title}
                delay={index * 100}
                className="lux-card-dark lux-outline rounded-[2rem] p-8"
              >
                <h3 className="font-serif text-3xl text-[#FAF9F6]">{note.title}</h3>
                <p className="mt-4 leading-8 text-[#DDD7C8]">{note.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <MapSection
        eyebrow="Accesos"
        title="El recorrido hacia Huaypo ya empieza a cambiar el ritmo de la mirada."
        copy="Las referencias del mapa ayudan a acercar el lugar. La visita termina de revelar su verdadera escala, su silencio y su belleza."
      />

      <CtaSection
        eyebrow="Descubre la zona"
        title="Si Huaypo ya empezo a resonar contigo, el siguiente paso es recorrerlo con el cuerpo."
        copy="Coordinemos una visita guiada para que descubras que lote, que vista y que atmosfera dialogan mejor con tu manera de vivir."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Agendar visita"
        secondaryHref={whatsappHref}
        secondaryLabel="Consultar por WhatsApp"
        secondaryExternal
        backgroundImageSrc={editorialMedia.huaypoHero.src}
        backgroundImageAlt="Paisaje de Huaypo cubierto por neblina"
      />
    </main>
  );
}
