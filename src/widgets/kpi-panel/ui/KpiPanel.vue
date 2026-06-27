<script setup lang="ts">
import type { DashboardKpi } from "@/pages/dashboard/model/types";
import { computed } from "vue";

interface Props {
  kpi: DashboardKpi;
}

const props = defineProps<Props>();

const items = computed(() => [
  {
    label: "Active Vehicles",
    value: props.kpi.activeVehicles,
  },
  {
    label: "Idle Vehicles",
    value: props.kpi.idleVehicles,
  },
  {
    label: "Delayed Vehicles",
    value: props.kpi.delayedVehicles,
  },
  {
    label: "Active Incidents",
    value: props.kpi.activeIncidents,
  },
]);
</script>

<template>
  <div class="kpi-grid">
    <div class="kpi-card" v-for="item in items" :key="item.label">
      <span class="kpi-card__label">{{ item.label }}</span>
      <strong class="kpi-card__value">{{ item.value }}</strong>
    </div>
  </div>
</template>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.kpi-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #151922;
  border-radius: 16px;
  padding: 16px;
}

.kpi-card__label {
  font-size: 12px;
  opacity: 0.7;
}

.kpi-card__value {
  font-size: 24px;
}
</style>
