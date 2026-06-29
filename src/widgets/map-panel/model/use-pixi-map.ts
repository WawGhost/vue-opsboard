import type { Incident } from "@/entities/incident/model/types";
import type { Point, Vehicle } from "@/entities/vehicle/model/types";
import type { Zone } from "@/entities/zone/model/types";
import gsap from "gsap";
import { Application, Container, Graphics, Text } from "pixi.js";
import { onMounted, onUnmounted, watch, type Ref } from "vue";

const COLORS = {
  bg: 0x0f131a,
  grid: 0x1b2130,
  zone: 0x1e2a3a,
  zoneBorder: 0x2c6bff,
  zoneIncident: 0x3a1a1a,
  zoneIncidentBorder: 0xff5d5d,
  vehicleDelivering: 0x2c6bff,
  vehicleIdle: 0x6b7a99,
  vehicleBroken: 0xff5d5d,
  route: 0x2c6bff,
  incidentMarker: 0xff5d5d,
  label: 0xf3f6fb,
  labelMuted: 0x8a9ab8,
};

const VEHICLE_RADIUS = 7;
const GRID_STEP = 40;

function vehicleColor(status: Vehicle["status"]): number {
  if (status === "delivering") return COLORS.vehicleDelivering;
  if (status === "broken") return COLORS.vehicleBroken;
  return COLORS.vehicleIdle;
}

