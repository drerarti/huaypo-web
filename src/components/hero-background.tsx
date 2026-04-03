"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AmbientParticles } from "@/components/ambient-particles";
import { FloatingLayers } from "@/components/floating-layers";

type HeroBackgroundProps = {
  imageSrc?: string;
  imageAlt?: string;
  accent?: "forest" | "emerald";
};

const accentPresets = {
  forest: {
    overlay:
      "bg-[radial-gradient(circle_at_top_left,_rgba(211,192,143,0.18),_transparent_28%),radial-gradient(circle_at_78%_16%,_rgba(19,69,52,0.42),_transparent_34%),linear-gradient(135deg,_rgba(5,15,12,0.94),_rgba(7,23,18,0.72)_42%,_rgba(12,35,27,0.86)_100%)]",
    glow: "bg-[radial-gradient(circle,_rgba(208,192,143,0.16),_transparent_68%)]",
  },
  emerald: {
    overlay:
      "bg-[radial-gradient(circle_at_top_left,_rgba(208,192,143,0.16),_transparent_30%),radial-gradient(circle_at_80%_18%,_rgba(32,95,72,0.44),_transparent_36%),linear-gradient(135deg,_rgba(4,16,15,0.94),_rgba(6,26,23,0.74)_44%,_rgba(18,48,38,0.88)_100%)]",
    glow: "bg-[radial-gradient(circle,_rgba(62,111,86,0.2),_transparent_70%)]",
  },
} as const;

export function HeroBackground({
  imageSrc,
  imageAlt = "Alpinas Huaypo",
  accent = "forest",
}: HeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 900], [0, prefersReducedMotion ? 0 : 140]);
  const foregroundY = useTransform(scrollY, [0, 900], [0, prefersReducedMotion ? 0 : -48]);
  const scale = useTransform(scrollY, [0, 900], [1, prefersReducedMotion ? 1 : 1.08]);
  const preset = accentPresets[accent];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {imageSrc ? (
        <motion.div
          className="absolute inset-[-10%]"
          style={prefersReducedMotion ? undefined : { y: backgroundY, scale }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.62] saturate-[1.02]"
          />
        </motion.div>
      ) : null}

      <div className={`absolute inset-0 ${preset.overlay}`} />
      <motion.div
        className={`absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl md:h-[36rem] md:w-[36rem] ${preset.glow}`}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, 24, 0],
                x: [0, -16, 0],
                opacity: [0.5, 0.72, 0.5],
              }
        }
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-24 bottom-[-5%] h-[24rem] w-[24rem] rounded-full bg-[rgba(92,121,88,0.16)] blur-3xl md:h-[30rem] md:w-[30rem]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -22, 0],
                x: [0, 10, 0],
                opacity: [0.4, 0.62, 0.4],
              }
        }
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,_transparent_0%,_rgba(5,15,12,0.32)_34%,_rgba(5,15,12,0.92)_100%)]"
        style={prefersReducedMotion ? undefined : { y: foregroundY }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(247,243,233,0.03),_transparent_22%,_transparent_78%,_rgba(247,243,233,0.02))]" />

      <FloatingLayers accent={accent} />
      <AmbientParticles />
    </div>
  );
}
