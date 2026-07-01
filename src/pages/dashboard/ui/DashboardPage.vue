<script setup lang="ts">
import AppShell from "@/shared/ui/AppShell.vue";
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue";
import SidebarShell from "@/widgets/sidebar/ui/SidebarShell.vue";
import KpiPanel from "@/widgets/kpi-panel/ui/KpiPanel.vue";
import MapPanel from "@/widgets/map-panel/ui/MapPanel.vue";
import TimelinePanel from "@/widgets/timeline-panel/ui/TimelinePanel.vue";
import FleetOverview from "@/widgets/sidebar/ui/FleetOverview.vue";
import TasksQueue from "@/widgets/sidebar/ui/TasksQueue.vue";
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
            <FleetOverview v-if="dashboard" :vehicles="dashboard.vehicles" />
            <TasksQueue
              v-if="dashboard"
              :tasks="dashboard.tasks"
              :vehicles="dashboard.vehicles"
            />
          </SidebarShell>

          <MapPanel
            v-if="dashboard"
            :vehicles="dashboard.vehicles"
            :zones="dashboard.zones"
            :incidents="dashboard.incidents"
          />
        </div>

        <TimelinePanel />
      </main>
    </div>
  </AppShell>
</template>

<style scoped>
.dashboard-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0f131a;
  color: #f3f6fb;
  overflow: hidden;
}

.dashboard-page__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
  min-height: 0;
}

.dashboard-page__main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 16px;
  min-height: 0;
}
</style>
