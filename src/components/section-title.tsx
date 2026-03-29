type SectionTitleProps = {
  eyebrow: string;
  title: string;
  copy: string;
  tone?: "dark" | "light";
};

export function SectionTitle({
  eyebrow,
  title,
  copy,
  tone = "dark",
}: SectionTitleProps) {
  const eyebrowClass =
    tone === "light"
      ? "text-xs uppercase tracking-[0.35em] text-amber-200"
      : "text-xs uppercase tracking-[0.35em] text-amber-700";
  const titleClass =
    tone === "light"
      ? "mt-3 font-serif text-3xl leading-tight text-stone-50 sm:text-4xl md:text-5xl"
      : "mt-3 font-serif text-3xl leading-tight text-stone-900 sm:text-4xl md:text-5xl";
  const copyClass =
    tone === "light"
      ? "mt-4 text-base leading-7 text-stone-300 md:text-lg md:leading-8"
      : "mt-4 text-base leading-7 text-stone-600 md:text-lg md:leading-8";

  return (
    <div className="max-w-2xl">
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={titleClass}>{title}</h2>
      <p className={copyClass}>{copy}</p>
    </div>
  );
}
