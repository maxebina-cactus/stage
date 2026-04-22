<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Range } from '~/types'
import { saquesMock, type Saque } from '~/mocks/gestorDashboardMock'

definePageMeta({ layout: 'partners', title: 'Métodos de Recebimento' })
useSeoMeta({ title: 'Métodos de Recebimento · Gestor · Partners' })

// ── Render components ─────────────────────────────────────────────────────
const UBadge        = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton       = resolveComponent('UButton')
const UCheckbox     = resolveComponent('UCheckbox')

// ── Status helper ─────────────────────────────────────────────────────────
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aprovado':  return 'success'
    case 'Pendente':  return 'warning'
    case 'Cancelado': return 'error'
    default:          return 'neutral'
  }
}

// ── Filtros ───────────────────────────────────────────────────────────────
const searchQuery  = ref('')
const sortOrder    = ref<'desc' | 'asc'>('desc')
const dateRange    = ref<Range>({
  start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  end:   new Date(),
})
const statusFiltro = ref<string[]>([])
const metodoFiltro = ref<string[]>([])

const opcoesOrdenar = [
  { label: 'Data (mais recente)', value: 'desc' },
  { label: 'Data (mais antiga)',  value: 'asc'  },
]
const opcoesStatus = ['Aprovado', 'Pendente', 'Cancelado']
const opcoesMetodo = ['PIX', 'TED', 'USDT ERC20', 'USDT TRC20']

const limparFiltros = () => {
  searchQuery.value  = ''
  sortOrder.value    = 'desc'
  statusFiltro.value = []
  metodoFiltro.value = []
  dateRange.value    = {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end:   new Date(),
  }
}

// ── Seleção ───────────────────────────────────────────────────────────────
const selecao = ref<number[]>([])

// ── Computed: filtro + ordenação ──────────────────────────────────────────
const itensFiltrados = computed(() => {
  let result = saquesMock

  const q = searchQuery.value.toLowerCase().trim()
  if (q) {
    result = result.filter(s =>
      `#${s.id}`.includes(q)                 ||
      s.tipoChave.toLowerCase().includes(q)  ||
      s.chave.toLowerCase().includes(q)      ||
      s.titular.toLowerCase().includes(q)    ||
      s.status.toLowerCase().includes(q)
    )
  }

  if (statusFiltro.value.length) {
    result = result.filter(s => statusFiltro.value.includes(s.status))
  }

  if (metodoFiltro.value.length) {
    result = result.filter(s => metodoFiltro.value.includes(s.metodo))
  }

  return [...result].sort((a, b) => {
    const diff = new Date(b.data).getTime() - new Date(a.data).getTime()
    return sortOrder.value === 'desc' ? diff : -diff
  })
})

// ── Paginação ─────────────────────────────────────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20]

const itensPaginados = computed(() => {
  const pageSize = Number(itensPorPagina.value)
  return itensFiltrados.value.slice((pagina.value - 1) * pageSize, pagina.value * pageSize)
})

watch([searchQuery, statusFiltro, metodoFiltro, sortOrder], () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })

// ── Master checkbox ───────────────────────────────────────────────────────
const todosSelecionados = computed(() =>
  itensPaginados.value.length > 0 &&
  itensPaginados.value.every(s => selecao.value.includes(s.id))
)
const indeterminado = computed(() =>
  itensPaginados.value.some(s => selecao.value.includes(s.id)) && !todosSelecionados.value
)

const masterCheckboxItens = [
  [{ label: 'Todos',  onSelect: () => { selecao.value = itensPaginados.value.map(s => s.id) } }],
  [{ label: 'Nenhum', onSelect: () => { selecao.value = [] } }],
]

const toggleMaster = () => {
  const ids = itensPaginados.value.map(s => s.id)
  if (todosSelecionados.value) {
    selecao.value = selecao.value.filter(id => !ids.includes(id))
  } else {
    selecao.value = [...new Set([...selecao.value, ...ids])]
  }
}

