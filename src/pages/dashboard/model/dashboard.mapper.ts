import type { Scenario } from "@/entities/scenario/model/types";
import type { DashboardState } from "./types";

export function mapScenarioToDashboard(scenario: Scenario): DashboardState {
  return {
    kpi: {
      activeVehicles: scenario.vehicles.filter((v) => v.status !== "broken")
        .length,

      idleVehicles: scenario.vehicles.filter((v) => v.status === "idle").length,

      delayedVehicles: scenario.vehicles.filter((v) => v.status === "delayed")
        .length,

      activeIncidents: scenario.incidents.filter((i) => i.status === "active")
        .length,

      queuedTasks: scenario.tasks.filter((t) => t.status === "queued").length,
    },

    vehicles: scenario.vehicles,

    tasks: scenario.tasks,

    incidents: scenario.incidents,

    zones: scenario.zones,
  };
}
