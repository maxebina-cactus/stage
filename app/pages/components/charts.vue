<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date'
import { preferenciaNacionalMock } from '~/mocks/preferenciaNacionalMock'
import type { TurnoverMetric } from '~/types/turnoverByProduct'

useSeoMeta({ title: 'Gráficos · Core' })

// ── Page loading ────────────────────────────────────────────────────────────

const isLoading = ref(true)
const turnoverMetric = ref<TurnoverMetric>('turnover')

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 2000)
})

// ── Date range ──────────────────────────────────────────────────────────────

const df = new DateFormatter('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

interface DateRange { start: DateValue | undefined; end: DateValue | undefined }

const dateRangeValue = shallowRef<DateRange>({
  start: new CalendarDate(2025, 1, 1),
  end: new CalendarDate(2025, 12, 31),
})

const toJSDate = (cDate: DateValue) => cDate.toDate(getLocalTimeZone())

// ── Filtered data ───────────────────────────────────────────────────────────

const toYM = (d: DateValue) => `${d.year}-${String(d.month).padStart(2, '0')}`

const filteredData = computed(() => {
  const { start, end } = dateRangeValue.value
  if (!start || !end) return []

  const startYM = toYM(start)
  const endYM = toYM(end)

  return preferenciaNacionalMock.data.filter(({ month }) =>
    month >= startYM && month <= endYM
  )
})

// ── Filter loading feedback ─────────────────────────────────────────────────

const treatsLoading = ref(false)

watch(dateRangeValue, () => {
  treatsLoading.value = true
  setTimeout(() => { treatsLoading.value = false }, 500)
})
</script>

<template>
  <UDashboardPanel id="charts">
    <template #header>
      <AppHeader title="Gráficos" />
    </template>

    <template #body>
      <div class="p-6 flex flex-col gap-8 max-w-5xl mx-auto w-full">
        <section class="flex flex-col gap-3">
          <h1 class="text-2xl font-semibold text-(--ui-text-highlighted)">
            Gráficos
          </h1>
          <p class="text-[15px] font-normal text-(--ui-text-muted) text-pretty max-w-2xl">
            Biblioteca core de visualização de dados baseada em Unovis. Componentes agnósticos para Backoffice, CRM e Partners.
          </p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard :ui="{ body: { background: 'bg-transparent' } }">
            <template #header>
              <div class="flex items-center gap-2 font-medium">
                <UIcon name="i-lucide-pie-chart" class="w-5 h-5 text-(--ui-primary)" />
                Distribuição de Ativos
              </div>
            </template>

            <ChartsAssetDistributionDonut :loading="isLoading" />
          </UCard>

          <UCard :ui="{ body: { background: 'bg-transparent' } }">
            <template #header>
              <div class="flex items-center gap-2 font-medium">
                <UIcon name="i-lucide-file-warning" class="w-5 h-5 text-(--ui-error)" />
                No Data
              </div>
            </template>

            <ChartsEmptyStateCard title="Histórico de Ativos" :loading="isLoading" />
          </UCard>
        </div>

        <UCard :ui="{ body: { background: 'bg-transparent' } }">
          <template #header>
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-(--ui-primary) mt-0.5 shrink-0" />
                <div>
                  <p class="font-medium text-(--ui-text-highlighted)">Turnover por Produto</p>
                  <p class="text-xs text-(--ui-text-muted) mt-0.5">Cassino vs Sports</p>
                </div>
              </div>
              <div class="ml-auto flex items-center">
                <div class="flex gap-1 bg-(--ui-bg-elevated) rounded-lg p-1">
                  <button
                    v-for="m in (['turnover', 'ggr'] as const)"
                    :key="m"
                    class="px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer"
                    :class="turnoverMetric === m
                      ? 'bg-(--ui-success) text-(--ui-bg)'
                      : 'text-(--ui-text-muted) hover:text-(--ui-text)'"
                    @click="turnoverMetric = m"
                  >
                    {{ m === 'turnover' ? 'Turnover' : 'GGR' }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <ChartsProductTurnoverBar v-model:metric="turnoverMetric" :loading="isLoading" />
        </UCard>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
          <UCard :ui="{ body: { background: 'bg-transparent' } }">
            <template #header>
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-start gap-2">
                  <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-(--ui-primary) mt-0.5 shrink-0" />
                  <div>
                    <p class="font-medium text-(--ui-text-highlighted)">Preferência Nacional</p>
                    <p class="text-xs text-(--ui-text-muted) mt-0.5">Biscoito vs Bolacha</p>
                  </div>
                </div>
                <div class="ml-auto flex items-center">
                  <UPopover :content="{ align: 'end' }">
                    <UButton
                      color="neutral"
                      variant="outline"
                      icon="i-lucide-calendar"
                      class="date-range-btn font-semibold text-xs py-1.5 px-3"
                      :ui="{ rounded: 'rounded-lg' }"
                    >
                      {{ dateRangeValue.start && dateRangeValue.end
                        ? `${df.format(toJSDate(dateRangeValue.start))} - ${df.format(toJSDate(dateRangeValue.end))}`
                        : 'Selecionar período' }}
                    </UButton>

                    <template #content>
                      <UCalendar
                        v-model="dateRangeValue"
                        class="p-2"
                        :number-of-months="2"
                        range
                      />
                    </template>
                  </UPopover>
                </div>
              </div>
            </template>

            <ChartsEmptyStateCard
              v-if="filteredData.length === 0 && !isLoading && !treatsLoading"
              title="Preferência Nacional"
              :loading="false"
            />
            <ChartsTreatsLineChart
              v-else
              :loading="isLoading || treatsLoading"
              :data="filteredData"
            />
          </UCard>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard :ui="{ body: { background: 'bg-transparent' } }">
            <template #header>
              <div class="flex items-center gap-2 font-medium">
                <UIcon name="i-lucide-bar-chart-2" class="w-5 h-5 text-(--ui-primary)" />
                QFTDs, CPA
              </div>
            </template>

            <ChartsQFTDsBarChart :loading="isLoading" />
          </UCard>

          <UCard :ui="{ body: { background: 'bg-transparent' } }">
            <template #header>
              <div class="flex items-center gap-2 font-medium">
                <UIcon name="i-lucide-pie-chart" class="w-5 h-5 text-(--ui-primary)" />
                Donuts Flavors
              </div>
            </template>

            <ChartsDonutsFlavors :loading="isLoading" />
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<style scoped>
.date-range-btn {
  border-color: var(--ui-border-accented);
  color: var(--ui-text-muted);
}

.date-range-btn:hover {
  color: var(--ui-text-highlighted);
}
</style>
