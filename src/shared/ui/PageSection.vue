<template>
  <section class="page-section">
    <slot />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
