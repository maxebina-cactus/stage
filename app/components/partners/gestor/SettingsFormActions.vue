<script setup lang="ts">
const { isDirty, isModalOpen, bypassGuard, save } = useSettingsDirty()
const router = useRouter()

async function handleSave() { await save() }

function handleCancel() {
  bypassGuard.value = true
  router.push('/partners/dashboard/gestor')
}
</script>

<template>
  <div class="shrink-0 py-4 flex items-center bg-(--ui-bg) border-t border-(--ui-border) md:h-16 md:py-0">
    <div class="max-w-6xl mx-auto w-full px-6 flex flex-col-reverse gap-2 md:flex-row md:justify-end md:gap-3">
      <UButton
        color="neutral"
        variant="outline"
        size="xl"
        class="w-full justify-center md:w-auto md:px-2.5 md:py-1.5 md:text-sm md:gap-1.5"
        @click="handleCancel"
      >
        Cancelar
      </UButton>
      <UButton
        color="primary"
        variant="solid"
        size="xl"
        class="w-full justify-center md:w-auto md:px-2.5 md:py-1.5 md:text-sm md:gap-1.5"
        :disabled="!isDirty"
        @click="handleSave"
      >
        <UIcon name="i-lucide-save" class="size-6 md:size-5 shrink-0" />
        Salvar configurações
      </UButton>
    </div>
  </div>

  <UModal
    v-model:open="isModalOpen"
    :close="false"
    :content="{
      onInteractOutside: (e: Event) => e.preventDefault(),
      onEscapeKeyDown: (e: Event) => e.preventDefault(),
    }"
  >
    <template #content>
      <UCard :ui="{ footer: 'flex justify-end' }">
        <template #header>
          <span class="font-semibold text-(--ui-text-highlighted)">Existem configurações não salvas</span>
        </template>
        <p class="text-sm text-(--ui-text-muted)">
          Você fez alterações que ainda não foram salvas. Clique em "Salvar configurações" para salvá-las antes de sair.
        </p>
        <template #footer>
          <UButton label="Entendi" color="primary" size="md" @click="isModalOpen = false" />
        </template>
      </UCard>
    </template>
  </UModal>
</template>
