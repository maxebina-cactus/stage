<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date'
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { relatorioMetricasMock } from '~/mocks/relatorioMock'

definePageMeta({ layout: 'partners', title: 'Relatório' })
useSeoMeta({ title: 'Relatório · Afiliado · Partners' })

// ── Metric cards ──────────────────────────────────────────────────────────────

const metricas = relatorioMetricasMock

const fmt = (n: number) => new Intl.NumberFormat('pt-BR').format(n)

// ── Table mock ────────────────────────────────────────────────────────────────

interface RelatorioRow {
  data: string
  visitas: number
  registros: number
  ftds: number
  qftdsCpa: number
  cpa: number
  revShare: number
  roi: number
  comissoes: number
  comSubAff: number
  saques: number
  depositoLiquido: number
}

const tabelaMock: RelatorioRow[] = [
  { data: '23/10/2025', visitas: 1_820, registros: 143, ftds: 89,  qftdsCpa: 72,  cpa: 17, revShare: 30, roi: 12.4, comissoes: 4_350, comSubAff: 210, saques: 1_200, depositoLiquido: 3_150 },
  { data: '24/10/2025', visitas: 2_100, registros: 178, ftds: 102, qftdsCpa: 88,  cpa: 14, revShare: 30, roi: 14.2, comissoes: 5_100, comSubAff: 265, saques: 1_450, depositoLiquido: 3_650 },
  { data: '25/10/2025', visitas: 1_950, registros: 161, ftds: 94,  qftdsCpa: 80,  cpa: 14, revShare: 30, roi: 11.8, comissoes: 4_720, comSubAff: 230, saques: 1_300, depositoLiquido: 3_420 },
  { data: '26/10/2025', visitas: 2_380, registros: 197, ftds: 121, qftdsCpa: 101, cpa: 20, revShare: 30, roi: 16.7, comissoes: 6_050, comSubAff: 310, saques: 1_750, depositoLiquido: 4_300 },
  { data: '27/10/2025', visitas: 2_210, registros: 184, ftds: 115, qftdsCpa: 95,  cpa: 20, revShare: 30, roi: 15.3, comissoes: 5_750, comSubAff: 285, saques: 1_600, depositoLiquido: 4_150 },
]

// ── Date range ────────────────────────────────────────────────────────────────

const df = new DateFormatter('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
interface DateRange { start: DateValue | undefined; end: DateValue | undefined }
const dateRangeValue = shallowRef<DateRange>({
  start: new CalendarDate(2025, 3, 18),
  end:   new CalendarDate(2025, 4, 17),
})
const toJSDate = (d: DateValue) => d.toDate(getLocalTimeZone())

// ── Filters ───────────────────────────────────────────────────────────────────

const busca         = ref('')
const agregarPor    = ref<string | undefined>(undefined)
const agruparPor    = ref<string | undefined>(undefined)
const opcoesAgregar = ['Dia', 'Semana', 'Mês']
const opcoesAgrupar = ['Link', 'Marca', 'Campanha']

const dadosFiltrados = computed(() => {
  if (!busca.value) return tabelaMock
  const q = busca.value.toLowerCase()
  return tabelaMock.filter(r => r.data.toLowerCase().includes(q))
})

// ── Pagination ────────────────────────────────────────────────────────────────

const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20, 50]

const dadosPaginados = computed(() => {
  const size = Number(itensPorPagina.value)
  return dadosFiltrados.value.slice((pagina.value - 1) * size, pagina.value * size)
})

watch([busca, itensPorPagina], () => { pagina.value = 1 })

// ── Table columns ─────────────────────────────────────────────────────────────

const n  = (v: number) => fmt(v)
const pct = (v: number) => `${v}%`
const brl = (v: number) => `R$ ${fmt(v)}`

