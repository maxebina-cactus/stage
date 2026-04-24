<script setup lang="ts">
useSeoMeta({ title: 'Page 4' })
</script>

<template>
  <UDashboardPanel id="navigation-page-4">
    <template #header>
      <AppHeader title="Page 4" />
    </template>
    <template #body>
      <div class="p-4 sm:p-6 flex flex-col gap-4 max-w-5xl mx-auto w-full">
        <h1 class="text-xl font-semibold text-(--ui-text)">Page 4</h1>
        <p class="text-[15px] text-(--ui-text-muted)">Conteúdo da Page 4.</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
