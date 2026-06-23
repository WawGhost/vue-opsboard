import { http } from "@/shared/api/http";
import type { Scenario } from "@/entities/scenario/model/types";

export function getScenarioById(id: string) {
  return http<Scenario>(`/api/scenarios/${id}`);
}
