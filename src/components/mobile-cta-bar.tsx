import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-[rgba(246,241,231,0.96)] px-4 py-3 shadow-[0_-18px_40px_rgba(31,24,15,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3">
        <WhatsAppButton
          label="WhatsApp"
          message="Hola, quiero mas informacion sobre los lotes en Huaypo."
          className="flex-1 rounded-full bg-stone-900 px-4 py-3 text-center text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
        />
        <Link
          href="/agenda-tu-visita"
          className="flex-1 rounded-full border border-stone-300 px-4 py-3 text-center text-sm font-semibold text-stone-900 transition hover:border-stone-500 hover:bg-white"
        >
          Agendar visita
        </Link>
      </div>
    </div>
  );
}
