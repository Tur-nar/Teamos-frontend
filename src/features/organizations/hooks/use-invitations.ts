"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { organizationService, type InvitationRole } from "@/features/organizations/services/organization.service";
import { onboardingService } from "@/features/onboarding/services/onboarding.service";
import { INVITATIONS_QUERY_KEY, ORGANIZATIONS_QUERY_KEY, SESSION_QUERY_KEY } from "@/lib/query-keys";

export function useInvitations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: INVITATIONS_QUERY_KEY,
    queryFn: organizationService.listUserInvitations,
    enabled: Boolean(user?.emailVerified),
    retry: false,
  });
}

export function useInviteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { email: string; role: InvitationRole }) => organizationService.inviteMember(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
  });
}

type AcceptProgress = {
  invitationId: string;
  organizationId: string;
  accepted: boolean;
  active: boolean;
  sessionSynced: boolean;
  completed: boolean;
};

export function useAcceptInvitation() {
  const queryClient = useQueryClient();
  const { refreshSession } = useAuth();
  const progressRef = useRef<AcceptProgress | null>(null);
  const [progress, setProgress] = useState<AcceptProgress | null>(null);
  const acceptingRef = useRef(false);

  function updateProgress(next: AcceptProgress | null) {
    progressRef.current = next;
    setProgress(next);
  }

  const acceptMutation = useMutation({
    mutationFn: ({ invitationId }: { invitationId: string; organizationId: string }) =>
      organizationService.acceptInvitation(invitationId),
    onSuccess: async (_, input) => {
      updateProgress({ ...input, accepted: true, active: false, sessionSynced: false, completed: false });
    },
  });
  const activateMutation = useMutation({
    mutationFn: ({ organizationId }: { invitationId: string; organizationId: string }) =>
      organizationService.setActive(organizationId),
    onSuccess: async (_, input) => {
      updateProgress({ ...input, accepted: true, active: true, sessionSynced: false, completed: false });
      await refreshSession();
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      updateProgress({ ...input, accepted: true, active: true, sessionSynced: true, completed: false });
    },
  });
  const completionMutation = useMutation({
    mutationFn: onboardingService.completeOnboarding,
    onSuccess: async () => {
      await Promise.all([
        refreshSession(),
        queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY }),
      ]);
    },
  });

  async function accept(input: { invitationId: string; organizationId: string }) {
    if (acceptingRef.current) return;
    acceptingRef.current = true;
    try {
      const current = progressRef.current;
      const same = current?.invitationId === input.invitationId ? current : null;
      let accepted = same?.accepted ?? false;
      let active = same?.active ?? false;
      let sessionSynced = same?.sessionSynced ?? false;
      const completed = same?.completed ?? false;

      if (completed) return;

      if (!accepted) {
        await acceptMutation.mutateAsync(input);
        accepted = true;
      }
      if (!active) {
        await activateMutation.mutateAsync(input);
        active = true;
        sessionSynced = true;
      } else if (!sessionSynced) {
        await refreshSession();
        await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
        const base = progressRef.current ?? { ...input, accepted: true, active: true, sessionSynced: false, completed: false };
        updateProgress({ ...base, sessionSynced: true, completed: false });
        sessionSynced = true;
      }
      if (!completed) {
        await completionMutation.mutateAsync();
        const base = progressRef.current ?? { ...input, accepted: true, active: true, sessionSynced: true, completed: false };
        updateProgress({ ...base, completed: true, sessionSynced: true });
      }
    } finally {
      acceptingRef.current = false;
    }
  }

  return {
    accept,
    progress,
    isPending: acceptMutation.isPending || activateMutation.isPending || completionMutation.isPending,
    error: completionMutation.error ?? activateMutation.error ?? acceptMutation.error,
  };
}
