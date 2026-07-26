"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import NavbarAuth from "@/components/auth/AuthButtons";
import Link from "next/link";

const NAV_LINKS = [
    {
        label: "Features",
        href: "#features",
    },
    {
        label: "How it Works",
        href: "#how-it-works",
    },
    {
        label: "Pricing",
        href: "#pricing",
    },
    {
        label: "FAQ",
        href: "#faq",
    },
];
export default function Navbar() {
    return (
    <>
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/70">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <div><h2 className="text-xl font-extrabold tracking-tight text-primary transition-colors duration-300 cursor-pointer"><a href="#">TM-Management</a></h2></div>

                <ul className="flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <li className="transition-colors duration-300 hover:text-primary cursor-pointer" key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <NavbarAuth />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    </>
    );
}