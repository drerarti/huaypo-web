import { Reveal } from "@/components/reveal";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  copy: string;
  tone?: "dark" | "light";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  copy,
  tone = "dark",
  className = "",
}: SectionTitleProps) {
  const eyebrowClass =
    tone === "light"
      ? "text-[10px] uppercase tracking-[0.24em] text-[#C6A96B] sm:text-[11px] sm:tracking-[0.36em]"
      : "text-[10px] uppercase tracking-[0.24em] text-[#8E6E35] sm:text-[11px] sm:tracking-[0.36em]";
  const titleClass =
    tone === "light"
      ? "mt-5 max-w-4xl break-words font-serif text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-[#FAF9F6] sm:text-[3.4rem] md:text-[4.5rem]"
      : "mt-5 max-w-4xl break-words font-serif text-[2.25rem] leading-[1.02] tracking-[-0.035em] text-[#0E0E0E] sm:text-[3.4rem] md:text-[4.5rem]";
  const copyClass =
    tone === "light"
      ? "mt-6 max-w-2xl text-base leading-8 text-[#E3DDCF] md:text-lg md:leading-8"
      : "mt-6 max-w-2xl text-base leading-8 text-[#4D4A43] md:text-lg md:leading-8";
  const dividerClass =
    tone === "light"
      ? "lux-divider flex-1 max-w-16 sm:max-w-28"
      : "h-px flex-1 max-w-16 sm:max-w-28 bg-[linear-gradient(90deg,_rgba(198,169,107,0.42),_transparent)]";

  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <div className="flex items-center gap-4">
        <span
          className={
            tone === "light"
              ? "h-2.5 w-2.5 rounded-full bg-[#C6A96B] shadow-[0_0_18px_rgba(198,169,107,0.45)]"
              : "h-2.5 w-2.5 rounded-full bg-[#B98B38] shadow-[0_0_18px_rgba(185,139,56,0.24)]"
          }
        />
        <p className={eyebrowClass}>{eyebrow}</p>
        <span className={dividerClass} />
      </div>
      <h2 className={titleClass}>{title}</h2>
      <p className={copyClass}>{copy}</p>
    </Reveal>
  );
}
