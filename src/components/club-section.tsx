import { clubHighlights } from "@/data/site";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";

type ClubSectionProps = {
  dark?: boolean;
};

export function ClubSection({ dark }: ClubSectionProps) {
  return (
    <section className={dark ? "bg-[#171b14] py-20 text-stone-50" : "bg-[#f5f0e8] py-20"}>
      <Container>
        <SectionTitle
          eyebrow="Club"
          title="El valor del proyecto crece cuando el terreno se conecta con comunidad, encuentros y una forma mas plena de disfrutar Huaypo."
          copy="La propuesta del club suma pertenencia, deseo y una lectura mas premium del proyecto. No es un complemento decorativo: es una parte central de la experiencia comercial."
          tone={dark ? "light" : "dark"}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {clubHighlights.map((item) => (
            <article
              key={item.title}
              className={
                dark
                  ? "rounded-[2rem] border border-white/10 bg-white/6 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.14)]"
                  : "rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(31,24,15,0.08)]"
              }
            >
              <p
                className={
                  dark
                    ? "text-xs uppercase tracking-[0.3em] text-amber-200"
                    : "text-xs uppercase tracking-[0.3em] text-amber-700"
                }
              >
                Valor diferencial
              </p>
              <h3
                className={
                  dark
                    ? "mt-4 font-serif text-3xl text-stone-100"
                    : "mt-4 font-serif text-3xl text-stone-900"
                }
              >
                {item.title}
              </h3>
              <p className={dark ? "mt-4 leading-8 text-stone-300" : "mt-4 leading-8 text-stone-700"}>
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
