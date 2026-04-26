<script setup lang="ts">
definePageMeta({ layout: 'partners', title: 'Gerenciar Tenants' })
useSeoMeta({ title: 'Gerenciar Tenants · Admin · Partners' })

const UBadge        = resolveComponent('UBadge')
const UButton       = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

interface Tenant {
  id: number
  nome: string
  dominio: string
  status: 'Ativo' | 'Inativo'
  logo: string
  avatarClass: string
}

const tenants: Tenant[] = [
  {
    id: 1,
    nome: '7k Partners',
    dominio: '7kpartners.com',
    status: 'Ativo',
    logo: '/logo-7k.png',
    avatarClass: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  },
  {
    id: 2,
    nome: 'BRX Partners',
    dominio: 'brxpartners.com',
    status: 'Ativo',
    logo: '/logo-brx.png',
    avatarClass: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  },
  {
    id: 3,
    nome: 'Bulls Partners',
    dominio: 'bullspartners.com',
    status: 'Inativo',
    logo: '/logo-bulls-bet.png',
    avatarClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  },
]

const { copy } = useClipboard({ legacy: true })
const toast = useToast()

function copyDomain(domain: string) {
  copy(domain)
  toast.add({
    title: 'Domínio copiado!',
    description: domain,
    color: 'success',
    icon: 'i-lucide-check',
    duration: 2000,
  })
}

// ── Paginação ─────────────────────────────────────────────────────────────
const pagina           = ref(1)
const itensPorPagina   = ref(10)
const opcoesVisualizar = [10, 20, 50, 100]

const tenantsPaginados = computed(() => {
  const size = Number(itensPorPagina.value)
  return tenants.slice((pagina.value - 1) * size, pagina.value * size)
})

watch(itensPorPagina, () => { pagina.value = 1 })

// ── Colunas ───────────────────────────────────────────────────────────────
const columns = [
  {
    id: 'logo',
    header: 'Logo',
    cell: ({ row }: any) => {
      const tenant = row.original as Tenant
      return h('div', { class: 'flex items-center' }, [
        h('img', {
          src: tenant.logo,
          alt: tenant.nome,
          class: 'h-8 w-auto object-contain max-w-[80px]',
          onError: (e: Event) => {
            const img = e.target as HTMLImageElement
            img.style.display = 'none'
            const fallback = img.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          },
        }),
        h('div', {
          class: `h-8 w-8 rounded text-xs font-semibold items-center justify-center shrink-0 ${tenant.avatarClass}`,
          style: { display: 'none' },
        }, tenant.nome.charAt(0).toUpperCase()),
      ])
    },
  },
  {
    accessorKey: 'nome',
    header: 'Nome do Tenant',
    cell: ({ row }: any) =>
      h('span', { class: 'font-medium text-(--ui-text-highlighted)' }, row.getValue('nome')),
  },
  {
    accessorKey: 'dominio',
    header: 'Domínio',
    cell: ({ row }: any) => {
      const domain = row.getValue('dominio') as string
      return h('div', { class: 'flex items-center gap-1' }, [
        h('span', { class: 'text-sm font-mono text-(--ui-text-muted)' }, domain),
        h(UButton, {
          icon: 'i-lucide-copy',
          size: 'xs',
          variant: 'ghost',
          color: 'neutral',
          square: true,
          'aria-label': 'Copiar domínio',
          onClick: () => copyDomain(domain),
        }),
      ])
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: any) => {
      const status = row.getValue('status') as string
      if (status === 'Ativo') {
        return h('div', { class: 'flex items-center' }, [
          h('span', { class: 'relative flex h-2 w-2 mr-2' }, [
            h('span', { class: 'animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' }),
            h('span', { class: 'relative inline-flex rounded-full h-2 w-2 bg-green-500' }),
          ]),
          h(UBadge, { color: 'success', variant: 'subtle', label: 'Ativo' }),
        ])
      }
      return h('div', { class: 'flex items-center' }, [
        h('span', { class: 'h-2 w-2 rounded-full bg-red-500 mr-2 inline-block shrink-0' }),
        h(UBadge, { color: 'error', variant: 'subtle', label: 'Inativo' }),
      ])
    },
  },
  {
    id: 'acoes',
    header: () => h('div', { class: 'text-right' }, 'Ações'),
    cell: () =>
      h('div', { class: 'flex justify-end' },
        h(UDropdownMenu, {
          items: [
            [
              { label: 'Editar',                   icon: 'i-heroicons-pencil-square'            },
              { label: 'Acessar Painel (Login as)', icon: 'i-heroicons-arrow-right-on-rectangle' },
            ],
          ],
        }, {
          default: () => h(UButton, {
            icon:    'i-heroicons-ellipsis-vertical-20-solid',
            size:    'xs',
            variant: 'ghost',
            color:   'neutral',
            square:  true,
            'aria-label': 'Ações do tenant',
          }),
        }),
      ),
  },
]
</script>

<template>
  <div class="p-6 flex flex-col gap-6 w-full">

    <!-- Row 1: Navegação + Adicionar ────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/gestor"
      />
      <UButton
        icon="i-lucide-plus"
        label="Adicionar Tenant"
        color="primary"
        size="sm"
      />
    </div>

    <!-- Tabela ───────────────────────────────────────────────────────────── -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-building-2" class="size-5 text-(--ui-primary)" />
          <span class="font-semibold text-(--ui-text-highlighted)">Tenants</span>
        </div>
      </template>

      <UTable :data="tenantsPaginados" :columns="columns">
        <template #empty>
          <div class="flex flex-col items-center justify-center py-10 gap-2 text-(--ui-text-muted)">
            <UIcon name="i-lucide-building-2" class="size-8" />
            <span class="text-sm">Nenhum tenant encontrado</span>
          </div>
        </template>
      </UTable>

      <template #footer>
        <TablesTableFooter
          v-model:page="pagina"
          v-model:page-size="itensPorPagina"
          :total="tenants.length"
          :page-size-options="opcoesVisualizar"
        />
      </template>
    </UCard>

  </div>
</template>
