export function useScrollableTabsArrows(scrollRef: Ref<HTMLElement | null>) {
  const hasOverflow = ref(false)
  const canScrollLeft = ref(false)
  const canScrollRight = ref(false)

  function update() {
    const el = scrollRef.value
    if (!el) {
      hasOverflow.value = false
      canScrollLeft.value = false
      canScrollRight.value = false
      return
    }
    // rAF ensures measurements happen after layout is painted, avoiding
    // stale scrollWidth/clientWidth readings on initial mount
    requestAnimationFrame(() => {
      if (!scrollRef.value) return
      const overflow = scrollRef.value.scrollWidth - scrollRef.value.clientWidth
      hasOverflow.value = overflow > 2
      canScrollLeft.value = scrollRef.value.scrollLeft > 0
      canScrollRight.value =
        scrollRef.value.scrollLeft + scrollRef.value.clientWidth < scrollRef.value.scrollWidth - 1
    })
  }

  function scroll(dir: 'left' | 'right') {
    scrollRef.value?.scrollBy({ left: dir === 'left' ? -150 : 150, behavior: 'smooth' })
  }

  useResizeObserver(scrollRef, update)

  return { hasOverflow, canScrollLeft, canScrollRight, update, scroll }
}
