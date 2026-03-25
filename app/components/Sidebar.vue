<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const colorMode = useColorMode()
const isOpen = useState('sidebar', () => true)

const items = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/' },
  { label: 'Jornada', icon: 'i-lucide-map', to: '/jornada' },
  { label: 'Relatórios', icon: 'i-lucide-bar-chart-2', to: '/relatorios' }
]

const user = {
  name: 'Administrador',
  role: 'Administrador',
  avatar: '/avatar.jpg'
}

const triggerRef = ref<HTMLElement | null>(null)
const dropupOpen = ref(false)
const dropupStyle = ref({})
const flyout = ref<null | 'aparencia' | 'idioma'>(null)
const flyoutStyle = ref({})
const flyoutTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const idiomaAtivo = ref('pt-BR')

const temas = [
  { label: 'Claro', value: 'light', icon: 'i-lucide-sun' },
  { label: 'Escuro', value: 'dark', icon: 'i-lucide-moon' },
]

const idiomas = [
  { label: 'Português (BR)', value: 'pt-BR', flag: '/br.svg' },
  { label: 'English (US)', value: 'en-US', flag: '/us.svg' },
  { label: 'Español', value: 'es', flag: '/es.svg' },
  { label: 'Italiano', value: 'it', flag: '/it.svg' },
  { label: 'Deutsch', value: 'de', flag: '/al.svg' },
]

function toggleDropup() {
  if (!dropupOpen.value && triggerRef.value) {
    const btn = triggerRef.value.querySelector('button')
    const btnRect = btn?.getBoundingClientRect() ?? triggerRef.value.getBoundingClientRect()
    const width = Math.max(btnRect.width, 224)
    dropupStyle.value = {
      bottom: `${window.innerHeight - btnRect.top + 4}px`,
      left: `${btnRect.left}px`,
      width: `${width}px`
    }
  }
  dropupOpen.value = !dropupOpen.value
  flyout.value = null
}

function onMenuMouseEnter(type: 'aparencia' | 'idioma', event: MouseEvent) {
  if (flyoutTimeout.value) clearTimeout(flyoutTimeout.value)
  const btn = event.currentTarget as HTMLElement
  const rect = btn.getBoundingClientRect()
  flyoutStyle.value = {
    bottom: `${window.innerHeight - rect.bottom}px`,
    left: `${rect.right + 4}px`,
    minWidth: '160px'
  }
  flyout.value = type
}

function onMenuMouseLeave() {
  flyoutTimeout.value = setTimeout(() => { flyout.value = null }, 120)
}

function onFlyoutMouseEnter() {
  if (flyoutTimeout.value) clearTimeout(flyoutTimeout.value)
}

function onFlyoutMouseLeave() {
  flyoutTimeout.value = setTimeout(() => { flyout.value = null }, 120)
}

