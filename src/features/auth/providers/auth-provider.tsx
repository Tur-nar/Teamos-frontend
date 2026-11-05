"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import { authService } from "@/features/auth/services/auth.service";
import { SESSION_QUERY_KEY } from "@/lib/query-keys";
import type { Session, User } from "@/lib/auth/auth-client";

export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const sessionQuery = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: authService.getSession,
    retry: false,
  });

  async function refreshSession() {
    const result = await sessionQuery.refetch();
    if (result.error) {
      throw result.error;
    }
  }

  const value: AuthContextValue = {
    session: sessionQuery.data?.session ?? null,
    user: sessionQuery.data?.user ?? null,
    loading: sessionQuery.isPending,
    error: sessionQuery.error,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}