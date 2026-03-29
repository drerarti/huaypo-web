import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form-panel";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const visitSteps = [
  {
    title: "Coordinacion simple",
    copy:
      "Escribenos por WhatsApp o deja tus datos en el formulario. El equipo comercial responde y organiza el mejor horario para el recorrido.",
  },
  {
    title: "Visita guiada al proyecto",
    copy:
      "Durante la visita revisamos ubicacion, inventario, cercania al club y sensacion general del proyecto para que tomes una decision con mas contexto.",
  },
  {
    title: "Seguimiento claro",
    copy:
      "Despues del recorrido te compartimos la informacion necesaria para continuar: disponibilidad, opcion de reserva y siguientes pasos.",
  },
];

export default function AgendaTuVisitaPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero agendar una visita a los lotes en Huaypo.",
  );

  return (
    <main className="bg-[#f5f0e8]">
      <PageHero
        eyebrow="Agenda tu visita"
        title="La visita es donde el proyecto termina de cobrar sentido."
        copy="Ver el entorno, caminar los lotes y entender la relacion con el club ayuda a tomar una decision mas segura y mucho mas emocional."
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
          "Visita guiada con lectura del proyecto y del inventario.",
          "Coordinacion simple con el equipo comercial.",
          "Ideal para resolver dudas antes de reservar.",
        ]}
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionTitle
              eyebrow="Recorrido"
              title="Una visita bien guiada hace mas facil imaginar la inversion y el estilo de vida."
              copy="La experiencia de campo importa mucho en un proyecto como este. Por eso la ruta de contacto es clara y el recorrido esta pensado para resolver dudas comerciales de forma natural."
            />
            <div className="mt-10 space-y-5">
              {visitSteps.map((step) => (
                <article
                  key={step.title}
                  className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
                >
                  <h3 className="font-serif text-3xl text-stone-900">{step.title}</h3>
                  <p className="mt-4 leading-8 text-stone-700">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <ContactForm
            formName="agenda-visita"
            source="Agenda tu visita"
            title={`Agenda tu recorrido con ${siteSettings.brand}.`}
            copy="Dejanos tus datos, indicanos si ya viste algun lote de interes y coordinamos una visita guiada contigo."
            intentLabel="Quiero agendar una visita al proyecto"
            submitLabel="Solicitar visita"
            projectName={siteSettings.projectLabel}
          />
        </Container>
      </section>

      <MapSection
        eyebrow="Punto de referencia"
        title="El mapa ayuda a preparar la visita y entender mejor los accesos al proyecto."
        copy="La referencia visual del mapa ayuda a que el traslado se sienta claro desde el primer contacto."
      />
    </main>
  );
}