function setTema(value: string) {
  colorMode.preference = value
}

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <aside
    class="h-screen border-r border-(--ui-border) flex flex-col bg-(--ui-bg) shrink-0 overflow-hidden transition-all duration-200"
    :class="isOpen ? 'w-60' : 'w-16'"
  >

    <div class="shrink-0 overflow-hidden" :class="isOpen ? 'px-4 pt-6 pb-4' : 'flex justify-center pt-3 pb-3'">
      <AppLogo v-if="isOpen" class="h-8" />
      <img v-else src="/stage-logo-s.svg" alt="Stage" class="w-10 h-10" />
    </div>

    <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden pt-2">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors w-full overflow-hidden"
        :class="isActive(item.to)
          ? 'text-(--ui-primary) font-medium'
          : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
      >
        <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
        <span v-if="isOpen" class="truncate">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div ref="triggerRef" class="px-2 py-2 border-t border-(--ui-border) shrink-0">

      <Teleport to="body">

        <!-- Dropup principal com animação slide-up -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-2 scale-95"
        >
          <div
            v-if="dropupOpen"
            class="fixed z-50 rounded-xl shadow-2xl bg-(--ui-bg-elevated) py-1"
            style="border: 1px solid color-mix(in oklch, var(--ui-text) 15%, transparent); transform-origin: bottom left"
            :style="dropupStyle"
          >
            <div class="flex items-center gap-3 px-4 py-2.5">
              <UAvatar :src="user.avatar" size="xs" />
              <span class="text-sm text-(--ui-text) font-medium truncate">
                {{ user.name }} – {{ user.role }}
              </span>
            </div>

            <div style="height: 1px; margin: 4px 0; background: color-mix(in oklch, var(--ui-text) 12%, transparent)" />

            <button
              @mouseenter="onMenuMouseEnter('aparencia', $event)"
              @mouseleave="onMenuMouseLeave"
              class="menu-flyout-btn flex items-center justify-between m-1 px-3 py-2 text-xs text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) rounded-lg transition-colors"
              :class="{ 'bg-(--ui-bg-accented) text-(--ui-text)': flyout === 'aparencia' }"
              style="width: calc(100% - 8px)"
            >
              <span class="flex items-center gap-2.5">
                <UIcon name="i-lucide-sun" class="w-4 h-4" />
                Aparência
              </span>
              <UIcon name="i-lucide-chevron-down" class="flyout-chevron w-3.5 h-3.5" />
            </button>

            <button
              @mouseenter="onMenuMouseEnter('idioma', $event)"
              @mouseleave="onMenuMouseLeave"
              class="menu-flyout-btn flex items-center justify-between m-1 px-3 py-2 text-xs text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) rounded-lg transition-colors"
              :class="{ 'bg-(--ui-bg-accented) text-(--ui-text)': flyout === 'idioma' }"
              style="width: calc(100% - 8px)"
            >
              <span class="flex items-center gap-2.5">
                <UIcon name="i-lucide-globe" class="w-4 h-4" />
                Idioma
              </span>
              <UIcon name="i-lucide-chevron-down" class="flyout-chevron w-3.5 h-3.5" />
            </button>

            <div style="height: 1px; margin: 4px 0; background: color-mix(in oklch, var(--ui-text) 12%, transparent)" />

            <button
              @click="navigateTo('/settings'); dropupOpen = false"
              class="flex items-center gap-2.5 m-1 px-3 py-2 text-xs text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) rounded-lg transition-colors"
              style="width: calc(100% - 8px)"
            >
              <UIcon name="i-lucide-settings" class="w-4 h-4" />
              Configurações
            </button>

            <button
              @click="navigateTo('/login'); dropupOpen = false"
              class="flex items-center gap-2.5 m-1 px-3 py-2 text-xs text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) rounded-lg transition-colors"
              style="width: calc(100% - 8px)"
            >
              <UIcon name="i-lucide-power" class="w-4 h-4" />
              Sair
            </button>
          </div>
        </Transition>

        <!-- Flyout Aparência com animação slide-right -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 -translate-x-1 scale-95"
          enter-to-class="opacity-100 translate-x-0 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 translate-x-0 scale-100"
          leave-to-class="opacity-0 -translate-x-1 scale-95"
        >
          <div
            v-if="flyout === 'aparencia'"
            class="fixed z-50 rounded-xl shadow-2xl bg-(--ui-bg-elevated) py-1"
            style="border: 1px solid color-mix(in oklch, var(--ui-text) 15%, transparent); transform-origin: left center"
            :style="flyoutStyle"
            @mouseenter="onFlyoutMouseEnter"
            @mouseleave="onFlyoutMouseLeave"
          >
            <button
              v-for="tema in temas" :key="tema.value"
              @click="setTema(tema.value)"
              class="flex items-center justify-between m-1 px-3 py-2 text-xs rounded-lg transition-colors"
              :class="colorMode.preference === tema.value
                ? 'text-(--ui-text) bg-(--ui-bg-accented)'
                : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
              style="width: calc(100% - 8px)"
            >
              <span class="flex items-center gap-2.5">
                <UIcon :name="tema.icon" class="w-4 h-4" />
                {{ tema.label }}
              </span>
              <UIcon v-if="colorMode.preference === tema.value" name="i-lucide-check" class="w-3.5 h-3.5 text-(--ui-text)" />
            </button>
          </div>
        </Transition>

        <!-- Flyout Idioma com animação slide-right -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 -translate-x-1 scale-95"
          enter-to-class="opacity-100 translate-x-0 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 translate-x-0 scale-100"
          leave-to-class="opacity-0 -translate-x-1 scale-95"
        >
          <div
            v-if="flyout === 'idioma'"
            class="fixed z-50 rounded-xl shadow-2xl bg-(--ui-bg-elevated) py-1"
            style="border: 1px solid color-mix(in oklch, var(--ui-text) 15%, transparent); transform-origin: left center"
            :style="flyoutStyle"
            @mouseenter="onFlyoutMouseEnter"
            @mouseleave="onFlyoutMouseLeave"
          >
            <button
              v-for="lang in idiomas" :key="lang.value"
              @click="idiomaAtivo = lang.value"
              class="flex items-center justify-between m-1 px-3 py-2 text-xs rounded-lg transition-colors"
              :class="idiomaAtivo === lang.value
                ? 'text-(--ui-text) bg-(--ui-bg-accented)'
                : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
              style="width: calc(100% - 8px)"
            >
              <span class="flex items-center gap-2.5">
                <img :src="lang.flag" class="w-4 h-4 rounded-sm object-cover" />
                {{ lang.label }}
              </span>
              <UIcon v-if="idiomaAtivo === lang.value" name="i-lucide-check" class="w-3.5 h-3.5 text-(--ui-text)" />
            </button>
          </div>
        </Transition>

        <!-- Overlay -->
        <div
          v-if="dropupOpen"
          class="fixed inset-0 z-40"
          @click="dropupOpen = false; flyout = null"
        />

      </Teleport>

      <button
        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
        :class="dropupOpen
          ? 'bg-(--ui-bg-accented) text-(--ui-text)'
          : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
        @click="toggleDropup"
      >
        <UAvatar :src="user.avatar" size="xs" class="shrink-0" />
        <template v-if="isOpen">
          <span class="text-sm font-medium truncate flex-1 text-left">
            {{ user.name }} – {{ user.role }}
          </span>
          <UIcon
            name="i-lucide-chevrons-up-down"
            class="w-4 h-4 shrink-0"
            :class="dropupOpen ? 'text-(--ui-text)' : 'text-(--ui-text-dimmed)'"
          />
        </template>
      </button>

    </div>
  </aside>
</template>

<style>
.flyout-chevron {
  display: inline-block;
  transition: transform 0.2s ease;
}
.menu-flyout-btn:hover .flyout-chevron {
  transform: rotate(-90deg);
}
</style>