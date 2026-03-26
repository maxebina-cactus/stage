<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

// Navigation tabs (sliding pill)
const navTabs = [
  { id: 'geral', label: 'Visão Geral', icon: 'i-lucide-chart-column' },
  { id: 'ciclo', label: 'Ciclo de Vida e Retenção', icon: 'i-lucide-heart-pulse' },
  { id: 'financeiro', label: 'Performance Financeira', icon: 'i-lucide-wallet' },
]
const activeTab = ref('geral')
const tabEls = ref<HTMLElement[]>([])
const pillStyle = ref({ width: '0px', left: '0px' })

function updatePill() {
  const idx = navTabs.findIndex(t => t.id === activeTab.value)
  const el = tabEls.value[idx]
  if (el) {
    pillStyle.value = { width: `${el.offsetWidth}px`, left: `${el.offsetLeft}px` }
  }
}
onMounted(() => nextTick(updatePill))
watch(activeTab, () => nextTick(updatePill))

// Metric filter
const activeMetric = ref('todos')
const metrics = ['DAU', 'WAU', 'MAU', 'Todos']

// KPI data
const kpiRow1 = [
  { label: 'Usuários Ativos',  value: '128.4K',  icon: 'i-lucide-users',         delta: '+6.0%',  positive: true,  prev: '121.2K anterior' },
  { label: 'Novos Cadastros',  value: '12.8K',   icon: 'i-lucide-user-plus',     delta: '+14.1%', positive: true,  prev: '11.3K anterior' },
  { label: 'FTD',              value: '3.2K',    icon: 'i-lucide-download',      delta: '+8.9%',  positive: true,  prev: '3.0K anterior' },
  { label: 'Churn',            value: '2.8%',    icon: 'i-lucide-trending-down', delta: '-12.5%', positive: false, prev: '3.2% anterior' },
]
const kpiRow2 = [
  { label: 'LTV Médio', value: 'R$ 847',  icon: 'i-lucide-dollar-sign',  delta: '+4.3%', positive: true, prev: 'R$ 812 anterior' },
  { label: 'ABPU',      value: 'R$ 124',  icon: 'i-lucide-trending-up',  delta: '+5.1%', positive: true, prev: 'R$ 118 anterior' },
  { label: 'ARPU',      value: 'R$ 42,5', icon: 'i-lucide-bar-chart',    delta: '+6.8%', positive: true, prev: 'R$ 39,8 anterior' },
]
</script>

