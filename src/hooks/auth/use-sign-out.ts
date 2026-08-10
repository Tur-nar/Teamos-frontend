import { useMutation } from "@tanstack/react-query";
import { signOutUser } from "@/services/auth/auth.service";

export function useSignOut() {
    return useMutation({
        mutationFn: () => signOutUser(),
    });
}
