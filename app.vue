<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue'

const title = 'Nuxt Starter Template'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <UDashboardNavbar title="Dashboard" />
      <div class="flex-1 p-4">
        <h1 class="text-2xl font-bold">Bem-vindo ao Stage</h1>
        <p class="mt-2 text-gray-600">Este é um exemplo de conteúdo principal.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
