import Image from "next/image";
import Link from "next/link";
import { type Lot, siteSettings } from "@/data/site";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form-panel";
import { LotCard } from "@/components/lot-card";
import { SectionTitle } from "@/components/section-title";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type LotDetailProps = {
  lot: Lot;
  relatedLots: Lot[];
};

export function LotDetail({ lot, relatedLots }: LotDetailProps) {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    `Hola, quiero coordinar informacion y visita para ${lot.name} (${lot.code}) en ${lot.projectName ?? siteSettings.projectLabel}.`,
  );
  const statusClass =
    lot.status === "Disponible"
      ? "text-emerald-200"
      : lot.status === "Reservado"
        ? "text-amber-200"
        : "text-stone-200";

  return (
    <main className="bg-[#f5f0e8]">
      <section className="relative overflow-hidden bg-[#171b14] text-stone-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(184,147,93,0.25),_transparent_36%),linear-gradient(145deg,_rgba(17,19,14,0.96),_rgba(17,19,14,0.76))]" />
        <Container className="relative py-20">
          <Link
            href="/lotes"
            className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-stone-200 transition hover:border-white/25 hover:bg-white/5"
          >
            Volver a lotes
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200">{lot.stage}</p>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
                {lot.name}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 md:text-lg md:leading-8">
                {lot.intro}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Codigo</p>
                  <p className="mt-2 text-xl text-stone-100">{lot.code}</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Area</p>
                  <p className="mt-2 text-xl text-stone-100">{lot.area}</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Precio</p>
                  <p className="mt-2 text-xl text-stone-100">{lot.price}</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Estado</p>
                  <p className={`mt-2 text-xl ${statusClass}`}>{lot.status}</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(160deg,_rgba(83,99,71,0.5),_rgba(31,35,26,0.95))] shadow-[0_25px_80px_rgba(0,0,0,0.2)]">
              {lot.image ? (
                <div className="relative h-72 w-full">
                  <Image
                    src={lot.image}
                    alt={lot.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,15,10,0.08),_rgba(12,15,10,0.82))]" />
                </div>
              ) : null}
              <div className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200">{lot.heroLabel}</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-stone-50 sm:text-4xl">
                  Un terreno con lectura comercial clara y una experiencia de visita que convence en persona.
                </h2>
                <p className="mt-5 leading-8 text-stone-300">{lot.summary}</p>
                <div className="mt-8 space-y-3 text-sm leading-7 text-stone-200">
                  <p>
                    <span className="font-semibold text-stone-50">Proyecto:</span> {lot.projectName ?? lot.location}
                  </p>
                  <p>
                    <span className="font-semibold text-stone-50">Ubicacion:</span> {lot.location}
                  </p>
                  <p>
                    <span className="font-semibold text-stone-50">Vista:</span> {lot.view}
                  </p>
                  {lot.block && lot.lotNumber ? (
                    <p>
                      <span className="font-semibold text-stone-50">Referencia:</span> Mza. {lot.block} · Lote {lot.lotNumber}
                    </p>
                  ) : null}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-full bg-amber-300 px-5 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-amber-200 sm:w-auto"
                  >
                    Consultar por WhatsApp
                  </a>
                  <Link
                    href="/agenda-tu-visita"
                    className="w-full rounded-full border border-white/18 px-5 py-3 text-center text-sm font-semibold text-stone-50 transition hover:border-white/35 hover:bg-white/5 sm:w-auto"
                  >
                    Agendar visita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="space-y-8">
            <SectionTitle
              eyebrow="Detalle del lote"
              title="Un espacio pensado para construir una vida mas pausada, mas propia y mejor conectada con el paisaje."
              copy={lot.description}
            />
            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(31,24,15,0.08)]">
              <h3 className="font-serif text-3xl text-stone-900">Lo mas valioso del lote</h3>
              <ul className="mt-6 space-y-4 text-stone-700">
                {lot.features.map((feature) => (
                  <li key={feature} className="rounded-2xl bg-stone-50 px-4 py-4 leading-8">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(31,24,15,0.08)]">
              <h3 className="font-serif text-3xl text-stone-900">Ideal para</h3>
              <ul className="mt-6 space-y-4 text-stone-700">
                {lot.idealFor.map((item) => (
                  <li key={item} className="rounded-2xl bg-[#f7f1e7] px-4 py-4 leading-8">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(31,24,15,0.08)]">
              <h3 className="font-serif text-3xl text-stone-900">Como coordinar tu visita</h3>
              <ul className="mt-6 space-y-4 text-stone-700">
                {lot.access.map((item) => (
                  <li key={item} className="rounded-2xl bg-stone-50 px-4 py-4 leading-8">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <ContactForm
            formName="lote-detalle"
            source={`Detalle de lote - ${lot.code}`}
            title="Coordinemos disponibilidad, recorrido y siguientes pasos."
            copy="Deja tus datos y el equipo comercial de Corporacion Ayllu Laguna Huaypo te acompana con informacion, visita guiada y seguimiento."
            submitLabel="Quiero informacion de este lote"
            lotName={lot.name}
            projectName={lot.projectName ?? siteSettings.projectLabel}
          />
        </Container>
      </section>

      <section className="bg-[#ece4d6] py-20">
        <Container>
          <SectionTitle
            eyebrow="Mas oportunidades"
            title="Otros lotes que pueden encajar con tu busqueda."
            copy="Si quieres comparar amplitud, cercania al club o proyeccion de uso, estas opciones ayudan a leer mejor el inventario disponible."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {relatedLots.map((relatedLot) => (
              <LotCard key={relatedLot.slug} lot={relatedLot} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
