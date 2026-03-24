<template>
  <aside class="h-screen flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800" :class="{ 'w-60': isOpen, 'w-16': !isOpen }">
    <div class="flex justify-start px-4" :class="{ 'justify-center p-0': !isOpen }">
      <AppLogo v-if="isOpen" class="h-8 w-auto text-neutral-900 dark:text-white" />
      <img v-else src="/stage-logo-s.svg" class="h-8 w-8" alt="Stage Logo Pequeno" />
    </div>

    <div v-show="isOpen" class="flex-1 px-4 mt-2 overflow-y-auto">
      <UNavigationMenu orientation="vertical" :items="links" class="w-full" />
    </div>

    <div v-show="isOpen" class="mt-auto p-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end items-center gap-2">
      <UButton
        color="neutral"
        variant="ghost"
        class="w-full flex items-center justify-start gap-3 px-2 py-2"
      >
        <div class="flex flex-row items-center overflow-hidden flex-1 gap-4">
          <UAvatar src="/avatar.jpg" size="xs" />
          <span class="text-sm font-medium truncate w-full text-neutral-900 dark:text-white">Administrador - Administrador</span>
        </div>
        <UIcon :name="isOpen ? 'i-lucide-panel-left-close' : 'i-lucide-panel-left-open'" class="w-4 h-4 text-neutral-400 shrink-0" />
      </UButton>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from '@/components/AppLogo.vue'

const isOpen = useState('sidebar', () => true)

const links = ref([
  [
    { label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
    { label: 'Jornada', icon: 'i-lucide-map' },
    { label: 'Relatórios', icon: 'i-lucide-bar-chart' }
  ]
])

const userMenu = ref([
  [
    { label: 'Idioma', icon: 'i-lucide-globe' },
    { label: 'Configurações', icon: 'i-lucide-settings' }
  ],
  [
    { label: 'Sair', icon: 'i-lucide-log-out', color: 'error' as const }
  ]
])

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>
