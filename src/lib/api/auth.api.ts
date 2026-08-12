import { authClient } from "@/lib/auth/auth-client";
import type { SignInEmailValues, SignUpEmailValues } from "@/types/auth";

export const SignUpApi = async (form: SignUpEmailValues) => {
    return authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
    });
};

export const SignInApi = async (form: SignInEmailValues) => {
    return authClient.signIn.email({
        email: form.email,
        password: form.password,
    });
};
