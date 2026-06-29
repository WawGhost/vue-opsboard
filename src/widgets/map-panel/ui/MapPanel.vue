<script setup lang="ts">
import type { Incident } from "@/entities/incident/model/types";
import type { Vehicle } from "@/entities/vehicle/model/types";
import { useVehiclePositions } from "@/entities/vehicle/model/use-vehicle-positions";
import type { Zone } from "@/entities/zone/model/types";
import { ref, toRef } from "vue";
import { usePixiMap } from "../model/use-pixi-map";

const props = defineProps<{
  vehicles: Vehicle[];
  zones: Zone[];
  incidents: Incident[];
}>();

const canvasRef = ref<HTMLElement | null>(null);

const { positions } = useVehiclePositions(() => props.vehicles);

usePixiMap(
  canvasRef,
  {
    vehicles: toRef(props, "vehicles"),
    zones: toRef(props, "zones"),
    incidents: toRef(props, "incidents"),
  },
  positions,
);
</script>

<template>
  <section class="map-panel">
    <div class="map-panel__toolbar">
      <span>Map Layer</span>
      <div class="map-panel__actions">
        <button type="button">Vehicles</button>
        <button type="button">Routes</button>
        <button type="button">Incidents</button>
      </div>
    </div>

    <div ref="canvasRef" class="map-panel__canvas" />
  </section>
</template>

<style scoped>
.map-panel {
  display: flex;
  flex-direction: column;
  min-height: 520px;
  background: #151922;
  border-radius: 16px;
  overflow: hidden;
}

.map-panel__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.map-panel__actions {
  display: flex;
  gap: 8px;
}

.map-panel__actions button {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.map-panel__actions button:hover {
  background: rgba(255, 255, 255, 0.14);
}

.map-panel__canvas {
  flex: 1;
  min-height: 0;
}

.map-panel__canvas canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
