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
    class="data-[state=open]:bg-elevated py-1 hover:bg-transparent"
    :ui="{ trailingIcon: 'text-dimmed' }"
  >
    <template #leading>
      <AppLogo v-if="!collapsed" class="h-8 text-highlighted" />
      <img v-else src="/stage-logo-s.svg" alt="Stage" class="size-8 shrink-0" />
    </template>
  </UButton>
</template>
