<script setup lang="ts">
useSeoMeta({ title: 'Home' })

const quickStartCards = [
  {
    label: 'Tokens',
    icon: 'i-lucide-palette',
    description: 'Variáveis CSS --ui-* de cor, espaçamento e tipografia.',
    to: '/tokens',
  },
  {
    label: 'Componentes',
    icon: 'i-lucide-blocks',
    description: 'Catálogo completo de componentes Nuxt UI customizados.',
    to: '/components',
  },
  {
    label: 'Links',
    icon: 'i-lucide-link',
    description: 'Referências externas e internas do time front-end.',
    to: '/links',
  },
  {
    label: 'Figma Playbook',
    icon: 'i-lucide-book-open',
    description: 'Melhores práticas de design da Cactus',
    browser: 'https://www.figma.com/files/1501300394391584478/project/445440469?fuid=1517878624450188044',
    app: 'figma://files/1501300394391584478/project/445440469?fuid=1517878624450188044',
  },
  {
    label: 'Figma Cactus',
    icon: 'i-lucide-figma',
    description: 'Biblioteca de componentes e tokens no Figma.',
    browser: 'https://www.figma.com/files/1501300394391584478?fuid=1517878624450188044',
    app: 'figma://files/1501300394391584478?fuid=1517878624450188044',
  },
]

const coreTags = ['Tokens CSS --ui-*', 'Componentes base', 'Padrões', 'Atomic design']

const produtosCards = [
  {
    label: 'Backoffice',
    icon: 'i-lucide-layout-dashboard',
    description: 'Plataforma white label para gestão de casas de apostas. Suporta customização de tema, aparência e idioma.',
    to: '/backoffice',
  },
  {
    label: 'CRM',
    icon: 'i-lucide-users',
    description: 'Ferramenta interna de gestão de relacionamento com clientes. Sem customização de tema.',
    to: '/crm',
  },
  {
    label: 'Partners',
    icon: 'i-lucide-handshake',
    description: 'Portal de parceiros integrado ao CRM. Herda as mesmas regras e padrões do CRM.',
    to: '/partners',
  },
]

const changelog = [
  {
    version: 'v2.5.0',
    date: '27 mar 2026',
    tag: 'feat',
    description: 'Novos tokens de espaçamento --ui-space-* e suporte a modo compacto.',
  },
  {
    version: 'v2.4.2',
    date: '18 mar 2026',
    tag: 'fix',
    description: 'Corrigido contraste do UBadge variant="soft" em temas escuros.',
  },
  {
    version: 'v2.4.0',
    date: '05 mar 2026',
    tag: 'feat',
    description: 'Adicionado componente UDataTable com suporte a ordenação e paginação.',
  },
  {
    version: 'v2.3.1',
    date: '20 fev 2026',
    tag: 'docs',
    description: 'Documentação de uso do UCard com exemplos de border-left e slots.',
  },
  {
    version: 'v2.3.0',
    date: '10 fev 2026',
    tag: 'breaking',
    description: 'Token --ui-radius renomeado para --ui-radius-base. Atualizar refs.',
  },
]

const tagColor: Record<string, 'success' | 'error' | 'info' | 'warning'> = {
  feat: 'success',
  fix: 'error',
  docs: 'info',
  breaking: 'warning',
}

const handleSpotlight = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--y', `${e.clientY - rect.top}px`)
}

