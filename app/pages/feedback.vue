<script setup lang="ts">
import type { Feedback, FeedbackStatus, FeedbackCategoria } from '~/types'

// ---- Dados mockados ----
const todosFeedbacks: Feedback[] = [
  {
    id: 1,
    usuario: { nome: 'Ana Lima', avatar: 'https://i.pravatar.cc/40?img=1' },
    mensagem: 'O sistema travou ao tentar exportar o relatório mensal. Precisei recarregar a página três vezes.',
    avaliacao: 2,
    categoria: 'Bug',
    status: 'pendente',
    data: '28 mar 2026',
  },
  {
    id: 2,
    usuario: { nome: 'Carlos Mendes', avatar: 'https://i.pravatar.cc/40?img=3' },
    mensagem: 'Adorei a nova interface! Muito mais intuitiva do que a versão anterior.',
    avaliacao: 5,
    categoria: 'Elogio',
    status: 'respondido',
    data: '27 mar 2026',
  },
  {
    id: 3,
    usuario: { nome: 'Fernanda Costa', avatar: 'https://i.pravatar.cc/40?img=5' },
    mensagem: 'Seria ótimo ter um filtro por data na tela de relatórios. Facilita muito o dia a dia.',
    avaliacao: 4,
    categoria: 'Sugestão',
    status: 'pendente',
    data: '26 mar 2026',
  },
  {
    id: 4,
    usuario: { nome: 'Bruno Alves', avatar: 'https://i.pravatar.cc/40?img=7' },
    mensagem: 'O botão de salvar some às vezes quando a janela está redimensionada. Bug crítico.',
    avaliacao: 1,
    categoria: 'Bug',
    status: 'respondido',
    data: '25 mar 2026',
  },
  {
    id: 5,
    usuario: { nome: 'Juliana Rocha', avatar: 'https://i.pravatar.cc/40?img=9' },
    mensagem: 'Gostaria de poder personalizar as colunas da tabela de usuários conforme minha preferência.',
    avaliacao: 3,
    categoria: 'Sugestão',
    status: 'arquivado',
    data: '24 mar 2026',
  },
  {
    id: 6,
    usuario: { nome: 'Rafael Souza', avatar: 'https://i.pravatar.cc/40?img=11' },
    mensagem: 'Suporte respondeu super rápido! Problema resolvido em menos de uma hora.',
    avaliacao: 5,
    categoria: 'Elogio',
    status: 'arquivado',
    data: '23 mar 2026',
  },
  {
    id: 7,
    usuario: { nome: 'Patrícia Nunes', avatar: 'https://i.pravatar.cc/40?img=13' },
    mensagem: 'A página de configurações demora para carregar em conexões mais lentas.',
    avaliacao: 2,
    categoria: 'Bug',
    status: 'pendente',
    data: '22 mar 2026',
  },
  {
    id: 8,
    usuario: { nome: 'Diego Martins', avatar: 'https://i.pravatar.cc/40?img=15' },
    mensagem: 'Seria útil ter notificações por e-mail quando um relatório é gerado com sucesso.',
    avaliacao: 4,
    categoria: 'Sugestão',
    status: 'respondido',
    data: '21 mar 2026',
  },
  {
    id: 9,
    usuario: { nome: 'Camila Torres', avatar: 'https://i.pravatar.cc/40?img=17' },
    mensagem: 'Excelente plataforma! Minha equipe ganhou muito tempo com os novos recursos.',
    avaliacao: 5,
    categoria: 'Elogio',
    status: 'pendente',
    data: '20 mar 2026',
  },
  {
    id: 10,
    usuario: { nome: 'Thiago Ferreira', avatar: 'https://i.pravatar.cc/40?img=19' },
    mensagem: 'Erro ao importar planilha CSV com caracteres especiais como ã, é, ç.',
    avaliacao: 2,
    categoria: 'Bug',
    status: 'arquivado',
    data: '19 mar 2026',
  },
  {
    id: 11,
    usuario: { nome: 'Larissa Campos', avatar: 'https://i.pravatar.cc/40?img=21' },
    mensagem: 'O modo escuro ficou incrível na nova atualização. Parabéns ao time!',
    avaliacao: 5,
    categoria: 'Elogio',
    status: 'respondido',
    data: '18 mar 2026',
  },
  {
    id: 12,
    usuario: { nome: 'Vitor Cardoso', avatar: 'https://i.pravatar.cc/40?img=23' },
    mensagem: 'Adicionar atalhos de teclado para as ações mais comuns agilizaria muito o fluxo.',
    avaliacao: 4,
    categoria: 'Sugestão',
    status: 'pendente',
    data: '17 mar 2026',
  },
  {
    id: 13,
    usuario: { nome: 'Mariana Oliveira', avatar: 'https://i.pravatar.cc/40?img=25' },
    mensagem: 'O gráfico de vendas some ao alterar o período. Acontece apenas no Firefox.',
    avaliacao: 3,
    categoria: 'Bug',
    status: 'pendente',
    data: '16 mar 2026',
  },
  {
    id: 14,
    usuario: { nome: 'Eduardo Pinto', avatar: 'https://i.pravatar.cc/40?img=27' },
    mensagem: 'A documentação poderia ter mais exemplos práticos de uso da API.',
    avaliacao: 3,
    categoria: 'Outro',
    status: 'arquivado',
    data: '15 mar 2026',
  },
  {
    id: 15,
    usuario: { nome: 'Isabela Ramos', avatar: 'https://i.pravatar.cc/40?img=29' },
    mensagem: 'Sistema muito estável. Em seis meses de uso não tivemos nenhuma instabilidade.',
    avaliacao: 5,
    categoria: 'Elogio',
    status: 'respondido',
    data: '14 mar 2026',
  },
]

