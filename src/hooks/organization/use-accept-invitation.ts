import { useMutation, useQueryClient } from "@tanstack/react-query";

import { organizationKeys } from "@/constants/query-keys";
import { AcceptInvitationApi } from "@/lib/api/organization.api";
import type { AcceptInvitationValues } from "@/types/auth";

export const useAcceptInvitation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AcceptInvitationValues) => AcceptInvitationApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: organizationKeys.all });
        },
    });
};
