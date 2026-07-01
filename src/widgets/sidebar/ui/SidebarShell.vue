<template>
  <aside class="sidebar-shell">
    <slot />
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar-shell {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 320px;
  max-width: 360px;
  min-height: 0;
}
</style>
