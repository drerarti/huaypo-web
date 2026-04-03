import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form-panel";
import { Container } from "@/components/container";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { editorialMedia } from "@/data/editorial-media";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `${siteSettings.brand} | Contacto`,
  description:
    "Contacta a Corporacion Ayllu Laguna Huaypo por WhatsApp, correo o formulario y coordina tu siguiente paso.",
};

const contactCards = [
  {
    title: "WhatsApp",
    value: siteSettings.whatsappDisplay,
    copy:
      "La via mas directa para resolver disponibilidad, coordinar una visita y empezar la conversacion correcta.",
  },
  {
    title: "Correo",
    value: siteSettings.email,
    copy:
      "Ideal si quieres recibir informacion mas detallada o continuar la conversacion despues de una visita.",
  },
  {
    title: "Ubicacion",
    value: siteSettings.address,
    copy:
      "La referencia geografica acerca la decision y vuelve mas concreto el momento de conocer el proyecto en persona.",
  },
];

export default function ContactoPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero ponerme en contacto con Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <main className="bg-[#F5F1E8]">
      <PageHero
        eyebrow="Contacto"
        title="Cuando un lugar empieza a llamarte, una conversacion basta para acercarlo."
        copy="Escribenos por WhatsApp, dejanos tus datos o coordina una visita. Estamos aqui para ayudarte a leer el proyecto con calma, claridad y deseo real."
        imageSrc={editorialMedia.contactoHero.src}
        imageAlt={editorialMedia.contactoHero.alt}
        accent="emerald"
        actions={[
          {
            href: whatsappHref,
            label: "Escribir por WhatsApp",
            external: true,
          },
          {
            href: "/agenda-tu-visita",
            label: "Agendar visita",
            variant: "secondary",
          },
        ]}
        highlights={[
          "Respuesta directa para disponibilidad y visitas.",
          "Orientacion serena y acompanamiento comercial.",
          "Un contacto claro desde cualquier dispositivo.",
        ]}
        aside={
          <div className="w-full max-w-lg">
            <EditorialImageCard
              src={editorialMedia.contactoStory.src}
              alt={editorialMedia.contactoStory.alt}
              eyebrow="Asesoria comercial"
              title="Una conversacion bien guiada puede acercarte mas rapido al paisaje correcto."
              copy="Te ayudamos a revisar disponibilidad, vistas, etapas y la mejor forma de conocer el proyecto sin vueltas innecesarias."
              badges={["WhatsApp", "Correo", "Visita"]}
              heightClassName="h-80"
            />
          </div>
        }
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {contactCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 90}
                className="lux-card min-w-0 rounded-[2rem] p-6 sm:p-7"
              >
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">
                  {card.title}
                </p>
                <h2
                  className={`mt-4 font-serif leading-tight text-[#0E0E0E] ${
                    card.title === "Correo"
                      ? "break-all text-[1.6rem] sm:text-[2.05rem]"
                      : "break-words text-[2rem] sm:text-3xl"
                  }`}
                >
                  {card.value}
                </h2>
                <p className="mt-4 leading-8 text-[#4D4A43]">{card.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <ContactForm
            formName="contacto-general"
            source="Contacto general"
            title="Dejanos tus datos y conversemos."
            copy="Cuentanos que tipo de lote te interesa o si prefieres coordinar una visita. Te responderemos con claridad y con el siguiente paso mas natural para ti."
            submitLabel="Enviar consulta"
            projectName={siteSettings.projectLabel}
          />
        </Container>
      </section>

      <MapSection
        eyebrow="Como llegar"
        title="Ubicacion, acceso y una referencia clara para que la visita se sienta cercana."
        copy="Si prefieres avanzar en persona, el mapa y el equipo comercial te ayudan a volver simple el siguiente movimiento."
      />
    </main>
  );
}
