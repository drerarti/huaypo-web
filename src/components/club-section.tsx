import { clubHighlights } from "@/data/site";
import { Container } from "@/components/container";
import { EditorialImageCard } from "@/components/editorial-image-card";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { editorialMedia } from "@/data/editorial-media";

type ClubSectionProps = {
  dark?: boolean;
};

export function ClubSection({ dark }: ClubSectionProps) {
  const [lead, ...rest] = clubHighlights;

  return (
    <section
      className={
        dark
          ? "lux-noise relative overflow-hidden bg-[#081814] py-24 text-[#FAF9F6]"
          : "relative overflow-hidden bg-[#F5F1E8] py-24 text-[#0E0E0E]"
      }
    >
      <div
        className={
          dark
            ? "absolute -left-20 top-0 h-72 w-72 rounded-full bg-[rgba(208,192,143,0.1)] blur-3xl"
            : "absolute -right-20 top-0 h-72 w-72 rounded-full bg-[rgba(17,48,35,0.08)] blur-3xl"
        }
      />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.03fr_0.97fr]">
          <div className="space-y-8">
            <SectionTitle
              eyebrow="Club"
              title="Cuando el paisaje se encuentra con la comunidad, el proyecto adquiere otra profundidad."
              copy="El club no aparece como un adorno. Le da cuerpo a la vida que se imagina aqui: fuego al atardecer, encuentros lentos y una pertenencia que se siente natural."
              tone={dark ? "light" : "dark"}
            />
            <Reveal
              delay={100}
              className={
                dark
                  ? "lux-card-dark lux-outline relative overflow-hidden rounded-[2.35rem] p-8"
                  : "lux-card relative overflow-hidden rounded-[2.35rem] p-8"
              }
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[rgba(208,192,143,0.12)] blur-3xl" />
              <p
                className={
                  dark
                    ? "text-[10px] uppercase tracking-[0.24em] text-[#D7C398] sm:text-[11px] sm:tracking-[0.38em]"
                    : "text-[10px] uppercase tracking-[0.24em] text-[#8E6E35] sm:text-[11px] sm:tracking-[0.38em]"
                }
              >
                Experiencia insignia
              </p>
              <h3
                className={
                  dark
                    ? "mt-5 break-words font-serif text-[2.2rem] leading-tight text-[#FAF9F6] sm:text-4xl"
                    : "mt-5 break-words font-serif text-[2.2rem] leading-tight text-[#0E0E0E] sm:text-4xl"
                }
              >
                {lead.title}
              </h3>
              <p className={dark ? "mt-5 leading-8 text-[#DDD7C8]" : "mt-5 leading-8 text-[#4D4A43]"}>
                {lead.copy}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {["Bienestar", "Comunidad", "Experiencia social"].map((item) => (
                  <span
                    key={item}
                    className={
                      dark
                        ? "glass-pill rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#EFE3C6]"
                        : "rounded-full border border-[#D8D0C1] bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#5C584E] sm:tracking-[0.3em]"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <EditorialImageCard
                src={editorialMedia.clubStory.src}
                alt={editorialMedia.clubStory.alt}
                eyebrow="Atmosfera del club"
                title="Madera, altura y una forma mas calida de compartir el tiempo."
                copy="La experiencia se vuelve memorable cuando el encuentro ocurre rodeado de paisaje, luz suave y una sensacion genuina de descanso."
                badges={["Fuego", "Sobremesa", "Comunidad"]}
                heightClassName="h-80"
              />
            </Reveal>
          </div>

          <div className="grid gap-6">
            {rest.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 90}
                className={
                  dark
                    ? "lux-card-dark lux-outline relative overflow-hidden rounded-[2rem] p-7"
                    : "lux-card relative overflow-hidden rounded-[2rem] p-7"
                }
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[rgba(208,192,143,0.08)] blur-3xl" />
                <p
                  className={
                    dark
                      ? "text-[10px] uppercase tracking-[0.24em] text-[#D7C398] sm:text-[11px] sm:tracking-[0.34em]"
                      : "text-[10px] uppercase tracking-[0.24em] text-[#8E6E35] sm:text-[11px] sm:tracking-[0.34em]"
                  }
                >
                  Valor diferencial
                </p>
                <h3
                  className={
                    dark
                      ? "mt-4 break-words font-serif text-[2rem] text-[#FAF9F6] sm:text-3xl"
                      : "mt-4 break-words font-serif text-[2rem] text-[#0E0E0E] sm:text-3xl"
                  }
                >
                  {item.title}
                </h3>
                <p className={dark ? "mt-4 leading-8 text-[#DDD7C8]" : "mt-4 leading-8 text-[#4D4A43]"}>
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
