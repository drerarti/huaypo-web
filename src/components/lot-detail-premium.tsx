import Image from "next/image";
import Link from "next/link";
import { CinematicLotCard } from "@/components/cinematic-lot-card";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form-panel";
import { HeroBackground } from "@/components/hero-background";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";
import { type Lot, siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type LotDetailPremiumProps = {
  lot: Lot;
  relatedLots: Lot[];
};

function normalizeLabel(value: string) {
  return value.replace(/Ãƒâ€šÃ‚Â·|Ã‚Â·|Â·/g, "/");
}

export function LotDetailPremium({ lot, relatedLots }: LotDetailPremiumProps) {
  const lotName = normalizeLabel(lot.name);
  const heroLabel = normalizeLabel(lot.heroLabel);
  const normalizedStatus = lot.status.toLowerCase();
  const lotImage =
    lot.image ??
    (lot.projectCode === "VG"
      ? editorialMedia.projectVirgilio.src
      : lot.projectCode === "PR"
        ? editorialMedia.projectPiuray.src
        : editorialMedia.projectAlpinas.src);
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    `Hola, quiero coordinar informacion y visita para ${lotName} (${lot.code}) en ${lot.projectName ?? siteSettings.projectLabel}.`,
  );
  const statusClass =
    normalizedStatus.includes("dispon")
      ? "border-emerald-200/35 bg-emerald-50/12 text-emerald-100"
      : normalizedStatus.includes("reserv")
        ? "border-[#C6A96B]/35 bg-[#C6A96B]/12 text-[#F6E2B7]"
        : normalizedStatus.includes("vend")
          ? "border-white/12 bg-white/10 text-[#E6E1D2]"
          : "border-white/12 bg-white/10 text-[#E6E1D2]";

  return (
    <main className="bg-[#F5F1E8]">
      <section className="lux-noise relative overflow-hidden bg-[#06110E] py-20 text-[#FAF9F6] md:py-24">
        <HeroBackground imageSrc={lotImage} imageAlt={lotName} accent="emerald" />
        <Container className="relative min-h-[88svh] items-center lg:grid">
          <Reveal>
            <Link
              href="/lotes"
              className="glass-pill inline-flex rounded-full px-4 py-2 text-sm font-medium text-[#F7F3E9]"
            >
              Volver a lotes
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal className="max-w-3xl min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="glass-pill rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.34em] text-[#D7C398]">
                  {lot.projectName ?? siteSettings.projectLabel}
                </span>
                <span
                  className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] ${statusClass}`}
                >
                  {lot.status}
                </span>
              </div>
              <h1 className="mt-7 break-words font-serif text-[2.65rem] leading-[0.98] tracking-[-0.04em] text-[#FAF9F6] sm:text-[4.4rem] md:text-[5.3rem]">
                {lotName}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#DDD7C8] md:text-lg">
                {lot.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-button-primary inline-flex px-5 py-3.5 text-sm font-semibold"
                >
                  Consultar por WhatsApp
                </a>
                <Link
                  href="/agenda-tu-visita"
                  className="lux-button-secondary inline-flex px-5 py-3.5 text-sm font-semibold"
                >
                  Agendar visita
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Codigo", value: lot.code },
                  { label: "Area", value: lot.area },
                  { label: "Precio", value: lot.price },
                  { label: "Etapa", value: lot.stage },
                ].map((item, index) => (
                  <Reveal
                    key={item.label}
                    delay={index * 80}
                    className="glass-pill rounded-[1.6rem] px-4 py-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8BC9C]">
                      {item.label}
                    </p>
                    <p className="mt-3 font-serif text-2xl text-[#FAF9F6]">{item.value}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="relative">
              <div className="lux-card-dark lux-outline overflow-hidden rounded-[2.6rem] p-3 sm:p-4 shadow-[0_40px_120px_rgba(0,0,0,0.3)]">
                <div className="relative overflow-hidden rounded-[2rem]">
                  {lotImage ? (
                    <Image
                      src={lotImage}
                      alt={lotName}
                      width={1400}
                      height={1100}
                      priority
                      className="h-[24rem] w-full object-cover md:h-[34rem]"
                    />
                  ) : (
                    <div className="h-[24rem] bg-[linear-gradient(145deg,_#1F3D2B,_#6B7D5C_55%,_#C6A96B)] md:h-[34rem]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,12,12,0.06),_rgba(12,12,12,0.78))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">
                      {heroLabel}
                    </p>
                    <h2 className="mt-4 max-w-xl break-words font-serif text-[2rem] leading-tight text-[#FAF9F6] sm:text-[2.4rem] md:text-4xl">
                      No es solo una medida sobre el plano: es la posibilidad de darle cuerpo a una vida con mas aire, mas pausa y mas paisaje.
                    </h2>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="glass-pill rounded-[1.5rem] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8BC9C]">
                      Ubicacion
                    </p>
                    <p className="mt-2 text-lg text-[#FAF9F6]">{lot.location}</p>
                  </div>
                  <div className="glass-pill rounded-[1.5rem] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8BC9C]">
                      Vista
                    </p>
                    <p className="mt-2 text-lg text-[#FAF9F6]">{lot.view}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Lectura del lote"
              title="Una tierra para mirar sin prisa, imaginar con claridad y elegir con conviccion."
              copy={lot.description}
            />
            <Reveal className="lux-card rounded-[2.2rem] p-8">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">Valor percibido</p>
              <p className="mt-5 font-serif text-3xl leading-tight text-[#0E0E0E] md:text-4xl">
                {lot.summary}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[#FBF8F1] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8D8573]">Proyecto</p>
                  <p className="mt-2 text-lg text-[#0E0E0E]">{lot.projectName ?? siteSettings.projectLabel}</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#FBF8F1] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8D8573]">Estado</p>
                  <p className="mt-2 text-lg text-[#0E0E0E]">{lot.status}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5">
            <Reveal className="lux-card rounded-[2rem] p-7">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">Lo mas valioso</p>
              <ul className="mt-6 space-y-4">
                {lot.features.map((feature) => (
                  <li key={feature} className="rounded-[1.4rem] bg-[#FBF8F1] px-4 py-4 text-[15px] leading-8 text-[#4D4A43]">
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal className="lux-card rounded-[2rem] p-7">
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">Ideal para</p>
                <ul className="mt-6 space-y-4">
                  {lot.idealFor.map((item) => (
                    <li key={item} className="rounded-[1.35rem] bg-[#FBF8F1] px-4 py-4 text-[15px] leading-8 text-[#4D4A43]">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={90} className="lux-card rounded-[2rem] p-7">
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#8E6E35]">Como visitar</p>
                <ul className="mt-6 space-y-4">
                  {lot.access.map((item) => (
                    <li key={item} className="rounded-[1.35rem] bg-[#FBF8F1] px-4 py-4 text-[15px] leading-8 text-[#4D4A43]">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lux-card-dark lux-outline rounded-[2.4rem] p-6 sm:p-8 text-[#FAF9F6]">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">Siguiente paso</p>
            <h2 className="mt-5 break-words font-serif text-[2.2rem] leading-tight text-[#FAF9F6] sm:text-4xl">
              El siguiente paso es simple: caminar el lote y dejar que el paisaje termine de hablar.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#DDD7C8]">
              En una compra como esta, la visita aclara lo esencial: orientacion, silencio, distancia con el club y la forma en que el entorno sostiene tu decision.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-button-primary inline-flex px-5 py-3.5 text-sm font-semibold"
              >
                Hablar por WhatsApp
              </a>
              <Link
                href="/agenda-tu-visita"
                className="lux-button-secondary inline-flex px-5 py-3.5 text-sm font-semibold"
              >
                Agendar visita
              </Link>
            </div>
          </Reveal>

          <ContactForm
            formName="lote-detalle"
            source={`Detalle de lote - ${lot.code}`}
            title="Conversemos sobre este lote y organicemos una visita privada."
            copy="Deja tus datos y el equipo comercial de Corporacion Ayllu Laguna Huaypo te acompana con disponibilidad, recorrido guiado y una lectura clara del lugar."
            submitLabel="Quiero informacion de este lote"
            lotName={lotName}
            projectName={lot.projectName ?? siteSettings.projectLabel}
          />
        </Container>
      </section>

      {relatedLots.length > 0 ? (
        <section className="lux-noise bg-[#0E0E0E] py-24 text-[#FAF9F6]">
          <Container>
            <SectionTitle
              eyebrow="Mas oportunidades"
              title="Otros lotes para seguir comparando paisaje, amplitud y cercania al club."
              copy="Si quieres abrir la mirada antes de decidir, estas opciones te ayudan a sentir mejor la energia de cada tramo del proyecto."
              tone="light"
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {relatedLots.map((relatedLot) => (
                <CinematicLotCard key={relatedLot.slug} lot={relatedLot} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
