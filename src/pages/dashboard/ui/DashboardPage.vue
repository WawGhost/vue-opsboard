<script setup lang="ts">
import AppShell from "@/shared/ui/AppShell.vue";
import BaseCard from "@/shared/ui/BaseCard.vue";
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue";
import SidebarShell from "@/widgets/sidebar/ui/SidebarShell.vue";
import KpiPanel from "@/widgets/kpi-panel/ui/KpiPanel.vue";
import MapPanel from "@/widgets/map-panel/ui/MapPanel.vue";
import TimelinePanel from "@/widgets/timeline-panel/ui/TimelinePanel.vue";
import { useDashboardData } from "../model/use-dashboard-data";

const { dashboard, isLoading, error } = useDashboardData();
</script>

<template>
  <AppShell>
    <div class="dashboard-page">
      <AppHeader />

      <main class="dashboard-page__content">
        <KpiPanel v-if="dashboard" :kpi="dashboard.kpi" />

        <div class="dashboard-page__main-grid">
          <SidebarShell>
            <BaseCard>
              <h3>Fleet Overview</h3>
              <p>Vehicles list will be here</p>
            </BaseCard>

            <BaseCard>
              <h3>Tasks Queue</h3>
              <p>Tasks list will be here</p>
            </BaseCard>
          </SidebarShell>

          <MapPanel
            v-if="dashboard"
            :vehicles="dashboard.vehicles"
            :zones="dashboard.zones"
          />
        </div>

        <TimelinePanel />
      </main>
    </div>
  </AppShell>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #0f131a;
  color: #f3f6fb;
}

.dashboard-page__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.dashboard-page__main-grid {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 16px;
}
</style>
