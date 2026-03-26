<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    block
    :square="collapsed"
    class="data-[state=open]:bg-elevated py-2"
    :ui="{ trailingIcon: 'text-dimmed' }"
  >
    <template #leading>
      <AppLogo v-if="!collapsed" class="h-5 text-highlighted" />
      <img v-else src="/stage-logo-s.svg" alt="Stage" class="size-6 shrink-0" />
    </template>
  </UButton>
</template>
