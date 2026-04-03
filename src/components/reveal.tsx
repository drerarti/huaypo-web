"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "ul"
  | "li";

type RevealProps = {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  blur?: number;
} & HTMLAttributes<HTMLElement> &
  MotionProps;

const motionComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  aside: motion.aside,
  ul: motion.ul,
  li: motion.li,
} as const;

export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  distance = 30,
  once = true,
  blur = 12,
  style,
  transition,
  ...props
}: RevealProps) {
  const Component = motionComponents[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: distance, scale: 0.985, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -10% 0px", amount: 0.18 }}
      transition={{
        duration: 0.95,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
        ...transition,
      }}
      className={className}
      style={style as CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}
