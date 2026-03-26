<script setup lang="ts">
const dateRange = '11 de mar. de 2026 – 25 de mar. de 2026'
</script>

<template>
  <UButton
    variant="ghost"
    color="neutral"
    class="group gap-1.5 font-normal px-2 h-10"
  >
    <template #leading>
      <UIcon name="i-lucide-calendar" class="w-4 h-4 text-(--ui-text-muted)" />
    </template>
    <span class="text-sm text-(--ui-text)">{{ dateRange }}</span>
    <template #trailing>
      <UIcon
        name="i-lucide-chevron-down"
        class="w-3.5 h-3.5 text-(--ui-text-muted) transition-transform duration-200 group-hover:rotate-180"
      />
    </template>
  </UButton>
</template>
