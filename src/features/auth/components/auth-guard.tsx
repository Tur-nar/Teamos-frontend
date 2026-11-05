"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/providers/auth-provider";

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !error && !user) {
      router.replace("/sign-in");
    }
  }, [error, loading, router, user]);

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7f4] px-6 text-center text-sm text-[#8a3527]" role="alert">
        We couldn&apos;t check your session. Refresh the page to try again.
      </main>
    );
  }

  if (loading || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7f4] px-6 text-sm text-[#58645c]" aria-live="polite">
        Checking your session...
      </main>
    );
  }

  return children;
}