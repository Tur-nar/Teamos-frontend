"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { slideUpVariants } from "@/animations/slide";

type SlideUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
};

export default function SlideUp({ children, className = "", delay = 0, duration = 0.4, distance = 24 }: SlideUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = useMemo(() => slideUpVariants(distance, duration), [distance, duration]);

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
