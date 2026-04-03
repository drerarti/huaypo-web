import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form-panel";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `${siteSettings.brand} | Agenda tu visita`,
  description:
    "Agenda una visita guiada a Alpinas Huaypo y coordina tu recorrido con el equipo comercial.",
};

const visitSteps = [
  {
    title: "La decision empieza con una conversacion breve",
    copy:
      "Escribenos por WhatsApp o dejanos tus datos. El equipo comercial te orienta y encuentra el mejor momento para vivir el recorrido con calma.",
  },
  {
    title: "El paisaje termina de contar la historia",
    copy:
      "Durante la visita se ordenan las distancias, la vista, la cercania al club y esa sensacion del lugar que ninguna ficha puede reemplazar.",
  },
  {
    title: "Luego llega la claridad para elegir",
    copy:
      "Despues del recorrido revisamos disponibilidad, opciones de reserva y el lote que mas dialoga con tu idea de vida o inversion.",
  },
];

export default function AgendaTuVisitaPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero agendar una visita a los lotes en Huaypo.",
  );

  return (
    <main className="bg-[#F5F1E8]">
      <PageHero
        eyebrow="Agenda tu visita"
        title="La visita no confirma un lote: revela si este paisaje quiere quedarse contigo."
        copy="Caminar Huaypo, mirar la laguna de cerca y entender la escala real del proyecto cambia por completo la decision."
        imageSrc={editorialMedia.agendaHero.src}
        imageAlt={editorialMedia.agendaHero.alt}
        accent="forest"
        actions={[
          {
            href: whatsappHref,
            label: "Coordinar por WhatsApp",
            external: true,
          },
          {
            href: "/lotes",
            label: "Ver lotes antes de ir",
            variant: "secondary",
          },
        ]}
        highlights={[
          "Visita guiada con lectura del paisaje y del proyecto.",
          "Coordinacion simple y respuesta rapida por WhatsApp.",
          "Una experiencia serena desde el primer contacto.",
        ]}
        aside={
          <div className="w-full max-w-lg">
            <EditorialImageCard
              src={editorialMedia.agendaStory.src}
              alt={editorialMedia.agendaStory.alt}
              eyebrow="Recorrido guiado"
              title="Hay decisiones que solo maduran cuando el terreno se recorre con los propios ojos."
              copy="La visita permite reconocer vistas, silencios, accesos y la relacion real entre cada lote, el club y el resto del paisaje."
              badges={["Visita privada", "Recorrido", "Orientacion"]}
              heightClassName="h-80"
            />
          </div>
        }
      />

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionTitle
              eyebrow="Recorrido"
              title="Una visita bien guiada vuelve mas simple imaginar la inversion, el descanso y la vida que podria abrirse aqui."
              copy="Ver el entorno en persona permite que la intuicion y la claridad aparezcan juntas. Por eso este paso importa tanto."
            />
            <div className="mt-10 space-y-5">
              {visitSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={index * 90}
                  className="lux-card rounded-[2rem] p-7"
                >
                  <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">
                    Paso 0{index + 1}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl text-[#0E0E0E]">{step.title}</h3>
                  <p className="mt-4 leading-8 text-[#4D4A43]">{step.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <Reveal className="lux-card-dark lux-outline rounded-[2.2rem] p-8 text-[#FAF9F6]">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">Confianza comercial</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#FAF9F6]">
                Coordinamos la visita contigo para que el lugar se revele sin apuro, con contexto y con la guia correcta.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#DDD7C8]">
                Si ya tienes un lote en mente o prefieres una mirada mas abierta, el equipo comercial te acompana a elegir el mejor recorrido y el mejor momento para venir.
              </p>
            </Reveal>

            <ContactForm
              formName="agenda-visita"
              source="Agenda tu visita"
              title={`Agenda tu recorrido con ${siteSettings.brand}.`}
              copy="Dejanos tus datos, cuentanos si ya viste un lote que te interese y coordinamos una visita con el ritmo, la privacidad y el contexto adecuados."
              intentLabel="Quiero agendar una visita al proyecto"
              submitLabel="Solicitar visita"
              projectName={siteSettings.projectLabel}
            />
          </div>
        </Container>
      </section>

      <MapSection
        eyebrow="Punto de referencia"
        title="El mapa despeja el camino. La visita le da profundidad a la decision."
        copy="Con la referencia clara, el recorrido se vuelve simple. Lo importante sucede cuando el paisaje aparece frente a ti."
      />
    </main>
  );
}
