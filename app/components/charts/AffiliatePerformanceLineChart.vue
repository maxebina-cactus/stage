<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'

interface AffiliateDataItem {
  month: string
  cliques: number
  conversoes: number
}

interface ChartDataItem {
  label: string
  cliques: number
  conversoes: number
  index: number
}

const props = defineProps<{
  loading: boolean
  data: AffiliateDataItem[]
}>()

function monthLabel(iso: string): string {
  const [year, month] = iso.split('-')
  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString('pt-BR', { month: 'short' })
}

function toChartItems(items: AffiliateDataItem[], animate = false): ChartDataItem[] {
  return items.map((d, i) => ({
    label: monthLabel(d.month),
    cliques:    animate ? 0.01 : d.cliques,
    conversoes: animate ? 0.01 : d.conversoes,
    index: i,
  }))
}

const chartData = ref<ChartDataItem[]>(toChartItems(props.data, true))

watch(() => props.loading, (loading) => {
  if (!loading) {
    setTimeout(() => { chartData.value = toChartItems(props.data) }, 100)
  }
})

watch(() => props.data, (newData) => {
  chartData.value = toChartItems(newData, true)
  setTimeout(() => { chartData.value = toChartItems(newData) }, 100)
})

const lineColors = ['var(--ui-secondary)', 'var(--ui-primary)']

const lineAccessors = [
  (d: ChartDataItem) => d.cliques,    // linha 0 → Cliques    (--ui-secondary)
  (d: ChartDataItem) => d.conversoes, // linha 1 → Conversões (--ui-primary)
]

const xTickFormat = (_: unknown, i: number) => chartData.value[i]?.label ?? ''
const yTickFormat = (v: number) => v === 0 ? '0' : `${v / 1_000}k`
const yTickValues = [0, 100_000, 200_000, 300_000, 400_000, 500_000]

const tooltipTemplate = (d: ChartDataItem): string => `
  <div>
    <div class="text-[13px] font-semibold text-(--ui-text-highlighted) mb-2">${d.label}</div>

    <div class="flex items-center gap-2 mb-1">
      <span class="size-2 rounded-full bg-(--ui-secondary) shrink-0"></span>
      <span class="text-xs text-(--ui-text-dimmed) min-w-[72px]">Cliques:</span>
      <span class="text-xs font-semibold text-(--ui-text-highlighted)">${(d.cliques / 1_000).toFixed(0)}k</span>
    </div>

    <div class="flex items-center gap-2">
      <span class="size-2 rounded-full bg-(--ui-primary) shrink-0"></span>
      <span class="text-xs text-(--ui-text-dimmed) min-w-[72px]">Conversões:</span>
      <span class="text-xs font-semibold text-(--ui-text-highlighted)">${(d.conversoes / 1_000).toFixed(0)}k</span>
    </div>
  </div>
`
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="hidden sm:flex items-center gap-3 text-xs text-(--ui-text-muted)">
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-(--ui-secondary)"></span> Cliques
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-(--ui-primary)"></span> Conversões
      </span>
    </div>

    <div v-if="loading" class="h-80 flex flex-col items-center justify-center gap-3">
      <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
    </div>

    <div v-else-if="chartData.length === 0" class="h-80 flex flex-col items-center justify-center gap-3 text-(--ui-text-muted)">
      <UIcon name="i-lucide-inbox" class="w-12 h-12" />
      <p class="text-sm">Nenhum dado encontrado</p>
    </div>

    <ClientOnly v-else>
      <VisXYContainer :data="chartData" :duration="800" class="w-full h-80">
        <VisLine
          :x="(d: ChartDataItem) => d.index"
          :y="lineAccessors"
          :color="lineColors"
          :lineWidth="2"
          :curveType="'monotoneX'"
        />
        <VisAxis type="x" :tickFormat="xTickFormat" :numTicks="chartData.length" />
        <VisAxis type="y" :tickFormat="yTickFormat" :tickValues="yTickValues" :gridLine="true" />
        <VisCrosshair :template="tooltipTemplate" :color="() => lineColors[0]" />
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

:deep(g.vis-crosshair circle) {
  fill: var(--ui-primary) !important;
}

:deep(.vis-axis-x .vis-axis-grid-line) {
  display: none;
}

:deep(.vis-axis-domain) {
  display: none;
}

:deep(.vis-line) {
  transition: opacity 0.2s;
}

:deep(.vis-line:hover) {
  opacity: 0.85;
}
</style>
