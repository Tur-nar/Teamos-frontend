"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { simpleFadeVariants } from "@/animations/fade";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export default function FadeIn({ children, className = "", delay = 0, duration = 0.4 }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = useMemo(() => simpleFadeVariants(duration), [duration]);

  return (
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
