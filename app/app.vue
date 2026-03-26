<template>
  <UApp>
    <div class="flex h-screen overflow-hidden bg-(--ui-bg)">
      <Sidebar />
      <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header />
        <main class="flex-1 min-h-0 overflow-y-auto bg-(--ui-bg)">
          <NuxtPage />
        </main>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#0f1117' : 'white')

useHead({
  meta: [{ key: 'theme-color', name: 'theme-color', content: color }],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: 'Nuxt Dashboard',
  description: 'A professional dashboard built with Nuxt UI.',
})
</script>
