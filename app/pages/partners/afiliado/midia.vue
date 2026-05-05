<script setup lang="ts">
import { mediaMock } from '~/mocks/mediaMock'

definePageMeta({ layout: 'partners', title: 'Mídia / Banners' })
useSeoMeta({ title: 'Mídia / Banners · Afiliado · Partners' })

const itens = mediaMock

function baixar(item: typeof mediaMock[number]) {
  const link = document.createElement('a')
  link.href = item.imagem
  link.download = item.arquivo
  link.click()
}
</script>

<template>
  <div class="p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full">

    <div>
      <UButton
        icon="i-lucide-arrow-left"
        label="Voltar"
        color="neutral"
        variant="ghost"
        to="/partners/dashboard/Afiliados"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="item in itens"
        :key="item.id"
        class="flex flex-col overflow-hidden"
        :ui="{ body: 'flex flex-col flex-1', footer: 'pt-0' }"
      >
        <!-- Imagem -->
        <template #header>
          <div class="w-full h-48 overflow-hidden">
            <img
              :src="item.imagem"
              :alt="item.nome"
              class="w-full h-full object-cover"
            />
          </div>
        </template>

        <!-- Info -->
        <div class="flex flex-col gap-1 flex-1">
          <p class="font-semibold text-(--ui-text-highlighted) truncate">
            {{ item.arquivo }}
          </p>
          <div class="flex items-center gap-3 text-xs text-(--ui-text-muted)">
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-calendar" class="size-3.5" />
              {{ item.dataCriacao }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-hard-drive" class="size-3.5" />
              {{ item.tamanho }}
            </span>
          </div>
        </div>

        <!-- Download -->
        <template #footer>
          <UButton
            label="Download"
            color="primary"
            variant="solid"
            icon="i-lucide-download"
            block
            @click="baixar(item)"
          />
        </template>
      </UCard>
    </div>

  </div>
</template>
