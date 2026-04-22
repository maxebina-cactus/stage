export function useScrollToTop(panelId: string) {
  const router = useRouter()

  router.afterEach(() => {
    const panel = document.getElementById(panelId)
    const body  = panel?.querySelector<HTMLElement>('[data-slot="body"]')
    if (body) body.scrollTop = 0
  })
}
