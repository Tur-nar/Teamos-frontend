import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/services/auth/auth.service";
import { SESSION_QUERY_KEY } from "@/lib/query/query-keys";

export function useSession() {
    return useQuery({
        queryKey: SESSION_QUERY_KEY,
        queryFn: getSession,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
}
