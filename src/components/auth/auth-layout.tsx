"use client";

import { motion } from "framer-motion";
import BrandPanel from "./brand-panel";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10">

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.35, 0.5, 0.35],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute left-0 top-0 h-105 w-105 rounded-full brand-bg opacity-10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-105 w-105 rounded-full bg-accent opacity-50 blur-3xl" />
      </motion.div>

      <div className="relative grid w-full max-w-7xl gap-10 lg:grid-cols-2">

        <BrandPanel />

        <section className="flex items-center justify-center">
          {children}
        </section>

      </div>
    </main>
  );
}