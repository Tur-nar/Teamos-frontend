"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { onboardingService } from "@/features/onboarding/services/onboarding.service";
import { organizationService } from "@/features/organizations/services/organization.service";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { ORGANIZATIONS_QUERY_KEY, SESSION_QUERY_KEY } from "@/lib/query-keys";

export type CreateOrganizationInput = {
  name: string;
  slug: string;
  brandColor?: string;
  logoFile?: File;
};

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  const { refreshSession } = useAuth();
  const [progress, setProgress] = useState<{ organizationId: string; active: boolean; sessionSynced: boolean } | null>(null);

  const createMutation = useMutation({
    mutationFn: async ({ name, slug, brandColor, logoFile }: CreateOrganizationInput) => {
      let logo: string | undefined;
      if (logoFile) {
        try {
          logo = await onboardingService.uploadOrganizationLogo(logoFile);
        } catch (error) {
          throw new Error(`Logo upload failed: ${error instanceof Error ? error.message : "Please try again."}`);
        }
      }

      try {
        return await organizationService.create({
          name,
          slug,
          ...(logo ? { logo } : {}),
          ...(brandColor ? { brandColor } : {}),
        });
      } catch (error) {
        throw new Error(`Organization creation failed: ${error instanceof Error ? error.message : "Please try again."}`);
      }
    },
    onSuccess: async (organization) => {
      setProgress({ organizationId: organization.id, active: false, sessionSynced: false });
      await queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
  });

  const activateMutation = useMutation({
    mutationFn: async (organizationId: string) => {
      try {
        await organizationService.setActive(organizationId);
      } catch (error) {
        throw new Error(`Organization was created, but could not be set as active: ${error instanceof Error ? error.message : "Please try again."}`);
      }
    },
    onSuccess: async (_, organizationId) => {
      setProgress({ organizationId, active: true, sessionSynced: false });
      await refreshSession();
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      setProgress({ organizationId, active: true, sessionSynced: true });
    },
  });

  const completionMutation = useMutation({
    mutationFn: async () => {
      try {
        return await onboardingService.completeOnboarding();
      } catch (error) {
        throw new Error(`Organization is active, but onboarding could not be completed: ${error instanceof Error ? error.message : "Please try again."}`);
      }
    },
    onSuccess: async () => {
      await Promise.all([
        refreshSession(),
        queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY }),
      ]);
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      setProgress(null);
    },
  });

  async function submit(input: CreateOrganizationInput) {
    let organizationId = progress?.organizationId;
    let active = progress?.active ?? false;
    let sessionSynced = progress?.sessionSynced ?? false;

    if (!organizationId) {
      const organization = await createMutation.mutateAsync(input);
      organizationId = organization.id;
      active = false;
      sessionSynced = false;
    }

    if (!active) {
      await activateMutation.mutateAsync(organizationId);
      active = true;
      sessionSynced = true;
    } else if (!sessionSynced) {
      await refreshSession();
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      setProgress({ organizationId, active: true, sessionSynced: true });
      sessionSynced = true;
    }

  }

  async function complete() {
    await completionMutation.mutateAsync();
  }

  return {
    submit,
    complete,
    isPending: createMutation.isPending || activateMutation.isPending,
    isCompleting: completionMutation.isPending,
    error: completionMutation.error ?? activateMutation.error ?? createMutation.error,
    retrying: Boolean(progress),
    progress,
  };
}