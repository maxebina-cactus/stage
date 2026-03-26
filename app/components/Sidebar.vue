<script setup lang="ts">
const isOpen = useState('sidebar', () => true)
const route = useRoute()

const settingsOpen = ref(false)

watch(
  () => route.path,
  (path) => { if (path.startsWith('/settings')) settingsOpen.value = true },
  { immediate: true }
)

const isActive = (to: string, exact = false) =>
  exact ? route.path === to : (to === '/' ? route.path === '/' : route.path.startsWith(to))

const user = { name: 'Benjamin Canac', avatar: '' }
</script>

<template>
  <aside
    class="h-screen flex flex-col shrink-0 border-r border-(--ui-border) bg-(--ui-bg-elevated) transition-all duration-200 overflow-hidden"
    :class="isOpen ? 'w-[220px]' : 'w-[56px]'"
  >
    <!-- Logo -->
    <div
      class="flex items-center shrink-0 border-b border-(--ui-border)"
      :class="isOpen ? 'h-14 px-4' : 'h-14 justify-center'"
    >
      <AppLogo v-if="isOpen" class="h-5 text-(--ui-text)" />
      <UIcon v-else name="i-simple-icons-nuxt" class="w-5 h-5 text-(--ui-primary)" />
    </div>

    <!-- Search -->
    <div class="px-3 pt-3 pb-1 shrink-0">
      <button
        class="w-full flex items-center gap-2 rounded-md text-sm transition-colors focus:outline-none"
        :class="isOpen
          ? 'px-2.5 py-1.5 bg-(--ui-bg) border border-(--ui-border) hover:border-(--ui-border-accented) text-(--ui-text-muted)'
          : 'justify-center py-2 text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
      >
        <UIcon name="i-lucide-search" class="w-4 h-4 shrink-0" />
        <span v-if="isOpen" class="flex-1 text-left text-xs">Search...</span>
        <div v-if="isOpen" class="flex items-center gap-0.5 text-[10px] text-(--ui-text-dimmed)">
          <kbd class="bg-(--ui-bg-accented) px-1 py-0.5 rounded text-[10px] font-sans">Ctrl</kbd>
          <kbd class="bg-(--ui-bg-accented) px-1 py-0.5 rounded text-[10px] font-sans">K</kbd>
        </div>
      </button>
    </div>

    <!-- Primary Navigation -->
    <nav class="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
      <!-- Home -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors"
        :class="isActive('/', true)
          ? 'bg-(--ui-primary)/10 text-(--ui-primary) font-medium'
          : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
      >
        <UIcon name="i-lucide-home" class="w-4 h-4 shrink-0" />
        <span v-if="isOpen" class="flex-1 truncate">Home</span>
      </NuxtLink>

      <!-- Inbox -->
      <NuxtLink
        to="/inbox"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors"
        :class="isActive('/inbox')
          ? 'bg-(--ui-primary)/10 text-(--ui-primary) font-medium'
          : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
      >
        <UIcon name="i-lucide-inbox" class="w-4 h-4 shrink-0" />
        <template v-if="isOpen">
          <span class="flex-1 truncate">Inbox</span>
          <UBadge label="4" color="neutral" variant="solid" size="sm" class="rounded-full" />
        </template>
      </NuxtLink>

      <!-- Customers -->
      <NuxtLink
        to="/customers"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors"
        :class="isActive('/customers')
          ? 'bg-(--ui-primary)/10 text-(--ui-primary) font-medium'
          : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
      >
        <UIcon name="i-lucide-users" class="w-4 h-4 shrink-0" />
        <span v-if="isOpen" class="flex-1 truncate">Customers</span>
      </NuxtLink>

      <!-- Settings (collapsible) -->
      <div>
        <button
          class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors w-full focus:outline-none"
          :class="isActive('/settings')
            ? 'bg-(--ui-primary)/10 text-(--ui-primary) font-medium'
            : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
          @click="isOpen ? (settingsOpen = !settingsOpen) : navigateTo('/settings')"
        >
          <UIcon name="i-lucide-settings" class="w-4 h-4 shrink-0" />
          <template v-if="isOpen">
            <span class="flex-1 truncate text-left">Settings</span>
            <UIcon
              name="i-lucide-chevron-right"
              class="w-4 h-4 shrink-0 transition-transform duration-200"
              :class="settingsOpen ? 'rotate-90' : ''"
            />
          </template>
        </button>

        <div
          v-if="isOpen && settingsOpen"
          class="mt-0.5 ml-4 pl-3 border-l border-(--ui-border) space-y-0.5"
        >
          <NuxtLink
            v-for="sub in [
              { label: 'General', to: '/settings' },
              { label: 'Members', to: '/settings/members' },
              { label: 'Notifications', to: '/settings/notifications' },
              { label: 'Security', to: '/settings/security' },
            ]"
            :key="sub.to"
            :to="sub.to"
            class="flex items-center px-2 py-1.5 rounded-md text-sm transition-colors"
            :class="route.path === sub.to
              ? 'text-(--ui-primary) font-medium'
              : 'text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented)'"
          >
            {{ sub.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Secondary nav -->
    <div class="px-3 pb-2 space-y-0.5 shrink-0">
      <a
        href="https://github.com/nuxt-ui-templates/dashboard/issues"
        target="_blank"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) transition-colors"
      >
        <UIcon name="i-lucide-message-square" class="w-4 h-4 shrink-0" />
        <template v-if="isOpen">
          <span class="flex-1 truncate">Feedback</span>
          <UIcon name="i-lucide-arrow-up-right" class="w-3.5 h-3.5 text-(--ui-text-dimmed)" />
        </template>
      </a>
      <a
        href="https://ui.nuxt.com"
        target="_blank"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) transition-colors"
      >
        <UIcon name="i-lucide-circle-help" class="w-4 h-4 shrink-0" />
        <template v-if="isOpen">
          <span class="flex-1 truncate">Help & Support</span>
          <UIcon name="i-lucide-arrow-up-right" class="w-3.5 h-3.5 text-(--ui-text-dimmed)" />
        </template>
      </a>
    </div>

    <!-- User footer -->
    <div class="shrink-0 border-t border-(--ui-border) p-3">
      <button
        class="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-(--ui-text-toned) hover:text-(--ui-text) hover:bg-(--ui-bg-accented) transition-colors focus:outline-none"
        :class="!isOpen && 'justify-center'"
      >
        <UAvatar
          size="xs"
          :src="user.avatar"
          :alt="user.name"
          class="shrink-0"
        />
        <template v-if="isOpen">
          <span class="flex-1 text-left font-medium truncate text-xs">{{ user.name }}</span>
          <UIcon name="i-lucide-chevrons-up-down" class="w-3.5 h-3.5 shrink-0 text-(--ui-text-dimmed)" />
        </template>
      </button>
    </div>
  </aside>
</template>
