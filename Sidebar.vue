<template>
  <aside :class="{ 'w-64': isOpen, 'w-16': !isOpen }" class="h-screen border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-4 bg-white dark:bg-neutral-900 transition-all duration-300 ease-in-out">
    <div :class="{ 'pt-6': isOpen, 'flex justify-center': !isOpen }" class="mb-6">
      <h1 v-if="isOpen" class="text-xl font-bold text-neutral-900 dark:text-white">Stage</h1>
      <img v-else src="/stage-logo-s.svg" alt="Logo" class="w-10 h-10" />
    </div>

    <div class="flex-1 space-y-1">
      <UNavigationMenu orientation="vertical" :items="links" class="w-full flex items-center gap-3 text-sm font-medium" />
    </div>

    <div v-if="isOpen" class="-mx-4 px-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <UDropdownMenu :items="userMenu" class="w-full">
        <UButton
          color="neutral"
          variant="ghost"
          class="w-full justify-start"
          icon="i-lucide-user"
          label="Meu Perfil"
        />
      </UDropdownMenu>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = useState('sidebar', () => true)

const links = ref([
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard'
  },
  {
    label: 'Jornada',
    icon: 'i-lucide-map',
    to: '/jornada'
  },
  {
    label: 'Relatórios',
    icon: 'i-lucide-bar-chart-2',
    to: '/relatorios'
  },
  {
    label: 'Parceiros',
    icon: 'i-lucide-handshake',
    to: '/parceiros'
  }
])

const userMenu = ref([
  [
    { label: 'Idioma', icon: 'i-lucide-globe' },
    { label: 'English', icon: 'i-lucide-flag-usa' },
    { label: 'Español', icon: 'i-lucide-flag-espana' }
  ],
  [
    { label: 'Configurações', icon: 'i-lucide-settings' }
  ],
  [
    { label: 'Sair', icon: 'i-lucide-log-out', color: 'error' }
  ]
])
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
