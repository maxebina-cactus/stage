<script setup lang="ts">
defineProps<{
  loading: boolean
  title: string
}>()
</script>

<template>
  <div v-if="loading" class="h-64 flex flex-col items-center justify-center gap-3">
    <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
    <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
  </div>

  <div v-else class="h-64 flex flex-col items-center justify-center gap-3 text-(--ui-text-muted)">
    <UIcon name="i-lucide-inbox" class="w-12 h-12" />
    <p class="text-sm">Nenhum dado encontrado</p>
  </div>
</template>
