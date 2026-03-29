import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { huaypoStories, siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const lifestyleNotes = [
  {
    title: "Naturaleza que se vuelve parte de la rutina",
    copy:
      "Huaypo transmite aire, amplitud y una relacion mas sana con el tiempo. Esa sensacion es una parte importante del atractivo del proyecto.",
  },
  {
    title: "Tranquilidad con vocacion patrimonial",
    copy:
      "La zona invita al descanso, pero tambien sostiene una lectura de valorizacion e interes creciente para compradores que piensan a mediano y largo plazo.",
  },
];

export default function HuaypoPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero conocer mas sobre vivir en Huaypo y los lotes disponibles.",
  );

  return (
    <main className="bg-[#f5f0e8]">
      <PageHero
        eyebrow="Vivir en Huaypo"
        title="Hay lugares que convencen por datos y otros que convencen apenas llegas. Huaypo hace ambas cosas."
        copy="La propuesta del proyecto se apoya en un entorno que transmite calma, paisaje y proyeccion. Esa mezcla vuelve la compra mas significativa y mucho mas facil de imaginar."
        actions={[
          { href: "/lotes", label: "Ver lotes" },
          {
            href: whatsappHref,
            label: "Hablar por WhatsApp",
            variant: "secondary",
            external: true,
          },
        ]}
        highlights={[
          "Paisaje amplio con lectura emocional inmediata.",
          "Tranquilidad que no se siente aislada del todo.",
          "Una zona que combina escapada, descanso e inversion.",
        ]}
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionTitle
            eyebrow="Entorno"
            title="La narrativa del lugar ayuda a vender el proyecto con mas profundidad y mas verdad."
            copy="Huaypo no entra en la historia del cliente como un punto en el mapa. Entra como una promesa de aire, tiempo mejor aprovechado y una propiedad con sentido."
          />
          <div className="grid gap-5">
            {huaypoStories.map((story) => (
              <article
                key={story.title}
                className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              >
                <h3 className="font-serif text-3xl text-stone-900">{story.title}</h3>
                <p className="mt-4 leading-8 text-stone-700">{story.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#ece4d6] py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {lifestyleNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              >
                <h3 className="font-serif text-3xl text-stone-900">{note.title}</h3>
                <p className="mt-4 leading-8 text-stone-700">{note.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <MapSection
        eyebrow="Accesos"
        title="Ubicacion, recorrido y una lectura geografica clara para que la visita se sienta sencilla."
        copy="La idea de esta seccion es acercar el proyecto, bajar fricciones y ayudar a que el cliente pase del interes a la visita."
      />

      <CtaSection
        eyebrow="Descubre la zona"
        title="Si el estilo de vida en Huaypo resuena contigo, el siguiente paso es visitar los lotes y leer el entorno en persona."
        copy="Podemos coordinar una visita guiada o ayudarte por WhatsApp a identificar que lotes conectan mejor con tu idea de uso o inversion."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Agendar visita"
        secondaryHref={whatsappHref}
        secondaryLabel="Consultar por WhatsApp"
        secondaryExternal
      />
    </main>
  );
}
