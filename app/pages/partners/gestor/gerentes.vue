<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { format } from 'date-fns'
import type { TableColumn } from '@nuxt/ui'
import { gerentesMock, type Gerente } from '~/mocks/gestorDashboardMock'

definePageMeta({ layout: 'partners', title: 'Gerentes' })
useSeoMeta({ title: 'Gerentes · Gestor · Partners' })

// ── Render components ─────────────────────────────────────────────────────
const UBadge        = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton       = resolveComponent('UButton')
const UCheckbox     = resolveComponent('UCheckbox')

// ── Date helpers ──────────────────────────────────────────────────────────
const formatLoginDate = (iso: string) => format(new Date(iso), 'dd/MM/yyyy')
const formatLoginTime = (iso: string) => format(new Date(iso), 'HH:mm:ss')

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
const statusFiltro = ref<string[]>([])

const opcoesOrdenar = [
  { label: 'ID (maior primeiro)', value: 'desc' },
  { label: 'ID (menor primeiro)', value: 'asc'  },
]
const opcoesStatus = ['Aprovado', 'Pendente', 'Cancelado']

const limparFiltros = () => {
  searchQuery.value  = ''
  sortOrder.value    = 'desc'
  statusFiltro.value = []
}

// ── Seleção ───────────────────────────────────────────────────────────────
const selecao = ref<number[]>([])

// ── Computed: filtro + ordenação ──────────────────────────────────────────
const gerentesFiltrados = computed(() => {
  let result = gerentesMock

  const q = searchQuery.value.toLowerCase().trim()
  if (q) {
    result = result.filter(g =>
      `#${g.id}`.includes(q)              ||
      g.nome.toLowerCase().includes(q)    ||
      g.email.toLowerCase().includes(q)   ||
      g.funcao.toLowerCase().includes(q)  ||
      g.status.toLowerCase().includes(q)
    )
  }

  if (statusFiltro.value.length) {
    result = result.filter(g => statusFiltro.value.includes(g.status))
  }

  return [...result].sort((a, b) =>
    sortOrder.value === 'desc' ? b.id - a.id : a.id - b.id
  )
})

// ── Paginação ─────────────────────────────────────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20]

const gerentesPaginados = computed(() => {
  const pageSize = Number(itensPorPagina.value)
  return gerentesFiltrados.value.slice((pagina.value - 1) * pageSize, pagina.value * pageSize)
})

watch([searchQuery, statusFiltro, sortOrder], () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })

// ── Master checkbox ───────────────────────────────────────────────────────
const todosSelecionados = computed(() =>
  gerentesPaginados.value.length > 0 &&
  gerentesPaginados.value.every(g => selecao.value.includes(g.id))
)
const indeterminado = computed(() =>
  gerentesPaginados.value.some(g => selecao.value.includes(g.id)) && !todosSelecionados.value
)

const masterCheckboxItens = [
  [{ label: 'Todos',  onSelect: () => { selecao.value = gerentesPaginados.value.map(g => g.id) } }],
  [{ label: 'Nenhum', onSelect: () => { selecao.value = [] } }],
]

const toggleMaster = () => {
  const ids = gerentesPaginados.value.map(g => g.id)
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
const colunas = computed<TableColumn<Gerente>[]>(() => [
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
    id: 'nome',
    header: 'Nome',
    cell: ({ row }) => h('span', { class: 'font-regular text-(--ui-text-muted)' }, row.original.nome),
  },
  {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => h('span', { class: 'text-regular text-(--ui-text-muted)' }, row.original.email),
  },
  {
    id: 'funcao',
    header: 'Função',
    cell: ({ row }) => h('div', { class: 'flex flex-col gap-0.5' }, [
      h('span', { class: 'text-sm text-(--ui-text)' }, row.original.funcao),
      h('span', { class: 'text-xs text-(--ui-text-muted)' }, row.original.funcaoDescricao),
    ]),
  },
  {
    id: 'ultimoLogin',
    header: 'Último Login',
    cell: ({ row }) => h('div', { class: 'flex flex-col gap-0.5' }, [
      h('span', { class: 'font-medium text-(--ui-text-highlighted)' }, formatLoginDate(row.original.ultimoLogin)),
      h('span', { class: 'text-xs text-(--ui-text-muted)' }, formatLoginTime(row.original.ultimoLogin)),
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
          [{ label: 'Ver Detalhes', icon: 'i-lucide-eye'    }],
          [{ label: 'Editar',       icon: 'i-lucide-pencil' }],
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
        <div class="flex flex-col md:flex-row md:flex-wrap md:items-center gap-3">

          <!-- Título (esquerda) -->
          <div class="flex items-center gap-2 shrink-0">
            <UIcon name="i-lucide-user-cog" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Gerentes</span>
          </div>

          <!-- Espaçador -->
          <div class="hidden md:block md:flex-1" />

          <!-- Filtros (direita) -->
          <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">

            <!-- Busca -->
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="Pesquisar"
              color="neutral"
              variant="outline"
              size="md"
              class="w-full md:w-52"
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
              class="w-full md:w-48"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
                />
              </template>
            </USelect>

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
              class="w-full md:w-44"
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
      <div class="flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 mb-3">
        <span class="text-xs text-(--ui-text-muted) mr-1">
          {{ selecao.length }} selecionado(s)
        </span>
        <UButton
          label="Aprovar Selecionados"
          icon="i-lucide-check"
          size="md"
          color="success"
          variant="soft"
          class="w-full sm:w-auto"
          :disabled="semSelecao"
        />
        <UButton
          label="Reprovar"
          icon="i-lucide-x"
          size="md"
          color="error"
          variant="soft"
          class="w-full sm:w-auto"
          :disabled="semSelecao"
        />
        <UButton
          label="Exportar"
          icon="i-lucide-download"
          size="md"
          color="neutral"
          variant="outline"
          class="w-full sm:w-auto"
          :disabled="selecao.length === 0"
        />
      </div>

      <UTable :data="gerentesPaginados" :columns="colunas" />

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="gerentesFiltrados.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
