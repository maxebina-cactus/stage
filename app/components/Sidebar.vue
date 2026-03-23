<template>
  <div class="w-64 bg-white h-screen flex flex-col justify-between">
    <!-- Conteúdo da Sidebar -->
    <div>
      <!-- Itens da Sidebar -->
    </div>
    <UButton color="primary" @click="handleLogout">Sair</UButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app'

const router = useRouter()

const handleLogout = () => {
  // Lógica para logout
  router.push('/login')
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
