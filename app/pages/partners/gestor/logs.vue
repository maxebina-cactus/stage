<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ layout: 'partners', title: 'Logs' })
useSeoMeta({ title: 'Logs · Gestor · Partners' })

const UBadge = resolveComponent('UBadge')

interface LogEntry {
  id: number
  usuario: string
  tenant: string
  erro: string
  mensagem: string
  criadoEm: string
}

const logsMock: LogEntry[] = [
  { id: 1,  usuario: 'Allef Stage',   tenant: 'StagePartners', erro: '403', mensagem: "You don't have permissions for this affiliate program.",  criadoEm: '2024-05-10T14:23:55' },
  { id: 2,  usuario: 'Max Ebina',     tenant: 'CactusGaming',  erro: '500', mensagem: 'Internal server error during payout processing.',         criadoEm: '2024-05-10T13:12:00' },
  { id: 3,  usuario: 'Lucas Torres',  tenant: 'StagePartners', erro: '404', mensagem: 'Affiliate account not found.',                            criadoEm: '2024-05-10T12:45:22' },
  { id: 4,  usuario: 'Ana Lima',      tenant: 'BetArena',      erro: '401', mensagem: 'Unauthorized: invalid or expired token.',                 criadoEm: '2024-05-10T11:30:01' },
  { id: 5,  usuario: 'Carlos Neto',   tenant: 'CactusGaming',  erro: '422', mensagem: 'Unprocessable entity: missing required field "cpf".',     criadoEm: '2024-05-10T10:05:17' },
  { id: 6,  usuario: 'Fernanda Cruz', tenant: 'PlayBet',       erro: '500', mensagem: 'Database connection timeout during withdrawal request.',   criadoEm: '2024-05-09T23:59:45' },
  { id: 7,  usuario: 'João Mendes',   tenant: 'StagePartners', erro: '403', mensagem: "Forbidden: user role doesn't allow this action.",         criadoEm: '2024-05-09T22:10:30' },
  { id: 8,  usuario: 'Patrícia Brum', tenant: 'BetArena',      erro: '404', mensagem: 'Commission level configuration not found.',               criadoEm: '2024-05-09T21:00:00' },
  { id: 9,  usuario: 'Rafael Santos', tenant: 'CactusGaming',  erro: '500', mensagem: 'Unexpected error in report generation service.',          criadoEm: '2024-05-09T20:15:55' },
  { id: 10, usuario: 'Beatriz Alves', tenant: 'PlayBet',       erro: '401', mensagem: 'Session expired. Please authenticate again.',             criadoEm: '2024-05-09T19:30:00' },
  { id: 11, usuario: 'Thiago Lopes',  tenant: 'StagePartners', erro: '422', mensagem: 'Validation failed: pix key format is invalid.',           criadoEm: '2024-05-09T18:45:12' },
  { id: 12, usuario: 'Mariana Souza', tenant: 'CactusGaming',  erro: '403', mensagem: "Access denied to affiliate's financial data.",            criadoEm: '2024-05-09T17:22:08' },
]

function erroColor(code: string): 'error' | 'warning' | 'neutral' {
  if (code.startsWith('5')) return 'error'
  if (code.startsWith('4')) return 'warning'
  return 'neutral'
}

function formatarData(iso: string): string {
  const d    = new Date(iso)
  const dd   = String(d.getDate()).padStart(2, '0')
  const mm   = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh   = String(d.getHours()).padStart(2, '0')
  const min  = String(d.getMinutes()).padStart(2, '0')
  const ss   = String(d.getSeconds()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} - ${hh}:${min}:${ss}`
}

const colunas: TableColumn<LogEntry>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => h('span', { class: 'text-(--ui-text-muted) tabular-nums' }, `#${row.getValue('id')}`),
  },
  {
    accessorKey: 'usuario',
    header: 'Usuário',
    cell: ({ row }) => h('span', { class: 'font-medium text-(--ui-text-highlighted)' }, row.getValue('usuario') as string),
  },
  { accessorKey: 'tenant', header: 'Tenant' },
  {
    accessorKey: 'erro',
    header: 'Erro',
    cell: ({ row }) => {
      const code = row.getValue('erro') as string
      return h(UBadge, { variant: 'subtle', color: erroColor(code), label: code })
    },
  },
  {
    accessorKey: 'mensagem',
    header: 'Mensagem',
    cell: ({ row }) => h('span', { class: 'text-sm text-(--ui-text-muted) line-clamp-1 max-w-sm block' }, row.getValue('mensagem') as string),
  },
  {
    accessorKey: 'criadoEm',
    header: 'Criado em',
    cell: ({ row }) => h('span', { class: 'text-xs tabular-nums whitespace-nowrap' }, formatarData(row.getValue('criadoEm') as string)),
  },
]

// ── Busca (somente coluna 'Erro') e paginação ─────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20, 50, 100]
const searchQuery      = ref('')

const logsFiltrados = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return logsMock
  return logsMock.filter(l => l.erro.toLowerCase().includes(q))
})

const logsPaginados = computed(() => {
  const size = Number(itensPorPagina.value)
  return logsFiltrados.value.slice((pagina.value - 1) * size, pagina.value * size)
})

watch(searchQuery,    () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <!-- Row 1: Navegação + Exportar ─────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/gestor"
      />
      <UButton
        label="Exportar Logs"
        icon="i-lucide-download"
        variant="outline"
        color="neutral"
        size="sm"
      />
    </div>

    <!-- Tabela ───────────────────────────────────────────────────────────── -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-scroll-text" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Logs</span>
          </div>
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="Filtrar por código de erro..."
            color="neutral"
            variant="outline"
            size="md"
            class="w-64"
          />
        </div>
      </template>

      <UTable :data="logsPaginados" :columns="colunas">
        <template #empty>
          <div class="flex flex-col items-center justify-center py-10 gap-2 text-(--ui-text-muted)">
            <UIcon name="i-lucide-search-x" class="w-8 h-8" />
            <span class="text-sm">Nenhum log encontrado</span>
          </div>
        </template>
      </UTable>

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="logsFiltrados.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
