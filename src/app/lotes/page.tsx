import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { LotCard } from "@/components/lot-card";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { siteSettings } from "@/data/site";
import { getAllLots } from "@/lib/lots";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const revalidate = 300;

export default async function LotesPage() {
  const lots = await getAllLots();
  const whatsappHref = buildWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hola, quiero revisar disponibilidad de lotes en Corporacion Ayllu Laguna Huaypo.",
  );

  return (
    <main className="bg-[#f5f0e8]">
      <PageHero
        eyebrow="Lotes disponibles"
        title="Un inventario presentado con claridad, elegancia y lectura comercial."
        copy="Cada lote ahora toma datos reales de Airtable y muestra estado, proyecto, metraje y precio para que la decision se sienta mas informada y tambien mas deseable."
        actions={[
          { href: "/agenda-tu-visita", label: "Agendar visita" },
          {
            href: whatsappHref,
            label: "Hablar por WhatsApp",
            variant: "secondary",
            external: true,
          },
        ]}
        highlights={[
          "Detalle individual por lote con ruta dinamica.",
          "Enfoque comercial centrado en visitas y conversion.",
          "Responsive y listo para crecer con filtros reales.",
          "Inventario presentado con tono premium y lectura clara.",
        ]}
        aside={
          <div className="w-full max-w-lg rounded-[2.3rem] border border-white/10 bg-white/6 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
            <div className="rounded-[1.9rem] bg-[linear-gradient(145deg,_#233023,_#516046_55%,_#927247)] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-100">
                Inventario
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-50">
                Lotes reales con lectura clara para clientes que comparan valor, estilo de vida y potencial.
              </h2>
            </div>
          </div>
        }
      />

      <section className="py-20">
        <Container>
          <SectionTitle
            eyebrow="Seleccion"
            title="Opciones para distintos perfiles de compra, desde primeras entradas al proyecto hasta terrenos con una lectura mas premium."
            copy="El objetivo es que cada ficha ayude a comparar bien, entender el estilo de cada lote y avanzar rapido hacia una visita."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {lots.map((lot) => (
              <LotCard key={lot.slug} lot={lot} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="Siguiente paso"
        title="Si ya viste uno o dos lotes que te hacen sentido, el siguiente movimiento es simple: agenda una visita."
        copy="La visita ayuda a leer el contexto, las distancias, la sensacion del paisaje y la relacion real entre el inventario y el club."
        primaryHref="/agenda-tu-visita"
        primaryLabel="Quiero visitar"
        secondaryHref={whatsappHref}
        secondaryLabel="Quiero informacion por WhatsApp"
        secondaryExternal
      />
    </main>
  );
}
