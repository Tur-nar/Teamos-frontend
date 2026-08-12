"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/auth-client";
import { ROUTES } from "@/constants/routes";
import AuthLayout from "@/components/auth/auth-layout";
import SessionLoader from "@/components/shared/session-loader";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && session) {
            router.replace(ROUTES.dashboard);
        }
    }, [isPending, session, router]);

    if (isPending) {
        return <SessionLoader />;
    }

    if (session) {
        return null;
    }

    return <AuthLayout>{children}</AuthLayout>;
}