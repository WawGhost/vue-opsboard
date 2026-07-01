import type { Vehicle } from "@/entities/vehicle/model/types";
import type { DeliveryTask } from "@/entities/task/model/types";
import type { Incident } from "@/entities/incident/model/types";
import type { Zone } from "@/entities/zone/model/types";

export type Scenario = {
  id: string;
  name: string;
  createdAt: string;
  timeRange: {
    start: string;
    end: string;
  };
  vehicles: Vehicle[];
  tasks: DeliveryTask[];
  incidents: Incident[];
  zones: Zone[];
};
