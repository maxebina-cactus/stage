<script setup lang="ts">
defineProps<{ period: string }>()

const stats = [
  {
    label: 'CUSTOMERS',
    value: '542',
    delta: -6,
    icon: 'i-lucide-users',
    to: '/customers',
  },
  {
    label: 'CONVERSIONS',
    value: '1,109',
    delta: 3,
    icon: 'i-lucide-mouse-pointer-click',
    to: '/customers',
  },
  {
    label: 'REVENUE',
    value: '$400,831',
    delta: 4,
    icon: 'i-lucide-credit-card',
    to: '/customers',
  },
  {
    label: 'ORDERS',
    value: '156',
    delta: 9,
    icon: 'i-lucide-shopping-cart',
    to: '/customers',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <NuxtLink
      v-for="stat in stats"
      :key="stat.label"
      :to="stat.to"
      class="group bg-(--ui-bg-elevated) border border-(--ui-border) rounded-xl p-5 hover:border-(--ui-border-accented) transition-colors"
    >
      <!-- Icon -->
      <div class="flex items-start justify-between mb-4">
        <div class="w-10 h-10 rounded-full bg-(--ui-primary)/10 flex items-center justify-center">
          <UIcon :name="stat.icon" class="w-5 h-5 text-(--ui-primary)" />
        </div>
      </div>

      <!-- Label -->
      <p class="text-xs font-semibold tracking-wider text-(--ui-text-muted) mb-1">
        {{ stat.label }}
      </p>

      <!-- Value + badge -->
      <div class="flex items-end gap-2">
        <span class="text-2xl font-bold text-(--ui-text) leading-none">{{ stat.value }}</span>
        <span
          class="text-xs font-semibold px-1.5 py-0.5 rounded mb-0.5"
          :class="stat.delta > 0
            ? 'bg-(--ui-primary)/10 text-(--ui-primary)'
            : 'bg-red-500/10 text-red-500'"
        >
          {{ stat.delta > 0 ? '+' : '' }}{{ stat.delta }}%
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
