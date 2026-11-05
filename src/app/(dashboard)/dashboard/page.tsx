"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthGuard } from "@/features/auth/components/auth-guard";
import { useSignOut } from "@/features/auth/hooks/use-auth-actions";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { useOrganizations } from "@/features/organizations/hooks/use-organizations";

function DashboardContent() {
  const { user } = useAuth();
  const organizations = useOrganizations();
  const signOut = useSignOut();
  const router = useRouter();

  useEffect(() => {
    if (user && !organizations.isPending && !organizations.isError && (!user.onboarded || organizations.data.length === 0)) {
      router.replace("/onboarding");
    }
  }, [organizations.data, organizations.isError, organizations.isPending, router, user]);

  if (organizations.isPending || (!organizations.isError && (!user?.onboarded || organizations.data.length === 0))) {
    return <main className="grid min-h-screen place-items-center bg-[#f5f7f4] text-sm text-[#58645c]" aria-live="polite">Loading your workspace...</main>;
  }

  if (organizations.isError) {
    return <main className="grid min-h-screen place-items-center bg-[#f5f7f4] px-6 text-sm text-[#8a3527]">Unable to load your organizations. Refresh and try again.</main>;
  }

  return (
    <main className="min-h-screen bg-[#f5f7f4] px-6 py-8 text-[#17251c] sm:px-10">
      <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-[#d9e0d9] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase text-[#3a7552]">TeamOS</p>
          <h1 className="mt-1 text-xl font-semibold">Workspace</h1>
        </div>
        <button className="rounded border border-[#cdd5ce] bg-white px-3 py-2 text-sm font-medium hover:bg-[#edf2ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22583a] disabled:opacity-60" disabled={signOut.isPending} onClick={() => signOut.mutate(undefined, { onSuccess: () => router.replace("/sign-in") })} type="button">
          {signOut.isPending ? "Signing out..." : "Sign out"}
        </button>
      </header>
      <section className="mx-auto max-w-5xl py-12">
        <p className="text-sm text-[#667168]">Signed in as {user?.name}</p>
        <h2 className="mt-2 text-3xl font-semibold">Your workspace is ready.</h2>
        <ul className="mt-8 divide-y divide-[#d9e0d9] border-y border-[#d9e0d9]">
          {organizations.data.map((organization) => (
            <li className="flex flex-wrap items-center justify-between gap-2 py-4" key={organization.id}>
              <span className="font-medium">{organization.name}</span>
              <span className="text-sm text-[#667168]">{organization.slug}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return <AuthGuard><DashboardContent /></AuthGuard>;
}
