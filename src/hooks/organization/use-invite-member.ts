import { useMutation } from "@tanstack/react-query";
import { InviteMemberApi } from "@/lib/api/organization.api";
import type { InviteMemberValues } from "@/types/auth";

export const useInviteMember = () => {
    return useMutation({
        mutationFn: (payload: InviteMemberValues) => InviteMemberApi(payload),
    });
};
