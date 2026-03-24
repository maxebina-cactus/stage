<template>
  <header class="h-16 w-full flex items-center justify-between px-6 bg-[#1D1D21] border-b border-[#1D293D]">
    <div class="flex gap-4">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-panel-left-close"
        @click="toggleSidebar"
        class="text-[#E4E4E7]"
      />
      <span class="text-sm font-medium text-[#E4E4E7]">Dashboard</span>
    </div>

    <div class="flex items-center gap-2">
      <div class="p-3 border border-[#1D293D] rounded-full cursor-pointer">
        <UAvatar src="/avatar.jpg" size="sm" />
      </div>
      <UDropdownMenu :items="userMenu" class="cursor-pointer">
        <UAvatar src="/avatar.jpg" size="sm" class="cursor-pointer border border-[#1D293D]" />
      </UDropdownMenu>
    </div>
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
