import { useQuery } from "@tanstack/vue-query";
import { getZones } from "./get-zones";
import { queryKeys } from "@/shared/api/query-keys";

export function useZonesQuery() {
  return useQuery({
    queryKey: queryKeys.zones,
    queryFn: getZones,
    staleTime: 60_000,
  });
}
