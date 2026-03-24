<template>
  <aside class="w-60 h-screen border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-4 bg-white dark:bg-neutral-900">
    <div class="mb-6">
      <h1 class="text-xl font-bold text-neutral-900 dark:text-white">Meu App</h1>
    </div>

    <div class="flex-1 gap-2 p-4">
      <UNavigationMenu orientation="vertical" :items="links" class="w-full" />
    </div>

    <div class="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
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
