import type { Incident } from "@/entities/incident/model/types";

export const incidents: Incident[] = [
  {
    id: "incident-1",
    type: "traffic",
    severity: "medium",
    zoneId: "zone-1",
    startedAt: "2026-06-23T12:00:00.000Z",
    durationMin: 90,
    status: "active",
    impact: {
      speedMultiplier: 0.7,
    },
  },
  {
    id: "incident-2",
    type: "vehicle_breakdown",
    severity: "high",
    zoneId: "zone-1",
    startedAt: "2026-06-23T11:30:00.000Z",
    durationMin: 120,
    status: "active",
    impact: {
      disabledVehicleIds: ["vehicle-5"],
    },
  },
  {
    id: "incident-3",
    type: "order_spike",
    severity: "low",
    zoneId: "zone-3",
    startedAt: "2026-06-23T10:00:00.000Z",
    durationMin: 180,
    status: "active",
    impact: {
      extraOrders: 14,
    },
  },
  {
    id: "incident-4",
    type: "weather",
    severity: "high",
    zoneId: "zone-2",
    startedAt: "2026-06-23T09:00:00.000Z",
    durationMin: 240,
    status: "resolved",
    impact: {
      speedMultiplier: 0.5,
    },
  },
];
