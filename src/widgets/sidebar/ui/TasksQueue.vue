<script setup lang="ts">
import { computed } from "vue";
import type { DeliveryTask } from "@/entities/task/model/types";
import type { Vehicle } from "@/entities/vehicle/model/types";
import TaskCard from "@/entities/task/ui/TaskCard.vue";

const props = defineProps<{
  tasks: DeliveryTask[];
  vehicles: Vehicle[];
}>();

const PRIORITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

const sortedTasks = computed(() =>
  [...props.tasks].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  ),
);

function findVehicle(vehicleId: string | null): Vehicle | null {
  if (!vehicleId) return null;
  return props.vehicles.find((v) => v.id === vehicleId) ?? null;
}
</script>

<template>
  <div class="tasks-queue">
    <div class="tasks-queue__header">
      <span class="tasks-queue__title">Tasks Queue</span>
      <span class="tasks-queue__count">{{ tasks.length }}</span>
    </div>
    <div class="tasks-queue__list">
      <TaskCard
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        :vehicle="findVehicle(task.assignedVehicleId)"
      />
    </div>
  </div>
</template>

<style scoped>
.tasks-queue {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
}

.tasks-queue__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.tasks-queue__title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.tasks-queue__count {
  font-size: 13px;
  color: var(--muted);
}

.tasks-queue__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}
</style>
