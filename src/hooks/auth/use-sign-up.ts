import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/services/auth/auth.service";
import type { SignUpEmailValues } from "@/types/auth";

export function useSignUp() {
    return useMutation({
        mutationFn: (form: SignUpEmailValues) => signUpUser(form),
    });
}
