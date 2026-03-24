<template>
  <header class="h-16 w-full flex items-center justify-between px-6 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
    <div class="flex gap-4">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-panel-left-close"
        @click="toggleSidebar"
      />
      <span class="text-sm font-medium">Dashboard</span>
    </div>

    <UDropdownMenu :items="userMenu" class="cursor-pointer">
      <UAvatar src="/avatar.jpg" size="sm" />
    </UDropdownMenu>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userMenu = ref([
  {
    label: 'Idioma',
    icon: 'i-lucide-globe'
  },
  {
    label: 'Configurações',
    icon: 'i-lucide-settings'
  },
  {
    label: 'Sair',
    icon: 'i-lucide-log-out',
    color: 'error'
  }
])

const toggleSidebar = () => {
  // Lógica para alternar a sidebar
}
</script>
