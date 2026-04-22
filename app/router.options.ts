import type { RouterConfig } from '@nuxt/schema'
import { nextTick } from 'vue'

export default {
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    return new Promise(resolve => {
      nextTick(() => resolve({ top: 0, left: 0 }))
    })
  },
} satisfies RouterConfig
