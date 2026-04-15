<script setup lang="ts">
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'

const props = defineProps<{ loading: boolean }>()

// ── Data ───────────────────────────────────────────────────────────────────

interface FlavorItem {
  name: string
  value: number
  color: string
}

const flavors: FlavorItem[] = [
  { name: 'Chocolate Glazed',     value: 45, color: 'var(--vis-color0)' },
  { name: 'Strawberry Sprinkles', value: 30, color: 'var(--vis-color1)' },
  { name: 'Boston Cream',         value: 25, color: 'var(--vis-color2)' },
]

const selectors = computed(() => ({
  [Donut.selectors.segment]: (d: any) => d?.data ? `${d.data.name}: ${d.data.value}%` : '',
}))

const donutData = ref<FlavorItem[]>(flavors.map(d => ({ ...d, value: 0.01 })))

watch(() => props.loading, (loading) => {
  if (!loading) {
    setTimeout(() => { donutData.value = flavors }, 100)
  }
})
</script>

<template>
  <div v-if="loading" class="h-80 flex flex-col items-center justify-center gap-3">
    <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-(--ui-primary)" />
    <p class="text-sm text-(--ui-text-muted)">Carregando dados...</p>
  </div>

  <ClientOnly v-else>
    <div class="flex flex-row items-center gap-6 h-64">
      <div class="flex-[3] h-full relative">
        <VisSingleContainer :data="donutData" :duration="800" class="w-full h-full">
          <VisDonut
            :value="(d: FlavorItem) => d.value"
            :arcWidth="40"
            :cornerRadius="6"
            central-label="12.5K"
            central-sub-label="Donuts"
          />
          <VisTooltip :triggers="selectors" />
        </VisSingleContainer>
      </div>

      <div class="flex-[2] flex flex-col justify-center gap-5">
        <div
          v-for="item in flavors"
          :key="item.name"
          class="flex items-start gap-3"
        >
          <span
            class="w-3 h-3 rounded-full shrink-0 mt-1"
            :style="{ backgroundColor: item.color }"
          />
          
          <div class="flex flex-col">
            <span class="text-sm font-medium text-(--ui-text) leading-tight">
              {{ item.name }}
            </span>
            <span class="text-xs text-(--ui-text-muted) tabular-nums">
              {{ item.value }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.flex-row {
  --vis-color0: #22d3ee; /* cyan-400    */
  --vis-color1: #e879f9; /* fuchsia-400 */
  --vis-color2: #fb923c; /* orange-400  */
  --vis-donut-central-label-text-color: var(--ui-text-highlighted);
  --vis-donut-central-label-font-size: 32px;
  --vis-donut-central-label-font-weight: 700;
  --vis-donut-central-sub-label-font-size: 16px;
  --vis-donut-central-sub-label-font-weight: 700;
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