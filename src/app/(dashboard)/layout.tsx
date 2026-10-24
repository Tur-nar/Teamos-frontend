"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, asSessionUser } from "@/lib/auth/auth-client";
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
    const user = asSessionUser(session?.user);

    const {
        data: organizations,
        isLoading: orgsLoading,
        isSuccess: orgsLoaded,
    } = useListOrganizations(hasSession);

    const isReady = !sessionPending && !orgsLoading;
    const needsSignIn = isReady && !session;
    const needsOnboarding = isReady && hasSession && orgsLoaded && (
        (organizations && organizations.length === 0) || user?.onboarded === false
    );

    useEffect(() => {
        if (needsSignIn) {
            router.replace(ROUTES.auth.signIn);
        } else if (needsOnboarding) {
            router.replace(ROUTES.onboarding);
        }
    }, [needsSignIn, needsOnboarding, router]);

    if (!isReady || needsSignIn || needsOnboarding) {
        return <SessionLoader />;
    }

    return <>{children}</>;
}
