<script setup lang="ts">
import type { Vehicle } from "@/entities/vehicle/model/types";
import VehicleCard from "@/entities/vehicle/ui/VehicleCard.vue";

defineProps<{ vehicles: Vehicle[] }>();
</script>

<template>
  <div class="fleet-overview">
    <div class="fleet-overview__header">
      <span class="fleet-overview__title">Fleet Overview</span>
      <span class="fleet-overview__count">{{ vehicles.length }}</span>
    </div>
    <div class="fleet-overview__list">
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
      />
    </div>
  </div>
</template>

<style scoped>
.fleet-overview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.fleet-overview__title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.fleet-overview__count {
  font-size: 13px;
  color: var(--muted);
}

.fleet-overview__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
