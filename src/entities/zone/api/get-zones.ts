import { http } from "@/shared/api/http";
import type { Zone } from "@/entities/zone/model/types";

export function getZones() {
  return http<Zone[]>("/api/zones");
}
