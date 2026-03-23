<template>
  <div class="w-64 h-screen border-r border-gray-200 dark:border-gray-800 flex flex-col">
    <UVerticalNavigation :links="links" />
    <UDropdown :items="dropdownItems" mode="hover" class="mt-auto p-2">
      <template #trigger="{ open }">
        <UButton
          :avatar="user.avatar"
          :label="user.label"
          color="neutral"
          variant="ghost"
          @click="open = !open"
        />
      </template>
    </UDropdown>
  </div>
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
