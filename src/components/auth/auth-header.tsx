"use client";

import { motion } from "framer-motion";

type AuthHeaderProps = {
  title: string;
  description: string;
};

export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 space-y-2 text-center"
    >
      <h1 className="text-3xl font-bold tracking-tight text-card-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}