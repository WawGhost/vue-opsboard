<script setup lang="ts">
import BaseBadge from "@/shared/ui/BaseBadge.vue";
import type { Vehicle } from "../model/types";

defineProps<{ vehicle: Vehicle }>();

const typeLabel: Record<string, string> = {
  bike: "Bike",
  van: "Van",
  truck: "Truck",
};

const statusColor: Record<string, string> = {
  idle: "var(--muted)",
  delivering: "var(--accent)",
  broken: "var(--danger)",
};

const statusLabel: Record<string, string> = {
  idle: "Idle",
  delivering: "Delivering",
  broken: "Broken",
};
</script>

<template>
  <div class="vehicle-card">
    <div class="vehicle-card__header">
      <span class="vehicle-card__name">{{ vehicle.name }}</span>
      <BaseBadge>{{ typeLabel[vehicle.type] }}</BaseBadge>
    </div>

    <div class="vehicle-card__status">
      <span
        class="vehicle-card__status-dot"
        :style="{ background: statusColor[vehicle.status] }"
      />
      <span>{{ statusLabel[vehicle.status] }}</span>
    </div>

    <div class="vehicle-card__load">
      <div class="vehicle-card__load-bar-track">
        <div
          class="vehicle-card__load-bar-fill"
          :style="{ width: `${(vehicle.load / vehicle.capacity) * 100}%` }"
        />
      </div>
      <span class="vehicle-card__load-label">
        {{ vehicle.load }} / {{ vehicle.capacity }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.vehicle-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: var(--surface-2);
}

.vehicle-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.vehicle-card__name {
  font-size: 14px;
  font-weight: 600;
}

.vehicle-card__status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}

.vehicle-card__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.vehicle-card__load {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vehicle-card__load-bar-track {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.vehicle-card__load-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.vehicle-card__load-label {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
}
</style>
