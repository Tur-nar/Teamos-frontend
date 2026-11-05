"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/providers/auth-provider";
import { useAcceptInvitation, useInvitations } from "@/features/organizations/hooks/use-invitations";

type InvitationAcceptanceProps = { invitationId: string };

export function InvitationAcceptance({ invitationId }: InvitationAcceptanceProps) {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const invitations = useInvitations();
  const acceptInvitation = useAcceptInvitation();

  useEffect(() => {
    if (!authLoading && !authError && !user) {
      const returnTo = `/invite/${encodeURIComponent(invitationId)}`;
      router.replace(`/sign-in?returnTo=${encodeURIComponent(returnTo)}`);
    }
  }, [authError, authLoading, invitationId, router, user]);

  const invitation = invitations.data?.find((item) => item.id === invitationId);

  async function handleAccept() {
    if (!invitation) return;
    try {
      await acceptInvitation.accept({
        invitationId: invitation.id,
        organizationId: invitation.organizationId,
      });
      router.replace("/dashboard");
    } catch {
      return;
    }
  }

  if (authError) {
    return <MessagePanel message="We could not check your session. Refresh and try again." isError />;
  }
  if (authLoading || !user) {
    return <MessagePanel message="Checking your session..." />;
  }
  if (!user.emailVerified) {
    return <MessagePanel message="Verify the invited email address, then sign in again to continue." isError />;
  }
  if (invitations.isPending) {
    return <MessagePanel message="Loading invitation..." />;
  }
  if (invitations.isError) {
    return <MessagePanel message="We could not load this invitation. Refresh and try again." isError />;
  }
  if (!invitation) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7f4] px-5 text-[#17251c]">
        <section className="w-full max-w-lg border border-[#d9e0d9] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase text-[#3a7552]">TeamOS / Invitation</p>
          <h1 className="mt-3 text-2xl font-semibold">Invitation unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-[#667168]">This invitation is not in the pending invitations for {user.email}. Sign in with the invited email address or ask the organization owner to send a new invitation.</p>
          <Link className="mt-6 inline-flex h-10 items-center rounded bg-[#22583a] px-4 text-sm font-semibold text-white hover:bg-[#19472e]" href="/onboarding">View invitations</Link>
        </section>
      </main>
    );
  }

  if (invitation.status !== "pending") {
    return <MessagePanel message="This invitation is no longer pending." isError />;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7f4] px-5 py-10 text-[#17251c]">
      <section className="w-full max-w-lg border border-[#d9e0d9] bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase text-[#3a7552]">TeamOS / Invitation</p>
        <h1 className="mt-3 text-2xl font-semibold">Join {invitation.organizationName}</h1>
        <p className="mt-3 text-sm leading-6 text-[#667168]">You have been invited as <span className="font-semibold text-[#17251c]">{invitation.role}</span>. Accepting this invitation will make this organization your active workspace.</p>
        {acceptInvitation.error && <p className="mt-5 rounded border border-[#d6aaa0] bg-[#fff4f1] px-3 py-2.5 text-sm text-[#8a3527]" role="alert">{acceptInvitation.error instanceof Error ? acceptInvitation.error.message : "Could not accept invitation. Try again."}</p>}
        <button className="mt-7 flex h-11 w-full items-center justify-center rounded bg-[#22583a] px-4 text-sm font-semibold text-white hover:bg-[#19472e] disabled:cursor-not-allowed disabled:opacity-60" disabled={acceptInvitation.isPending} onClick={handleAccept} type="button">
          {acceptInvitation.isPending ? "Joining organization..." : "Accept invitation"}
        </button>
      </section>
    </main>
  );
}

function MessagePanel({ message, isError = false }: { message: string; isError?: boolean }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7f4] px-6 text-center text-sm" aria-live="polite">
      <p className={isError ? "text-[#8a3527]" : "text-[#58645c]"} role={isError ? "alert" : undefined}>{message}</p>
    </main>
  );
}