<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { whenever, useMagicKeys } from '@vueuse/core'
import { ultimosAfiliadosMock } from '~/mocks/gestorDashboardMock'
import type { Afiliado } from '~/mocks/gestorDashboardMock'

definePageMeta({ layout: 'partners', title: 'Afiliados' })
useSeoMeta({ title: 'Afiliados · Gestor · Partners' })

// ── Render components ─────────────────────────────────────────────────────
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

// ── Ações Dropdown ────────────────────────────────────────────────────────
const acoesItens = [
  [
    { label: 'Ver Detalhes',        icon: 'i-lucide-eye'         },
    { label: 'Histórico de Ganhos', icon: 'i-lucide-trending-up' },
  ],
  [
    { label: 'Editar Perfil',    icon: 'i-lucide-pencil'  },
    { label: 'Ajustar Comissão', icon: 'i-lucide-percent' },
  ],
  [
    { label: 'Bloquear Acesso', icon: 'i-lucide-ban',     class: 'text-(--ui-error)' },
    { label: 'Excluir',         icon: 'i-lucide-trash-2', class: 'text-(--ui-error)' },
  ],
]

// ── Colunas ───────────────────────────────────────────────────────────────
const colunasAfiliados: TableColumn<Afiliado>[] = [
  { accessorKey: 'id',            header: '#',                    cell: ({ row }) => `#${row.getValue('id')}` },
  { accessorKey: 'nome',          header: 'Nome' },
  { accessorKey: 'email',         header: 'E-mail' },
  { accessorKey: 'internacional', header: 'Usuário Internacional', cell: ({ row }) => row.getValue<boolean>('internacional') ? 'Sim' : 'Não' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(UBadge, { variant: 'subtle', color: getStatusColor(status), label: status })
    },
  },
  {
    accessorKey: 'acoes',
    header: () => h('div', { class: 'text-right' }, 'Ações'),
    cell: () => h('div', { class: 'flex justify-end' },
      h(UDropdownMenu, { items: acoesItens }, {
        default: () => h(UButton, { variant: 'ghost', color: 'neutral', icon: 'i-lucide-more-vertical', size: 'xs', square: true }),
      })
    ),
  },
]

// ── Busca ─────────────────────────────────────────────────────────────────
const pagina = ref(1)
const itensPorPagina = ref(10)
const opcoesVisualizar = [10, 20, 50, 100]
const searchQuery = ref('')
const inputBusca = ref<HTMLInputElement | null>(null)

const afiliadosFiltrados = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return ultimosAfiliadosMock
  return ultimosAfiliadosMock.filter(a =>
    `#${a.id}`.includes(q)                         ||
    a.nome.toLowerCase().includes(q)               ||
    a.email.toLowerCase().includes(q)              ||
    (a.internacional ? 'sim' : 'não').includes(q)  ||
    a.status.toLowerCase().includes(q)
  )
})

const afiliadosPaginados = computed(() => {
  const pageSize = Number(itensPorPagina.value)
  return afiliadosFiltrados.value.slice((pagina.value - 1) * pageSize, pagina.value * pageSize)
})

watch(searchQuery,     () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })

// Ctrl+U: previne "view-source" e foca o campo de busca
const { ctrl_u } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'u' && e.type === 'keydown') e.preventDefault()
  },
})
whenever(ctrl_u, () => inputBusca.value?.focus())
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <!-- Navegação ────────────────────────────────────────────────────────── -->
    <div>
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/gestor"
      />
    </div>

    <!-- Tabela ───────────────────────────────────────────────────────────── -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-users-2" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Afiliados</span>
          </div>
          <UInput
            ref="inputBusca"
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="Filtrar"
            color="neutral"
            variant="outline"
            size="md"
            class="w-64"
          />
        </div>
      </template>

      <UTable :data="afiliadosPaginados" :columns="colunasAfiliados" />

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="afiliadosFiltrados.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
