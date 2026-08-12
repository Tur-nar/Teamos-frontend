"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/auth-client";
import { ROUTES } from "@/constants/routes";
import { useListOrganizations } from "@/hooks/organization/use-list-organizations";
import SessionLoader from "@/components/shared/session-loader";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const hasSession = Boolean(session);

    const {
        data: organizations,
        isLoading: orgsLoading,
        isSuccess: orgsLoaded,
    } = useListOrganizations(hasSession);

    useEffect(() => {
        if (!sessionPending && !session) {
            router.replace(ROUTES.auth.signIn);
            return;
        }

        if (hasSession && orgsLoaded && organizations && organizations.length === 0) {
            router.replace(ROUTES.onboarding);
        }
    }, [sessionPending, session, hasSession, orgsLoaded, organizations, router]);

    if (sessionPending || !session || orgsLoading) {
        return (
            <SessionLoader />
        );
    }

    if (organizations && organizations.length === 0) {
        return null;
    }

    return <>{children}</>;
}
