<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

const ptBR = { ...pt_br, messages: { ...pt_br.messages, dashboardSearch: { theme: 'Aparência' } } }

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'pt-BR' },
  script: [{ src: 'https://mcp.figma.com/mcp/html-to-design/capture.js', async: true }]
})

useSeoMeta({
  title: 'Stage Dashboard',
  description: 'Stage — painel de controle.'
})
</script>

<template>
  <UApp :locale="ptBR">
    <NuxtLoadingIndicator />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <TermsModal />
    
    <UToaster /> 
  </UApp>
</template>