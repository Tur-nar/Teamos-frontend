import { useQuery } from "@tanstack/react-query";

import { organizationKeys } from "@/constants/query-keys";
import { ListUserInvitationsApi } from "@/lib/api/organization.api";

export const useListInvitations = (enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.invitations(),
        queryFn: ListUserInvitationsApi,
        enabled,
    });
};
