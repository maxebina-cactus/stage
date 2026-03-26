<template>
  <header class="sticky top-0 z-30 h-16 min-h-[64px] w-full flex items-center justify-between px-6 bg-(--ui-bg) border-b border-(--ui-border)">
    <div class="flex items-center gap-4">
      <UButton
        variant="ghost"
        color="neutral"
        :icon="isOpen ? 'i-lucide-panel-left-close' : 'i-lucide-panel-left-open'"
        @click="toggleSidebar"
        class="text-(--ui-text-muted) hover:text-(--ui-text)"
      />
      <span class="text-sm font-medium text-(--ui-text) font-sans">
        {{ pageTitle }}
      </span>
    </div>

    <!-- Área de ações — futuros botões aqui -->
    <div class="flex items-center gap-2 h-full">
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = useState('sidebar', () => true)

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/jornada': 'Jornada',
  '/relatorios': 'Relatórios',
  '/settings': 'Configurações',
}

const pageTitle = computed(() => pageTitles[route.path] ?? route.path)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>