"use client";

import { motion } from "framer-motion";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_45%)]"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative w-full max-w-6xl">{children}</div>
    </main>
  );
}