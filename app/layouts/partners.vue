<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const { isNotificationsSlideoverOpen } = useDashboard()
const colorMode = useColorMode()

defineShortcuts({
  'g-h': () => router.push('/partners')
})

useHead(() => ({
  title: (route.meta.title as string) || undefined,
  titleTemplate: title => title ? `${title} - Partners Stage` : 'Partners Stage'
}))

const toast = useToast()
const open = ref(false)

const links = computed(() => [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/partners',
  onSelect: () => { open.value = false }
}], [{
  label: 'View page Source',
  icon: 'i-simple-icons-github',
  to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
  target: '_blank'
}]] satisfies NavigationMenuItem[][])

const groups = computed(() => [{
  id: 'links',
  label: 'Ir para',
  items: links.value.flat()
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
    position: 'bottom-right',
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
      id="partners"
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
        <UTooltip :text="collapsed ? 'Changelog' : ''" :delay="300">
          <UButton
            icon="i-lucide-scroll-text"
            :label="collapsed ? undefined : 'v0.0.31'"
            to="/partners/changelog"
            color="neutral"
            variant="ghost"
            :square="collapsed"
            block
            class="text-dimmed"
          />
        </UTooltip>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" :color-mode="false" />

    <UDashboardPanel id="partners">
      <template #header>
        <AppHeader :title="(route.meta.title as string) || 'Partners'">
          <template #right-extra>
            <div class="w-48 min-w-0">
              <UserMenu :collapsed="false" class="[&_span]:truncate" />
            </div>
          </template>
        </AppHeader>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
