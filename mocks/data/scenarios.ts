import type { Scenario } from "@/entities/scenario/model/types";
import { vehicles } from "./vehicles";
import { tasks } from "./tasks";
import { incidents } from "./incidents";
import { zones } from "./zones";

export const scenarios: Scenario[] = [
  {
    id: "scenario-1",
    name: "Default Operations Day",
    createdAt: "2026-06-23T09:00:00.000Z",
    timeRange: {
      start: "2026-06-23T08:00:00.000Z",
      end: "2026-06-23T22:00:00.000Z",
    },
    vehicles,
    tasks,
    incidents,
    zones,
  },
];
