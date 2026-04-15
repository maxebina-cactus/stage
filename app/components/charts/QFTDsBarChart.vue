<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'

const props = defineProps<{ loading: boolean }>()

// ── Dados ──────────────────────────────────────────────────────────────────
interface ChartDataItem {
  month: string
  qftds: number
  index: number
}

const dataRaw = [
  { month: 'Jan', qftds: 400 },
  { month: 'Fev', qftds: 600 },
  { month: 'Mar', qftds: 398 },
  { month: 'Abr', qftds: 550 },
  { month: 'Mai', qftds: 300 },
  { month: 'Jun', qftds: 580 },
]

const chartData = ref<ChartDataItem[]>(
  dataRaw.map((d, i) => ({ ...d, qftds: 0.01, index: i }))
)

watch(() => props.loading, (loading) => {
  if (!loading) {
    setTimeout(() => {
      chartData.value = dataRaw.map((d, i) => ({ ...d, index: i }))
    }, 100)
  }
})

// ── Configurações ──────────────────────────────────────────────────────────
const barColors = ['var(--ui-primary)']
const barAccessors = [(d: ChartDataItem) => d.qftds]

// Forçamos o tickValues para garantir que todos os 6 meses apareçam
const xTickValues = computed(() => chartData.value.map(d => d.index))
const xTickFormat = (i: number) => chartData.value[i]?.month ?? ''

const tooltipTemplate = (d: ChartDataItem): string => `
  <div>
    <div style="font-weight: 600; color: var(--ui-text-highlighted, #ffffff); margin-bottom: 4px;">${d.month}</div>
    <div style="font-size: 12px; color: var(--ui-text); display: flex; align-items: center; gap: 6px;">
       <span>QFTDs:</span> <strong style="color: var(--ui-text-highlighted);">${d.qftds}</strong>
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
          :color="barColors"
          :roundedCorners="4"
          :barPadding="0.4"
        />
        
        <VisAxis 
          type="x" 
          :tickFormat="xTickFormat" 
          :tickValues="xTickValues"
          :numTicks="dataRaw.length"
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