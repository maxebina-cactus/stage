<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { postbacksMock, type Postback, type StatusPostback } from '~/mocks/postbacksMock'

definePageMeta({ layout: 'partners', title: 'Postbacks' })
useSeoMeta({ title: 'Postbacks · Afiliado · Partners' })

const UBadge        = resolveComponent('UBadge')
const UButton       = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { copy } = useClipboard({ legacy: true })
const toast    = useToast()

function copyUrl(url: string) {
  copy(url)
  toast.add({ title: 'URL copiada!', description: url, color: 'success', icon: 'i-lucide-check', duration: 2000 })
}

// ── Cores de status ───────────────────────────────────────────────────────
const corStatus = (status: StatusPostback) => {
  const map: Record<StatusPostback, string> = {
    Aprovado: 'success',
    Pendente: 'warning',
    Cancelado: 'error',
  }
  return map[status]
}

// ── Paginação ─────────────────────────────────────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20, 50]

const postbacksPaginados = computed(() => {
  const size = Number(itensPorPagina.value)
  return postbacksMock.slice((pagina.value - 1) * size, pagina.value * size)
})

watch(itensPorPagina, () => { pagina.value = 1 })

// ── Colunas ───────────────────────────────────────────────────────────────
const colunas: TableColumn<Postback>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) =>
      h('span', { class: 'font-mono text-sm text-(--ui-text-highlighted)' }, row.getValue('id') as string),
  },
  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: ({ row }) =>
      h('span', { class: 'font-bold text-(--ui-text-highlighted)' }, row.getValue('nome') as string),
  },
  {
    accessorKey: 'tipoPostback',
    header: 'Tipo de Postback',
    cell: ({ row }) =>
      h('span', { class: 'text-sm text-(--ui-text-muted)' }, row.getValue('tipoPostback') as string),
  },
  {
    accessorKey: 'tipoGatilho',
    header: 'Tipo de Gatilho',
    cell: ({ row }) =>
      h('span', { class: 'text-sm text-(--ui-text-muted)' }, row.getValue('tipoGatilho') as string),
  },
  {
    accessorKey: 'url',
    header: 'URL do Postback',
    cell: ({ row }) => {
      const url = row.getValue('url') as string
      return h('div', { class: 'flex items-center gap-2 max-w-sm' }, [
        h('span', { class: 'text-xs text-(--ui-text-muted) font-mono truncate min-w-0' }, url),
        h(UButton, {
          icon:         'i-lucide-copy',
          variant:      'ghost',
          color:        'neutral',
          size:         'xs',
          square:       true,
          'aria-label': 'Copiar URL',
          onClick:      () => copyUrl(url),
        }),
      ])
    },
  },
  {
    id: 'criadoEm',
    header: 'Criado em',
    cell: ({ row }) =>
      h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: 'text-sm text-(--ui-text-highlighted)' }, row.original.criadoEm),
        h('span', { class: 'text-xs text-(--ui-text-muted)' }, row.original.criadoAs),
      ]),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(UBadge, {
        label: row.getValue('status') as string,
        color: corStatus(row.getValue('status') as StatusPostback),
        variant: 'subtle',
      }),
  },
  {
    id: 'acoes',
    header: () => h('div', { class: 'text-right' }, 'Ações'),
    cell: () =>
      h('div', { class: 'flex justify-end' },
        h(UDropdownMenu, {
          items: [
            [
              { label: 'Editar',     icon: 'i-lucide-square-pen' },
              { label: 'Desativar',  icon: 'i-lucide-power-off'  },
            ],
          ],
        }, {
          default: () => h(UButton, {
            icon:         'i-lucide-ellipsis-vertical',
            size:         'xs',
            variant:      'ghost',
            color:        'neutral',
            square:       true,
            'aria-label': 'Ações do postback',
          }),
        }),
      ),
  },
]
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <!-- Top bar ─────────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between gap-4">
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="link"
        to="/partners/dashboard/afiliados"
      />
      <UButton
        label="Adicionar Postback"
        icon="i-lucide-plus"
        color="primary"
        variant="solid"
        size="md"
      />
    </div>

    <!-- Tabela de Postbacks ─────────────────────────────────────────────── -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-webhook" class="size-5 text-(--ui-primary)" />
          <span class="font-semibold text-(--ui-text-highlighted)">Postbacks</span>
        </div>
      </template>

      <UTable :data="postbacksPaginados" :columns="colunas">
        <template #empty>
          <div class="flex flex-col items-center justify-center py-10 gap-2 text-(--ui-text-muted)">
            <UIcon name="i-lucide-webhook" class="size-8" />
            <span class="text-sm">Nenhum postback encontrado</span>
          </div>
        </template>
      </UTable>

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="postbacksMock.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
