<template>
  <UDashboardGroup>
    <UDashboardSidebar :resizable="true" :collapsible="true">
      <template #header="{ collapsed }">
        <div v-if="!collapsed">
          Nuxt UI Pro
        </div>
        <AppLogo v-else />
      </template>

      <UVerticalNavigation :links="links" />

      <template #footer>
        <UDropdown :items="dropdownItems" @click:option="handleDropdownClick" />
      </template>
    </UDashboardSidebar>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const router = useRouter()

const links = [
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

const dropdownItems = [
  { label: 'Idioma' },
  { label: 'Configurações' },
  { label: 'Sair', color: 'error', icon: 'i-lucide-log-out' }
]

const handleDropdownClick = (item) => {
  if (item.label === 'Sair') {
    // Lógica para logout
    router.push('/login')
  } else if (item.label === 'Idioma') {
    // Lógica para mudar o idioma
  } else if (item.label === 'Configurações') {
    // Lógica para abrir as configurações
  }
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
