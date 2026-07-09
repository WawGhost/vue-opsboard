<script setup lang="ts">
import type { Incident } from "@/entities/incident/model/types";
import IncidentCard from "@/entities/incident/ui/IncidentCard.vue";
import type { Zone } from "@/entities/zone/model/types";
import { computed } from "vue";

const props = defineProps<{
  incidents: Incident[];
  zones: Zone[];
}>();

const activeIncidents = computed(() =>
  props.incidents.filter((i) => i.status === "active"),
);

const resolvedIncidents = computed(() =>
  props.incidents.filter((i) => i.status === "resolved"),
);

function zoneName(zoneId: string): string {
  return props.zones.find((z) => z.id === zoneId)?.name ?? "Unknown zone";
}
</script>

<template>
  <section class="incident-panel">
    <div class="incident-panel__header">
      <span class="incident-panel__title">Incidents</span>
      <span class="incident-panel__count"
        >{{ activeIncidents.length }} active</span
      >
    </div>

    <div class="incident-panel__content">
      <div v-if="activeIncidents.length" class="incident-panel__group">
        <IncidentCard
          v-for="incident in activeIncidents"
          :key="incident.id"
          :incident="incident"
          :zone-name="zoneName(incident.zoneId)"
        />
      </div>

      <div
        v-if="resolvedIncidents.length"
        class="incident-panel__group incident-panel__group--resolved"
      >
        <span class="incident-panel__subtitle">Resolved</span>
        <IncidentCard
          v-for="incident in resolvedIncidents"
          :key="incident.id"
          :incident="incident"
          :zone-name="zoneName(incident.zoneId)"
        />
      </div>

      <div v-if="!incidents.length" class="incident-panel__empty">
        No incidents recorded
      </div>
    </div>
  </section>
</template>

<style scoped>
.incident-panel {
  display: flex;
  flex-direction: column;
  background: #151922;
  border-radius: 16px;
  padding: 16px;
  min-height: 0;
}

.incident-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.incident-panel__title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.incident-panel__count {
  font-size: 13px;
  color: var(--danger);
}

.incident-panel__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}

.incident-panel__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.incident-panel__subtitle {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 4px;
}

.incident-panel__empty {
  font-size: 13px;
  color: var(--muted);
  text-align: center;
  padding: 24px 0;
}
</style>
