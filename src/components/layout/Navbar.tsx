"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import NavbarAuth from "@/components/auth/AuthButtons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > 8));

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b border-border/70 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          : "bg-background/70 py-3 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div whileHover={{ scale: 1.03, y: -1 }}>
          <Link href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-md text-primary font-bold tracking-[0.2em] uppercase">TM-<span className="text-base font-semibold tracking-tight text-primary">Management</span></p>
            </div>
          </Link>
        </motion.div>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <motion.li key={link.href} whileHover={{ y: -1, scale: 1.01 }} className="group relative">
              <Link
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <motion.div whileHover={{ scale: 1.02, y: -1 }}>
            <NavbarAuth />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -1 }}>
            <ThemeToggle />
          </motion.div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">            
              <DropdownMenuItem asChild>
                <Link href={ROUTES.auth.signIn} className="w-full">
                  Sign-In
                 </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.auth.signUp} className="w-full">
                  Get Started
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
}