"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  INVITATIONS_QUERY_KEY,
  ORGANIZATIONS_QUERY_KEY,
} from "@/lib/query/query-keys";
import {
  acceptInvitation as acceptInvitationApi,
  createOrganization as createOrganizationApi,
  listOrganizations,
  listUserInvitations,
  setActiveOrganization as setActiveOrganizationApi,
} from "@/services/organization/organization.service";
import type { OrganizationSummary, UserInvitation } from "@/types/organization";

export function useOrganizations() {
  const queryClient = useQueryClient();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    data: organizations = [],
    isLoading: isLoadingOrganizations,
    error: orgsError,
    refetch: refetchOrganizations,
  } = useQuery<OrganizationSummary[]>({
    queryKey: ORGANIZATIONS_QUERY_KEY,
    queryFn: listOrganizations,
    enabled: Boolean(user),
  });

  const {
    data: pendingInvitations = [],
    isLoading: isLoadingInvitations,
    error: invsError,
    refetch: refetchInvitations,
  } = useQuery<UserInvitation[]>({
    queryKey: INVITATIONS_QUERY_KEY,
    queryFn: listUserInvitations,
    enabled: Boolean(user),
  });

  const createMutation = useMutation<
    OrganizationSummary,
    Error,
    { name: string; slug: string }
  >({
    mutationFn: async ({ name, slug }) => {
      setError(null);
      const newOrg = await createOrganizationApi({ name, slug });

      if (newOrg.id) {
        await setActiveOrganizationApi({ organizationId: newOrg.id });
      }

      return newOrg;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY });
    },
    onError: (err) => {
      setError(err.message ?? "Failed to create organization.");
    },
  });

  const acceptMutation = useMutation<unknown, Error, string>({
    mutationFn: async (invitationId: string) => {
      setError(null);
      const result = await acceptInvitationApi({ invitationId });

      const targetInvitation = pendingInvitations.find((inv) => inv.id === invitationId);

      if (targetInvitation?.organizationId) {
        await setActiveOrganizationApi({ organizationId: targetInvitation.organizationId });
      }

      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY });
    },
    onError: (err) => {
      setError(err.message ?? "Failed to accept invitation.");
    },
  });

  const setActiveMutation = useMutation<unknown, Error, string | null>({
    mutationFn: async (organizationId: string | null) => {
      setError(null);
      return setActiveOrganizationApi({ organizationId });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
    onError: (err) => {
      setError(err.message ?? "Failed to set active organization.");
    },
  });

  const createOrganization = async (
    name: string,
    slug: string,
  ): Promise<OrganizationSummary | null> => {
    try {
      return await createMutation.mutateAsync({ name, slug });
    } catch {
      return null;
    }
  };

  const acceptInvitation = async (invitationId: string): Promise<unknown> => {
    try {
      return await acceptMutation.mutateAsync(invitationId);
    } catch {
      return null;
    }
  };

  const setActiveOrganization = async (
    organizationId: string | null,
  ): Promise<unknown> => {
    try {
      return await setActiveMutation.mutateAsync(organizationId);
    } catch {
      return null;
    }
  };

  const hasOrganizations = organizations.length > 0;
  const hasPendingInvitations = pendingInvitations.length > 0;
  const combinedError =
    error ??
    (orgsError ? orgsError.message : null) ??
    (invsError ? invsError.message : null);

  return {
    user,
    loading: authLoading,
    organizations,
    hasOrganizations,
    pendingInvitations,
    hasPendingInvitations,

    isLoadingOrganizations,
    isLoadingInvitations,
    isCreating: createMutation.isPending,
    isAccepting: acceptMutation.isPending,
    isSettingActive: setActiveMutation.isPending,

    error: combinedError,

    createOrganization,
    acceptInvitation,
    setActiveOrganization,
    refetchOrganizations,
    refetchInvitations,
  };
}
