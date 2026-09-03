import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth/auth-client";
import { CompleteOnboardingApi } from "@/lib/api/upload.api";

/**
 * Marks the current user's onboarding as complete.
 * Also refreshes the Better Auth session so session.user.onboarded updates immediately.
 */
export const useCompleteOnboarding = () => {
    return useMutation({
        mutationFn: async () => {
            await CompleteOnboardingApi();
            // Refresh session so onboarded=true is reflected in useSession() immediately.
            await authClient.getSession({ fetchOptions: { cache: "no-store" } });
        },
    });
};
