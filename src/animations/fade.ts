import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeInVariants = (distance = 24, duration = 0.45): Variants => ({
  hidden: { opacity: 0, y: distance, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration, ease },
  },
});

export const simpleFadeVariants = (duration = 0.45): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease } },
});
