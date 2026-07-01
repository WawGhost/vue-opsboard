import { http } from "@/shared/api/http";
import type { DeliveryTask } from "@/entities/task/model/types";

export function getTasks() {
  return http<DeliveryTask[]>("/api/tasks");
}