// ---- Filtros e tabs ----
const busca = ref('')
const statusAtivo = ref<FeedbackStatus | 'todos'>('todos')

const tabs = [
  { label: 'Todos', value: 'todos' },
  { label: 'Pendente', value: 'pendente' },
  { label: 'Respondido', value: 'respondido' },
  { label: 'Arquivado', value: 'arquivado' },
] as const

// ---- Paginação ----
const pagina = ref(1)
const porPagina = 8

// ---- Dados filtrados ----
const feedbacksFiltrados = computed(() => {
  const termo = busca.value.toLowerCase().trim()
  return todosFeedbacks.filter((f) => {
    const matchBusca = !termo
      || f.usuario.nome.toLowerCase().includes(termo)
      || f.mensagem.toLowerCase().includes(termo)
    const matchStatus = statusAtivo.value === 'todos' || f.status === statusAtivo.value
    return matchBusca && matchStatus
  })
})

const total = computed(() => feedbacksFiltrados.value.length)

const feedbacksPaginados = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return feedbacksFiltrados.value.slice(inicio, inicio + porPagina)
})

// Reseta página ao filtrar
watch([busca, statusAtivo], () => { pagina.value = 1 })

// ---- Colunas da tabela ----
const colunas = [
  { accessorKey: 'usuario', header: 'Usuário', size: 180 },
  { accessorKey: 'mensagem', header: 'Mensagem' },
  { accessorKey: 'avaliacao', header: 'Avaliação', size: 110 },
  { accessorKey: 'categoria', header: 'Categoria', size: 110 },
  { accessorKey: 'status', header: 'Status', size: 120 },
  { accessorKey: 'data', header: 'Data', size: 120 },
  { accessorKey: 'acoes', header: '', size: 48 },
]

// ---- Status ----
const statusConfig: Record<FeedbackStatus, { color: 'warning' | 'success' | 'neutral'; label: string }> = {
  pendente: { color: 'warning', label: 'Pendente' },
  respondido: { color: 'success', label: 'Respondido' },
  arquivado: { color: 'neutral', label: 'Arquivado' },
}

// ---- Avaliação ----
function estrelas(nota: number) {
  return Array.from({ length: 5 }, (_, i) => i < nota)
}

// ---- Categoria ----
const categoriaConfig: Record<FeedbackCategoria, string> = {
  Bug: 'error',
  Sugestão: 'info',
  Elogio: 'success',
  Outro: 'neutral',
}

// ---- Ações ----
function getAcoes(feedback: Feedback) {
  return [
    [
      {
        label: 'Editar',
        icon: 'i-lucide-pencil',
        onSelect: () => handleEditar(feedback),
      },
    ],
    [
      {
        label: 'Excluir',
        icon: 'i-lucide-trash-2',
        color: 'error' as const,
        onSelect: () => handleExcluir(feedback),
      },
    ],
  ]
}

function handleEditar(feedback: Feedback) {
  console.log('Editar feedback', feedback.id)
}

function handleExcluir(feedback: Feedback) {
  console.log('Excluir feedback', feedback.id)
}
</script>

