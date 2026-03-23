<template>
  <UDashboardGroup>
    <UDashboardSidebar :resizable="true" collapsible="icon">
      <template #header="{ collapsed }">
        <div v-if="!collapsed">
          Nuxt UI Pro
        </div>
        <AppLogo v-else />
      </template>

      <UNavigationMenu orientation="vertical">
        <NavigationMenuItem icon="i-lucide-layout-dashboard" to="/dashboard">Dashboard</NavigationMenuItem>
        <NavigationMenuItem icon="i-lucide-map" to="/jornada">Jornada</NavigationMenuItem>
        <NavigationMenuItem icon="i-lucide-bar-chart" to="/relatorios">Relatórios</NavigationMenuItem>
      </UNavigationMenu>

      <template #footer>
        <UDropdownMenu>
          <template #trigger="{ open }">
            <UButton
              :avatar="user.avatar"
              :label="user.label"
              color="neutral"
              variant="ghost"
              @click="open = !open"
            />
          </template>

          <UDropdownItem>Idioma</UDropdownItem>
          <UDropdownItem>Configurações</UDropdownItem>
          <UDropdownItem color="error" icon="i-lucide-log-out" :kbds="['shift', 'meta', 'q']">Sair</UDropdownItem>
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const router = useRouter()

const user = {
  avatar: 'https://via.placeholder.com/50',
  label: 'Administrador Aarnia'
}

const handleLogout = () => {
  // Lógica para logout
  router.push('/login')
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
