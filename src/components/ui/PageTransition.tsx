"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pageTransitionVariants } from "@/animations/page-transition";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : "initial"}
      animate={shouldReduceMotion ? undefined : "animate"}
      variants={pageTransitionVariants}
    >
      {children}
    </motion.div>
  );
}
