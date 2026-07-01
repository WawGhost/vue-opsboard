export type VehicleType = "bike" | "van" | "truck";
export type VehicleStatus = "idle" | "delivering" | "delayed" | "broken";

export type Point = {
  x: number;
  y: number;
};

export type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  status: VehicleStatus;
  capacity: number;
  load: number;
  speed: number;
  zoneId: string;
  currentTaskId: string | null;
  position: Point;
  waypoints?: Point[];
};
