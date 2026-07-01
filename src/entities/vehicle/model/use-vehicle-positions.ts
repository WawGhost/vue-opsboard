import type { Vehicle, Point } from "./types";
import { onUnmounted, ref } from "vue";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function distance(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

export type VehiclePosition = {
  id: string;
  x: number;
  y: number;
};

export function useVehiclePositions(vehicles: () => Vehicle[]) {
  const positions = ref<Record<string, Point>>({});

  const state: Record<string, { segmentIndex: number; t: number }> = {};

  let rafId: number;
  let lastTime: number | null = null;

  function tick(now: number) {
    const dt = lastTime === null ? 0 : (now - lastTime) / 1000;
    lastTime = now;

    const result: Record<string, Point> = {};

    for (const vehicle of vehicles()) {
      const waypoints = vehicle.waypoints;

      if (
        !waypoints ||
        waypoints.length < 2 ||
        vehicle.status !== "delivering"
      ) {
        result[vehicle.id] = { ...vehicle.position };
        continue;
      }

      if (!state[vehicle.id]) {
        state[vehicle.id] = { segmentIndex: 0, t: 0 };
      }

      const s = state[vehicle.id];
      const from = waypoints[s.segmentIndex];
      const to = waypoints[s.segmentIndex + 1];

      const segLen = distance(from, to);
      const step = segLen > 0 ? (vehicle.speed * dt) / segLen : 0;

      s.t = Math.min(s.t + step, 1);

      result[vehicle.id] = {
        x: lerp(from.x, to.x, s.t),
        y: lerp(from.y, to.y, s.t),
      };

      if (s.t >= 1) {
        if (s.segmentIndex < waypoints.length - 2) {
          s.segmentIndex++;
          s.t = 0;
        } else {
          s.segmentIndex = 0;
          s.t = 0;
        }
      }
    }

    positions.value = result;
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);
  onUnmounted(() => cancelAnimationFrame(rafId));

  return { positions };
}
