<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date'
import { subAffiliateCommissionMock } from '~/mocks/subAffiliateCommissionMock'
import { affiliatePerformanceMock } from '~/mocks/affiliatePerformanceMock'
import { revShareMock } from '~/mocks/revShareMock'

definePageMeta({ layout: 'partners', title: 'Dashboard' })
useSeoMeta({ title: 'Dashboard · Partners' })

const isLoading = ref(true)
onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 1500)
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

  return affiliatePerformanceMock.data.filter(({ month }) =>
    month >= startYM && month <= endYM
  )
})

const treatsLoading = ref(false)

watch(dateRangeValue, () => {
  treatsLoading.value = true
  setTimeout(() => { treatsLoading.value = false }, 500)
})


const quickStats = [
  { icon: 'i-lucide-hand-coins', label: 'Comissões', value: '3.782', trend: 1, trendLabel: '+11,01%' },
  { icon: 'i-lucide-user-plus', label: 'Registros', value: '3.782', trend: -1, trendLabel: '-9,05%' },
  { icon: 'i-lucide-piggy-bank', label: 'FTDs', value: '3.782', trend: 1, trendLabel: '+11,01%' },
  { icon: 'i-lucide-zap', label: 'CPA', value: '3.782', trend: -1, trendLabel: '-9,05%' },
]

const subAffItems  = subAffiliateCommissionMock.data.map(d => ({ name: d.label, value: d.value }))
const subAffColors = subAffiliateCommissionMock.data.map(d => d.color)
</script>

<template>
  <div class="p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full">

    <UCard :ui="{ body: { background: 'bg-transparent' } }">
      <template #header>
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-2">
            <UIcon name="i-lucide-mouse-pointer-click" class="w-5 h-5 text-(--ui-primary) mt-0.5 shrink-0" />
            <div>
              <p class="font-semibold text-(--ui-text-highlighted)">Visitas</p>
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
        title="Visitas"
        :loading="false"
      />
      <ChartsAffiliatePerformanceLineChart
        v-else
        :loading="isLoading || treatsLoading"
        :data="filteredData"
      />
    </UCard>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard v-for="stat in quickStats" :key="stat.label">
        <div class="flex flex-col gap-3">
          <div class="size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
            <UIcon :name="stat.icon" class="size-5 text-(--ui-primary)" />
          </div>

          <p class="text-sm text-(--ui-text-muted)">{{ stat.label }}</p>

          <div class="flex items-end justify-between">
            <span class="text-3xl font-bold text-(--ui-text-highlighted)">
              {{ stat.value }}
            </span>

            <UBadge
              :color="stat.trend > 0 ? 'success' : 'error'"
              variant="subtle"
              :leading-icon="stat.trend > 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
              :label="stat.trendLabel"
              class="mb-1"
            />
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">QFTDs, CPA</span>
          </div>
        </template>

        <ChartsQFTDsBarChart :loading="isLoading" />
      </UCard>

      <UCard class="flex flex-col" :ui="{ body: 'flex flex-col flex-1 min-h-0' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-pie-chart" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Commission from Sub Aff</span>
          </div>
        </template>

        <div class="flex flex-1 items-center justify-center h-full">
          <ChartsDonutWithCentralLabel
            :loading="isLoading"
            :data="subAffItems"
            :total-label="subAffiliateCommissionMock.total"
            :colors="subAffColors"
            sub-label="Total"
          />
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-bar-chart-big" class="w-5 h-5 text-(--ui-primary)" />
          <span class="font-semibold text-(--ui-text-highlighted)">RevShare</span>
        </div>
      </template>

      <ChartsRevShareBarChart :loading="isLoading" :data="revShareMock" />
    </UCard>

  </div>
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
