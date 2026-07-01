<template>
  <header class="app-header">
    <div class="app-header__brand">
      <h1>OpsBoard</h1>
      <span>Fleet & Delivery Operations Simulator</span>
    </div>

    <nav class="app-header__nav">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/scenarios">Scenarios</RouterLink>
      <RouterLink to="/replay">Replay</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.app-header__brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.app-header__brand h1 {
  margin: 0;
  font-size: 20px;
}

.app-header__brand span {
  font-size: 12px;
  opacity: 0.7;
}

.app-header__nav {
  display: flex;
  gap: 16px;
}

.app-header__nav a {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
}

.app-header__nav a.router-link-active {
  opacity: 1;
  font-weight: 600;
}
</style>
