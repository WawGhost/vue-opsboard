import { queryKeys } from "@/shared/api/query-keys";
import { useQuery } from "@tanstack/vue-query";
import { getScenarioById } from "./get-scenario-by-id";

export function useScenarioQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.scenario(id),
    queryFn: () => getScenarioById(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}
