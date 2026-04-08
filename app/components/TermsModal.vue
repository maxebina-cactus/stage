<script setup lang="ts">
const isTermsOpen = useState('termsOpen', () => false)
</script>

<template>
  <UModal 
    v-model:open="isTermsOpen" 
    fullscreen
    title="Termos de Uso"
    description="Última atualização: 1 de janeiro de 2026"
  >
    <template #content>
      <div class="flex flex-col h-full bg-(--ui-bg)">
        
        <header class="p-4 border-b border-(--ui-border) flex justify-end shrink-0">          
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="isTermsOpen = false"
          />
        </header>

        <div class="flex-1 overflow-y-auto">
          <UContainer max-w-3xl class="py-12">
            <TermsContent />
          </UContainer>
        </div>

        <footer class="p-4 border-t border-(--ui-border) flex justify-end shrink-0">
          <UButton
            label="Entendi e Aceito"
            color="primary"
            @click="isTermsOpen = false"
          />
        </footer>
      </div>
    </template>
  </UModal>
</template>