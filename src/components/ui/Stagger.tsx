"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { staggerContainerVariants, staggerItemVariants } from "@/animations/stagger";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  distance?: number;
};

export default function Stagger({ children, className = "", delay = 0, stagger = 0.1, duration = 0.35, distance = 16 }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  const container = useMemo(() => staggerContainerVariants(stagger, delay), [delay, stagger]);
  const item = useMemo(() => staggerItemVariants(distance, duration), [distance, duration]);

  return (
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={item}>{children}</motion.div>
          )}
    </motion.div>
  );
}
