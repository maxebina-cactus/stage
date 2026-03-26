<script setup lang="ts">
const period = ref<'daily' | 'weekly'>('daily')

const rangeStart = new Date()
rangeStart.setDate(rangeStart.getDate() - 14)
const rangeEnd = new Date()

const fmt = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const dateRangeLabel = `${fmt(rangeStart)} – ${fmt(rangeEnd)}`

const periodItems = computed(() => [[
  { label: 'Daily', click: () => { period.value = 'daily' } },
  { label: 'Weekly', click: () => { period.value = 'weekly' } },
]])
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Toolbar -->
    <div class="flex items-center gap-3 px-6 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated) shrink-0">
      <UButton
        variant="outline"
        color="neutral"
        size="sm"
        icon="i-lucide-calendar"
        trailing-icon="i-lucide-chevron-down"
      >
        {{ dateRangeLabel }}
      </UButton>

      <UDropdownMenu :items="periodItems">
        <UButton
          variant="outline"
          color="neutral"
          size="sm"
          trailing-icon="i-lucide-chevron-down"
        >
          {{ period === 'daily' ? 'Daily' : 'Weekly' }}
        </UButton>
      </UDropdownMenu>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6 space-y-4">
      <HomeStats :period="period" />
      <HomeChart :period="period" />
      <HomeSales />
    </div>
  </div>
</template>
