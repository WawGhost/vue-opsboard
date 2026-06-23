import { createRouter, createWebHistory } from "vue-router";
import { ROUTES } from "@/shared/const/routes";
import DashboardPage from "@/pages/dashboard/ui/DashboardPage.vue";
import ScenariosPage from "@/pages/scenarios/ui/ScenariosPage.vue";
import ReplayPage from "@/pages/replay/ui/ReplayPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.dashboard,
      name: "dashboard",
      component: DashboardPage,
    },
    {
      path: ROUTES.scenarios,
      name: "scenarios",
      component: ScenariosPage,
    },
    {
      path: ROUTES.replay,
      name: "replay",
      component: ReplayPage,
    },
  ],
});
