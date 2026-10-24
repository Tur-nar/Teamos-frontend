"use client";

import { motion, useReducedMotion } from "framer-motion";

type FloatingProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
};

export default function Floating({ children, className = "", duration = 5.6, distance = 10 }: FloatingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={shouldReduceMotion ? undefined : { y: [0, -distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
