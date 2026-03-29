import Link from "next/link";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero informacion sobre los lotes y proyectos de Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <footer className="border-t border-stone-800 bg-[#161812]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 text-sm text-stone-300 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-stone-100">{siteSettings.brand}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-stone-500">
            {siteSettings.projectLabel}
          </p>
          <p className="mt-3 max-w-sm leading-7">
            {siteSettings.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Explora</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/lotes">Lotes disponibles</Link>
            <Link href="/huaypo">Vivir en Huaypo</Link>
            <Link href="/club">Club</Link>
            <Link href="/agenda-tu-visita">Agenda tu visita</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Contacto</p>
          <div className="mt-3 space-y-2 leading-7">
            <p>{siteSettings.address}</p>
            <p>Telefono: {siteSettings.phone}</p>
            <p>Correo: {siteSettings.email}</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp: {siteSettings.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
