import { ContactForm } from "@/components/contact-form-panel";
import { Container } from "@/components/container";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const contactCards = [
  {
    title: "WhatsApp",
    value: siteSettings.whatsappDisplay,
    copy:
      "La via mas rapida para revisar disponibilidad, coordinar visita y resolver dudas comerciales.",
  },
  {
    title: "Correo",
    value: siteSettings.email,
    copy:
      "Ideal para seguimiento, informacion mas detallada y consultas posteriores a una visita.",
  },
  {
    title: "Ubicacion",
    value: siteSettings.address,
    copy:
      "La referencia geografica del proyecto ayuda a bajar fricciones y hacer mas concreta la decision de visitar.",
  },
];

export default function ContactoPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero ponerme en contacto con Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <main className="bg-[#f5f0e8]">
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre disponibilidad, visita, ubicacion o el lote que mejor encaja contigo."
        copy="El equipo comercial esta listo para orientarte, compartir informacion y ayudarte a elegir la mejor forma de conocer el proyecto."
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
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {contactCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
                  {card.title}
                </p>
                <h2 className="mt-4 font-serif text-3xl text-stone-900">{card.value}</h2>
                <p className="mt-4 leading-8 text-stone-700">{card.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <ContactForm
            formName="contacto-general"
            source="Contacto general"
            title="Dejanos tus datos y te contactamos."
            copy="Cuentanos que tipo de lote te interesa o si prefieres coordinar una visita. Te responderemos con informacion clara y siguiente paso."
            submitLabel="Enviar consulta"
            projectName={siteSettings.projectLabel}
          />
        </Container>
      </section>

      <MapSection
        eyebrow="Como llegar"
        title="Ubicacion, acceso y un punto de referencia claro para el siguiente paso."
        copy="Si prefieres avanzar en persona, el mapa y el equipo comercial te ayudan a aterrizar rapido la visita."
      />
    </main>
  );
}
