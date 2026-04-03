import { siteSettings } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero mas informacion sobre los lotes en Huaypo.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="float-slow fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,_rgba(6,17,14,0.9),_rgba(12,34,27,0.84))] px-4 py-3 text-sm font-semibold text-[#F7F3E9] shadow-[0_30px_84px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-[#D0BC8F]/40 hover:shadow-[0_36px_92px_rgba(0,0,0,0.34)] md:inline-flex"
    >
      <span className="flex h-3 w-3 rounded-full bg-[#D0BC8F] shadow-[0_0_18px_rgba(208,192,143,0.55)] animate-[ambient-breathe_3.8s_ease-in-out_infinite]" />
      WhatsApp
    </a>
  );
}
