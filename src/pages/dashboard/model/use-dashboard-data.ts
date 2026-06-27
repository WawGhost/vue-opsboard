import { computed } from "vue";

import { useScenarioQuery } from "@/entities/scenario/api";

import { mapScenarioToDashboard } from "./dashboard.mapper";

export function useDashboardData() {
  const scenarioQuery = useScenarioQuery("scenario-1");

  const dashboard = computed(() => {
    if (!scenarioQuery.data.value) {
      return null;
    }

    return mapScenarioToDashboard(scenarioQuery.data.value);
  });

  return {
    dashboard,

    isLoading: scenarioQuery.isLoading,

    isError: scenarioQuery.isError,

    error: scenarioQuery.error,

    refetch: scenarioQuery.refetch,
  };
}
