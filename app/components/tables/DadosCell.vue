<script setup lang="ts">
defineProps<{
  tipoChave: string
  identificador: string
  cnpj: string
  titular: string
}>()
</script>

<template>
  <div class="py-3 space-y-1 leading-tight">
    <p class="text-sm text-(--ui-text-highlighted)">
      <span class="font-bold">Tipo de chave:</span> {{ tipoChave || '—' }}
    </p>
    <p class="text-sm text-(--ui-text-highlighted) break-all">
      {{ identificador || '—' }}
    </p>
    <p class="text-sm text-(--ui-text-highlighted)">
      <span class="font-bold">CNPJ:</span> {{ cnpj || '—' }}
      <template v-if="titular">
        <span class="mx-1 opacity-40">/</span><span class="font-bold">{{ titular }}</span>
      </template>
    </p>
  </div>
</template>
