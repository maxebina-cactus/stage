<script setup lang="ts">
const props = withDefaults(defineProps<{
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
}>(), {
  pageSizeOptions: () => [10, 20, 50, 100],
})

const emit = defineEmits<{
  'update:page':     [value: number]
  'update:pageSize': [value: number]
}>()

const start = computed(() => props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1)
const end   = computed(() => Math.min(props.page * props.pageSize, props.total))
</script>

<template>
  <div class="flex items-center justify-between">
    <span class="text-sm text-(--ui-text-muted)">
      Mostrando {{ start }} - {{ end }} de {{ total }} resultados
    </span>
    <div class="flex items-center gap-4">
      <span class="text-sm text-(--ui-text-muted)">Linhas por página</span>
      <USelect
        :model-value="pageSize"
        :items="pageSizeOptions"
        size="md"
        class="w-20"
        @update:model-value="emit('update:pageSize', Number($event))"
      >
        <template #trailing>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
          />
        </template>
      </USelect>
      <UPagination
        :page="page"
        :items-per-page="pageSize"
        :total="total"
        size="md"
        show-edges
        @update:page="emit('update:page', $event)"
      />
    </div>
  </div>
</template>
