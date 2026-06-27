import { useQuery } from "@tanstack/vue-query";
import { getVehicles } from "./get-vehicles";
import { queryKeys } from "@/shared/api/query-keys";

export function useVehiclesQuery() {
  return useQuery({
    queryKey: queryKeys.vehicles,
    queryFn: getVehicles,
    staleTime: 60_000,
  });
}
