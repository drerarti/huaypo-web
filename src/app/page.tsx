import Image from "next/image";
import Link from "next/link";
import { ClubSection } from "@/components/club-section";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { LotCard } from "@/components/lot-card";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import {
  benefits,
  huaypoStories,
  siteSettings,
  testimonials,
} from "@/data/site";
import { getFeaturedLots } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const revalidate = 300;

export default async function Home() {
  const featuredLots = await getFeaturedLots();
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero mas informacion sobre los lotes de Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <main className="bg-[#f5f0e8] text-stone-900">
      <PageHero
        eyebrow={siteSettings.eyebrow}
        title="Lotes en Huaypo y su entorno para quienes quieren invertir con paisaje, laguna y una presentacion verdaderamente premium."
        copy="Corporacion Ayllu Laguna Huaypo reune inventario real y una narrativa comercial elegante para mostrar proyectos con naturaleza, valor y una experiencia de visita mucho mas aspiracional."
        actions={[
          { href: "/lotes", label: "Ver lotes disponibles" },
          {
            href: whatsappHref,
            label: "Hablar por WhatsApp",
            variant: "secondary",
            external: true,
          },
        ]}
        highlights={[
          "Lotes y terrenos con enfoque patrimonial y emocional.",
          "Club como valor diferencial dentro del proyecto.",
          "Visitas guiadas para leer mejor el lugar y el inventario.",
          "Una experiencia comercial pensada para convertir con elegancia.",
        ]}
        aside={
          <div className="w-full max-w-xl rounded-[2.5rem] border border-white/10 bg-[linear-gradient(155deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.25)]">
            <div className="grid gap-4 rounded-[2rem] bg-[linear-gradient(150deg,_#a9834d,_#506046_45%,_#1a2017_95%)] p-5">
              <div className="overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/media/laguna-atardecer.jpg"
                  alt="Laguna Huaypo al atardecer"
                  width={1200}
                  height={900}
                  className="h-64 w-full object-cover"
                  priority
                />
              </div>
              <p className="text-xs uppercase tracking-[0.32em] text-amber-100">
                Proyecto inmobiliario
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-50">
                Una marca de lotes, paisaje y estilo de vida alrededor de Huaypo.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-300">
                    Ubicacion
                  </p>
                  <p className="mt-2 text-lg text-stone-50">Huaypo, Cusco</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-300">
                    Enfoque
                  </p>
                  <p className="mt-2 text-lg text-stone-50">Lotes con lectura premium-natural</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-300">
                    Perfil
                  </p>
                  <p className="mt-2 text-lg text-stone-50">Inversion, descanso y patrimonio</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-300">
                    Contacto
                  </p>
                  <p className="mt-2 text-lg text-stone-50">{siteSettings.whatsappDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-20">
        <Container>
          <SectionTitle
            eyebrow="Proyecto"
            title="La propuesta comercial se apoya en una mezcla muy concreta: tierra, naturaleza, laguna, proyectos con identidad y una experiencia visual de alto nivel."
            copy="No es un portal de avisos. Es una vitrina de marca que presenta lotes reales con una narrativa elegante, cercana y pensada para la conversion."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
                  Propuesta
                </p>
                <h3 className="mt-4 font-serif text-3xl text-stone-900">
                  {benefit.title}
                </h3>
                <p className="mt-4 leading-8 text-stone-700">{benefit.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#ece4d6] py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
            eyebrow="Lotes destacados"
            title="Inventario pensado para mostrar valor, claridad y ganas de visitar."
            copy="Ahora el home toma lotes reales desde Airtable y los presenta con un tono mas editorial, reforzando ubicacion, estatus y estilo de vida."
            />
            <Link
              href="/lotes"
              className="inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-500 hover:bg-white"
            >
              Ver todo el inventario
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredLots.map((lot) => (
              <LotCard key={lot.slug} lot={lot} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionTitle
            eyebrow="Vivir en Huaypo"
            title="El lugar vende tanto como el producto: calma, aire, laguna, paisaje y una forma distinta de imaginar la propiedad."
            copy="Esta es una compra que apela a la razon y tambien a la emocion. El entorno respalda la valorizacion, pero sobre todo crea el deseo de estar ahi."
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

      <ClubSection />

      <MapSection />

      <section className="py-20">
        <Container>
          <SectionTitle
            eyebrow="Confianza"
            title="Una decision como esta se fortalece cuando la propuesta se siente creible, cercana y bien presentada."
            copy="Una voz cercana y una buena presentacion ayudan a que la decision avance con mas seguridad y mas deseo de visitar."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.author}
                className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              >
                <p className="font-serif text-3xl leading-tight text-stone-900">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.32em] text-amber-700">
                  {testimonial.author}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Agenda tu visita"
        title="La mejor forma de entender la propuesta en Huaypo es caminar el lugar, leer el paisaje y mirar los lotes en persona."
        copy="Coordinemos una visita guiada o conversemos por WhatsApp para revisar disponibilidad, ubicacion y opciones segun el tipo de compra que tienes en mente."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Agendar visita"
        secondaryHref={whatsappHref}
        secondaryLabel="Escribir por WhatsApp"
        secondaryExternal
      />
    </main>
  );
}
