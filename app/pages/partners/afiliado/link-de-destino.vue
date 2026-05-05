<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { linksDestinoMock, type LinkDestino } from '~/mocks/linksDestinoMock'

definePageMeta({ layout: 'partners', title: 'Link de destino' })
useSeoMeta({ title: 'Link de destino · Afiliado · Partners' })

// ── Render components ─────────────────────────────────────────────────────
const UButton = resolveComponent('UButton')

// ── Filtros ───────────────────────────────────────────────────────────────
const opcoesMarcas   = ['Bet7K', 'Cassinopix']
const marcasFiltro   = ref<string[]>([])

const linksFiltrados = computed(() => {
  if (!marcasFiltro.value.length) return linksDestinoMock
  return linksDestinoMock.filter(l => marcasFiltro.value.includes(l.marca))
})

// ── Paginação ─────────────────────────────────────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20, 50]

const linksPaginados = computed(() => {
  const pageSize = Number(itensPorPagina.value)
  return linksFiltrados.value.slice((pagina.value - 1) * pageSize, pagina.value * pageSize)
})

watch(marcasFiltro,   () => { pagina.value = 1 })
watch(itensPorPagina, () => { pagina.value = 1 })

// ── Colunas ───────────────────────────────────────────────────────────────
const colunas: TableColumn<LinkDestino>[] = [
  {
    id: 'acoes',
    header: 'Ações',
    cell: () => h('div', { class: 'flex items-center gap-2' }, [
      h(UButton, {
        label: 'Gerar Link',
        color: 'primary',
        variant: 'solid',
        size: 'md',
      }),
      h(UButton, {
        icon: 'i-lucide-sparkles',
        variant: 'ghost',
        color: 'neutral',
        size: 'md',
      }),
    ]),
  },
  {
    accessorKey: 'nome',
    header: 'Nome do link',
    cell: ({ row }) => h('span', { class: 'font-semibold text-(--ui-text-highlighted)' }, row.getValue('nome') as string),
  },
  {
    id: 'marca-id',
    header: 'Marca/#ID',
    cell: ({ row }) => h('div', { class: 'flex flex-col gap-0.5' }, [
      h('span', { class: 'font-semibold text-(--ui-text-highlighted) text-sm' }, row.original.marca),
      h('span', { class: 'text-xs text-(--ui-text-muted) font-mono' }, row.original.id),
    ]),
  },
]
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
        to="/partners/dashboard/Afiliados"
      />
    </div>    

    <UCard>

      <template #header>
        <div class="flex items-center justify-between gap-4">

          <!-- Título com ícone (esquerda) -->
          <div class="flex items-center gap-2 shrink-0">
            <UIcon name="i-lucide-link" class="size-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)">Link de destino</span>
          </div>

          <!-- Filtro de marcas (direita) -->
          <USelectMenu
            v-model="marcasFiltro"
            :items="opcoesMarcas"
            multiple
            placeholder="Todas as marcas"
            color="neutral"
            variant="outline"
            size="md"
            class="w-52"
          >
            <template #default="{ modelValue: mv }">
              <template v-if="(mv as string[])?.length">
                <div class="flex items-center gap-1 flex-wrap min-w-0">
                  <UBadge
                    v-for="marca in (mv as string[])"
                    :key="marca"
                    :label="marca"
                    color="neutral"
                    variant="subtle"
                    size="xs"
                  />
                </div>
              </template>
              <span v-else class="text-(--ui-text-muted) text-sm">Todas as marcas</span>
            </template>
            <template #trailing>
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
              />
            </template>
          </USelectMenu>

        </div>
      </template>

      <UTable
        :data="linksPaginados"
        :columns="colunas"
      >
        <template #empty>
          <div class="flex flex-col items-center justify-center py-10 gap-2 text-(--ui-text-muted)">
            <UIcon name="i-lucide-link-2-off" class="size-8" />
            <span class="text-sm">Nenhum link encontrado</span>
          </div>
        </template>
      </UTable>

      <template #footer>
        <div class="flex flex-col gap-3">
          <TablesTableFooter
            v-model:page="pagina"
            v-model:page-size="itensPorPagina"
            :total="linksFiltrados.length"
            :page-size-options="opcoesVisualizar"
          />
        </div>
      </template>

    </UCard>
    <p class="text-xs text-(--ui-text-muted) text-right">
      Seu acordo atual é de
      <strong class="font-bold text-(--ui-primary)">30% RevShare</strong>.
    </p>
  </div>
</template>
