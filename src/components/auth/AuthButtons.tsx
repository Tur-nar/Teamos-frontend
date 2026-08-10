"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useAuth } from "@/hooks/use-auth";

export default function NavbarAuth() {
    const { user, loading, refreshSession } = useAuth();
    const signOut = useSignOut();
    const isBusy = loading || signOut.isPending;

    const handleLogout = async () => {
        if (signOut.isPending) {
            return;
        }

        await signOut.mutateAsync();
        await refreshSession();
    };

    if (isBusy) {
        return (
            <div className="flex items-center justify-center w-24">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary" />
            </div>
        );
    }

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <Button asChild>
                    <Link href={ROUTES.dashboard}>
                        Dashboard
                    </Link>
                </Button>

                <Button
                    variant="ghost"
                    onClick={() => void handleLogout()}
                    disabled={signOut.isPending}
                >
                    Logout
                </Button>
            </div>
        );
    }

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