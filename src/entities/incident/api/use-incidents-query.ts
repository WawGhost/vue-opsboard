import { useQuery } from "@tanstack/vue-query";
import { getIncidents } from "./get-incidents";
import { queryKeys } from "@/shared/api/query-keys";

export function useIncidentsQuery() {
  return useQuery({
    queryKey: queryKeys.incidents,
    queryFn: getIncidents,
    staleTime: 60_000,
  });
}
