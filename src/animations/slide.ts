import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const slideUpVariants = (distance = 24, duration = 0.45): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
});

export const slideInLeftVariants = (distance = 18, duration = 0.4): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease },
  },
});
