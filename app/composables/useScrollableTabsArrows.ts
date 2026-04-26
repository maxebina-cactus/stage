export function useScrollableTabsArrows(scrollRef: Ref<HTMLElement | null>) {
  const showLeft = ref(false)
  const showRight = ref(false)

  function update() {
    const el = scrollRef.value
    if (!el) {
      showLeft.value = false
      showRight.value = false
      return
    }
    const overflow = el.scrollWidth - el.clientWidth
    const hasOverflow = overflow > 2
    showLeft.value = hasOverflow && el.scrollLeft > 2
    showRight.value = hasOverflow && el.scrollLeft < overflow - 2
  }

  function scroll(dir: 'left' | 'right') {
    scrollRef.value?.scrollBy({ left: dir === 'left' ? -150 : 150, behavior: 'smooth' })
  }

  useResizeObserver(scrollRef, update)

  return { showLeft, showRight, update, scroll }
}
