<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'

interface RevShareItem {
  label: string
  value: number
}

interface ChartDataItem {
  label: string
  value: number
  index: number
}

const props = defineProps<{
  loading: boolean
  data: RevShareItem[]
}>()

const chartData = ref<ChartDataItem[]>(
  props.data.map((d, i) => ({ ...d, value: 0.01, index: i }))
)

watch(() => props.loading, (loading) => {
  if (!loading) {
    setTimeout(() => {
      chartData.value = props.data.map((d, i) => ({ ...d, index: i }))
    }, 100)
  }
})

watch(() => props.data, (newData) => {
  chartData.value = newData.map((d, i) => ({ ...d, value: 0.01, index: i }))
  setTimeout(() => {
    chartData.value = newData.map((d, i) => ({ ...d, index: i }))
  }, 100)
})

const BAR_COLOR = 'var(--ui-primary)'

const barAccessors = [(d: ChartDataItem) => d.value]

const xTickValues = computed(() => chartData.value.map(d => d.index))
const xTickFormat  = (i: number) => chartData.value[i]?.label ?? ''

const tooltipTemplate = (d: ChartDataItem): string => `
  <div>
    <div class="font-semibold text-(--ui-text-highlighted) mb-1">${d.label}</div>
    <div class="text-xs text-(--ui-text) flex items-center gap-1.5">
      <span>Valor:</span> <strong class="text-(--ui-text-highlighted)">${d.value}</strong>
    </div>
  </div>
`
</script>

<template>
  <div class="flex flex-col h-80">
    <div v-if="loading" class="h-full flex flex-col items-center justify-center gap-3">
      <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
    </div>

    <ClientOnly v-else>
      <VisXYContainer :data="chartData" :duration="800" class="w-full h-full pt-4">
        <VisStackedBar
          :x="(d: ChartDataItem) => d.index"
          :y="barAccessors"
          :color="[BAR_COLOR]"
          :roundedCorners="4"
          :barPadding="0.4"
        />

        <VisAxis
          type="x"
          :tickFormat="xTickFormat"
          :tickValues="xTickValues"
          :numTicks="props.data.length"
          :gridLine="false"
          :tickLine="false"
        />

        <VisAxis
          type="y"
          :gridLine="true"
          :tickLine="false"
          :numTicks="5"
        />

        <VisCrosshair :template="tooltipTemplate" />
        <VisTooltip />
      </VisXYContainer>
    </ClientOnly>
  </div>
</template>

<style scoped>
.unovis-xy-container {
  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);
  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);
  --vis-crosshair-circle-stroke-width: 1px;
}

:deep(.vis-axis-x .vis-axis-grid-line) { display: none; }
:deep(.vis-axis-domain) { display: none; }
:deep(.vis-stacked-bar-segment) { transition: opacity 0.2s; cursor: pointer; }
:deep(.vis-stacked-bar-segment:hover) { opacity: 0.8; }

:deep(g.vis-crosshair circle) {
  stroke: var(--ui-bg) !important;
  stroke-width: 2px;
}
</style>
