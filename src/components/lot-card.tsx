import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { type Lot, siteSettings } from "@/data/site";
import { getLotPath } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type LotCardProps = {
  lot: Lot;
};

function normalizeLabel(value: string) {
  return value.replace(/Ã‚Â·|Â·/g, "/");
}

export function LotCard({ lot }: LotCardProps) {
  const lotName = lot.name.replaceAll("Â·", "/");
  const heroLabel = lot.heroLabel.replaceAll("Â·", "/");
  const lotLabel = normalizeLabel(lotName);
  const heroText = normalizeLabel(heroLabel);
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    `Hola, quiero informacion sobre el lote ${lotLabel} (${lot.code}) en ${lot.projectName ?? siteSettings.projectLabel}.`,
  );
  const statusClass =
    lot.status === "Disponible"
      ? "border-emerald-200/40 bg-emerald-50/12 text-emerald-100"
      : lot.status === "Reservado"
        ? "border-[#C6A96B]/35 bg-[#C6A96B]/10 text-[#F5DEAA]"
        : "border-white/15 bg-white/10 text-stone-100";

  return (
    <Reveal
      as="article"
      className="group lux-card flex h-full flex-col overflow-hidden rounded-[2.15rem] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_90px_rgba(17,17,17,0.15)]"
    >
      <div className="relative min-h-[22rem] overflow-hidden bg-[linear-gradient(145deg,_#182119,_#44513B_45%,_#A88755)] text-[#FAF9F6]">
        {lot.image ? (
          <Image
            src={lot.image}
            alt={lotLabel}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(10,10,10,0.18),_rgba(10,10,10,0.82))]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,_rgba(14,14,14,0.58),_transparent)]" />
        <div className="relative flex h-full flex-col justify-between px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="glass-pill rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.34em] text-[#E6DCC4]">
              {lot.projectName ?? siteSettings.projectLabel}
            </div>
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] ${statusClass}`}
            >
              {lot.status}
            </span>
          </div>
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="glass-pill rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#F0E7D1]">
                {lot.code}
              </span>
              <span className="glass-pill rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#F0E7D1]">
                {lot.stage}
              </span>
            </div>
            <h3 className="max-w-md font-serif text-[2rem] leading-[1.02] tracking-[-0.03em] text-[#FAF9F6] sm:text-[2.35rem]">
              {lotLabel}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#DDD4BF]">{heroText}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[#DED6C7] bg-[#FBF8F1] px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#5B584F]">
            {lot.location}
          </span>
          {lot.block && lot.lotNumber ? (
            <>
              <p className="hidden">
              <span className="font-semibold text-stone-900">Referencia:</span> Mza. {lot.block} ·
              Lote {lot.lotNumber}
            </p>
              <span className="rounded-full border border-[#DED6C7] bg-[#FBF8F1] px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#5B584F]">
                Mza. {lot.block} / Lote {lot.lotNumber}
              </span>
            </>
          ) : null}
        </div>

        <p className="mt-5 flex-1 text-[15px] leading-8 text-[#3F3B35]">{lot.summary}</p>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            href={getLotPath(lot)}
            className="lux-button-primary w-full px-5 py-3.5 text-center text-sm font-semibold"
          >
            Ver detalle del lote
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-button-secondary w-full px-5 py-3.5 text-center text-sm font-semibold"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </Reveal>
  );
}
