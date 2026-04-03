import type { Metadata } from "next";
import Link from "next/link";
import { ClubSection } from "@/components/club-section";
import { CinematicLotCard } from "@/components/cinematic-lot-card";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { MapSection } from "@/components/map-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";
import { benefits, huaypoStories, siteSettings, testimonials } from "@/data/site";
import { getFeaturedLots } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `${siteSettings.brand} | Lotes premium en Huaypo`,
  description:
    "Lotes, club y paisaje en Huaypo para quienes buscan invertir en una vida mas serena y con sentido.",
};

export const revalidate = 300;

export default async function Home() {
  const featuredLots = await getFeaturedLots();
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero mas informacion sobre los lotes de Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <main className="bg-[#F5F1E8] text-[#0E0E0E]">
      <PageHero
        eyebrow={siteSettings.eyebrow}
        title="Hay lugares que no se compran: se eligen para comenzar distinto."
        copy="Entre laguna, montana y silencio, Alpinas Huaypo abre un territorio donde la tierra deja de ser solo inversion y empieza a sentirse destino."
        imageSrc={editorialMedia.homeHero.src}
        imageAlt={editorialMedia.homeHero.alt}
        accent="emerald"
        fullHeight
        actions={[
          { href: "/agenda-tu-visita", label: "Agendar visita" },
          {
            href: "/lotes",
            label: "Ver lotes",
            variant: "secondary",
          },
        ]}
        highlights={[
          "Invierte en un paisaje que se siente eterno.",
          "Club y comunidad como parte viva de la experiencia.",
          "Lotes pensados para descanso, presencia y proyeccion.",
          "Visitas guiadas para sentir primero y decidir despues.",
        ]}
        aside={
          <div className="grid w-full max-w-xl gap-4">
            <EditorialImageCard
              src={editorialMedia.homeStory.src}
              alt={editorialMedia.homeStory.alt}
              eyebrow="Huaypo al caer la tarde"
              title="Donde la luz baja despacio y la idea de pertenecer se vuelve inevitable."
              copy="Nada aqui se siente apurado. El paisaje abre distancia, silencio y una forma mas honda de imaginar lo propio."
              badges={["Laguna", "Club", "Visitas privadas"]}
              priority
              heightClassName="h-[22rem]"
              className="float-slow"
            />
          </div>
        }
      />

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <SectionTitle
              eyebrow="La promesa"
              title="La tierra cambia de valor cuando el entorno tambien transforma tu vida."
              copy="Huaypo se elige con la razon, pero permanece por intuicion. Se siente amplio, silencioso y lleno de posibilidades para vivir distinto."
            />
            <Reveal className="lux-card rounded-[2.3rem] p-7 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">
                Lo que se percibe
              </p>
              <p className="mt-5 font-serif text-3xl leading-tight text-[#0E0E0E] md:text-4xl">
                Aqui el valor nace de lo que se respira: horizonte, calma y una belleza que no necesita exagerarse.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[#FBF8F1] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8D8573]">Sensacion</p>
                  <p className="mt-2 text-lg text-[#0E0E0E]">Refugio con proyeccion</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#FBF8F1] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8D8573]">Ritmo</p>
                  <p className="mt-2 text-lg text-[#0E0E0E]">Tiempo mas sereno</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                delay={index * 90}
                className="lux-card rounded-[2rem] p-7 md:p-8"
              >
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-[#0E0E0E]">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-[15px] leading-8 text-[#4D4A43]">{benefit.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="lux-noise bg-[#07110F] py-24 text-[#FAF9F6]">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Lotes destacados"
              title="Terrenos para elegir con el cuerpo y con la vision."
              copy="Cada lote deja ver una promesa distinta: mas horizonte, mas calma o una cercania especial con el club y el paisaje."
              tone="light"
            />
            <Reveal>
              <Link
                href="/lotes"
                className="lux-button-secondary inline-flex px-5 py-3.5 text-sm font-semibold"
              >
                Ver todo el inventario
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {featuredLots.map((lot) => (
              <CinematicLotCard key={lot.slug} lot={lot} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <Reveal>
            <EditorialImageCard
              src={editorialMedia.huaypoStory.src}
              alt={editorialMedia.huaypoStory.alt}
              eyebrow="Vivir en Huaypo"
              title="Donde la naturaleza guarda espacio para una vida mas plena."
              copy="La laguna, la montana y la luz de la tarde convierten cada visita en una intuicion: aqui el tiempo baja el ritmo."
              badges={["Laguna", "Montana", "Silencio"]}
              heightClassName="min-h-[28rem] h-full"
            />
          </Reveal>

          <div className="space-y-5">
            <SectionTitle
              eyebrow="Estilo de vida"
              title="Hay paisajes que no se explican: se quedan contigo desde la primera mirada."
              copy="Huaypo no aparece como una ubicacion tecnica. Aparece como una atmosfera que ensancha la respiracion y ordena el futuro con mas calma."
            />
            {huaypoStories.map((story, index) => (
              <Reveal
                key={story.title}
                delay={index * 90}
                className="lux-card rounded-[2rem] p-7"
              >
                <h3 className="font-serif text-3xl text-[#0E0E0E]">{story.title}</h3>
                <p className="mt-4 text-[15px] leading-8 text-[#4D4A43]">{story.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClubSection dark />

      <MapSection
        dark
        eyebrow="Ubicacion"
        title="A pocos minutos del movimiento cotidiano, aparece un paisaje que parece guardar otra escala del tiempo."
        copy="Virgilio, Alpinas y Piuray te ayudan a leer el entorno desde distintos puntos. La visita termina de revelar lo que el mapa apenas insinua."
      />

      <section className="bg-[#121814] py-24 text-[#FAF9F6]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <SectionTitle
              eyebrow="Voces del lugar"
              title="Cuando un paisaje toca una fibra profunda, se vuelve facil imaginarse dentro."
              copy="Estas miradas nacen del encuentro entre tierra, comunidad y una sensacion de calma que permanece mucho despues de la visita."
              tone="light"
            />
            <div className="grid gap-5 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Reveal
                  key={testimonial.author}
                  delay={index * 100}
                  className="lux-card-dark lux-outline rounded-[2rem] p-7"
                >
                  <p className="font-serif text-3xl leading-tight text-[#FAF9F6]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-7 text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">
                    {testimonial.author}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Agenda tu visita"
        title="Hay paisajes que no piden explicacion. Piden ser caminados."
        copy="Recorre el proyecto, siente la cercania de la laguna y descubre que lote dialoga mejor con tu idea de refugio, inversion o una segunda vida mas serena."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Agendar visita"
        secondaryHref={whatsappHref}
        secondaryLabel="Escribir por WhatsApp"
        secondaryExternal
        backgroundImageSrc={editorialMedia.ctaBackdrop.src}
        backgroundImageAlt={editorialMedia.ctaBackdrop.alt}
      />
    </main>
  );
}
