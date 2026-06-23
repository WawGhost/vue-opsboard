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
];
