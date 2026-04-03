"use client";

import { motion } from "framer-motion";

type FloatingLayersProps = {
  accent?: "forest" | "emerald";
};

const accentStyles = {
  forest: {
    panel: "border-white/10 bg-white/[0.05]",
    glow: "bg-[rgba(208,192,143,0.18)]",
  },
  emerald: {
    panel: "border-emerald-100/10 bg-emerald-50/[0.05]",
    glow: "bg-[rgba(62,111,86,0.22)]",
  },
} as const;

export function FloatingLayers({ accent = "forest" }: FloatingLayersProps) {
  const tone = accentStyles[accent];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute -left-12 top-[18%] hidden h-40 w-40 rounded-[2rem] border ${tone.panel} blur-[0.2px] lg:block`}
        animate={{ y: [0, -18, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute right-[8%] top-[14%] h-28 w-28 rounded-full ${tone.glow} blur-3xl md:h-40 md:w-40`}
        animate={{ y: [0, 16, 0], x: [0, -10, 0], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-[18%] left-[16%] hidden h-32 w-56 rounded-[2rem] border ${tone.panel} md:block`}
        animate={{ y: [0, 14, 0], rotate: [0, 2.2, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[14%] h-24 w-24 rounded-full border border-[rgba(247,243,233,0.14)] bg-[rgba(247,243,233,0.05)] blur-[0.4px] md:h-32 md:w-32"
        animate={{ y: [0, -12, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
