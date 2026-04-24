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

const start     = computed(() => props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1)
const end       = computed(() => Math.min(props.page * props.pageSize, props.total))
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const { width } = useWindowSize()
const siblingCount = computed(() => width.value < 640 ? 0 : 1)

const windowStart = computed(() => Math.max(2, props.page - siblingCount.value))
const windowEnd   = computed(() => Math.min(pageCount.value - 1, props.page + siblingCount.value))

type PageItem = number | 'ellipsis-left' | 'ellipsis-right'

const visible = computed((): PageItem[] => {
  const count = pageCount.value
  if (count <= 1) return [1]

  // Desktop: show every page directly when count is small (avoids pointless ellipsis)
  if (width.value >= 640 && count <= 10) {
    return Array.from({ length: count }, (_, i) => i + 1)
  }

  const pages: PageItem[] = [1]
  if (windowStart.value > 2) pages.push('ellipsis-left')
  for (let i = windowStart.value; i <= windowEnd.value; i++) pages.push(i)
  if (windowEnd.value < count - 1) pages.push('ellipsis-right')
  pages.push(count)
  return pages
})

const hiddenLeft = computed((): number[] => {
  const result: number[] = []
  for (let i = 2; i < windowStart.value; i++) result.push(i)
  return result
})

const hiddenRight = computed((): number[] => {
  const result: number[] = []
  for (let i = windowEnd.value + 1; i < pageCount.value; i++) result.push(i)
  return result
})

const leftOpen  = ref(false)
const rightOpen = ref(false)

function goTo(p: number) {
  if (p < 1 || p > pageCount.value || p === props.page) return
  leftOpen.value  = false
  rightOpen.value = false
  emit('update:page', p)
}
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    <span class="text-sm text-(--ui-text-muted)">
      Mostrando {{ start }} - {{ end }} de {{ total }} resultados
    </span>

    <div class="flex flex-col sm:flex-row items-center gap-3">
      <div class="flex items-center gap-2">
        <span class="text-sm text-(--ui-text-muted)">Linhas por página</span>
        <USelect
          :model-value="pageSize"
          :items="pageSizeOptions"
          size="md"
          class="w-20"
          :content="{ sideOffset: 0 }"
          :ui="{ content: 'min-w-0 max-w-(--reka-select-trigger-width)' }"
          @update:model-value="emit('update:pageSize', Number($event))"
        >
          <template #trailing>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 shrink-0 text-(--ui-text-muted) ui-open:rotate-180 transition-transform duration-200"
            />
          </template>
        </USelect>
      </div>

      <nav class="flex items-center gap-0.5 sm:gap-1" aria-label="Paginação">

        <UButton
          icon="i-lucide-chevrons-left"
          variant="outline"
          color="neutral"
          size="sm"
          :disabled="page === 1"
          aria-label="Primeira página"
          @click="goTo(1)"
        />
        <UButton
          icon="i-lucide-chevron-left"
          variant="outline"
          color="neutral"
          size="sm"
          :disabled="page === 1"
          aria-label="Página anterior"
          @click="goTo(page - 1)"
        />

        <template v-for="item in visible" :key="item">

          <UPopover
            v-if="item === 'ellipsis-left'"
            v-model:open="leftOpen"
            :content="{ side: 'top', align: 'center' }"
          >
            <UButton
              label="…"
              variant="outline"
              color="neutral"
              size="sm"
              class="min-w-6 sm:min-w-8 justify-center"
              aria-label="Páginas anteriores"
            />
            <template #content>
              <div class="flex flex-wrap gap-1 p-2 max-h-56 overflow-y-auto">
                <UButton
                  v-for="p in hiddenLeft"
                  :key="p"
                  :label="String(p)"
                  :color="p === page ? 'primary' : 'neutral'"
                  :variant="p === page ? 'solid' : 'outline'"
                  size="sm"
                  class="min-w-6 sm:min-w-8 justify-center"
                  @click="goTo(p)"
                />
              </div>
            </template>
          </UPopover>

          <UPopover
            v-else-if="item === 'ellipsis-right'"
            v-model:open="rightOpen"
            :content="{ side: 'top', align: 'center' }"
          >
            <UButton
              label="…"
              variant="outline"
              color="neutral"
              size="sm"
              class="min-w-6 sm:min-w-8 justify-center"
              aria-label="Próximas páginas"
            />
            <template #content>
              <div class="flex flex-wrap gap-1 p-2 max-h-56 overflow-y-auto">
                <UButton
                  v-for="p in hiddenRight"
                  :key="p"
                  :label="String(p)"
                  :color="p === page ? 'primary' : 'neutral'"
                  :variant="p === page ? 'solid' : 'outline'"
                  size="sm"
                  class="min-w-6 sm:min-w-8 justify-center"
                  @click="goTo(p)"
                />
              </div>
            </template>
          </UPopover>

          <UButton
            v-else
            :label="String(item)"
            :color="item === page ? 'primary' : 'neutral'"
            :variant="item === page ? 'solid' : 'outline'"
            size="sm"
            class="min-w-6 sm:min-w-8 justify-center"
            :aria-current="item === page ? 'page' : undefined"
            @click="goTo(item as number)"
          />

        </template>

        <UButton
          icon="i-lucide-chevron-right"
          variant="outline"
          color="neutral"
          size="sm"
          :disabled="page === pageCount"
          aria-label="Próxima página"
          @click="goTo(page + 1)"
        />
        <UButton
          icon="i-lucide-chevrons-right"
          variant="outline"
          color="neutral"
          size="sm"
          :disabled="page === pageCount"
          aria-label="Última página"
          @click="goTo(pageCount)"
        />

      </nav>
    </div>

  </div>
</template>
