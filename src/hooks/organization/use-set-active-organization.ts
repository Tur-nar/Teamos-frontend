import { useMutation, useQueryClient } from "@tanstack/react-query";

import { organizationKeys } from "@/constants/query-keys";
import { SetActiveOrganizationApi } from "@/lib/api/organization.api";
import type { SetActiveOrganizationValues } from "@/types/auth";

export const useSetActiveOrganization = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SetActiveOrganizationValues) => SetActiveOrganizationApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: organizationKeys.all });
        },
    });
};
