"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavbarAuth() {
    const isLoading = false;
    const isAuthenticated = false;

    if (isLoading) {
        return (
            <div className="flex items-center w-24 justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-2">
                <Button asChild>
                    <Link href="/profile">👤 Profile ▼</Link>
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {}}
                >
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="default">
                <Link href="/sign-up">Get Started</Link>
            </Button>
        </div>
    );
}