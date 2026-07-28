"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { fadeInVariants } from "@/animations/fade";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.45,
  distance = 24,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = useMemo(() => fadeInVariants(distance, duration), [distance, duration]);

  return (
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
