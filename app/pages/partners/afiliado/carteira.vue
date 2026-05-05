<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { saquesMock, type SaqueSolicitado, type StatusSaque } from '~/mocks/carteiraMock'

definePageMeta({ layout: 'partners', title: 'Carteira' })
useSeoMeta({ title: 'Carteira · Afiliado · Partners' })

const UBadge  = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

// ── Formatação ────────────────────────────────────────────────────────────
const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
const usd = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

// ── Paginação ─────────────────────────────────────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20, 50]

const saquesPaginados = computed(() => {
  const size = Number(itensPorPagina.value)
  return saquesMock.slice((pagina.value - 1) * size, pagina.value * size)
})

watch(itensPorPagina, () => { pagina.value = 1 })

// ── Mapeamento de cores de status ─────────────────────────────────────────
const corStatus = (status: StatusSaque) => {
  const map: Record<StatusSaque, string> = {
    Aprovado: 'success',
    Pendente: 'warning',
    Cancelado: 'error',
  }
  return map[status]
}

// ── Colunas da tabela ─────────────────────────────────────────────────────
const colunas: TableColumn<SaqueSolicitado>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) =>
      h('span', { class: 'font-mono text-sm text-(--ui-text-highlighted)' }, row.getValue('id') as string),
  },
  {
    id: 'data',
    header: 'Data',
    cell: ({ row }) =>
      h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: 'text-sm text-(--ui-text-highlighted)' }, row.original.data),
        h('span', { class: 'text-xs text-(--ui-text-muted)' }, row.original.hora),
      ]),
  },
  {
    id: 'metodo',
    header: 'Método',
    cell: ({ row }) =>
      h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: 'text-sm font-semibold text-(--ui-text-highlighted)' }, row.original.metodoNome),
        h('span', { class: 'text-xs text-(--ui-text-muted) font-mono' }, row.original.metodoEndereco),
      ]),
  },
  {
    id: 'valor',
    header: 'Valor',
    cell: ({ row }) =>
      h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: 'text-sm font-semibold text-(--ui-text-highlighted)' }, brl(row.original.valorBRL)),
        h('span', { class: 'text-xs text-(--ui-text-muted)' }, usd(row.original.valorUSD)),
      ]),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(UBadge, {
        label: row.getValue('status') as string,
        color: corStatus(row.getValue('status') as StatusSaque),
        variant: 'subtle',
      }),
  },
  {
    id: 'acoes',
    header: 'Ações',
    cell: () =>
      h(UButton, {
        icon: 'i-lucide-ellipsis-vertical',
        variant: 'ghost',
        color: 'neutral',
        size: 'md',
      }),
  },
]
</script>

<template>
  <div class="p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full">

    <!-- Voltar ───────────────────────────────────────────────────────────── -->
    <div>
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/afiliados"
      />
    </div>

    <!-- Grid superior 2 colunas ─────────────────────────────────────────── -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Card 1 — Saldo Atual -->
      <UCard>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-(--ui-text-muted)">Saldo Atual</p>
            <div class="size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
              <UIcon name="i-lucide-wallet" class="size-5 text-(--ui-primary)" />
            </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <p class="text-3xl font-bold text-(--ui-text-highlighted)">R$ 26.789,98</p>
            <UButton
              label="Solicitar Saque"
              color="primary"
              variant="solid"
              size="md"
              icon="i-lucide-arrow-up-right"
            />
          </div>
        </div>
      </UCard>

      <!-- Card 2 — Comissão de Sub Afiliados -->
      <UCard>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-(--ui-text-muted)">Comissão de Sub Afiliados</p>
            <div class="size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
              <UIcon name="i-lucide-users" class="size-5 text-(--ui-primary)" />
            </div>
          </div>
          <p class="text-2xl font-bold text-(--ui-text-highlighted)">R$ 12.538,55</p>
        </div>
      </UCard>

    </div>

    <!-- Grid inferior 3 colunas ─────────────────────────────────────────── -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <UCard>
        <div class="flex flex-col gap-3">
          <div class="size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
            <UIcon name="i-lucide-user-check" class="size-5 text-(--ui-primary)" />
          </div>
          <p class="text-sm text-(--ui-text-muted)">Quantidade de FTDs</p>
          <p class="text-2xl font-bold text-(--ui-text-highlighted)">578</p>
        </div>
      </UCard>

      <UCard>
        <div class="flex flex-col gap-3">
          <div class="size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
            <UIcon name="i-lucide-hand-coins" class="size-5 text-(--ui-primary)" />
          </div>
          <p class="text-sm text-(--ui-text-muted)">Comissões Acumuladas</p>
          <p class="text-2xl font-bold text-(--ui-text-highlighted)">R$ 1.589,32</p>
        </div>
      </UCard>

      <UCard>
        <div class="flex flex-col gap-3">
          <div class="size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center">
            <UIcon name="i-lucide-circle-check-big" class="size-5 text-(--ui-primary)" />
          </div>
          <p class="text-sm text-(--ui-text-muted)">Pagamentos já recebidos</p>
          <p class="text-2xl font-bold text-(--ui-text-highlighted)">R$ 123.456,21</p>
        </div>
      </UCard>

    </div>

    <!-- Seção: Saques Solicitados ────────────────────────────────────────── -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-receipt-text" class="size-5 text-(--ui-primary)" />
          <span class="font-semibold text-(--ui-text-highlighted)">Saques Solicitados</span>
        </div>
      </template>

      <UTable :data="saquesPaginados" :columns="colunas">
          <template #empty>
            <div class="flex flex-col items-center justify-center py-10 gap-2 text-(--ui-text-muted)">
              <UIcon name="i-lucide-wallet" class="size-8" />
              <span class="text-sm">Nenhum saque encontrado</span>
            </div>
          </template>
        </UTable>

        <template #footer>
          <TablesTableFooter
            v-model:page="pagina"
            v-model:page-size="itensPorPagina"
            :total="saquesMock.length"
            :page-size-options="opcoesVisualizar"
          />
        </template>
    </UCard>

  </div>
</template>
