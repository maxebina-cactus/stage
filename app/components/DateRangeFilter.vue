<script setup lang="ts">
import { ref } from 'vue'

const dateRange = '11 de mar. de 2026 – 25 de mar. de 2026'
const isOpen = ref(false)
</script>

<template>
  <UButton
    variant="ghost"
    color="neutral"
    class="gap-1.5 font-normal px-2 h-7"
    @click="isOpen = !isOpen"
  >
    <template #leading>
      <UIcon name="i-lucide-calendar" class="w-4 h-4 text-(--ui-text-muted)" />
    </template>
    <span class="text-sm text-(--ui-text)">{{ dateRange }}</span>
    <template #trailing>
      <UIcon
        name="i-lucide-chevron-down"
        class="w-3.5 h-3.5 text-(--ui-text-muted) transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </template>
  </UButton>
</template>
