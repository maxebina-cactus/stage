export function useSettingsDirty() {
  const isDirty     = useState<boolean>('settings:dirty',  () => false)
  const isModalOpen = useState<boolean>('settings:modal',  () => false)
  const bypassGuard = useState<boolean>('settings:bypass', () => false)
  const toast = useToast()

  function markDirty() { isDirty.value = true }
  function markClean() { isDirty.value = false }

  async function save() {
    await new Promise<void>(resolve => setTimeout(resolve, 300))
    markClean()
    toast.add({ title: 'Configurações salvas', color: 'success', icon: 'i-lucide-check' })
  }

  return { isDirty, isModalOpen, bypassGuard, markDirty, markClean, save }
}
