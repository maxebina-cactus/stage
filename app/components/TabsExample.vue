<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

const tabs = [
  { id: 'info', label: 'Informações Gerais', icon: 'i-lucide-info' },
  { id: 'flow', label: 'Flow', icon: 'i-lucide-workflow' },
  { id: 'monitor', label: 'Monitoramento', icon: 'i-lucide-activity' },
]

const activeTab = ref('info')
const tabEls = ref<HTMLElement[]>([])
const pillStyle = ref({ width: '0px', left: '0px' })

function updatePill() {
  const idx = tabs.findIndex(t => t.id === activeTab.value)
  const el = tabEls.value[idx]
  if (el) {
    pillStyle.value = {
      width: `${el.offsetWidth}px`,
      left: `${el.offsetLeft}px`,
    }
  }
}

onMounted(() => nextTick(updatePill))
watch(activeTab, () => nextTick(updatePill))
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Tab bar -->
    <div
      class="relative inline-flex items-center p-1 rounded-lg"
      style="background-color: var(--ui-color-neutral-800)"
    >
      <!-- Sliding pill indicator -->
      <div
        class="absolute top-1 bottom-1 rounded-lg transition-all duration-200 ease-in-out"
        style="background-color: var(--ui-primary)"
        :style="{ width: pillStyle.width, left: pillStyle.left }"
      />

      <!-- Tab buttons -->
      <button
        v-for="(tab, i) in tabs"
        :key="tab.id"
        :ref="el => (tabEls[i] = el as HTMLElement)"
        class="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 select-none cursor-pointer"
        :style="activeTab === tab.id
          ? { color: 'var(--ui-color-neutral-950)' }
          : { color: 'var(--ui-color-neutral-400)' }"
        @click="activeTab = tab.id"
      >
        <UIcon :name="tab.icon" class="w-4 h-4 shrink-0" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <div :key="activeTab" class="rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6">

        <!-- Informações Gerais -->
        <div v-if="activeTab === 'info'" class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-(--ui-bg-accented)">
              <UIcon name="i-lucide-info" class="w-5 h-5 text-(--ui-primary)" />
            </div>
            <div>
              <p class="text-sm font-semibold text-(--ui-text)">Informações Gerais</p>
              <p class="text-xs text-(--ui-text-muted)">Dados principais da campanha</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-(--ui-text-dimmed)">Nome</span>
              <span class="text-sm text-(--ui-text)">Campanha Black Friday 2025</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs text-(--ui-text-dimmed)">Status</span>
              <UBadge color="success" variant="subtle" size="sm">Ativa</UBadge>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs text-(--ui-text-dimmed)">Início</span>
              <span class="text-sm text-(--ui-text)">01/11/2025</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs text-(--ui-text-dimmed)">Encerramento</span>
              <span class="text-sm text-(--ui-text)">30/11/2025</span>
            </div>
          </div>
        </div>

        <!-- Flow -->
        <div v-else-if="activeTab === 'flow'" class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-(--ui-bg-accented)">
              <UIcon name="i-lucide-workflow" class="w-5 h-5 text-(--ui-primary)" />
            </div>
            <div>
              <p class="text-sm font-semibold text-(--ui-text)">Flow</p>
              <p class="text-xs text-(--ui-text-muted)">Etapas do fluxo de campanha</p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div
              v-for="(step, idx) in [
                { label: 'Captação de leads', done: true },
                { label: 'Envio de e-mail inicial', done: true },
                { label: 'Follow-up automático', done: false },
                { label: 'Conversão final', done: false },
              ]"
              :key="idx"
              class="flex items-center gap-3 px-3 py-2 rounded-lg bg-(--ui-bg-accented)"
            >
              <UIcon
                :name="step.done ? 'i-lucide-check-circle-2' : 'i-lucide-circle'"
                class="w-4 h-4 shrink-0"
                :style="{ color: step.done ? 'var(--ui-primary)' : 'var(--ui-color-neutral-400)' }"
              />
              <span class="text-sm" :class="step.done ? 'text-(--ui-text)' : 'text-(--ui-text-muted)'">
                {{ step.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Monitoramento -->
        <div v-else-if="activeTab === 'monitor'" class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-(--ui-bg-accented)">
              <UIcon name="i-lucide-activity" class="w-5 h-5 text-(--ui-primary)" />
            </div>
            <div>
              <p class="text-sm font-semibold text-(--ui-text)">Monitoramento</p>
              <p class="text-xs text-(--ui-text-muted)">Métricas em tempo real</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="metric in [
                { label: 'Leads', value: '1.248', icon: 'i-lucide-users' },
                { label: 'Abertura', value: '64%', icon: 'i-lucide-mail-open' },
                { label: 'Conversão', value: '12%', icon: 'i-lucide-trending-up' },
              ]"
              :key="metric.label"
              class="flex flex-col items-center gap-1.5 rounded-xl bg-(--ui-bg-accented) px-3 py-4"
            >
              <UIcon :name="metric.icon" class="w-5 h-5 text-(--ui-primary)" />
              <span class="text-base font-bold text-(--ui-text)">{{ metric.value }}</span>
              <span class="text-xs text-(--ui-text-muted)">{{ metric.label }}</span>
            </div>
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>
