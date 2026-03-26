<template>
  <div
    class="absolute bottom-full left-0 mb-2 w-64 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border) shadow-xl overflow-hidden z-50"
  >
    <!-- Header: usuário -->
    <div class="flex items-center gap-3 px-4 py-3 border-b border-(--ui-border)">
      <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full object-cover" />
      <span class="text-sm text-(--ui-text) truncate font-medium">
        {{ user.name }} – {{ user.role }}
      </span>
    </div>

    <!-- Aparência -->
    <div class="border-b border-(--ui-border)">
      <button
        @click="toggleSection('aparencia')"
        class="flex items-center justify-between w-full px-4 py-3 text-sm text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) transition-colors"
      >
        <span class="flex items-center gap-3">
          <UIcon name="i-heroicons-sun" class="w-4 h-4" />
          Aparência
        </span>
        <UIcon
          name="i-heroicons-chevron-up"
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': !expanded.aparencia }"
        />
      </button>
      <Transition name="slide">
        <div v-if="expanded.aparencia" class="px-4 pb-2 flex gap-2">
          <button
            v-for="tema in temas"
            :key="tema.value"
            @click="setTema(tema.value)"
            :class="[
              'flex-1 py-1.5 rounded-lg text-xs transition-colors',
              temaAtivo === tema.value
                ? 'bg-(--ui-bg-inverted/15) text-(--ui-text)'
                : 'text-(--ui-text-dimmed) hover:bg-(--ui-bg-accented) hover:text-(--ui-text-muted)'
            ]"
          >
            {{ tema.label }}
          </button>
        </div>
      </Transition>
    </div>

    <!-- Idioma -->
    <div class="border-b border-(--ui-border)">
      <button
        @click="toggleSection('idioma')"
        class="flex items-center justify-between w-full px-4 py-3 text-sm text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) transition-colors"
      >
        <span class="flex items-center gap-3">
          <UIcon name="i-heroicons-globe-alt" class="w-4 h-4" />
          Idioma
        </span>
        <UIcon
          name="i-heroicons-chevron-up"
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': !expanded.idioma }"
        />
      </button>
      <Transition name="slide">
        <div v-if="expanded.idioma" class="px-4 pb-2 flex flex-col gap-1">
          <button
            v-for="lang in idiomas"
            :key="lang.value"
            @click="setIdioma(lang.value)"
            :class="[
              'text-left px-2 py-1.5 rounded-lg text-xs transition-colors',
              idiomaAtivo === lang.value
                ? 'bg-(--ui-bg-inverted/15) text-(--ui-text)'
                : 'text-(--ui-text-dimmed) hover:bg-(--ui-bg-accented) hover:text-(--ui-text-muted)'
            ]"
          >
            {{ lang.label }}
          </button>
        </div>
      </Transition>
    </div>

    <!-- Configurações -->
    <button
      @click="$emit('configuracoes')"
      class="flex items-center gap-3 w-full px-4 py-3 text-sm text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) transition-colors"
    >
      <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4" />
      Configurações
    </button>

    <!-- Sair -->
    <button
      @click="$emit('sair')"
      class="flex items-center gap-3 w-full px-4 py-3 text-sm text-(--ui-color-error-500) hover:text-(--ui-color-error-400) hover:bg-(--ui-color-error-50) transition-colors"
    >
      <UIcon name="i-heroicons-power" class="w-4 h-4" />
      Sair
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineProps({
  user: {
    type: Object,
    default: () => ({
      name: 'Administrador',
      role: 'Administrador',
      avatar: '/avatar.jpg'
    })
  }
})

defineEmits(['configuracoes', 'sair'])

const temaAtivo = ref('sistema')
const idiomaAtivo = ref('pt-BR')

const expanded = reactive({ aparencia: true, idioma: true })

const temas = [
  { label: 'Claro', value: 'claro' },
  { label: 'Escuro', value: 'escuro' },
  { label: 'Sistema', value: 'sistema' }
]

const idiomas = [
  { label: 'Português (BR)', value: 'pt-BR' },
  { label: 'English (US)', value: 'en-US' },
  { label: 'Español', value: 'es' }
]

const toggleSection = (s: keyof typeof expanded) => { expanded[s] = !expanded[s] }
const setTema = (v: string) => temaAtivo.value = v
const setIdioma = (v: string) => idiomaAtivo.value = v
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.15s ease;
  overflow: hidden;
}
.slide-enter-from, .slide-leave-to { max-height: 0; opacity: 0; }
.slide-enter-to, .slide-leave-from { max-height: 120px; opacity: 1; }
</style>