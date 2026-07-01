<template>
  <AppShell>
    <div class="simple-page">
      <AppHeader />
      <main class="simple-page__content">
        <h2>Replay</h2>
        <p>Replay mode will be here.</p>
      </main>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from "@/shared/ui/AppShell.vue";
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue";
</script>

<style scoped>
.simple-page {
  min-height: 100vh;
  background: #0f131a;
  color: #f3f6fb;
}

.simple-page__content {
  padding: 24px;
}
</style>
