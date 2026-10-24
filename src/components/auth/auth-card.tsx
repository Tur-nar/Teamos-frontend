"use client";

import { motion } from "framer-motion";

type AuthCardProps = {
  children: React.ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-2xl border border-border/70 bg-card/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10"
    >
      {children}
    </motion.div>
  );
}