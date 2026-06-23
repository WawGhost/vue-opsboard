import type { Zone } from "@/entities/zone/model/types";

export const zones: Zone[] = [
  {
    id: "zone-1",
    name: "Central",
    loadFactor: 0.82,
    trafficLevel: 0.64,
    polygon: [
      { x: 40, y: 40 },
      { x: 240, y: 40 },
      { x: 240, y: 180 },
      { x: 40, y: 180 },
    ],
  },
  {
    id: "zone-2",
    name: "West",
    loadFactor: 0.47,
    trafficLevel: 0.28,
    polygon: [
      { x: 260, y: 80 },
      { x: 430, y: 80 },
      { x: 430, y: 230 },
      { x: 260, y: 230 },
    ],
  },
];
