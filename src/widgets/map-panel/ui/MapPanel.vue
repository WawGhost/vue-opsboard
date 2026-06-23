<template>
  <section class="map-panel">
    <div class="map-panel__toolbar">
      <span>Map Layer</span>
      <div class="map-panel__actions">
        <button type="button">Vehicles</button>
        <button type="button">Routes</button>
        <button type="button">Incidents</button>
      </div>
    </div>

    <div class="map-panel__canvas">
      <div class="map-panel__placeholder">Pixi scene will be here</div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

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
}

.map-panel__actions {
  display: flex;
  gap: 8px;
}

.map-panel__actions button {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.map-panel__canvas {
  flex: 1;
  padding: 16px;
}

.map-panel__placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  min-height: 420px;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.5);
}
</style>
