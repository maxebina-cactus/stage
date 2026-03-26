<template>
  <header class="h-14 min-h-14 w-full flex items-center justify-between px-4 border-b border-(--ui-border) bg-(--ui-bg-elevated) shrink-0">
    <div class="flex items-center gap-3">
      <UButton
        variant="ghost"
        color="neutral"
        size="sm"
        :icon="isOpen ? 'i-lucide-panel-left-close' : 'i-lucide-panel-left-open'"
        @click="isOpen = !isOpen"
      />
      <span class="text-sm font-semibold text-(--ui-text)">{{ pageTitle }}</span>
    </div>

    <div class="flex items-center gap-2">
      <UTooltip text="Notifications" :shortcuts="['N']">
        <UButton variant="ghost" color="neutral" size="sm" class="relative">
          <UChip color="error" inset size="xs">
            <UIcon name="i-lucide-bell" class="w-4 h-4" />
          </UChip>
        </UButton>
      </UTooltip>

      <UDropdownMenu :items="newItems">
        <UButton icon="i-lucide-plus" size="sm" class="rounded-full" />
      </UDropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isOpen = useState('sidebar', () => true)

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/inbox': 'Inbox',
  '/customers': 'Customers',
  '/settings': 'Settings',
  '/usuarios': 'Usuários',
  '/tabs': 'Tabs',
}

const pageTitle = computed(() => {
  for (const [path, title] of Object.entries(pageTitles)) {
    if (path === '/' ? route.path === '/' : route.path.startsWith(path)) return title
  }
  return 'Dashboard'
})

const newItems = [[
  { label: 'New mail', icon: 'i-lucide-send', to: '/inbox' },
  { label: 'New customer', icon: 'i-lucide-user-plus', to: '/customers' },
]]
</script>
