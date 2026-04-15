<script setup lang="ts">
import { VisSingleContainer, VisDonut, VisBulletLegend, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'

const props = defineProps<{ loading: boolean }>()

const selectors = computed(() => ({
  [Donut.selectors.segment]: (d: any) => d?.data ? `${d.data.name}: ${d.data.value}%` : '',
}))

const dataValues = [
  { name: 'BTC', value: 40 },
  { name: 'ETH', value: 25 },
  { name: 'SOL', value: 15 },
  { name: 'USDT', value: 12 },
  { name: 'Outros', value: 8 },
]

const mockData = ref(dataValues.map(item => ({ ...item, value: 0.01 })))

watch(() => props.loading, (loading) => {
  if (!loading) {
    setTimeout(() => {
      mockData.value = dataValues
    }, 100)
  }
})
</script>

<template>
  <div v-if="loading" class="h-64 flex flex-col items-center justify-center gap-3">
    <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
    <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
  </div>

  <div v-else>
    <ClientOnly>
      <div class="flex flex-col gap-4">
        <VisSingleContainer :data="mockData" :duration="800" class="h-64">
          <VisDonut
            :value="d => d.value"
            :arcWidth="40"
            :cornerRadius="8"
            :events="{ 'mouseenter': () => {} }"
          />
          <VisTooltip :triggers="selectors" />
        </VisSingleContainer>
        <VisBulletLegend
          :items="mockData.map((d, i) => ({ name: d.name, color: `var(--vis-color${i})` }))"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* ── Paleta do gráfico ────────────────────────────────────────────────────────
   Unovis lê --vis-colorN via getComputedStyle(container). Definir no wrapper
   ancestral comum garante herança tanto para VisDonut quanto para VisBulletLegend.

   Equivalentes Tailwind para tokens --ui-*-400 não registrados no app.config:
   cyan-400 #22d3ee | fuchsia-400 #e879f9 | orange-400 #fb923c
   lime-400 #a3e635 | indigo-400 #818cf8
*/
.gap-4 {
  --vis-color0: #22d3ee; /* --ui-cyan-400    */
  --vis-color1: #e879f9; /* --ui-fuchsia-400 */
  --vis-color2: #fb923c; /* --ui-orange-400  */
  --vis-color3: #a3e635; /* --ui-lime-400    */
  --vis-color4: #818cf8; /* --ui-indigo-400  */
}

:deep(path[class*="-background"]) {
  fill: var(--ui-bg) !important;
}

:deep(.vis-donut-segment) {
  transition: transform 0.2s ease, opacity 0.2s ease;
  cursor: pointer;
}

:deep(.vis-donut-segment:hover) {
  opacity: 0.8;
}

/* SOLUÇÃO DEFINITIVA: 
  Usamos o atributo [data-vis-bullet-legend] para garantir que pegamos o container,
  independente da classe aleatória (css-czc...) que o Unovis gerar.
*/
:deep([data-vis-bullet-legend]), 
:deep(.vis-bullet-legend) {
  display: flex !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  width: 100% !important;
  gap: 20px !important; /* Aumentei o espaço para ficar bem visível */
  margin-top: 16px !important;
}

/* Alinha o conteúdo interno de cada item (bolinha + texto) */
:deep(.vis-bullet-legend) > div {
  display: flex !important;
  justify-content: center !important;
  gap: 20px !important;
  width: 100% !important;
}

:deep(.vis-bullet-legend-item) {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin: 0 !important;
  white-space: nowrap;
}

:deep(.vis-bullet-legend-item-marker) {
  background-color: var(--bullet-color) !important;
}

:deep(.vis-tooltip) {
  background: var(--ui-bg);
  color: var(--ui-text-highlighted);
  border: 1px solid var(--ui-border-accented);
  padding: 8px;
  border-radius: 6px;
}
</style>
