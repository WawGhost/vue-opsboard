import type { DeliveryTask } from "@/entities/task/model/types";

export const tasks: DeliveryTask[] = [
  {
    id: "task-1",
    title: "Downtown grocery delivery",
    priority: "high",
    status: "in_progress",
    zoneId: "zone-1",
    eta: 24,
    assignedVehicleId: "vehicle-1",
    loadUnits: 16,
    deadlineAt: "2026-06-23T14:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Medical supplies drop",
    priority: "critical",
    status: "queued",
    zoneId: "zone-2",
    eta: 42,
    assignedVehicleId: null,
    loadUnits: 10,
    deadlineAt: "2026-06-23T15:10:00.000Z",
  },
];
