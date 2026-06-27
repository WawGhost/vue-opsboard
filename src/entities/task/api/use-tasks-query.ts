import { useQuery } from "@tanstack/vue-query";
import { getTasks } from "./get-tasks";
import { queryKeys } from "@/shared/api/query-keys";

export function useTasksQuery() {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: getTasks,
    staleTime: 60_000,
  });
}