const toggleItem = (id: number) => {
  selecao.value = selecao.value.includes(id)
    ? selecao.value.filter(i => i !== id)
    : [...selecao.value, id]
}

// ── Colunas ───────────────────────────────────────────────────────────────
const colunas = computed<TableColumn<Saque>[]>(() => [
  {
    id: 'select',
    header: () => h('div', { class: 'flex items-center gap-0.5' }, [
      h(UCheckbox, {
        modelValue: indeterminado.value ? 'indeterminate' : todosSelecionados.value,
        'onUpdate:modelValue': () => toggleMaster(),
      }),
      h(UDropdownMenu, { items: masterCheckboxItens }, {
        default: () => h(UButton, {
          icon: 'i-lucide-chevron-down',
          size: 'xs',
          variant: 'ghost',
          color: 'neutral',
          square: true,
          class: 'h-4 w-4',
        }),
      }),
    ]),
    cell: ({ row }) => h(UCheckbox, {
      modelValue: selecao.value.includes(row.original.id),
      'onUpdate:modelValue': () => toggleItem(row.original.id),
    }),
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => h('span', { class: 'text-(--ui-text-muted) font-mono text-xs' }, `#${row.getValue('id')}`),
  },
  {
    id: 'dados',
    header: 'Dados',
    cell: ({ row }) => h('div', { class: 'flex flex-col gap-0.5' }, [
      h('p', { class: 'text-sm leading-tight' }, [
        h('span', { class: 'text-(--ui-text-muted)' }, 'Tipo de chave: '),
        h('span', { class: 'text-(--ui-text-muted)' }, row.original.tipoChave),
      ]),
      h('p', { class: 'text-sm font-mono text-(--ui-text-highlighted) break-all leading-tight' }, row.original.chave),
      h('p', { class: 'text-sm leading-tight' }, [
        h('span', { class: 'text-(--ui-text-muted)' }, 'CNPJ: '),
        h('span', { class: 'text-(--ui-text-muted)' }, row.original.documento),
        h('span', { class: 'text-(--ui-text-muted) mx-1' }, '/'),
        h('span', { class: 'text-(--ui-text-muted) font-semibold' }, row.original.titular),
      ]),
    ]),
  },
  {
    id: 'usuario',
    header: 'Usuário',
    cell: ({ row }) => h('div', { class: 'flex flex-col gap-0.5 max-w-[220px]' }, [
      h('span', { class: 'text-sm font-medium text-(--ui-text) truncate' }, row.original.usuario.nome),
      h('span', { class: 'text-sm text-(--ui-text-muted) truncate' }, row.original.usuario.email),
    ]),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(UBadge, { variant: 'subtle', color: getStatusColor(status), label: status })
    },
  },
  {
    id: 'acoes',
    header: () => h('div', { class: 'text-right' }, 'Ações'),
    cell: ({ row: _row }) => h('div', { class: 'flex justify-end' },
      h(UDropdownMenu, {
        items: [
          [{ label: 'Ver Detalhes',  icon: 'i-lucide-eye'      }],
          [{ label: 'Editar',        icon: 'i-lucide-pencil'   }],
        ],
      }, {
        default: () => h(UButton, {
          variant: 'ghost',
          color: 'neutral',
          icon: 'i-lucide-more-vertical',
          size: 'xs',
          square: true,
        }),
      })
    ),
  },
])

