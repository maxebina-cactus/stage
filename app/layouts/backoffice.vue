<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const { isNotificationsSlideoverOpen } = useDashboard()
const colorMode = useColorMode()

defineShortcuts({
  'g-h': () => router.push('/backoffice')
})

useHead(() => ({
  title: (route.meta.title as string) || undefined,
  titleTemplate: title => title ? `${title} - Backoffice Stage` : 'Backoffice Stage'
}))

const open = ref(false)

const links = [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/backoffice',
  onSelect: () => { open.value = false }
}], [{
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Ir para',
  items: links.flat()
}, {
  id: 'code',
  label: 'Código',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}, {
  id: 'theme',
  label: 'Aparência',
  items: [{
    label: 'Claro',
    icon: 'i-lucide-sun',
    active: colorMode.preference === 'light',
    onSelect: () => { colorMode.preference = 'light' }
  }, {
    label: 'Escuro',
    icon: 'i-lucide-moon',
    active: colorMode.preference === 'dark',
    onSelect: () => { colorMode.preference = 'dark' }
  }]
}])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="backoffice"
      v-model:open="open"
      collapsible
      resizable
      :default-size="17"
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" label="Pesquisar..." class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenuBackoffice :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" :color-mode="false" />

    <UDashboardPanel id="backoffice">
      <template #header>
        <AppHeader title="Backoffice" />
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
