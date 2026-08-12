import { useMutation, useQueryClient } from "@tanstack/react-query";

import { organizationKeys } from "@/constants/query-keys";
import { CreateOrganizationApi } from "@/lib/api/organization.api";
import type { CreateOrganizationValues } from "@/types/auth";

export const useCreateOrganization = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOrganizationValues) => CreateOrganizationApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: organizationKeys.all });
        },
    });
};
