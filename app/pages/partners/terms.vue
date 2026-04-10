<script setup lang="ts">
definePageMeta({ layout: false, title: 'Termos de Uso' })

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg)">
    <UContainer class="py-10 max-w-3xl">

      <div class="flex items-center justify-between mb-6">
        <UButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="ghost"
          size="xl"
          aria-label="Voltar"
          @click="router.back()"
        />

        <UColorModeButton
          color="neutral"
          variant="ghost"
          size="xl"
        />
      </div>

      <TermsContent />

    </UContainer>
  </div>
</template>
