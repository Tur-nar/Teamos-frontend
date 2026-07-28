import type { Variants } from "framer-motion";

export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 16px 45px rgba(15, 23, 42, 0.06)",
  },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: "0 24px 60px rgba(34, 211, 238, 0.14)",
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};

export const buttonHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 10px 30px rgba(34, 211, 238, 0.16)",
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: "0 18px 44px rgba(34, 211, 238, 0.24)",
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};
