<script setup lang="ts">
defineProps<{
  title: string
}>()

const isSupport = ref(false)
</script>

<template>
  <UDashboardNavbar :title="title">
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>

    <template #right>
      <div class="flex items-center gap-1.5">
        <UTooltip text="Visitar site">
          <UButton
            icon="i-lucide-globe"
            size="xs"
            color="neutral"
            variant="soft"
            class="rounded-lg p-1.5"
          />
        </UTooltip>

        <UButton
          icon="i-lucide-info"
          size="xs"
          color="info"
          variant="soft"
          disabled
          class="rounded-lg p-1.5 cursor-not-allowed"
        />

        <UTooltip :text="isSupport ? 'Fechar Suporte' : 'Abrir Suporte'">
          <UButton
            :icon="isSupport ? 'i-lucide-x' : 'i-lucide-headset'"
            size="xs"
            :color="isSupport ? 'error' : 'warning'"
            variant="soft"
            class="rounded-lg p-1.5"
            @click="isSupport = !isSupport"
          />
        </UTooltip>
      </div>
    </template>
  </UDashboardNavbar>
</template>