<template>
  <div class="flex flex-col gap-5 p-6">

    <!-- ── KPI Row 1 (4 cols) ──────────────────────────────────── -->
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="kpi in kpiRow1" :key="kpi.label"
        class="rounded-xl px-4 py-4 flex flex-col gap-2" style="background-color: #101726; border: 1px solid #1E2D45"
      >
        <div class="flex items-start justify-between gap-2">
          <span class="text-xs text-(--ui-text-muted) leading-tight">{{ kpi.label }}</span>
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            :style="{
              backgroundColor: kpi.positive
                ? 'color-mix(in oklch, var(--ui-primary) 14%, transparent)'
                : 'color-mix(in oklch, var(--ui-color-error-500) 14%, transparent)'
            }"
          >
            <UIcon
              :name="kpi.icon"
              class="w-4 h-4"
              :style="{ color: kpi.positive ? 'var(--ui-primary)' : 'var(--ui-color-error-500)' }"
            />
          </span>
        </div>
        <span class="text-2xl font-bold tracking-tight text-(--ui-text)">{{ kpi.value }}</span>
        <div class="flex items-center gap-1.5 text-xs">
          <span
            class="font-semibold"
            :style="{ color: kpi.positive ? 'var(--ui-color-success-500)' : 'var(--ui-color-error-500)' }"
          >{{ kpi.delta }}</span>
          <span class="text-(--ui-text-dimmed)">vs {{ kpi.prev }}</span>
        </div>
      </div>
    </div>

    <!-- ── KPI Row 2 (3 cols alinhadas com as 3 primeiras de cima) -->
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="kpi in kpiRow2" :key="kpi.label"
        class="rounded-xl px-4 py-4 flex flex-col gap-2" style="background-color: #101726; border: 1px solid #1E2D45"
      >
        <div class="flex items-start justify-between gap-2">
          <span class="text-xs text-(--ui-text-muted) leading-tight">{{ kpi.label }}</span>
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style="background-color: color-mix(in oklch, var(--ui-primary) 14%, transparent)"
          >
            <UIcon :name="kpi.icon" class="w-4 h-4" style="color: var(--ui-primary)" />
          </span>
        </div>
        <span class="text-2xl font-bold tracking-tight text-(--ui-text)">{{ kpi.value }}</span>
        <div class="flex items-center gap-1.5 text-xs">
          <span class="font-semibold" style="color: var(--ui-color-success-500)">{{ kpi.delta }}</span>
          <span class="text-(--ui-text-dimmed)">vs {{ kpi.prev }}</span>
        </div>
      </div>
    </div>

    <!-- ── Navigation Tabs (sliding pill) ────────────────────── -->
    <div
      class="relative inline-flex items-center self-start p-1 rounded-xl"
      style="background-color: var(--ui-color-neutral-800)"
    >
      <!-- Pill indicator -->
      <div
        class="absolute top-1 bottom-1 rounded-lg transition-all duration-200 ease-in-out"
        style="background-color: var(--ui-primary)"
        :style="{ width: pillStyle.width, left: pillStyle.left }"
      />
      <button
        v-for="(tab, i) in navTabs"
        :key="tab.id"
        :ref="el => (tabEls[i] = el as HTMLElement)"
        class="relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 select-none cursor-pointer"
        :style="activeTab === tab.id
          ? { color: 'var(--ui-color-neutral-950)' }
          : { color: 'var(--ui-color-neutral-400)' }"
        @click="activeTab = tab.id"
      >
        <UIcon
          :name="tab.icon"
          class="w-4 h-4 shrink-0"
          :style="activeTab === tab.id ? { color: 'var(--ui-color-neutral-950)' } : {}"
        />
        {{ tab.label }}
      </button>
    </div>

    <!-- ── Tab content ─────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <!-- ── VISÃO GERAL ──────────────────────────────────────── -->
      <div v-if="activeTab === 'geral'" :key="activeTab" class="flex flex-col gap-6">

        <!-- Section: ATIVIDADE -->
        <div class="flex flex-col gap-6">
          <!-- Section header -->
          <div class="flex items-center gap-3">
            <div class="w-0.5 h-4 rounded-full" style="background-color: var(--ui-primary)" />
            <span class="text-xs font-semibold tracking-widest text-(--ui-text-muted) uppercase">Atividade</span>
            <div class="flex-1 h-px bg-(--ui-border)" />
          </div>

          <!-- Usuários Ativos — full width -->
          <div class="rounded-xl p-4 flex flex-col gap-3" style="background-color: #101726; border: 1px solid #1E2D45">
            <div class="flex items-center justify-between -mx-4 px-4 pb-3" style="border-bottom: 1px solid #1E2D45">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full shrink-0" style="background-color: var(--ui-primary)" />
                <span class="text-sm font-medium text-(--ui-text)">Usuários Ativos</span>
              </div>
              <div class="flex items-center gap-2">
                <!-- DAU/WAU/MAU/Todos filter -->
                <div class="inline-flex items-center gap-1.5">
                  <button
                    v-for="m in metrics" :key="m"
                    class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer"
                    :style="activeMetric === m.toLowerCase()
                      ? { backgroundColor: 'var(--ui-primary)', color: 'var(--ui-color-neutral-950)', border: '1px solid var(--ui-primary)' }
                      : { backgroundColor: 'transparent', color: 'var(--ui-primary)', border: '1px solid var(--ui-primary)' }"
                    @click="activeMetric = m.toLowerCase()"
                  >{{ m }}</button>
                </div>
                <!-- Fullscreen -->
                <button class="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-(--ui-bg-accented) transition-colors text-(--ui-text-muted) hover:text-(--ui-text) cursor-pointer">
                  <UIcon name="i-lucide-maximize" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <!-- Empty state -->
            <div class="flex flex-col items-center justify-center py-16 gap-2">
              <UIcon name="i-lucide-inbox" class="w-8 h-8 text-(--ui-text-dimmed)" />
              <span class="text-sm text-(--ui-text-dimmed)">Nenhum dado encontrado</span>
            </div>
          </div>

          <!-- Atividade por Dia e Hora + Usuários Ativos por Região — half width -->
          <div class="grid grid-cols-2 gap-6">

            <!-- Atividade por Dia e Hora -->
            <div class="rounded-xl p-4 flex flex-col gap-3" style="background-color: #101726; border: 1px solid #1E2D45">
              <div class="flex items-start justify-between -mx-4 px-4 pb-3" style="border-bottom: 1px solid #1E2D45">
                <div class="flex flex-col gap-0.5">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full shrink-0" style="background-color: var(--ui-primary)" />
                    <span class="text-sm font-medium text-(--ui-text)">Atividade por Dia e Hora</span>
                  </div>
                  <span class="text-xs text-(--ui-text-dimmed) ml-4">Volume de usuários ativos por dia da semana e faixa horária</span>
                </div>
                <button class="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-(--ui-bg-accented) transition-colors text-(--ui-text-muted) hover:text-(--ui-text) cursor-pointer shrink-0">
                  <UIcon name="i-lucide-maximize" class="w-4 h-4" />
                </button>
              </div>
              <div class="flex flex-col items-center justify-center py-12 gap-2">
                <UIcon name="i-lucide-inbox" class="w-8 h-8 text-(--ui-text-dimmed)" />
                <span class="text-sm text-(--ui-text-dimmed)">Nenhum dado encontrado</span>
              </div>
            </div>

            <!-- Usuários Ativos por Região -->
            <div class="rounded-xl p-4 flex flex-col gap-3" style="background-color: #101726; border: 1px solid #1E2D45">
              <div class="flex items-center justify-between -mx-4 px-4 pb-3" style="border-bottom: 1px solid #1E2D45">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full shrink-0" style="background-color: var(--ui-primary)" />
                  <span class="text-sm font-medium text-(--ui-text)">Usuários Ativos por Região</span>
                </div>
                <button class="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-(--ui-bg-accented) transition-colors text-(--ui-text-muted) hover:text-(--ui-text) cursor-pointer">
                  <UIcon name="i-lucide-maximize" class="w-4 h-4" />
                </button>
              </div>
              <div class="flex flex-col items-center justify-center py-12 gap-2">
                <UIcon name="i-lucide-inbox" class="w-8 h-8 text-(--ui-text-dimmed)" />
                <span class="text-sm text-(--ui-text-dimmed)">Nenhum dado encontrado</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Section: ARPU & ARPU -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <div class="w-0.5 h-4 rounded-full" style="background-color: var(--ui-primary)" />
            <span class="text-xs font-semibold tracking-widest text-(--ui-text-muted) uppercase">ARPU &amp; ARPU</span>
            <div class="flex-1 h-px bg-(--ui-border)" />
          </div>

          <div class="grid grid-cols-2 gap-6">

            <!-- ARPU vs ARPU ao Longo do Tempo -->
            <div class="rounded-xl p-4 flex flex-col gap-3" style="background-color: #101726; border: 1px solid #1E2D45">
              <div class="flex items-center justify-between -mx-4 px-4 pb-3" style="border-bottom: 1px solid #1E2D45">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full shrink-0" style="background-color: var(--ui-primary)" />
                  <span class="text-sm font-medium text-(--ui-text)">ARPU vs ARPU ao Longo do Tempo</span>
                </div>
                <button class="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-(--ui-bg-accented) transition-colors text-(--ui-text-muted) hover:text-(--ui-text) cursor-pointer">
                  <UIcon name="i-lucide-maximize" class="w-4 h-4" />
                </button>
              </div>
              <div class="flex flex-col items-center justify-center py-12 gap-2">
                <UIcon name="i-lucide-inbox" class="w-8 h-8 text-(--ui-text-dimmed)" />
                <span class="text-sm text-(--ui-text-dimmed)">Nenhum dado encontrado</span>
              </div>
            </div>

            <!-- ARPU vs ARPU por Segmento -->
            <div class="rounded-xl p-4 flex flex-col gap-3" style="background-color: #101726; border: 1px solid #1E2D45">
              <div class="flex items-center justify-between -mx-4 px-4 pb-3" style="border-bottom: 1px solid #1E2D45">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full shrink-0" style="background-color: var(--ui-primary)" />
                  <span class="text-sm font-medium text-(--ui-text)">ARPU vs ARPU por Segmento</span>
                </div>
                <button class="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-(--ui-bg-accented) transition-colors text-(--ui-text-muted) hover:text-(--ui-text) cursor-pointer">
                  <UIcon name="i-lucide-maximize" class="w-4 h-4" />
                </button>
              </div>
              <div class="flex flex-col items-center justify-center py-12 gap-2">
                <UIcon name="i-lucide-inbox" class="w-8 h-8 text-(--ui-text-dimmed)" />
                <span class="text-sm text-(--ui-text-dimmed)">Nenhum dado encontrado</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- ── CICLO DE VIDA E RETENÇÃO ─────────────────────────── -->
      <div v-else-if="activeTab === 'ciclo'" :key="activeTab" class="flex flex-col gap-6">
        <div class="flex flex-col items-center justify-center py-24 gap-3 rounded-xl" style="background-color: #101726; border: 1px solid #1E2D45">
          <UIcon name="i-lucide-heart" class="w-10 h-10 text-(--ui-text-dimmed)" />
          <span class="text-sm text-(--ui-text-dimmed)">Ciclo de Vida e Retenção — em breve</span>
        </div>
      </div>

      <!-- ── PERFORMANCE FINANCEIRA ──────────────────────────── -->
      <div v-else-if="activeTab === 'financeiro'" :key="activeTab" class="flex flex-col gap-6">
        <div class="flex flex-col items-center justify-center py-24 gap-3 rounded-xl" style="background-color: #101726; border: 1px solid #1E2D45">
          <UIcon name="i-lucide-dollar-sign" class="w-10 h-10 text-(--ui-text-dimmed)" />
          <span class="text-sm text-(--ui-text-dimmed)">Performance Financeira — em breve</span>
        </div>
      </div>

    </Transition>

  </div>
</template>
