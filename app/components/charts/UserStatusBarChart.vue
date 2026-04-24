<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'

// ── Types ──────────────────────────────────────────────────────────────────

export interface StatusItem {
  name: string
  value: number
}

interface ChartDataItem {
  label: string
  value: number
  index: number
}

// ── Props ──────────────────────────────────────────────────────────────────

const props = defineProps<{
  loading: boolean
  data: StatusItem[]
  color?: string
}>()

// ── Colors ─────────────────────────────────────────────────────────────────

const resolvedColor = computed(() => props.color ?? 'var(--ui-primary)')
const barColors = computed(() => [resolvedColor.value]) 
const barColor = (d: ChartDataItem) => rtkPalette[d.index % rtkPalette.length]

// ── Chart data ─────────────────────────────────────────────────────────────

const toItems = (items: StatusItem[], animate = false): ChartDataItem[] =>
  items.map((d, i) => ({ label: d.name, value: animate ? 0.01 : d.value, index: i }))

const chartData = ref<ChartDataItem[]>(toItems(props.data, true))

watch(() => props.loading, (loading) => {
  if (!loading) setTimeout(() => { chartData.value = toItems(props.data) }, 100)
})

watch(() => props.data, (newData) => {
  chartData.value = toItems(newData, true)
  setTimeout(() => { chartData.value = toItems(newData) }, 100)
})

// ── Chart config ───────────────────────────────────────────────────────────

const yAccessors = [(d: ChartDataItem) => d.value]
const xTickValues = computed(() => chartData.value.map(d => d.index))
const xTickFormat = (i: number) => chartData.value[i]?.label ?? ''

// ── Tooltip ────────────────────────────────────────────────────────────────

const tooltipTemplate = (d: ChartDataItem): string => `
  <div>
    <div class="font-semibold text-(--ui-text-highlighted) mb-1">${d.label}</div>
    <div class="text-xs text-(--ui-text-dimmed)">${d.value.toLocaleString('pt-BR')}</div>
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
      <div class="overflow-x-auto overflow-y-hidden h-full scrollbar-thin scrollbar-thumb-(--ui-border) scrollbar-track-transparent">
        <div class="min-w-[700px] lg:min-w-0 lg:w-full h-full">
          <VisXYContainer :data="chartData" :duration="800" :margin="{ bottom: 40 }" class="w-full h-full pt-2">
            <VisStackedBar
              :x="(d: ChartDataItem) => d.index"
              :y="yAccessors"
              :color="barColors"
              :roundedCorners="4"
              :barPadding="0.4"
            />
            <VisAxis
              type="x"
              :tickFormat="xTickFormat"
              :tickValues="xTickValues"
              :gridLine="false"
              :tickLine="false"
            />
            <VisAxis
              type="y"
              :gridLine="true"
              :tickLine="false"
              :numTicks="5"
            />
            <VisCrosshair :template="tooltipTemplate" :color="() => resolvedColor.value" />
            <VisTooltip />
          </VisXYContainer>
        </div>
      </div>
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
  --vis-crosshair-line-stroke-color: v-bind(resolvedColor);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);
  --vis-crosshair-circle-stroke-width: 1px;
}

:deep(.vis-axis-x .vis-axis-grid-line) { display: none; }
:deep(.vis-axis-domain) { display: none; }

:deep(.vis-stacked-bar-segment) {
  transition: opacity 0.2s;
  cursor: pointer;
}

:deep(.vis-stacked-bar-segment:hover) {
  opacity: 0.8;
}

:deep(g.vis-crosshair circle) {
  fill: v-bind(resolvedColor) !important;
  stroke: var(--ui-bg) !important;
  stroke-width: 2px;
}
</style>
