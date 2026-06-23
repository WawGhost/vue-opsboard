export type IncidentType =
  | "traffic"
  | "vehicle_breakdown"
  | "weather"
  | "order_spike";

export type IncidentSeverity = "low" | "medium" | "high";
export type IncidentStatus = "active" | "resolved";

export type Incident = {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  zoneId: string;
  startedAt: string;
  durationMin: number;
  status: IncidentStatus;
  impact: {
    speedMultiplier?: number;
    disabledVehicleIds?: string[];
    extraOrders?: number;
  };
};
