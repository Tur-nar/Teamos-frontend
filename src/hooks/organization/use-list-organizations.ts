import { useQuery } from "@tanstack/react-query";

import { organizationKeys } from "@/constants/query-keys";
import { ListOrganizationsApi } from "@/lib/api/organization.api";

export const useListOrganizations = (enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.list(),
        queryFn: ListOrganizationsApi,
        enabled,
    });
};
