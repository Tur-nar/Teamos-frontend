"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/auth-client";
import { ROUTES } from "@/constants/routes";
import SessionLoader from "@/components/shared/session-loader";

export default function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace(ROUTES.auth.signIn);
        }
    }, [isPending, session, router]);

    if (isPending || !session) {
        return <SessionLoader />;
    }

    return <>{children}</>;
}
