import { useMutation } from "@tanstack/react-query";

import { SignUpApi } from "@/lib/api/auth.api";
import type { SignUpEmailValues } from "@/types/auth";

export const useSignUp = () => {
    return useMutation({
        mutationFn: (form: SignUpEmailValues) => SignUpApi(form),
    });
};
