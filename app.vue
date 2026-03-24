<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue'

const isSidebarOpen = useState('sidebar', () => true)

const title = 'Stage'
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
  <div class="flex h-screen overflow-hidden bg-white dark:bg-neutral-950">
    <Sidebar :is-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="flex flex-col flex-1 transition-all duration-300 ease-in-out w-full" :class="{ 'w-60': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <Header :is-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 p-6 overflow-y-auto whitespace-nowrap">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
