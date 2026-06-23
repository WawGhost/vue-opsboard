<template>
  <section class="timeline-panel">
    <div class="timeline-panel__header">
      <strong>Timeline</strong>
      <div class="timeline-panel__controls">
        <button type="button">Play</button>
        <button type="button">Pause</button>
      </div>
    </div>

    <div class="timeline-panel__track">
      <div class="timeline-panel__line"></div>
      <div class="timeline-panel__point" style="left: 12%"></div>
      <div class="timeline-panel__point" style="left: 36%"></div>
      <div class="timeline-panel__point" style="left: 68%"></div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.timeline-panel {
  background: #151922;
  border-radius: 16px;
  padding: 16px;
}

.timeline-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.timeline-panel__controls {
  display: flex;
  gap: 8px;
}

.timeline-panel__controls button {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.timeline-panel__track {
  position: relative;
  height: 56px;
}

.timeline-panel__line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
}

.timeline-panel__point {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #2c6bff;
}
</style>
