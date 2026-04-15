<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'
import type { TurnoverMetric, TurnoverByProductItem } from '~/types/turnoverByProduct'
import { turnoverMock, ggrMock } from '~/mocks/turnoverByProductMock'

const props = defineProps<{ loading: boolean }>()
const metric = defineModel<TurnoverMetric>('metric', { default: 'turnover' })

// ── Types ──────────────────────────────────────────────────────────────────

interface ChartDataItem {
  month: string   // formatado, ex: "mar."
  casino: number
  sports: number
  index: number
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatBRL(value: number): string {
  if (value >= 1_000_000) {
    const mi = value / 1_000_000
    return `R$ ${mi % 1 === 0 ? mi.toString() : mi.toFixed(1)} mi`
  }
  if (value >= 1_000) {
    const k = value / 1_000
    return `R$ ${k % 1 === 0 ? k.toString() : k.toFixed(1)} mil`
  }
  return `R$ ${value.toLocaleString('pt-BR')}`
}

function monthLabel(iso: string): string {
  const [year, month] = iso.split('-')
  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString('pt-BR', { month: 'short' })
}

function toChartItems(items: TurnoverByProductItem[], animate = false): ChartDataItem[] {
  return items.map((d, i) => ({
    month: monthLabel(d.month),
    casino: animate ? 0.01 : d.casino,
    sports: animate ? 0.01 : d.sports,
    index: i,
  }))
}

// ── Chart data ─────────────────────────────────────────────────────────────

const sourceData = computed<TurnoverByProductItem[]>(() =>
  metric.value === 'turnover' ? turnoverMock.data : ggrMock.data
)

const chartData = ref<ChartDataItem[]>(toChartItems(sourceData.value, true))

watch(() => props.loading, (loading) => {
  if (!loading) {
    setTimeout(() => {
      chartData.value = toChartItems(sourceData.value)
    }, 100)
  }
})

watch(metric, (m) => {
  chartData.value = toChartItems((m === 'turnover' ? turnoverMock : ggrMock).data)
})

// ── Chart config ───────────────────────────────────────────────────────────

const barColors = ['var(--ui-primary)', 'var(--ui-secondary)']

const barAccessors = [
  (d: ChartDataItem) => d.sports,   // index 0 → primary (base do stack)
  (d: ChartDataItem) => d.casino,   // index 1 → secondary (topo do stack)
]

const xTickFormat = (_: unknown, i: number) => chartData.value[i]?.month ?? ''
const yTickFormat = (v: number) => formatBRL(v)

// ── Tooltip (VisCrosshair template) ────────────────────────────────────────

const tooltipTemplate = (d: ChartDataItem): string => `
  <div>
    <div style="
      font-size: 13px;
      font-weight: 600;
      color: var(--ui-text-highlighted);
      margin-bottom: 8px;
    ">${d.month}</div>

    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--ui-secondary); flex-shrink: 0; display: inline-block;
      "></span>
      <span style="font-size: 12px; color: var(--ui-text-dimmed); min-width: 60px;">
        Cassino:
      </span>
      <span style="font-size: 12px; font-weight: 600; color: var(--ui-text-highlighted);">
        ${formatBRL(d.casino)}
      </span>
    </div>

    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--ui-primary); flex-shrink: 0; display: inline-block;
      "></span>
      <span style="font-size: 12px; color: var(--ui-text-dimmed); min-width: 60px;">
        Sports:
      </span>
      <span style="font-size: 12px; font-weight: 600; color: var(--ui-text-highlighted);">
        ${formatBRL(d.sports)}
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
        <span class="w-2.5 h-2.5 rounded-full bg-(--ui-secondary)" />
        Cassino
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-(--ui-primary)" />
        Sports
      </span>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="h-80 flex flex-col items-center justify-center gap-3">
      <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
      <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
    </div>

    <!-- Chart -->
    <ClientOnly v-else>
      <VisXYContainer :data="chartData" :duration="800" class="w-full h-80">
        <VisStackedBar
          :x="(d: ChartDataItem) => d.index"
          :y="barAccessors"
          :color="barColors"
          :roundedCorners="4"
        />
        <VisAxis type="x" :tickFormat="xTickFormat" />
        <VisAxis type="y" :tickFormat="yTickFormat" />
        <VisCrosshair :template="tooltipTemplate" :color="() => barColors[0]" />
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

:deep(.vis-stacked-bar-segment) {
  transition: opacity 0.2s;
}

:deep(.vis-stacked-bar-segment:hover) {
  opacity: 0.9;
}
</style>
