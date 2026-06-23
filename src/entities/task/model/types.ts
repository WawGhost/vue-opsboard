export type TaskPriority = "low" | "medium" | "high" | "critical";
export type TaskStatus =
  | "queued"
  | "assigned"
  | "in_progress"
  | "done"
  | "failed";

export type DeliveryTask = {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  zoneId: string;
  eta: number;
  assignedVehicleId: string | null;
  loadUnits: number;
  deadlineAt: string;
};
