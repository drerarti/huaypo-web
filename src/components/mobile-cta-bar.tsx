import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[linear-gradient(180deg,_rgba(6,17,14,0.86),_rgba(10,27,21,0.92))] px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-26px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-[1180px] gap-3">
        <WhatsAppButton
          label="WhatsApp"
          message="Hola, quiero mas informacion sobre los lotes en Huaypo."
          className="lux-button-primary flex-1 px-4 py-3.5 text-center text-sm font-semibold"
        />
        <Link
          href="/agenda-tu-visita"
          className="lux-button-secondary flex-1 px-4 py-3.5 text-center text-sm font-semibold"
        >
          Agendar visita
        </Link>
      </div>
    </div>
  );
}
