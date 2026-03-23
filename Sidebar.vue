<template>
  <aside class="w-64 h-screen flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
    <div class="flex-1 overflow-y-auto px-4 py-4">
      <UNavigationMenu orientation="vertical" :items="links" />
    </div>

    <div class="mt-auto px-4 py-4 border-t border-neutral-200 dark:border-neutral-800">
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
