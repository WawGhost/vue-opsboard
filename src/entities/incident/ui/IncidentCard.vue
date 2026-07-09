<script setup lang="ts">
import BaseBadge from "@/shared/ui/BaseBadge.vue";
import type { Incident } from "../model/types";

defineProps<{
  incident: Incident;
  zoneName: string;
}>();

const typeLabel: Record<string, string> = {
  traffic: "Traffic",
  vehicle_breakdown: "Vehicle Breakdown",
  weather: "Weather",
  order_spike: "Order Spike",
};

const typeIcon: Record<string, string> = {
  traffic: "🚦",
  vehicle_breakdown: "🔧",
  weather: "🌧️",
  order_spike: "📦",
};

const severityColor: Record<string, string> = {
  low: "var(--muted)",
  medium: "#f0a500",
  high: "var(--danger)",
};
</script>

<template>
  <div
    class="incident-card"
    :class="{ 'incident-card--resolved': incident.status === 'resolved' }"
  >
    <div class="incident-card__header">
      <span class="incident-card__type">
        <span class="incident-card__icon">{{ typeIcon[incident.type] }}</span>
        {{ typeLabel[incident.type] }}
      </span>

      <BaseBadge
        :style="{
          color: severityColor[incident.severity],
          background: 'rgba(255, 255, 255, 0.05)',
        }"
      >
        {{ incident.severity }}
      </BaseBadge>
    </div>

    <div class="incident-card__meta">
      <span class="incident-card__zone">{{ zoneName }}</span>
      <span
        class="incident-card__status"
        :class="`incident-card__status--${incident.status}`"
      >
        {{ incident.status === "active" ? "Active" : "Resolved" }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.incident-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border-left: 3px solid var(--danger);
}

.incident-card--resolved {
  border-left-color: var(--muted);
  opacity: 0.6;
}

.incident-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.incident-card__type {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}

.incident-card__icon {
  font-size: 14px;
}

.incident-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
}

.incident-card__status--active {
  color: var(--danger);
  font-weight: 500;
}

.incident-card__status--resolved {
  color: var(--muted);
}
</style>
