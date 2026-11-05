"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { ORGANIZATIONS_QUERY_KEY, SESSION_QUERY_KEY } from "@/lib/query-keys";

export function useSignIn() {
  const queryClient = useQueryClient();
  const { refreshSession } = useAuth();
  return useMutation({
    mutationFn: async (input: Parameters<typeof authService.signIn>[0]) => {
      await authService.signIn(input);
      await refreshSession();
      return queryClient.getQueryData<Awaited<ReturnType<typeof authService.getSession>>>(SESSION_QUERY_KEY) ?? null;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
    },
  });
}

export function useSignUp() {
  return useMutation({ mutationFn: authService.signUp });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(SESSION_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
  });
}