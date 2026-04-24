<script setup lang="ts">
definePageMeta({ layout: 'partners', title: 'Changelog' })

interface ChangelogItem {
  badge: 'fix' | 'feature' | 'improvement' | 'security'
  text: string
}

interface ChangelogSection {
  date: string
  items: ChangelogItem[]
}

const badgeConfig: Record<ChangelogItem['badge'], { label: string; color: 'error' | 'success' | 'info' | 'warning' }> = {
  fix:         { label: 'fix',         color: 'error'   },
  feature:     { label: 'feature',     color: 'success' },
  improvement: { label: 'improvement', color: 'info'    },
  security:    { label: 'security',    color: 'warning' },
}

const sections: ChangelogSection[] = [
  {
    date: '31 de janeiro de 2026',
    items: [
      { badge: 'fix',         text: 'Corrigido um problema visual que afetava a aparência de algumas partes do sistema.' },
      { badge: 'fix',         text: 'Corrigido um problema que causava links quebrados, melhorando a experiência de navegação.' },
      { badge: 'improvement', text: 'Melhoramos a forma como os recursos visuais e arquivos são carregados.' },
    ],
  },
  {
    date: '28 de janeiro de 2026',
    items: [
      { badge: 'fix',         text: 'Corrigido um erro que impedia o carregamento de alguns recursos visuais e arquivos.' },
      { badge: 'fix',         text: 'Corrigido o problema onde alguns elementos visuais não eram exibidos corretamente.' },
      { badge: 'fix',         text: 'Corrigido o problema onde algumas páginas antigas não carregavam corretamente.' },
      { badge: 'improvement', text: 'Melhoramos as ferramentas internas para garantir um desenvolvimento mais eficiente.' },
    ],
  },
  {
    date: '24 de janeiro de 2026',
    items: [
      { badge: 'fix', text: 'Corrigido o problema que impedia a exibição correta dos links de contrato dos métodos de pagamento.' },
      { badge: 'fix', text: 'Corrigido um problema que impedia a geração correta de alguns links e recursos do sistema.' },
      { badge: 'fix', text: 'Corrigimos um problema que estava impactando a estabilidade do sistema.' },
    ],
  },
  {
    date: '20 de janeiro de 2026',
    items: [
      { badge: 'security', text: 'Reforçada a segurança ao restringir o acesso a certas áreas relacionadas a gerentes.' },
      { badge: 'fix',      text: 'Corrigido um problema na visualização de detalhes de métodos de pagamento.' },
      { badge: 'feature',  text: 'Habilitado o acesso para gerentes à rota de saques.' },
      { badge: 'fix',      text: 'Corrigido um problema que impedia o redirecionamento correto após o login.' },
    ],
  },
  {
    date: '15 de janeiro de 2026',
    items: [
      { badge: 'feature',     text: 'Habilitado o acesso para gerentes à rota de configurações.' },
      { badge: 'feature',     text: 'Habilitado o acesso para gerentes à rota de métodos de pagamento.' },
      { badge: 'feature',     text: 'Habilitado o acesso para gerentes à rota de gerenciamento de outros gerentes.' },
      { badge: 'improvement', text: 'Melhorada a forma como o sistema lida com as informações de login.' },
    ],
  },
  {
    date: '10 de janeiro de 2026',
    items: [
      { badge: 'feature',     text: 'Habilitado o acesso para afiliados à rota de gerenciamento de afiliados.' },
      { badge: 'fix',         text: 'Corrigido um problema que impedia gerentes de acessarem informações de clientes legados.' },
      { badge: 'feature',     text: 'Habilitado o acesso para gerentes à rota de logs.' },
      { badge: 'improvement', text: 'Melhorada a estabilidade do ambiente de desenvolvimento.' },
    ],
  },
  {
    date: '5 de janeiro de 2026',
    items: [
      { badge: 'fix',         text: 'Corrigido um problema que causava redirecionamentos incorretos após o login.' },
      { badge: 'fix',         text: 'Corrigido um problema que impedia o redirecionamento correto para páginas antigas.' },
      { badge: 'improvement', text: 'Melhoramos a forma como o sistema se conecta aos serviços externos.' },
      { badge: 'fix',         text: 'Removida a referência a um domínio antigo.' },
      { badge: 'improvement', text: 'Ajustada a configuração interna para melhorar a compatibilidade e o desempenho.' },
    ],
  },
]
</script>

<template>
  <UContainer class="py-8">
    <div
      v-for="section in sections"
      :key="section.date"
      class="flex gap-8 relative pb-10 last:pb-0"
    >
      <div class="w-48 shrink-0">
        <h2 class="sticky top-6 block text-md text-(--ui-text) font-semibold leading-6">
          {{ section.date }}
        </h2>
      </div>

      <ul class="flex-1 min-w-0 space-y-3">
        <li
          v-for="(item, i) in section.items"
          :key="i"
          class="flex items-start gap-3"
        >
          <div class="w-28 shrink-0">
            <UBadge
              :label="badgeConfig[item.badge].label"
              :color="badgeConfig[item.badge].color"
              variant="subtle"
              size="md"
            />
          </div>
          <span class="text-sm text-(--ui-text) leading-6">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </UContainer>
</template>
