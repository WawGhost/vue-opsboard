import type { Vehicle } from "@/entities/vehicle/model/types";

export const vehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    name: "Van-01",
    type: "van",
    status: "delivering",
    capacity: 120,
    load: 84,
    speed: 42,
    zoneId: "zone-1",
    currentTaskId: "task-1",
    position: { x: 120, y: 120 },
  },
  {
    id: "vehicle-2",
    name: "Bike-03",
    type: "bike",
    status: "idle",
    capacity: 24,
    load: 0,
    speed: 28,
    zoneId: "zone-2",
    currentTaskId: null,
    position: { x: 320, y: 150 },
  },
];
