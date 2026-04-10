export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - Stage',
      script: [
        { src: 'https://mcp.figma.com/mcp/html-to-design/capture.js', async: true }
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark'
  },

  compatibilityDate: '2025-01-15',

  vite: {
    server: {
      headers: {
        'Cache-Control': 'no-store'
      }
    },
    resolve: {
      dedupe: ['vue']
    },
    optimizeDeps: {
      include: [
        'zod',
        'date-fns',
        '@unovis/vue',
        '@internationalized/date',
        '@vueuse/core'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})