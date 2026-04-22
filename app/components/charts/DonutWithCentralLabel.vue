<script setup lang="ts">
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'

// ── Types ──────────────────────────────────────────────────────────────────

export interface DonutDataItem {
  name: string
  value: number
}

// ── Props ──────────────────────────────────────────────────────────────────

const props = defineProps<{
  loading: boolean
  data: DonutDataItem[]
  totalLabel: string
  subLabel?: string
  colors?: string[]
}>()

// ── Colors ─────────────────────────────────────────────────────────────────

const resolvedColors = computed(() => props.colors ?? ['#22d3ee', '#e879f9', '#fb923c'])

// ── Tooltip ────────────────────────────────────────────────────────────────

const selectors = computed(() => ({
  [Donut.selectors.segment]: (d: any) =>
    d?.data ? `${d.data.name}: ${d.data.value.toLocaleString('pt-BR')}` : '',
}))

// ── Chart data ─────────────────────────────────────────────────────────────

const chartData = ref<DonutDataItem[]>(props.data.map(d => ({ ...d, value: 0.01 })))

watch(() => props.loading, (loading) => {
  if (!loading) setTimeout(() => { chartData.value = props.data }, 100)
})

watch(() => props.data, (newData) => {
  chartData.value = newData.map(d => ({ ...d, value: 0.01 }))
  setTimeout(() => { chartData.value = newData }, 100)
})
</script>

<template>
  <div v-if="loading" class="h-64 flex flex-col items-center justify-center gap-3">
    <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
    <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
  </div>

  <ClientOnly v-else>
    <div class="flex flex-row items-center gap-6 h-64">
      <div class="flex-[3] h-full">
        <VisSingleContainer :data="chartData" :duration="800" class="w-full h-full">
          <VisDonut
            :value="(d: DonutDataItem) => d.value"
            :colors="resolvedColors"
            :arcWidth="40"
            :cornerRadius="8"
            :central-label="totalLabel"
            :central-sub-label="subLabel ?? 'Total'"
          />
          <VisTooltip :triggers="selectors" />
        </VisSingleContainer>
      </div>

      <div class="flex-[2] flex flex-col justify-center gap-4">
        <div
          v-for="(item, i) in data"
          :key="item.name"
          class="flex items-center gap-3"
        >
          <span
            class="w-3 h-3 rounded-full shrink-0"
            :style="{ backgroundColor: resolvedColors[i] }"
          />
          <span class="text-sm text-(--ui-text)">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* ── Central label ────────────────────────────────────────────────────────── */
.flex-row {
  --vis-color0: #22d3ee;
  --vis-color1: #e879f9;
  --vis-color2: #fb923c;
  --vis-donut-central-label-text-color: var(--ui-text-highlighted);
  --vis-donut-central-label-font-size: 32px;
  --vis-donut-central-label-font-weight: 700;
  --vis-donut-central-sub-label-font-size: 14px;
  --vis-donut-central-sub-label-font-weight: 500;
  --vis-donut-central-sub-label-text-color: var(--ui-text-muted);
}

:deep(path[class*="-background"]) {
  fill: transparent !important;
}

:deep(.vis-donut-segment) {
  transition: all 0.2s ease;
  cursor: pointer;
}

:deep(.vis-donut-segment:hover) {
  opacity: 0.8;
}

:deep(.vis-tooltip) {
  background: var(--ui-bg-elevated);
  color: var(--ui-text-highlighted);
  border: 1px solid var(--ui-border-accented);
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
}
</style>
