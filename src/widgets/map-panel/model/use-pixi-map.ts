import type { Incident } from "@/entities/incident/model/types";
import type { Point, Vehicle } from "@/entities/vehicle/model/types";
import type { Zone } from "@/entities/zone/model/types";
import gsap from "gsap";
import { Application, Container, Graphics, Text } from "pixi.js";
import { nextTick, onMounted, onUnmounted, watch, type Ref } from "vue";

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
const INCIDENT_RADIUS = 8;
const GRID_STEP = 40;

export type MapSelection =
  | { type: "vehicle"; id: string }
  | { type: "zone"; id: string }
  | { type: "incident"; id: string }
  | null;

export type MapLayerVisibility = {
  vehicles: boolean;
  routes: boolean;
  incidents: boolean;
};

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
  options: {
    selected: Ref<MapSelection>;
    layers: Ref<MapLayerVisibility>;
    onSelect: (selection: MapSelection) => void;
  },
) {
  let app: Application | null = null;

  let gridLayer: Graphics;
  let zoneLayer: Graphics;
  let routeLayer: Graphics;
  let incidentLayer: Graphics;
  let vehicleLayer: Container;

  const vehicleSprites: Record<string, { gfx: Graphics; label: Text }> = {};
  const incidentCenters: Record<string, Point> = {};
  let handlePointerDown: ((event: PointerEvent) => void) | null = null;
  let handlePointerMove: ((event: PointerEvent) => void) | null = null;

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
      const isSelected =
        options.selected.value?.type === "zone" &&
        options.selected.value.id === zone.id;

      const fillColor = hasIncident ? COLORS.zoneIncident : COLORS.zone;
      const borderColor = hasIncident
        ? COLORS.zoneIncidentBorder
        : COLORS.zoneBorder;

      g.setFillStyle({ color: fillColor, alpha: isSelected ? 0.78 : 0.6 });
      g.setStrokeStyle({
        width: isSelected ? 3 : 1.5,
        color: borderColor,
        alpha: isSelected ? 1 : 0.8,
      });

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
    Object.keys(incidentCenters).forEach((id) => delete incidentCenters[id]);

    for (const incident of props.incidents.value) {
      if (incident.status !== "active") continue;

      const zone = props.zones.value.find((z) => z.id === incident.zoneId);
      if (!zone) continue;

      const cx =
        zone.polygon.reduce((s, p) => s + p.x, 0) / zone.polygon.length;
      const cy =
        zone.polygon.reduce((s, p) => s + p.y, 0) / zone.polygon.length;
      const isSelected =
        options.selected.value?.type === "incident" &&
        options.selected.value.id === incident.id;

      incidentCenters[incident.id] = { x: cx, y: cy };

      g.setFillStyle({ color: COLORS.incidentMarker, alpha: 0.9 });
      g.setStrokeStyle({
        width: isSelected ? 3 : 1.5,
        color: 0xffffff,
        alpha: isSelected ? 0.8 : 0.4,
      });
      g.circle(cx, cy, isSelected ? INCIDENT_RADIUS + 2 : INCIDENT_RADIUS);
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
      const isSelected =
        options.selected.value?.type === "vehicle" &&
        options.selected.value.id === vehicle.id;

      sprite.gfx.clear();
      sprite.gfx.setFillStyle({ color });
      sprite.gfx.setStrokeStyle({
        width: isSelected ? 3 : 2,
        color: 0xffffff,
        alpha: isSelected ? 0.8 : 0.3,
      });
      sprite.gfx.circle(0, 0, VEHICLE_RADIUS);
      if (isSelected) {
        sprite.gfx.circle(0, 0, VEHICLE_RADIUS + 5);
      }
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

  let resizeObserver: ResizeObserver | null = null;

  function redrawAll(width: number, height: number) {
    drawGrid(gridLayer, width, height);
    drawZones(zoneLayer);
    drawRoutes(routeLayer);
    drawIncidentMarkers(incidentLayer);
  }

  function pointInPolygon(point: Point, polygon: Point[]): boolean {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const current = polygon[i];
      const previous = polygon[j];
      const intersects =
        current.y > point.y !== previous.y > point.y &&
        point.x <
          ((previous.x - current.x) * (point.y - current.y)) /
            (previous.y - current.y) +
            current.x;

      if (intersects) inside = !inside;
    }

    return inside;
  }

  function getCanvasPoint(event: PointerEvent): Point | null {
    if (!app) return null;

    const rect = app.canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * app.screen.width;
    const y = ((event.clientY - rect.top) / rect.height) * app.screen.height;

    return { x, y };
  }

  function distanceTo(point: Point, target: Point): number {
    return Math.sqrt((target.x - point.x) ** 2 + (target.y - point.y) ** 2);
  }

  function pick(point: Point): MapSelection {
    if (options.layers.value.vehicles) {
      for (const vehicle of [...props.vehicles.value].reverse()) {
        const pos = vehiclePositions.value[vehicle.id] ?? vehicle.position;
        if (distanceTo(point, pos) <= VEHICLE_RADIUS + 8) {
          return { type: "vehicle", id: vehicle.id };
        }
      }
    }

    if (options.layers.value.incidents) {
      for (const incident of props.incidents.value) {
        const center = incidentCenters[incident.id];
        if (center && distanceTo(point, center) <= INCIDENT_RADIUS + 8) {
          return { type: "incident", id: incident.id };
        }
      }
    }

    for (const zone of props.zones.value) {
      if (pointInPolygon(point, zone.polygon)) {
        return { type: "zone", id: zone.id };
      }
    }

    return null;
  }

  function applyLayerVisibility() {
    vehicleLayer.visible = options.layers.value.vehicles;
    routeLayer.visible = options.layers.value.routes;
    incidentLayer.visible = options.layers.value.incidents;
  }

  async function init() {
    if (!canvasRef.value) return;

    await nextTick();

    const el = canvasRef.value;
    const width = el.clientWidth || 800;
    const height = el.clientHeight || 400;

    app = new Application();

    await app.init({
      width,
      height,
      background: COLORS.bg,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    el.appendChild(app.canvas);

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

    redrawAll(width, height);
    syncVehicleSprites();
    updateVehiclePositions();
    applyLayerVisibility();

    handlePointerDown = (event: PointerEvent) => {
      const point = getCanvasPoint(event);
      if (!point) return;

      options.onSelect(pick(point));
    };

    handlePointerMove = (event: PointerEvent) => {
      const point = getCanvasPoint(event);
      if (!point || !app) return;

      app.canvas.style.cursor = pick(point) ? "pointer" : "default";
    };

    app.canvas.addEventListener("pointerdown", handlePointerDown);
    app.canvas.addEventListener("pointermove", handlePointerMove);

    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !app) return;

      const newWidth = Math.floor(entry.contentRect.width);
      const newHeight = Math.floor(entry.contentRect.height);

      if (newWidth <= 0 || newHeight <= 0) return;
      if (newWidth === app.renderer.width && newHeight === app.renderer.height)
        return;

      app.renderer.resize(newWidth, newHeight);
      redrawAll(newWidth, newHeight);
    });
    resizeObserver.observe(el);

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

    watch(
      options.layers,
      () => {
        applyLayerVisibility();
      },
      { deep: true },
    );

    watch(options.selected, () => {
      drawZones(zoneLayer);
      drawIncidentMarkers(incidentLayer);
      updateVehiclePositions();
    });

    app.ticker.add(() => {
      updateVehiclePositions();
    });
  }

  onMounted(init);

  onUnmounted(() => {
    if (handlePointerDown) {
      app?.canvas.removeEventListener("pointerdown", handlePointerDown);
    }
    if (handlePointerMove) {
      app?.canvas.removeEventListener("pointermove", handlePointerMove);
    }
    resizeObserver?.disconnect();
    gsap.killTweensOf("*");
    app?.destroy(true);
  });
}
