<script setup lang="ts">
import type { DeliveryTask } from "../model/types";
import type { Vehicle } from "@/entities/vehicle/model/types";
import BaseBadge from "@/shared/ui/BaseBadge.vue";

defineProps<{
  task: DeliveryTask;
  vehicle?: Vehicle | null;
}>();

const priorityColor: Record<string, string> = {
  low: "var(--muted)",
  medium: "#f0a500",
  high: "#ff8c42",
  critical: "var(--danger)",
};

const statusLabel: Record<string, string> = {
  queued: "Queued",
  assigned: "Assigned",
  in_progress: "In Progress",
  done: "Done",
  failed: "Failed",
};

const statusColor: Record<string, string> = {
  queued: "var(--muted)",
  assigned: "var(--accent)",
  in_progress: "var(--accent)",
  done: "var(--success)",
  failed: "var(--danger)",
};

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
  <div class="task-card">
    <div class="task-card__header">
      <span class="task-card__title">{{ task.title }}</span>
      <BaseBadge
        :style="{
          color: priorityColor[task.priority],
          background: 'rgba(255,255,255,0.05)',
        }"
      >
        {{ task.priority }}
      </BaseBadge>
    </div>

    <div class="task-card__meta">
      <span
        class="task-card__status"
        :style="{ color: statusColor[task.status] }"
      >
        {{ statusLabel[task.status] }}
      </span>
      <span class="task-card__eta">ETA {{ task.eta }} min</span>
      <span class="task-card__deadline"
        >⏰ {{ formatDeadline(task.deadlineAt) }}</span
      >
    </div>

    <div v-if="vehicle" class="task-card__vehicle">
      {{ vehicle.name }}
    </div>
    <div v-else class="task-card__unassigned">Unassigned</div>
  </div>
</template>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: var(--surface-2);
}

.task-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.task-card__title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
}

.task-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.task-card__status {
  font-size: 12px;
  font-weight: 500;
}

.task-card__eta,
.task-card__deadline {
  font-size: 12px;
  color: var(--muted);
}

.task-card__vehicle {
  font-size: 12px;
  color: var(--accent);
}

.task-card__unassigned {
  font-size: 12px;
  color: var(--muted);
  font-style: italic;
}
</style>
