import type { Incident } from "@/entities/incident/model/types";
import type { DeliveryTask } from "@/entities/task/model/types";
import type { Vehicle } from "@/entities/vehicle/model/types";
import type { Zone } from "@/entities/zone/model/types";

export interface DashboardKpi {
  activeVehicles: number;
  idleVehicles: number;
  delayedVehicles: number;

  activeIncidents: number;

  queuedTasks: number;
}

export interface DashboardState {
  kpi: DashboardKpi;

  vehicles: Vehicle[];

  tasks: DeliveryTask[];

  incidents: Incident[];

  zones: Zone[];
}
