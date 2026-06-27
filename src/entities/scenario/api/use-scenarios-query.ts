import { queryKeys } from "@/shared/api/query-keys";
import { useQuery } from "@tanstack/vue-query";
import { getScenarios } from "./get-scenarios";

export function useScenariosQuery() {
  return useQuery({
    queryKey: queryKeys.scenarios,
    queryFn: getScenarios,
    staleTime: 60_000,
  });
}
