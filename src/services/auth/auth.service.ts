import { authClient } from "@/lib/auth/auth-client";
import { type SignUpEmailValues } from "@/types/auth";

export const signUpUser = async (form: SignUpEmailValues) => {
    return authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
    });
};