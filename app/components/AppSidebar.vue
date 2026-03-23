<script setup lang="ts">
import { ref } from 'vue'
import { UDropdownMenu, UDropdownItem, UNavigationMenu, UNavigationItem, UButton, UAvatar, UText } from '@nuxt/ui'

const items = [
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
]

const user = {
  name: 'Administrador Aarnia',
  role: 'Administrador'
}

const handleLanguageChange = (language) => {
  // Lógica para mudar o idioma
}

const handleSettings = () => {
  // Lógica para abrir as configurações
}

const handleLogout = () => {
  // Lógica para fazer logout
}
</script>

<template>
  <UDashboardSidebar class="bg-default">
    <UNavigationMenu orientation="vertical" :items="items" />
    <template #footer>
      <UButton color="neutral" variant="ghost" @click="toggleUserDropdown">
        <UAvatar src="/avatar.png" size="sm" />
        <UText>{{ user.name }}</UText>
        <UText class="text-muted">{{ user.role }}</UText>
      </UButton>
      <UDropdownMenu v-model="userDropdownOpen" :items="[
        { label: 'Idioma', items: [
          { label: 'English', onClick: () => handleLanguageChange('English') },
          { label: 'Español', onClick: () => handleLanguageChange('Español') },
          { label: 'Deutsch', onClick: () => handleLanguageChange('Deutsch') },
          { label: 'Italiano', onClick: () => handleLanguageChange('Italiano') }
        ]},
        { label: 'Configurações', icon: 'i-lucide-settings', onClick: handleSettings },
        { label: 'Sair', icon: 'i-lucide-log-out', color: 'error', onClick: handleLogout }
      ]" />
    </template>
  </UDashboardSidebar>
</template>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
