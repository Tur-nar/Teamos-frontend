import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/services/auth/auth.service";
import type { SignInEmailValues } from "@/types/auth";

export function useSignIn() {
    return useMutation({
        mutationFn: (form: SignInEmailValues) => signInUser(form),
    });
}
