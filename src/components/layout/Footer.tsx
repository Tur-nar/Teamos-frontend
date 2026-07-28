"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Reveal from "@/components/common/Reveal";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center md:text-left">
          <div className="mb-4 flex items-center justify-center md:justify-start">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="ml-2 text-2xl font-bold tracking-tight text-primary">TM-Management</h3>
          </div>
          <p className="text-muted-foreground">
            Modern workspace for organizations to manage projects, collaborate with teams and improve productivity.
          </p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-lg font-bold text-foreground">Quick Links</h3>
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Home</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Features</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">How It Works</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Reviews</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Login</motion.a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-lg font-bold text-foreground">Product</h3>
          <div className="flex flex-col space-y-2">
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Pricing</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">FAQ</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Request Demo</motion.a>
            <motion.a whileHover={{ x: 2, color: "var(--primary)" }} href="#" className="text-muted-foreground transition-colors duration-300">Support</motion.a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-lg font-bold text-foreground">Contact Us</h3>
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <p className="text-muted-foreground">Email: support@tm-management.com</p>
            <p className="text-muted-foreground">Phone: +234 XXX XXX XXXX</p>
            <p className="text-muted-foreground">Abuja, Nigeria</p>
          </div>
        </div>
      </Reveal>
      <div className="mx-auto mt-8 max-w-7xl border-t border-gray-800 pt-8">
        <p className="mt-8 text-center text-muted-foreground">&copy; {new Date().getFullYear()} TM-Management. Built for modern organizations. All rights reserved.</p>
      </div>
    </footer>
  );
}