<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { saquesMock } from '~/mocks/gestorDashboardMock'
import type { Saque } from '~/mocks/gestorDashboardMock'

definePageMeta({ layout: 'partners', title: 'Saques' })
useSeoMeta({ title: 'Saques · Gestor · Partners' })

const UBadge = resolveComponent('UBadge')

const colunasSaques: TableColumn<Saque>[] = [
  { accessorKey: 'id',           header: '#',        cell: ({ row }) => `#${row.getValue('id')}` },
  { accessorKey: 'data',         header: 'Data' },
  { accessorKey: 'metodo',       header: 'Método' },
  { accessorKey: 'valorBRL',     header: 'Valor BRL', cell: ({ row }) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.getValue('valorBRL')) },
  { accessorKey: 'valorUSD',     header: 'Valor USD', cell: ({ row }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.getValue('valorUSD')) },
  { accessorKey: 'usuarioNome',  header: 'Usuário' },
  { accessorKey: 'usuarioEmail', header: 'E-mail' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(UBadge, { variant: 'subtle', color: getStatusColor(status), label: status })
    },
  },
]

const pagina         = ref(1)
const itensPorPagina = ref(10)
const opcoesVisualizar = [10, 20, 50]
const searchQuery    = ref('')

const saquesFiltrados = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return saquesMock
  return saquesMock.filter(s =>
    `#${s.id}`.includes(q)                   ||
    s.data.includes(q)                        ||
    s.metodo.toLowerCase().includes(q)        ||
    s.usuarioNome.toLowerCase().includes(q)   ||
    s.usuarioEmail.toLowerCase().includes(q)  ||
    s.status.toLowerCase().includes(q)
  )
})

const saquesPaginados = computed(() => {
  const pageSize = Number(itensPorPagina.value)
  return saquesFiltrados.value.slice((pagina.value - 1) * pageSize, pagina.value * pageSize)
})

watch(searchQuery,     () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <div>
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/gestor"
      />
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-landmark" class="w-5 h-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Saques</span>
          </div>
          <UInput
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

      <UTable :data="saquesPaginados" :columns="colunasSaques" />

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="saquesFiltrados.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
