import Image from "next/image";
import Link from "next/link";
import { editorialMedia } from "@/data/editorial-media";
import { Reveal } from "@/components/reveal";
import { type Lot, siteSettings } from "@/data/site";
import { getLotPath } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type CinematicLotCardProps = {
  lot: Lot;
};

function normalizeLabel(value: string) {
  return value.replace(/ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·|Ãƒâ€šÃ‚Â·|Ã‚Â·|Â·/g, "/");
}

export function CinematicLotCard({ lot }: CinematicLotCardProps) {
  const lotLabel = normalizeLabel(lot.name);
  const heroText = normalizeLabel(lot.heroLabel);
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
    `Hola, quiero informacion sobre el lote ${lotLabel} (${lot.code}) en ${lot.projectName ?? siteSettings.projectLabel}.`,
  );
  const statusClass =
    normalizedStatus.includes("dispon")
      ? "border-emerald-200/40 bg-emerald-50/12 text-emerald-100"
      : normalizedStatus.includes("reserv")
        ? "border-[#D0BC8F]/35 bg-[#D0BC8F]/10 text-[#F8E5B9]"
        : normalizedStatus.includes("vend")
          ? "border-white/12 bg-white/10 text-[#E8E1D0]"
          : "border-white/15 bg-white/10 text-[#F1EBDD]";

  return (
    <Reveal
      as="article"
      className="group lux-card flex h-full flex-col overflow-hidden rounded-[2.2rem] transition duration-500 hover:-translate-y-2 hover:shadow-[0_34px_100px_rgba(6,17,14,0.18)]"
    >
      <div className="relative min-h-[23rem] overflow-hidden bg-[linear-gradient(145deg,_#0C1B16,_#294337_48%,_#8D8F62_92%,_#C4AF82_100%)] text-[#F7F3E9]">
        {lotImage ? (
          <Image
            src={lotImage}
            alt={lotLabel}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.08]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,12,10,0.08),_rgba(5,12,10,0.84))]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,_rgba(5,12,10,0.62),_transparent)]" />
        <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-[rgba(208,192,143,0.16)] blur-2xl transition duration-500 group-hover:opacity-90" />
        <div className="absolute left-6 top-6 h-px w-14 bg-[linear-gradient(90deg,_rgba(247,243,233,0.85),_transparent)]" />
        <div className="relative flex h-full flex-col justify-between px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="glass-pill rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#EEE2C9] sm:tracking-[0.34em]">
              {lot.projectName ?? siteSettings.projectLabel}
            </div>
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] ${statusClass}`}
            >
              {lot.status}
            </span>
          </div>
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="glass-pill rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F0E7D1] sm:tracking-[0.3em]">
                {lot.code}
              </span>
              <span className="glass-pill rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F0E7D1] sm:tracking-[0.3em]">
                {lot.stage}
              </span>
            </div>
            <h3 className="max-w-md break-words font-serif text-[1.95rem] leading-[1] tracking-[-0.03em] text-[#F7F3E9] sm:text-[2.5rem]">
              {lotLabel}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#E8DFC9]">{heroText}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[#DCD4C4] bg-[#FBF8F1] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#5B584F] sm:tracking-[0.3em]">
            {lot.location}
          </span>
          {lot.block && lot.lotNumber ? (
            <span className="rounded-full border border-[#DCD4C4] bg-[#FBF8F1] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#5B584F] sm:tracking-[0.3em]">
              Mza. {lot.block} / Lote {lot.lotNumber}
            </span>
          ) : null}
        </div>

        <p className="mt-5 flex-1 text-[15px] leading-8 text-[#3F3B35]">{lot.summary}</p>

        <div className="mt-7 flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.45rem] border border-[#DDD4C5] bg-[linear-gradient(180deg,_#FBF8F1,_#F2ECDF)] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#857C69]">Area</p>
              <p className="mt-2 font-serif text-[1.8rem] leading-none text-[#07110F]">{lot.area}</p>
            </div>
            <div className="rounded-[1.45rem] border border-[#DDD4C5] bg-[linear-gradient(180deg,_#FBF8F1,_#F2ECDF)] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#857C69]">Precio</p>
              <p className="mt-2 font-serif text-[1.8rem] leading-none text-[#07110F]">{lot.price}</p>
            </div>
          </div>
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
            className="lux-button-secondary-light w-full px-5 py-3.5 text-center text-sm font-semibold"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </Reveal>
  );
}
