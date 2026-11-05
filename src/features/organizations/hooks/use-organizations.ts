"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/features/organizations/services/organization.service";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { ORGANIZATIONS_QUERY_KEY } from "@/lib/query-keys";

export function useOrganizations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ORGANIZATIONS_QUERY_KEY,
    queryFn: organizationService.list,
    enabled: Boolean(user),
    retry: false,
  });
}