<template>
  <section class="base-card">
    <slot />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.base-card {
  background: #151922;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 16px;
}
</style>
