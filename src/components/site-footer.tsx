import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const footerLinks = [
  { href: "/lotes", label: "Lotes disponibles" },
  { href: "/vivir-en-huaypo", label: "Vivir en Huaypo" },
  { href: "/club", label: "Club" },
  { href: "/agenda-tu-visita", label: "Agenda tu visita" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteFooter() {
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero informacion sobre los lotes y proyectos de Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <footer className="lux-noise relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,_#06110E_0%,_#081814_46%,_#10271F_100%)] text-[#F7F3E9]">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[rgba(208,192,143,0.1)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[rgba(25,69,53,0.18)] blur-3xl" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-8 xl:grid-cols-[1.18fr_0.72fr_0.82fr_0.95fr]">
          <Reveal className="lux-card-dark lux-outline rounded-[2.5rem] p-7 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">
              {siteSettings.projectLabel}
            </p>
            <h2 className="mt-4 max-w-md break-words font-serif text-[2.15rem] leading-[1.02] tracking-[-0.04em] text-[#FAF9F6] md:text-[3.1rem]">
              Donde la naturaleza guarda espacio para una vida mas plena.
            </h2>
            <p className="mt-5 max-w-md leading-8 text-[#DDD7C8]">{siteSettings.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="glass-pill rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#EFE3C6]">
                Lotes
              </span>
              <span className="glass-pill rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#EFE3C6]">
                Club
              </span>
              <span className="glass-pill rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#EFE3C6]">
                Visitas guiadas
              </span>
            </div>
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
                Agenda una visita
              </Link>
            </div>
          </Reveal>

          <Reveal delay={70} className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">Explora</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#E6DECD]">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-[#FAF9F6]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">Contacto</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#E6DECD]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#AFA48D]">Ubicacion</p>
                <p className="mt-2">{siteSettings.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#AFA48D]">WhatsApp</p>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block break-words hover:text-[#FAF9F6]">
                  {siteSettings.whatsappDisplay}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#AFA48D]">Correo</p>
                <a href={`mailto:${siteSettings.email}`} className="mt-2 inline-block break-all hover:text-[#FAF9F6]">
                  {siteSettings.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={170} className="lux-card-dark lux-outline rounded-[2rem] p-6">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#D8C69E]">Promesa de marca</p>
            <h3 className="mt-4 break-words font-serif text-[2rem] leading-tight text-[#FAF9F6] sm:text-3xl">
              No es solo una tierra: es una pausa luminosa, una presencia y una proyeccion.
            </h3>
            <p className="mt-4 leading-8 text-[#D8D0C0]">
              Huaypo se entiende mejor cuando se recorre, se respira y se deja actuar el paisaje.
            </p>
            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#AFA48D]">Atencion</p>
              <p className="mt-2 text-sm leading-7 text-[#F1EBDD]">{siteSettings.schedule}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220} className="mt-10 border-t border-white/8 pt-5 text-xs uppercase tracking-[0.28em] text-[#AFA48D]">
          Corporacion Ayllu Laguna Huaypo / lotes, club y paisaje en un solo horizonte.
        </Reveal>
      </Container>
    </footer>
  );
}