// ── Ações em lote ─────────────────────────────────────────────────────────
const semSelecao = computed(() => selecao.value.length === 0)
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <!-- Navegação ──────────────────────────────────────────────────────── -->
    <div>
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        size="md"
        to="/partners/dashboard/gestor"
      />
    </div>

    <!-- Tabela ─────────────────────────────────────────────────────────── -->
    <UCard>
      <template #header>

        <!-- Título + Filtros ─────────────────────────────────────────── -->
        <div class="flex flex-wrap items-center gap-3">

          <!-- Título (esquerda) -->
          <div class="flex items-center gap-2 shrink-0">
            <UIcon name="i-lucide-credit-card" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Métodos de Recebimento</span>
          </div>

          <!-- Espaçador -->
          <div class="flex-1" />

          <!-- Filtros (direita) -->
          <div class="flex flex-wrap items-center gap-2">

            <!-- Busca -->
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="Pesquisar"
              color="neutral"
              variant="outline"
              size="md"
              class="w-52"
            />

            <!-- Ordenar -->
            <USelect
              v-model="sortOrder"
              :items="opcoesOrdenar"
              value-key="value"
              label-key="label"
              color="neutral"
              variant="outline"
              size="md"
              class="w-48"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
                />
              </template>
            </USelect>

            <!-- Período -->
            <HomeDateRangePicker v-model="dateRange" />

            <!-- Status (multi) -->
            <USelectMenu
              v-model="statusFiltro"
              :items="opcoesStatus"
              multiple
              :search-input="false"
              placeholder="Status"
              color="neutral"
              variant="outline"
              size="md"
              class="w-44"
            >
              <template #default="{ modelValue: mv }">
                <template v-if="(mv as string[])?.length">
                  <UBadge
                    :color="getStatusColor((mv as string[])[0])"
                    :label="(mv as string[])[0]"
                    variant="subtle"
                    size="xs"
                  />
                  <span v-if="(mv as string[]).length > 1" class="text-xs text-(--ui-text-muted)">
                    +{{ (mv as string[]).length - 1 }}
                  </span>
                </template>
                <span v-else class="text-(--ui-text-muted) text-sm">Status</span>
              </template>
              <template #item-label="{ item }">
                <UBadge
                  :color="getStatusColor(String((item as any).label ?? item))"
                  :label="String((item as any).label ?? item)"
                  variant="subtle"
                  size="xs"
                />
              </template>
              <template #trailing>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
                />
              </template>
            </USelectMenu>

            <!-- Método (multi) -->
            <USelectMenu
              v-model="metodoFiltro"
              :items="opcoesMetodo"
              multiple
              :search-input="false"
              placeholder="Método"
              color="neutral"
              variant="outline"
              size="md"
              class="w-44"
            >
              <template #default="{ modelValue: mv }">
                <template v-if="(mv as string[])?.length">
                  <span class="text-sm font-medium text-(--ui-text-highlighted)">
                    {{ (mv as string[])[0] }}
                  </span>
                  <span v-if="(mv as string[]).length > 1" class="text-xs text-(--ui-text-muted)">
                    +{{ (mv as string[]).length - 1 }}
                  </span>
                </template>
                <span v-else class="text-(--ui-text-muted) text-sm">Método</span>
              </template>
              <template #trailing>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
                />
              </template>
            </USelectMenu>

            <!-- Limpar filtros -->
            <UButton
              icon="i-lucide-filter-x"
              color="neutral"
              variant="ghost"
              size="md"
              @click="limparFiltros"
            />
          </div>
        </div>
      </template>

      <!-- Ações em lote ──────────────────────────────────────────────── -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs text-(--ui-text-muted) mr-1">
          {{ selecao.length }} selecionado(s)
        </span>
        <UButton
          label="Aprovar Selecionados"
          icon="i-lucide-check"
          size="md"
          color="success"
          variant="soft"
          :disabled="semSelecao"
        />
        <UButton
          label="Reprovar"
          icon="i-lucide-x"
          size="md"
          color="error"
          variant="soft"
          :disabled="semSelecao"
        />
        <UButton
          label="Exportar"
          icon="i-lucide-download"
          size="md"
          color="neutral"
          variant="outline"
          :disabled="selecao.length === 0"
        />
      </div>

      <UTable :data="itensPaginados" :columns="colunas" class="text-sm" />

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="itensFiltrados.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
