"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NavbarAuth() {
    return (
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
                <Link href={ROUTES.auth.signIn}>
                    Login
                </Link>
            </Button>

            <Button asChild>
                <Link href={ROUTES.auth.signUp}>
                    Get Started
                </Link>
            </Button>
        </div>
    );
}