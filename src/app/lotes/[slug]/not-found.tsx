import Link from "next/link";
import { Container } from "@/components/container";
import { siteSettings } from "@/data/site";

export default function LotNotFound() {
  return (
    <main className="bg-[#f5f0e8] py-20">
      <Container>
        <section className="rounded-[2.4rem] bg-[#171b14] px-6 py-16 text-stone-50 shadow-[0_28px_80px_rgba(0,0,0,0.18)] md:px-10">
          <p className="text-xs uppercase tracking-[0.34em] text-amber-200">Lote no encontrado</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Este lote ya no esta disponible o la ruta no coincide con el inventario actual.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
            Puedes volver al inventario actualizado de {siteSettings.brand} o escribirnos por
            WhatsApp para revisar opciones similares con el equipo comercial.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/lotes"
              className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-amber-200"
            >
              Ver lotes disponibles
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-stone-50 transition hover:border-white/35 hover:bg-white/5"
            >
              Hablar con un asesor
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