<template>
  <UDashboardPanel id="feedback">
    <template #header>
      <AppHeader title="Feedback" />

      <UDashboardToolbar>
        <template #left>
          <div class="flex flex-col gap-3 py-1">
            <!-- Busca -->
            <UInput
              v-model="busca"
              icon="i-lucide-search"
              placeholder="Buscar por nome ou mensagem…"
              class="w-72"
              color="neutral"
              variant="outline"
            />

            <!-- Tabs de status -->
            <UButtonGroup>
              <UButton
                v-for="tab in tabs"
                :key="tab.value"
                color="neutral"
                :variant="statusAtivo === tab.value ? 'solid' : 'ghost'"
                :label="tab.label"
                @click="statusAtivo = tab.value"
              />
            </UButtonGroup>
          </div>
        </template>

        <template #right>
          <UButton icon="i-lucide-plus" label="Novo Feedback" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col h-full">
        <!-- Tabela -->
        <div class="flex-1 overflow-auto">
          <UTable
            :data="feedbacksPaginados"
            :columns="colunas"
            :ui="{
              root: 'w-full',
              thead: 'border-b border-(--ui-border)',
              th: 'text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wide px-4 py-3',
              td: 'px-4 py-3 align-middle',
              tr: 'border-b border-(--ui-border-muted) hover:bg-(--ui-bg-muted)/50 transition-colors',
            }"
          >
            <!-- Usuário -->
            <template #usuario-cell="{ row }">
              <div class="flex items-center gap-2.5">
                <UAvatar
                  :src="row.original.usuario.avatar"
                  :alt="row.original.usuario.nome"
                  size="sm"
                />
                <span class="text-sm font-medium text-(--ui-text-highlighted) whitespace-nowrap">
                  {{ row.original.usuario.nome }}
                </span>
              </div>
            </template>

            <!-- Mensagem truncada -->
            <template #mensagem-cell="{ row }">
              <p class="text-sm text-(--ui-text) max-w-xs truncate" :title="row.original.mensagem">
                {{ row.original.mensagem }}
              </p>
            </template>

            <!-- Avaliação com estrelas -->
            <template #avaliacao-cell="{ row }">
              <div class="flex items-center gap-0.5">
                <UIcon
                  v-for="(preenchida, i) in estrelas(row.original.avaliacao)"
                  :key="i"
                  :name="preenchida ? 'i-lucide-star' : 'i-lucide-star'"
                  :class="preenchida ? 'text-(--ui-warning) fill-(--ui-warning)' : 'text-(--ui-border)'"
                  class="size-3.5"
                />
                <span class="ml-1 text-xs text-(--ui-text-muted)">{{ row.original.avaliacao }}/5</span>
              </div>
            </template>

            <!-- Categoria -->
            <template #categoria-cell="{ row }">
              <UBadge
                :color="categoriaConfig[row.original.categoria] as any"
                variant="soft"
                size="sm"
              >
                {{ row.original.categoria }}
              </UBadge>
            </template>

            <!-- Status -->
            <template #status-cell="{ row }">
              <UBadge
                :color="statusConfig[row.original.status].color"
                variant="soft"
                size="sm"
              >
                {{ statusConfig[row.original.status].label }}
              </UBadge>
            </template>

            <!-- Data -->
            <template #data-cell="{ row }">
              <span class="text-xs text-(--ui-text-toned) whitespace-nowrap">
                {{ row.original.data }}
              </span>
            </template>

            <!-- Ações -->
            <template #acoes-cell="{ row }">
              <UDropdownMenu :items="getAcoes(row.original)">
                <UButton
                  icon="i-lucide-ellipsis"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  class="rounded-md"
                />
              </UDropdownMenu>
            </template>
          </UTable>
        </div>

        <!-- Paginação -->
        <div
          v-if="total > porPagina"
          class="flex items-center justify-between px-4 py-3 border-t border-(--ui-border)"
        >
          <p class="text-xs text-(--ui-text-muted)">
            {{ total }} resultado{{ total !== 1 ? 's' : '' }}
          </p>
          <UPagination
            v-model:page="pagina"
            :total="total"
            :items-per-page="porPagina"
            size="xs"
            color="neutral"
          />
        </div>

        <!-- Empty state -->
        <div
          v-if="feedbacksPaginados.length === 0"
          class="flex flex-col items-center justify-center flex-1 gap-3 py-16 text-(--ui-text-muted)"
        >
          <UIcon name="i-lucide-message-square-off" class="size-10 opacity-40" />
          <p class="text-sm">Nenhum feedback encontrado.</p>
          <UButton
            v-if="busca || statusAtivo !== 'todos'"
            variant="ghost"
            color="neutral"
            size="xs"
            label="Limpar filtros"
            @click="busca = ''; statusAtivo = 'todos'"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
