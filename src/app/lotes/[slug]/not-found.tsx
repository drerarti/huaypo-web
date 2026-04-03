import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { siteSettings } from "@/data/site";

export default function LotNotFound() {
  return (
    <main className="bg-[#F5F1E8] py-20 md:py-24">
      <Container>
        <Reveal className="lux-noise rounded-[2.6rem] bg-[#0E0E0E] px-6 py-16 text-[#FAF9F6] shadow-[0_34px_110px_rgba(0,0,0,0.22)] md:px-10">
          <p className="text-[11px] uppercase tracking-[0.36em] text-[#D8C69E]">Lote no encontrado</p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            Este lote ya no forma parte del inventario publico o la ruta no coincide con la ficha actual.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#DDD7C8] md:text-lg">
            Puedes volver al inventario actualizado de {siteSettings.brand} o escribirnos para revisar alternativas con una lectura similar de proyecto y estilo de vida.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/lotes"
              className="lux-button-primary inline-flex px-6 py-3.5 text-center text-sm font-semibold"
            >
              Ver lotes disponibles
            </Link>
            <Link
              href="/contacto"
              className="lux-button-secondary inline-flex px-6 py-3.5 text-center text-sm font-semibold"
            >
              Hablar con un asesor
            </Link>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
