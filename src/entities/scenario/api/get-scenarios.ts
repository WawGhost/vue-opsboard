import { http } from "@/shared/api/http";
import type { Scenario } from "@/entities/scenario/model/types";

export function getScenarios() {
  return http<Scenario[]>("/api/scenarios");
}
