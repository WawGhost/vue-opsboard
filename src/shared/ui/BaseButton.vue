<template>
  <button class="base-button" type="button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.base-button {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  background: #2c6bff;
  color: white;
  cursor: pointer;
  font: inherit;
}
</style>
