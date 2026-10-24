import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const staggerContainerVariants = (stagger = 0.12, delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

export const staggerItemVariants = (distance = 16, duration = 0.4): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
});