export function usePixiMap(
  canvasRef: Ref<HTMLElement | null>,
  props: {
    vehicles: Ref<Vehicle[]>;
    zones: Ref<Zone[]>;
    incidents: Ref<Incident[]>;
  },
  vehiclePositions: Ref<Record<string, Point>>,
) {
  let app: Application | null = null;

  let gridLayer: Graphics;
  let zoneLayer: Graphics;
  let routeLayer: Graphics;
  let incidentLayer: Graphics;
  let vehicleLayer: Container;

  const vehicleSprites: Record<string, { gfx: Graphics; label: Text }> = {};

  function drawGrid(g: Graphics, width: number, height: number) {
    g.clear();
    g.setStrokeStyle({ width: 1, color: COLORS.grid });

    for (let x = 0; x < width; x += GRID_STEP) {
      g.moveTo(x, 0).lineTo(x, height);
    }

    for (let y = 0; y < height; y += GRID_STEP) {
      g.moveTo(0, y).lineTo(width, y);
    }

    g.stroke();
  }

  function drawZones(g: Graphics) {
    g.clear();

    for (const zone of props.zones.value) {
      const hasIncident = props.incidents.value.some(
        (i) => i.zoneId === zone.id && i.status === "active",
      );

      const fillColor = hasIncident ? COLORS.zoneIncident : COLORS.zone;
      const borderColor = hasIncident
        ? COLORS.zoneIncidentBorder
        : COLORS.zoneBorder;

      g.setFillStyle({ color: fillColor, alpha: 0.6 });
      g.setStrokeStyle({ width: 1.5, color: borderColor, alpha: 0.8 });

      const [first, ...rest] = zone.polygon;
      g.moveTo(first.x, first.y);
      for (const p of rest) g.lineTo(p.x, p.y);
      g.closePath();
      g.fill();
      g.stroke();
    }
  }

  function drawRoutes(g: Graphics) {
    g.clear();

    for (const vehicle of props.vehicles.value) {
      if (!vehicle.waypoints || vehicle.status !== "delivering") continue;

      g.setStrokeStyle({
        width: 1,
        color: COLORS.route,
        alpha: 0.25,
      });

      const [first, ...rest] = vehicle.waypoints;
      g.moveTo(first.x, first.y);
      for (const p of rest) g.lineTo(p.x, p.y);
      g.stroke();
    }
  }

  function drawIncidentMarkers(g: Graphics) {
    g.clear();

    for (const incident of props.incidents.value) {
      if (incident.status !== "active") continue;

      const zone = props.zones.value.find((z) => z.id === incident.zoneId);
      if (!zone) continue;

      const cx =
        zone.polygon.reduce((s, p) => s + p.x, 0) / zone.polygon.length;
      const cy =
        zone.polygon.reduce((s, p) => s + p.y, 0) / zone.polygon.length;

      g.setFillStyle({ color: COLORS.incidentMarker, alpha: 0.9 });
      g.setStrokeStyle({ width: 1.5, color: 0xffffff, alpha: 0.4 });
      g.circle(cx, cy, 6);
      g.fill();
      g.stroke();
    }
  }

  function syncVehicleSprites() {
    const vehicles = props.vehicles.value;

    for (const vehicle of vehicles) {
      if (!vehicleSprites[vehicle.id]) {
        const gfx = new Graphics();
        const label = new Text({
          text: vehicle.name,
          style: {
            fontSize: 10,
            fill: COLORS.labelMuted,
            fontFamily: "monospace",
          },
        });
        label.anchor.set(0.5, 0);
        vehicleLayer.addChild(gfx);
        vehicleLayer.addChild(label);
        vehicleSprites[vehicle.id] = { gfx, label };
      }
    }

    const ids = new Set(vehicles.map((v) => v.id));
    for (const id of Object.keys(vehicleSprites)) {
      if (!ids.has(id)) {
        vehicleSprites[id].gfx.destroy();
        vehicleSprites[id].label.destroy();
        delete vehicleSprites[id];
      }
    }
  }

  function updateVehiclePositions() {
    for (const vehicle of props.vehicles.value) {
      const sprite = vehicleSprites[vehicle.id];
      if (!sprite) continue;

      const pos = vehiclePositions.value[vehicle.id] ?? vehicle.position;
      const color = vehicleColor(vehicle.status);

      sprite.gfx.clear();
      sprite.gfx.setFillStyle({ color });
      sprite.gfx.setStrokeStyle({ width: 2, color: 0xffffff, alpha: 0.3 });
      sprite.gfx.circle(0, 0, VEHICLE_RADIUS);
      sprite.gfx.fill();
      sprite.gfx.stroke();

      gsap.to(sprite.gfx, {
        x: pos.x,
        y: pos.y,
        duration: 0.15,
        ease: "none",
        overwrite: true,
      });

      gsap.to(sprite.label, {
        x: pos.x,
        y: pos.y + VEHICLE_RADIUS + 3,
        duration: 0.15,
        ease: "none",
        overwrite: true,
      });
    }
  }

  async function init() {
    if (!canvasRef.value) return;

    const width = canvasRef.value.clientWidth || 800;
    const height = canvasRef.value.clientHeight || 400;

    app = new Application();

    await app.init({
      width,
      height,
      background: COLORS.bg,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    canvasRef.value.appendChild(app.canvas);

    gridLayer = new Graphics();
    zoneLayer = new Graphics();
    routeLayer = new Graphics();
    incidentLayer = new Graphics();
    vehicleLayer = new Container();

    app.stage.addChild(gridLayer);
    app.stage.addChild(zoneLayer);
    app.stage.addChild(routeLayer);
    app.stage.addChild(incidentLayer);
    app.stage.addChild(vehicleLayer);

    drawGrid(gridLayer, width, height);
    drawZones(zoneLayer);
    drawRoutes(routeLayer);
    drawIncidentMarkers(incidentLayer);
    syncVehicleSprites();
    updateVehiclePositions();

    watch(
      [props.zones, props.incidents],
      () => {
        drawZones(zoneLayer);
        drawIncidentMarkers(incidentLayer);
      },
      { deep: true },
    );

    watch(
      props.vehicles,
      () => {
        drawRoutes(routeLayer);
        syncVehicleSprites();
      },
      { deep: true },
    );

    app.ticker.add(() => {
      updateVehiclePositions();
    });
  }

  onMounted(init);

  onUnmounted(() => {
    gsap.killTweensOf("*");
    app?.destroy(true);
  });
}
