<template>
  <span class="base-badge">
    <slot />
  </span>
</template>

<script setup lang="ts"></script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 12px;
}
</style>
