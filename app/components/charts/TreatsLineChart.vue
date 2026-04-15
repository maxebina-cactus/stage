<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'

// ── Types ──────────────────────────────────────────────────────────────────

interface TreatsDataItem {
  month: string
  biscoito: number
  bolacha: number
}

interface ChartDataItem {
  label: string
  biscoito: number
  bolacha: number
  index: number
}

// ── Props ──────────────────────────────────────────────────────────────────

const props = defineProps<{
  loading: boolean
  data: TreatsDataItem[]
}>()

// ── Helpers ────────────────────────────────────────────────────────────────

function monthLabel(iso: string): string {
  const [year, month] = iso.split('-')
  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString('pt-BR', { month: 'short' })
}

function toChartItems(items: TreatsDataItem[], animate = false): ChartDataItem[] {
  return items.map((d, i) => ({
    label: monthLabel(d.month),
    biscoito: animate ? 0.01 : d.biscoito,
    bolacha: animate ? 0.01 : d.bolacha,
    index: i,
  }))
}

// ── Chart data ─────────────────────────────────────────────────────────────

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

// ── Chart config ───────────────────────────────────────────────────────────

const lineColors = ['var(--ui-secondary)', 'var(--ui-primary)']

const lineAccessors = [
  (d: ChartDataItem) => d.biscoito,  // linha 0 → Biscoito (--ui-secondary)
  (d: ChartDataItem) => d.bolacha,   // linha 1 → Bolacha  (--ui-primary)
]

const xTickFormat = (_: unknown, i: number) => chartData.value[i]?.label ?? ''
const yTickFormat = (v: number) => v === 0 ? '0' : `${v / 1_000}k`
const yTickValues = [0, 100_000, 200_000, 300_000, 400_000, 500_000]

// ── Tooltip (VisCrosshair template) ────────────────────────────────────────

const tooltipTemplate = (d: ChartDataItem): string => `
  <div>
    <div style="
      font-size: 13px;
      font-weight: 600;
      color: var(--ui-text-highlighted);
      margin-bottom: 8px;
    ">${d.label}</div>

    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--ui-secondary); flex-shrink: 0; display: inline-block;
      "></span>
      <span style="font-size: 12px; color: var(--ui-text-dimmed); min-width: 60px;">
        Biscoito:
      </span>
      <span style="font-size: 12px; font-weight: 600; color: var(--ui-text-highlighted);">
        ${(d.biscoito / 1_000).toFixed(0)}k
      </span>
    </div>

    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--ui-primary); flex-shrink: 0; display: inline-block;
      "></span>
      <span style="font-size: 12px; color: var(--ui-text-dimmed); min-width: 60px;">
        Bolacha:
      </span>
      <span style="font-size: 12px; font-weight: 600; color: var(--ui-text-highlighted);">
        ${(d.bolacha / 1_000).toFixed(0)}k
      </span>
    </div>
  </div>
`
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Legenda -->
    <div class="hidden sm:flex items-center gap-3 text-xs text-(--ui-text-muted)">
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-(--ui-secondary)"></span> Biscoito
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-(--ui-primary)"></span> Bolacha
      </span>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="h-80 flex flex-col items-center justify-center gap-3">
      <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="chartData.length === 0" class="h-80 flex flex-col items-center justify-center gap-3 text-(--ui-text-muted)">
      <UIcon name="i-lucide-inbox" class="w-12 h-12" />
      <p class="text-sm">Nenhum dado encontrado</p>
    </div>

    <!-- Chart -->
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
