<template>
  <header class="h-16 min-h-[64px] w-full flex items-center justify-between px-6 bg-white dark:bg-[#1D1D21] border-b border-neutral-200 dark:border-[#1D293D]">
    
    <div class="flex items-center gap-4">
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-lucide-panel-left-close"
        @click="toggleSidebar"
        class="text-neutral-500 dark:text-neutral-400"
      />
      <span class="text-sm font-medium text-neutral-900 dark:text-[#E4E4E7] font-sans">
        Dashboard
      </span>
    </div>

    <div class="flex items-center h-full">
      <UDropdownMenu :items="userMenu">
        <UAvatar 
          src="/avatar.jpg" 
          size="sm" 
          class="cursor-pointer ring-1 ring-neutral-200 dark:ring-[#1D293D] hover:ring-primary-500 transition-all" 
        />
      </UDropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
// Mantenha o script anterior igual
const userMenu = [
  [
    { label: 'Idioma', icon: 'i-lucide-globe' },
    { label: 'Configurações', icon: 'i-lucide-settings' }
  ],
  [
    { label: 'Sair', icon: 'i-lucide-log-out', color: 'error' as const }
  ]
]

const toggleSidebar = () => {
  console.log('Toggle Sidebar')
}
</script>