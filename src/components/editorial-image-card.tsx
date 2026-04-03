import Image from "next/image";

type EditorialImageCardProps = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy?: string;
  badges?: string[];
  priority?: boolean;
  heightClassName?: string;
  className?: string;
};

export function EditorialImageCard({
  src,
  alt,
  eyebrow,
  title,
  copy,
  badges,
  priority = false,
  heightClassName = "h-80 md:h-[30rem]",
  className = "",
}: EditorialImageCardProps) {
  return (
    <div
      className={`group lux-card-dark lux-outline relative min-w-0 overflow-hidden rounded-[2.5rem] p-3 sm:p-4 shadow-[0_36px_120px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_42px_132px_rgba(0,0,0,0.34)] ${className}`}
    >
      <div className={`relative overflow-hidden rounded-[2rem] ${heightClassName}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover object-center transition duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(4,10,9,0.06),_rgba(4,10,9,0.84))]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,_rgba(4,10,9,0.5),_transparent)]" />
        <div className="absolute left-5 top-5 h-px w-12 bg-[linear-gradient(90deg,_rgba(247,243,233,0.84),_transparent)] sm:left-6 sm:top-6 sm:w-14" />
        <div className="absolute right-4 top-4 h-11 w-11 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm sm:right-6 sm:top-6 sm:h-14 sm:w-14" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#D8C69E] sm:text-[11px] sm:tracking-[0.34em]">
            {eyebrow}
          </p>
          <h3 className="mt-4 max-w-xl break-words font-serif text-[2rem] leading-tight text-[#FAF9F6] sm:text-[2.35rem] md:text-4xl">
            {title}
          </h3>
          {copy ? <p className="mt-4 max-w-lg leading-7 text-[#E4DDCF] sm:leading-8">{copy}</p> : null}
          {badges?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="glass-pill rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#EFE3C6] sm:tracking-[0.3em]"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
