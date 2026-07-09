<script setup lang="ts">
import type { Incident } from "@/entities/incident/model/types";
import type { Vehicle } from "@/entities/vehicle/model/types";
import { useVehiclePositions } from "@/entities/vehicle/model/use-vehicle-positions";
import type { Zone } from "@/entities/zone/model/types";
import { computed, ref, toRef } from "vue";
import {
  usePixiMap,
  type MapLayerVisibility,
  type MapSelection,
} from "../model/use-pixi-map";

const props = defineProps<{
  vehicles: Vehicle[];
  zones: Zone[];
  incidents: Incident[];
}>();

const canvasRef = ref<HTMLElement | null>(null);
const selected = ref<MapSelection>(null);
const layers = ref<MapLayerVisibility>({
  vehicles: true,
  routes: true,
  incidents: true,
});

const { positions } = useVehiclePositions(() => props.vehicles);

const selectedVehicle = computed(() =>
  selected.value?.type === "vehicle"
    ? props.vehicles.find((vehicle) => vehicle.id === selected.value?.id)
    : null,
);

const selectedZone = computed(() =>
  selected.value?.type === "zone"
    ? props.zones.find((zone) => zone.id === selected.value?.id)
    : null,
);

const selectedIncident = computed(() =>
  selected.value?.type === "incident"
    ? props.incidents.find((incident) => incident.id === selected.value?.id)
    : null,
);

const selectedZoneName = computed(() => {
  const zoneId = selectedIncident.value?.zoneId ?? selectedVehicle.value?.zoneId;

  return props.zones.find((zone) => zone.id === zoneId)?.name ?? null;
});

function toggleLayer(layer: keyof MapLayerVisibility) {
  layers.value[layer] = !layers.value[layer];

  if (
    (selected.value?.type === "vehicle" && layer === "vehicles") ||
    (selected.value?.type === "incident" && layer === "incidents")
  ) {
    selected.value = null;
  }
}

usePixiMap(
  canvasRef,
  {
    vehicles: toRef(props, "vehicles"),
    zones: toRef(props, "zones"),
    incidents: toRef(props, "incidents"),
  },
  positions,
  {
    selected,
    layers,
    onSelect(selection) {
      selected.value = selection;
    },
  },
);
</script>

<template>
  <section class="map-panel">
    <div class="map-panel__toolbar">
      <span>Map Layer</span>
      <div class="map-panel__actions">
        <button
          type="button"
          :class="{ 'is-active': layers.vehicles }"
          :aria-pressed="layers.vehicles"
          @click="toggleLayer('vehicles')"
        >
          Vehicles
        </button>
        <button
          type="button"
          :class="{ 'is-active': layers.routes }"
          :aria-pressed="layers.routes"
          @click="toggleLayer('routes')"
        >
          Routes
        </button>
        <button
          type="button"
          :class="{ 'is-active': layers.incidents }"
          :aria-pressed="layers.incidents"
          @click="toggleLayer('incidents')"
        >
          Incidents
        </button>
      </div>
    </div>

    <div class="map-panel__stage">
      <div ref="canvasRef" class="map-panel__canvas" />

      <aside
        v-if="selectedVehicle || selectedZone || selectedIncident"
        class="map-panel__details"
      >
        <button
          type="button"
          class="map-panel__close"
          aria-label="Close selected object details"
          @click="selected = null"
        >
          x
        </button>

        <template v-if="selectedVehicle">
          <span class="map-panel__eyebrow">Vehicle</span>
          <strong>{{ selectedVehicle.name }}</strong>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{{ selectedVehicle.status }}</dd>
            </div>
            <div>
              <dt>Load</dt>
              <dd>{{ selectedVehicle.load }} / {{ selectedVehicle.capacity }}</dd>
            </div>
            <div>
              <dt>Zone</dt>
              <dd>{{ selectedZoneName }}</dd>
            </div>
          </dl>
        </template>

        <template v-else-if="selectedZone">
          <span class="map-panel__eyebrow">Zone</span>
          <strong>{{ selectedZone.name }}</strong>
          <dl>
            <div>
              <dt>Load</dt>
              <dd>{{ Math.round(selectedZone.loadFactor * 100) }}%</dd>
            </div>
            <div>
              <dt>Traffic</dt>
              <dd>{{ Math.round(selectedZone.trafficLevel * 100) }}%</dd>
            </div>
          </dl>
        </template>

        <template v-else-if="selectedIncident">
          <span class="map-panel__eyebrow">Incident</span>
          <strong>{{ selectedIncident.type.replace("_", " ") }}</strong>
          <dl>
            <div>
              <dt>Severity</dt>
              <dd>{{ selectedIncident.severity }}</dd>
            </div>
            <div>
              <dt>Zone</dt>
              <dd>{{ selectedZoneName }}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{{ selectedIncident.durationMin }} min</dd>
            </div>
          </dl>
        </template>
      </aside>
    </div>
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
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.map-panel__actions button.is-active {
  background: rgba(44, 107, 255, 0.28);
  color: #f3f6fb;
}

.map-panel__actions button:hover {
  background: rgba(255, 255, 255, 0.14);
}

.map-panel__stage {
  position: relative;
  flex: 1;
  min-height: 0;
}

.map-panel__canvas {
  position: absolute;
  inset: 0;
}

.map-panel__canvas canvas {
  display: block;
}

.map-panel__details {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: min(260px, calc(100% - 32px));
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(21, 25, 34, 0.92);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.map-panel__close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #f3f6fb;
  cursor: pointer;
}

.map-panel__eyebrow {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted);
}

.map-panel__details strong {
  padding-right: 28px;
  font-size: 16px;
  text-transform: capitalize;
}

.map-panel__details dl {
  display: grid;
  gap: 8px;
  margin: 0;
}

.map-panel__details dl div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.map-panel__details dt {
  color: var(--muted);
}

.map-panel__details dd {
  margin: 0;
  text-align: right;
}
</style>