const changelogColumns = [
  { accessorKey: 'version', header: 'Versão', size: 80 },
  { accessorKey: 'tag', header: 'Tipo', size: 80 },
  { accessorKey: 'description', header: 'Descrição' },
  { accessorKey: 'date', header: 'Data', size: 120 },
]
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <AppHeader title="Home" />
    </template>

    <template #body>
      <div class="p-6 flex flex-col gap-8 max-w-5xl mx-auto w-full">

        <!-- Hero -->
        <section id="bem-vindo" class="flex flex-col gap-3">
          <h1 class="text-2xl font-semibold text-(--ui-text-muted) whitespace-nowrap">
            Bem-vindo à Cactus UI
          </h1>
          <p class="text-[15px] font-normal text-(--ui-text-muted) text-pretty max-w-2xl">
            Design system e referência front-end para Backoffice, CRM e Partners — tokens,
            componentes e padrões compartilhados em Nuxt UI v4, Vue 3 e TypeScript, numa fonte
            única de verdade para o time.
          </p>
        </section>

        <!-- Core card -->
        <UCard :ui="{ body: 'p-5' }">
          <h2 class="text-md font-semibold text-(--ui-text-muted) whitespace-nowrap mb-4">
            Core — base compartilhada
          </h2>
          <div class="flex items-start gap-4">
            <div class="mt-0.5 size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-layers" class="size-5 text-(--ui-primary)" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[15px] font-normal text-(--ui-text-muted) text-pretty mb-3">
                Conjunto central de tokens, componentes atômicos e padrões de composição usados em
                todos os produtos. Qualquer alteração aqui impacta o ecossistema inteiro — revise
                com o time antes de modificar.
              </p>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in coreTags"
                  :key="tag"
                  variant="soft"
                  color="primary"
                  size="md"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Quick start -->
        <section id="inicio-rapido" class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <div class="w-1 self-stretch rounded-sm bg-(--ui-primary) shrink-0" />
            <h2 class="text-sm font-semibold text-(--ui-text-muted) uppercase tracking-wider whitespace-nowrap shrink-0">
              Início rápido
            </h2>
            <div class="flex-1 h-px bg-(--ui-border)" />
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <UCard
              v-for="card in quickStartCards"
              :key="card.label"
              :ui="{ root: 'group relative overflow-hidden', body: 'p-4 h-full' }"
              class="hover:ring-1 hover:ring-(--ui-primary) transition-shadow"
              @mousemove="handleSpotlight"
            >
              <div
                class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style="background: radial-gradient(400px 400px at var(--x, 0px) var(--y, 0px), color-mix(in oklab, var(--ui-primary) 10%, transparent), transparent)"
              />
              <div class="flex flex-col gap-3 h-full relative">
                <div class="size-7 rounded-md bg-(--ui-bg-elevated) flex items-center justify-center">
                  <UIcon :name="card.icon" class="size-4 text-(--ui-primary)" />
                </div>
                <p class="text-base font-semibold text-(--ui-text-highlighted)">
                  {{ card.label }}
                </p>
                <p class="text-[15px] font-normal text-(--ui-text-muted) text-pretty mt-1 flex-1">{{ card.description }}</p>
                <div v-if="card.to" class="mt-auto">
                  <UButton
                    :to="card.to"
                    target="_blank"
                    size="xs"
                    variant="soft"
                    color="primary"
                    icon="i-lucide-arrow-right"
                    trailing
                  >
                    Ver
                  </UButton>
                </div>
                <div v-else class="flex gap-1.5 mt-auto">
                  <UButton
                    :href="card.browser"
                    target="_blank"
                    size="xs"
                    variant="soft"
                    color="neutral"
                    icon="i-lucide-globe"
                    title="Abrir no navegador"
                  >
                    Browser
                  </UButton>
                  <UButton
                    v-if="card.app"
                    :href="card.app"
                    size="xs"
                    variant="soft"
                    color="primary"
                    icon="i-lucide-app-window"
                    title="Abrir no app"
                  >
                    App
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </section>

        <!-- Produtos -->
        <section id="produtos" class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <div class="w-1 self-stretch rounded-sm bg-(--ui-primary) shrink-0" />
            <h2 class="text-sm font-semibold text-(--ui-text-muted) uppercase tracking-wider whitespace-nowrap shrink-0">
              Produtos
            </h2>
            <div class="flex-1 h-px bg-(--ui-border)" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <UCard
              v-for="card in produtosCards"
              :key="card.label"
              :ui="{ root: 'group relative overflow-hidden', body: 'p-4 h-full' }"
              class="hover:ring-1 hover:ring-(--ui-primary) transition-shadow"
              @mousemove="handleSpotlight"
            >
              <div
                class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style="background: radial-gradient(400px 400px at var(--x, 0px) var(--y, 0px), color-mix(in oklab, var(--ui-primary) 10%, transparent), transparent)"
              />
              <div class="flex flex-col gap-3 h-full relative">
                <div class="size-7 rounded-md bg-(--ui-bg-elevated) flex items-center justify-center">
                  <UIcon :name="card.icon" class="size-4 text-(--ui-primary)" />
                </div>
                <p class="text-base font-semibold text-(--ui-text-highlighted)">
                  {{ card.label }}
                </p>
                <p class="text-[15px] font-normal text-(--ui-text-muted) text-pretty mt-1 flex-1">{{ card.description }}</p>
                <div class="mt-auto">
                  <UButton
                    :to="card.to"
                    target="_blank"
                    size="xs"
                    variant="soft"
                    color="primary"
                    icon="i-lucide-arrow-right"
                    trailing
                  >
                    Acessar
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </section>

        <!-- Changelog -->
        <section id="changelog" class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <div class="w-1 self-stretch rounded-sm bg-(--ui-primary) shrink-0" />
            <h2 class="text-sm font-semibold text-(--ui-text-muted) uppercase tracking-wider whitespace-nowrap shrink-0">
              Changelog
            </h2>
            <div class="flex-1 h-px bg-(--ui-border)" />
          </div>

          <UTable
            :data="changelog"
            :columns="changelogColumns"
            :ui="{
              root: 'border border-(--ui-border) rounded-lg overflow-hidden',
            }"
          >
            <template #version-cell="{ row }">
              <span class="font-mono text-xs font-semibold text-(--ui-text-highlighted)">
                {{ row.original.version }}
              </span>
            </template>
            <template #tag-cell="{ row }">
              <UBadge
                :color="tagColor[row.original.tag]"
                variant="soft"
                size="sm"
                class="w-16 justify-center"
              >
                {{ row.original.tag }}
              </UBadge>
            </template>
            <template #description-cell="{ row }">
              <span class="text-sm text-(--ui-text)">{{ row.original.description }}</span>
            </template>
            <template #date-cell="{ row }">
              <span class="text-xs text-(--ui-text-toned)">{{ row.original.date }}</span>
            </template>
          </UTable>
        </section>

      </div>
    </template>
  </UDashboardPanel>
</template>
