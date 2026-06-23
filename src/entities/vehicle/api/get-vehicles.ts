import { http } from "@/shared/api/http";
import type { Vehicle } from "@/entities/vehicle/model/types";

export function getVehicles() {
  return http<Vehicle[]>("/api/vehicles");
}
