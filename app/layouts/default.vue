<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { isNotificationsSlideoverOpen } = useDashboard()
const colorMode = useColorMode()

defineShortcuts({
  'g-h': () => router.push('/'),
  // 'g-i': () => router.push('/inbox'),
  // 'g-c': () => router.push('/customers'),
  'n': () => { isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value }
})

const open = ref(false)

const links = [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => { open.value = false }
},
// {
//   label: 'Inbox',
//   icon: 'i-lucide-inbox',
//   to: '/inbox',
//   badge: '4',
//   onSelect: () => { open.value = false }
// }, {
//   label: 'Customers',
//   icon: 'i-lucide-users',
//   to: '/customers',
//   onSelect: () => { open.value = false }
// },
{
  label: 'Navigation Tree',
  icon: 'i-lucide-list',
  type: 'trigger',
  defaultOpen: false,
  children: [{
    label: 'Page 1',
    icon: 'i-lucide-file-text',
    to: '/navigation/page-1',
    onSelect: () => { open.value = false }
  }, {
    label: 'Page 2',
    icon: 'i-lucide-file-text',
    to: '/navigation/page-2',
    onSelect: () => { open.value = false }
  }, {
    label: 'Page 3',
    icon: 'i-lucide-file-text',
    to: '/navigation/page-3',
    onSelect: () => { open.value = false }
  }, {
    label: 'Page 4',
    icon: 'i-lucide-file-text',
    to: '/navigation/page-4',
    onSelect: () => { open.value = false }
  }]
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: '/feedback',
  onSelect: () => { open.value = false }
}, {
  label: 'Commands',
  icon: 'i-lucide-terminal',
  to: '/commands',
  onSelect: () => { open.value = false }
}, {
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

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') return

  toast.add({
    title: 'Utilizamos cookies próprios para melhorar a sua experiência em nosso site.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Aceitar',
      color: 'neutral',
      variant: 'outline',
      onClick: () => { cookie.value = 'accepted' }
    }, {
      label: 'Recusar',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
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
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" :color-mode="false" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
