import Image from "next/image";
import Link from "next/link";
import { type Lot, siteSettings } from "@/data/site";
import { getLotPath } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type LotCardProps = {
  lot: Lot;
};

export function LotCard({ lot }: LotCardProps) {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    `Hola, quiero informacion sobre el lote ${lot.name} (${lot.code}) en ${lot.projectName ?? siteSettings.projectLabel}.`,
  );
  const statusClass =
    lot.status === "Disponible"
      ? "border-emerald-200/60 bg-emerald-50/15 text-emerald-100"
      : lot.status === "Reservado"
        ? "border-amber-200/30 bg-amber-100/10 text-amber-100"
        : "border-white/15 bg-white/10 text-stone-100";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_50px_rgba(31,24,15,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(31,24,15,0.12)]">
      <div className="relative min-h-64 bg-[linear-gradient(145deg,_#223022,_#536347_55%,_#b79057)] text-stone-50">
        {lot.image ? (
          <Image
            src={lot.image}
            alt={lot.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,15,10,0.08),_rgba(12,15,10,0.82))]" />
        <div className="relative flex h-full flex-col justify-end px-6 py-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-amber-100/90">
                {lot.projectName ?? lot.stage}
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight">{lot.name}</h3>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] ${statusClass}`}
            >
              {lot.status}
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-stone-200">{lot.heroLabel}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <div className="grid gap-3 text-sm leading-7 text-stone-600">
          <p>
            <span className="font-semibold text-stone-900">Codigo:</span> {lot.code}
          </p>
          <p>
            <span className="font-semibold text-stone-900">Area:</span> {lot.area}
          </p>
          <p>
            <span className="font-semibold text-stone-900">Precio:</span> {lot.price}
          </p>
          <p>
            <span className="font-semibold text-stone-900">Ubicacion:</span> {lot.location}
          </p>
          {lot.block && lot.lotNumber ? (
            <p>
              <span className="font-semibold text-stone-900">Referencia:</span> Mza. {lot.block} ·
              Lote {lot.lotNumber}
            </p>
          ) : null}
        </div>

        <p className="mt-5 flex-1 leading-8 text-stone-700">{lot.summary}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={getLotPath(lot)}
            className="rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
          >
            Ver detalle
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-200 px-5 py-3 text-center text-sm font-semibold text-stone-900 transition hover:border-stone-400 hover:bg-stone-50"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
