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
  <div class="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
    <Sidebar />

    <main class="flex-1 overflow-y-auto p-8">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
