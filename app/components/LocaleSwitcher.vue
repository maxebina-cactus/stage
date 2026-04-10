<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const locales = [
  { label: 'Português', value: 'pt-BR', flag: '/br.svg' },
  { label: 'English', value: 'en', flag: '/us.svg' },
  { label: 'Español', value: 'es', flag: '/es.svg' },
  { label: 'Deutsch', value: 'de', flag: '/al.svg' },
  { label: 'Italiano', value: 'it', flag: '/it.svg' },
]

const currentLocale = ref('pt-BR')

const currentFlag = computed(() => locales.find(l => l.value === currentLocale.value)?.flag ?? '/br.svg')

const items = computed<DropdownMenuItem[][]>(() => [
  locales.map(locale => ({
    label: locale.label,
    avatar: { src: locale.flag },
    type: 'checkbox' as const,
    checked: currentLocale.value === locale.value,
    onSelect: (e: Event) => {
      e.preventDefault()
      currentLocale.value = locale.value
    }
  }))
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end', collisionPadding: 12 }"
    :ui="{ content: 'w-40', itemLeadingIcon: 'size-4' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      square
      size="md"
      class="p-2"
      :aria-label="currentLocale"
    >
      <img :src="currentFlag" class="size-4 rounded-sm shrink-0" alt="" />
    </UButton>
  </UDropdownMenu>
</template>