const colunas: TableColumn<RelatorioRow>[] = [
  { accessorKey: 'data',           header: 'Data' },
  { accessorKey: 'visitas',        header: 'Visits',        cell: ({ row }) => h('span', n(row.getValue('visitas') as number)) },
  { accessorKey: 'registros',      header: 'Registrations', cell: ({ row }) => h('span', n(row.getValue('registros') as number)) },
  { accessorKey: 'ftds',           header: 'FTDs',          cell: ({ row }) => h('span', n(row.getValue('ftds') as number)) },
  { accessorKey: 'qftdsCpa',       header: 'QFTDs, CPA',    cell: ({ row }) => h('span', n(row.getValue('qftdsCpa') as number)) },
  { accessorKey: 'cpa',            header: 'CPA',           cell: ({ row }) => h('span', n(row.getValue('cpa') as number)) },
  { accessorKey: 'revShare',       header: 'RevShare',      cell: ({ row }) => h('span', pct(row.getValue('revShare') as number)) },
  { accessorKey: 'roi',            header: 'ROI',           cell: ({ row }) => h('span', pct(row.getValue('roi') as number)) },
  { accessorKey: 'comissoes',      header: 'Commissions',   cell: ({ row }) => h('span', brl(row.getValue('comissoes') as number)) },
  { accessorKey: 'comSubAff',      header: 'Com. sub aff',  cell: ({ row }) => h('span', brl(row.getValue('comSubAff') as number)) },
  { accessorKey: 'saques',         header: 'Withdrawals',   cell: ({ row }) => h('span', brl(row.getValue('saques') as number)) },
  { accessorKey: 'depositoLiquido', header: 'Net Deposit',  cell: ({ row }) => h('span', brl(row.getValue('depositoLiquido') as number)) },
]
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <!-- Voltar ──────────────────────────────────────────────────────────────── -->
    <div>
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/afiliados"
      />
    </div>

    <!-- Metric cards ─────────────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <UCard v-for="m in metricas" :key="m.label">
        <div class="flex flex-col gap-3">
          <div class="size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
            <UIcon :name="m.icon" class="size-5 text-(--ui-primary)" />
          </div>

          <p class="text-sm text-(--ui-text-muted)">{{ m.label }}</p>

          <div class="flex items-end justify-between">
            <span class="text-2xl font-bold text-(--ui-text-highlighted)">{{ m.value }}</span>
            <UBadge
              :color="m.trend > 0 ? 'success' : 'error'"
              variant="subtle"
              :leading-icon="m.trend > 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
              :label="m.trendLabel"
              class="mb-1"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Table card ───────────────────────────────────────────────────────────── -->
    <UCard>

      <template #header>
        <div class="flex items-start justify-between gap-4 flex-wrap">

          <!-- Title -->
          <div class="flex items-center gap-2 shrink-0">
            <UIcon name="i-lucide-chart-pie" class="size-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Relatório</span>
          </div>

          <!-- Filters -->
          <div class="flex items-center gap-2 flex-wrap justify-end">
            <UInput
              v-model="busca"
              icon="i-lucide-search"
              placeholder="Pesquisar"
              color="neutral"
              variant="outline"
              size="md"
              class="w-52"
            />

            <UPopover :content="{ align: 'end' }">
              <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-calendar"
                size="md"
                class="date-range-btn text-xs font-normal"
              >
                {{ dateRangeValue.start && dateRangeValue.end
                  ? `${df.format(toJSDate(dateRangeValue.start))} – ${df.format(toJSDate(dateRangeValue.end))}`
                  : 'Selecionar período' }}
              </UButton>
              <template #content>
                <UCalendar v-model="dateRangeValue" class="p-2" :number-of-months="2" range />
              </template>
            </UPopover>

            <USelect
              v-model="agregarPor"
              :items="opcoesAgregar"
              placeholder="Agregar por"
              color="neutral"
              variant="outline"
              size="md"
              class="w-36"
            />

            <USelect
              v-model="agruparPor"
              :items="opcoesAgrupar"
              placeholder="Agrupar por"
              color="neutral"
              variant="outline"
              size="md"
              class="w-36"
            />

            <UButton
              icon="i-lucide-filter"
              color="neutral"
              variant="outline"
              size="md"
            />
          </div>
        </div>
      </template>

      <UTable :data="dadosPaginados" :columns="colunas">
        <template #empty>
          <div class="flex flex-col items-center justify-center py-10 gap-2 text-(--ui-text-muted)">
            <UIcon name="i-lucide-file-search" class="size-8" />
            <span class="text-sm">Nenhum resultado encontrado</span>
          </div>
        </template>
      </UTable>

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="dadosFiltrados.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>

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
