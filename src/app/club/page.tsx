import { ClubSection } from "@/components/club-section";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const amenityStories = [
  {
    title: "Un punto de encuentro que suma valor emocional",
    copy:
      "El club permite presentar el proyecto como una experiencia mas rica y compartida. No se trata solo de comprar tierra, sino de acceder a una vida con momentos y lugares que ya existen.",
  },
  {
    title: "Marca, pertenencia y conversacion comercial",
    copy:
      "Cuando el cliente percibe club, comunidad y continuidad de uso, entiende mejor la propuesta y la decision se mueve de la comparacion fria a una preferencia clara.",
  },
  {
    title: "Una experiencia premium-natural",
    copy:
      "La combinacion entre entorno natural y amenidades sociales crea una narrativa elegante, calida y distinta a la del clasificado inmobiliario tradicional.",
  },
];

export default function ClubPage() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero conocer mas sobre el club y el estilo de vida en Huaypo.",
  );

  return (
    <main className="bg-[#f5f0e8]">
      <PageHero
        eyebrow="Club"
        title="El club convierte el proyecto en una experiencia de pertenencia, encuentro y disfrute real."
        copy="En Corporacion Ayllu Laguna Huaypo, el club no se siente como un extra. Es parte de la razon por la que el proyecto se vuelve mas deseable, mas creible y mas memorable."
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
          "Espacios sociales y recreativos como valor diferencial.",
          "Comunidad y vida compartida en un entorno natural.",
          "Un relato de marca que eleva la percepcion del proyecto.",
        ]}
        aside={
          <div className="w-full max-w-lg rounded-[2.2rem] border border-white/10 bg-[linear-gradient(150deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] p-6">
            <div className="rounded-[1.8rem] bg-[linear-gradient(145deg,_#283325,_#506046_52%,_#8d7147)] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-100">
                Vida de club
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-50">
                Una razon poderosa para elegir el proyecto desde la emocion y no solo desde el precio.
              </h2>
            </div>
          </div>
        }
      />

      <ClubSection />

      <section className="bg-[#ece4d6] py-20">
        <Container>
          <SectionTitle
            eyebrow="Amenidades"
            title="El club refuerza la promesa de estilo de vida que la web necesita comunicar con claridad."
            copy="Las amenidades funcionan como espacios de uso, pero tambien como argumentos comerciales que ayudan a entender el proyecto como una experiencia mas completa."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenityStories.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              >
                <h3 className="font-serif text-3xl text-stone-900">{item.title}</h3>
                <p className="mt-4 leading-8 text-stone-700">{item.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Coordina tu recorrido"
        title="Visitar el proyecto y vivir el ambiente del club ayuda a tomar una decision mucho mas clara."
        copy="Podemos coordinar una visita guiada para que conozcas lotes, entorno, accesos y el valor real que suma el club a la propuesta."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Agendar visita"
        secondaryHref={whatsappHref}
        secondaryLabel="Hablar por WhatsApp"
        secondaryExternal
      />
    </main>
  );
}
