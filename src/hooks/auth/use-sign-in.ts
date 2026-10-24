import { useMutation } from "@tanstack/react-query";

import { SignInApi } from "@/lib/api/auth.api";
import type { SignInEmailValues } from "@/types/auth";

export const useSignIn = () => {
    return useMutation({
        mutationFn: (form: SignInEmailValues) => SignInApi(form),
    });
};
