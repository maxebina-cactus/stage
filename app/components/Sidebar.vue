<template>
  <aside class="w-60 h-screen flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
    <div class="px-4 pt-6 pb-2">
      <AppLogo class="h-8 w-auto text-neutral-900 dark:text-white" />
    </div>

    <div class="flex-1 px-4 mt-2">
      <UNavigationMenu orientation="vertical" :items="links" class="w-full" />
    </div>

    <div class="mt-auto p-4 border-t border-neutral-200 dark:border-neutral-800">
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
import AppLogo from '@/components/AppLogo.vue'

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
    { label: 'Sair', icon: 'i-lucide-log-out', color: 'error' }
  ]
])
</script>
