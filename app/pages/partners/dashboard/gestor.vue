<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { whenever, useMagicKeys } from '@vueuse/core'
import { usuariosStatusMock, saquesStatusMock, metodoStatusMock, ultimosAfiliadosMock } from '~/mocks/gestorDashboardMock'
import type { Afiliado } from '~/mocks/gestorDashboardMock'

definePageMeta({ layout: 'partners', title: 'Dashboard' })
useSeoMeta({ title: 'Dashboard — Gestor · Partners' })

const isLoading = ref(true)
const inputBusca = ref<HTMLInputElement | null>(null)

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 1500)
})

// ── Atalho Ctrl+U ──────────────────────────────────────────────────────────
const { ctrl_u } = useMagicKeys()
whenever(ctrl_u, (e) => {
  // Previne que o navegador abra o código fonte
  if (inputBusca.value) {
    inputBusca.value?.focus()
  }
})

const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

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

const pagina = ref(1)
const itensPorPagina = ref(10)
const opcoesVisualizar = [10, 20]

const colunasAfiliados: TableColumn<Afiliado>[] = [
  { 
    accessorKey: 'id', 
    header: '#', 
    cell: ({ row }) => `#${row.getValue('id')}` 
  },
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'email', header: 'E-mail' },
  { 
    accessorKey: 'internacional', 
    header: 'Usuário Internacional', 
    cell: ({ row }) => row.getValue<boolean>('internacional') ? 'Sim' : 'Não' 
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(UBadge, {
        variant: 'subtle',
        color: getStatusColor(status),
        label: status
      })
    }
  },
  {
    accessorKey: 'acoes',
    header: () => h('div', { class: 'text-right' }, 'Ações'),
    cell: () => h('div', { class: 'flex justify-end' },
      h(UDropdownMenu, { items: acoesItens }, {
        default: () => h(UButton, { variant: 'ghost', color: 'neutral', icon: 'i-lucide-more-vertical', size: 'xs', square: true })
      })
    ),
  },
]

// ── Busca Reativa ─────────────────────────────────────────────────────────
const searchQuery = ref('')

const afiliadosFiltrados = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return ultimosAfiliadosMock
  return ultimosAfiliadosMock.filter(a =>
    `#${a.id}`.includes(q) ||
    a.nome.toLowerCase().includes(q) ||
    a.email.toLowerCase().includes(q) ||
    (a.internacional ? 'sim' : 'não').includes(q) ||
    a.status.toLowerCase().includes(q)
  )
})

const afiliadosPaginados = computed(() => {
  const pageSize = Number(itensPorPagina.value)
  return afiliadosFiltrados.value.slice((pagina.value - 1) * pageSize, pagina.value * pageSize)
})

watch(searchQuery,     () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })

const quickStats = [
  { icon: 'i-lucide-users', label: 'Usuários Hoje', value: '3.782', trend: 1, trendLabel: '+11,01%' },
  { icon: 'i-lucide-dollar-sign', label: 'Saques Hoje', value: '3.782', trend: -1, trendLabel: '-9,05%' },
  { icon: 'i-lucide-layers', label: 'Métodos Hoje', value: '3.782', trend: 1, trendLabel: '+11,01%' },
]
</script>

<template>
  <div class="p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard v-for="stat in quickStats" :key="stat.label">
        <div class="flex flex-col gap-3">
          <div class="size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
            <UIcon :name="stat.icon" class="size-5 text-(--ui-primary)" />
          </div>
          <p class="text-sm text-(--ui-text-muted)">{{ stat.label }}</p>
          <div class="flex items-end justify-between">
            <span class="text-3xl font-bold text-(--ui-text-highlighted)">{{ stat.value }}</span>
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

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-users" class="w-5 h-5 text-(--ui-primary)" />
          <span class="font-semibold text-(--ui-text-highlighted)">Usuários</span>
        </div>
      </template>

      <ChartsUserStatusBarChart
        :loading="isLoading"
        :data="usuariosStatusMock"
      />
    </UCard>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-landmark" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Saques</span>
          </div>
        </template>

        <ChartsDonutWithCentralLabel
          :loading="isLoading"
          :data="saquesStatusMock.items"
          :total-label="String(saquesStatusMock.total)"
          sub-label="Total"
        />
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-wallet-cards" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Método</span>
          </div>
        </template>

        <ChartsDonutWithCentralLabel
          :loading="isLoading"
          :data="metodoStatusMock.items"
          :total-label="String(metodoStatusMock.total)"
          sub-label="Total"
        />
      </UCard>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-users-2" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Últimos Afiliados</span>
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

    <div class="flex justify-end">
      <UButton
        label="Ver todos"
        trailing-icon="i-lucide-arrow-right"
        color="primary"
        variant="link"
        to="/partners/gestor/afiliados"
      />
    </div>

  </div>
</template>