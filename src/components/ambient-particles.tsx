"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "8%", top: "18%", size: 10, duration: 10 },
  { left: "18%", top: "62%", size: 6, duration: 12 },
  { left: "30%", top: "28%", size: 8, duration: 14 },
  { left: "48%", top: "16%", size: 12, duration: 16 },
  { left: "62%", top: "72%", size: 7, duration: 13 },
  { left: "74%", top: "34%", size: 9, duration: 15 },
  { left: "84%", top: "56%", size: 11, duration: 11 },
];

export function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-[radial-gradient(circle,_rgba(248,243,233,0.9)_0%,_rgba(208,192,143,0.38)_48%,_transparent_100%)] blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            opacity: [0.18, 0.55, 0.18],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
