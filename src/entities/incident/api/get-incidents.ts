import { http } from "@/shared/api/http";
import type { Incident } from "@/entities/incident/model/types";

export function getIncidents() {
  return http<Incident[]>("/api/incidents");
}
