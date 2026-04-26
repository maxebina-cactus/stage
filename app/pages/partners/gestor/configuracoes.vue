<script setup lang="ts">
import { colord, extend } from 'colord'
import mixPlugin  from 'colord/plugins/mix'
import a11yPlugin from 'colord/plugins/a11y'

extend([mixPlugin, a11yPlugin])

definePageMeta({ layout: 'partners', title: 'Configurações' })
useSeoMeta({ title: 'Configurações · Gestor · Partners' })

// ── Tabs ──────────────────────────────────────────────────────────────────
const abas = [
  { label: 'Popup',         slot: 'popup'         },
  { label: 'Parâmetros',    slot: 'parametros'     },
  { label: 'Gamificação',   slot: 'gamificacao'    },
  { label: 'Aparência',     slot: 'aparencia'      },
  { label: 'Banners',       slot: 'banners'        },
]
const selectedTab   = ref('0')
const abasMobile    = abas.map((a, i) => ({ label: a.label, value: String(i) }))

// ── Toast ─────────────────────────────────────────────────────────────────
const toast = useToast()

// ── Gamificação · sub-navegação ───────────────────────────────────────────
const gamiSubAbas = [
  { key: 'comissao', label: 'Comissão' },
  { key: 'ftd',      label: 'FTD'      },
]
const activeGamiTab = ref('comissao')

// ── Gamificação · Comissão ────────────────────────────────────────────────
const gamiAtivo = ref(false)

const iconOptions = [
  { label: 'Prêmio',   value: 'i-lucide-award'   },
  { label: 'Troféu',   value: 'i-lucide-trophy'   },
  { label: 'Estrela',  value: 'i-lucide-star'     },
  { label: 'Medalha',  value: 'i-lucide-medal'    },
  { label: 'Coroa',    value: 'i-lucide-crown'    },
  { label: 'Diamante', value: 'i-lucide-diamond'  },
  { label: 'Foguete',  value: 'i-lucide-rocket'   },
  { label: 'Raio',     value: 'i-lucide-zap'      },
]

interface NivelComissao {
  id: number
  nomePt: string
  nomeEn: string
  nomeEs: string
  ganhosAcumulados: number
  icone: string
}
const INITIAL_NIVEL_ID = 1
const niveisComissao = ref<NivelComissao[]>([
  { id: 1, nomePt: '', nomeEn: '', nomeEs: '', ganhosAcumulados: 0,    icone: 'i-lucide-award'   },
  { id: 2, nomePt: '', nomeEn: '', nomeEs: '', ganhosAcumulados: 0,    icone: 'i-lucide-star'    },
  { id: 3, nomePt: '', nomeEn: '', nomeEs: '', ganhosAcumulados: 0,    icone: 'i-lucide-trophy'  },
  { id: 4, nomePt: '', nomeEn: '', nomeEs: '', ganhosAcumulados: 0,    icone: 'i-lucide-crown'   },
])

let nextNivelId = 5
function adicionarNivel() {
  niveisComissao.value.push({ id: nextNivelId++, nomePt: '', nomeEn: '', nomeEs: '', ganhosAcumulados: 0, icone: 'i-lucide-award' })
}
function removerNivel(id: number) {
  niveisComissao.value = niveisComissao.value.filter(n => n.id !== id)
}

// ── Aparência · sub-navegação ─────────────────────────────────────────────
const aparenciaSubAbas = [
  { key: 'logo',  label: 'Logo'  },
  { key: 'cores', label: 'Cores' },
  { key: 'urls',  label: 'URLs'  },
  { key: 'links', label: 'Links' },
]
const activeAparenciaTab = ref('logo')

// ── Aparência · Logo ──────────────────────────────────────────────────────
const logoImage    = ref<string | null>(null)
const faviconImage = ref<string | null>(null)
const logoInput    = ref<HTMLInputElement | null>(null)
const faviconInput = ref<HTMLInputElement | null>(null)

function onAparenciaFileSelect(e: Event, target: 'logo' | 'favicon') {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    if (target === 'logo') logoImage.value = ev.target?.result as string
    else faviconImage.value = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}
function onAparenciaDrop(e: DragEvent, target: 'logo' | 'favicon') {
  e.preventDefault()
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  onAparenciaFileSelect({ target: { files: [file] } } as unknown as Event, target)
}

// ── Aparência · Cores ─────────────────────────────────────────────────────
const primaryHex       = ref('#00C16A')
const paletteGenerated = ref(false)
const clickCount       = ref(0)
const palette          = ref({ secondary: '', background: '', text: '', primaryOnBackground: '' })

const schemes = [
  { name: 'complementar',   deg:  180 },
  { name: 'split-comp-pos', deg:  150 },
  { name: 'split-comp-neg', deg: -150 },
  { name: 'triadico',       deg:  120 },
  { name: 'analogo',        deg:   30 },
]

function ensureContrast(fgHex: string, bgHex: string, minRatio: number): string {
  let c = colord(fgHex)
  const bgLight = colord(bgHex).luminance() > 0.5
  let safety = 0
  while (colord(bgHex).contrast(c.toHex()) < minRatio && safety < 60) {
    c = bgLight ? c.darken(0.02) : c.lighten(0.02)
    safety++
  }
  return c.toHex()
}

function badgeLabel(r: number): string {
  if (r >= 7)   return `AAA ${r.toFixed(2)}:1`
  if (r >= 4.5) return `AA ${r.toFixed(2)}:1`
  if (r >= 3)   return `AA Large ${r.toFixed(2)}:1`
  return `Falha ${r.toFixed(2)}:1`
}

function badgeClass(r: number): string {
  if (r >= 4.5) return 'bg-green-500/20 text-green-400'
  if (r >= 3)   return 'bg-yellow-500/20 text-yellow-400'
  return 'bg-red-500/20 text-red-400'
}

function gerarPaleta() {
  const primary = colord(primaryHex.value)
  if (!primary.isValid()) {
    toast.remove('palette-error')
    toast.add({
      id: 'palette-error',
      title: 'Cor primária inválida',
      description: 'Informe um hex válido (ex: #21BB75).',
      color: 'error',
      duration: 3000,
    })
    return
  }

  const isVeryLight = primary.luminance() > 0.55

  const background = isVeryLight
    ? primary.mix('#0a0a0a', 0.88).toHex()
    : primary.mix('#ffffff', 0.92).toHex()

  let text = isVeryLight
    ? primary.mix('#ffffff', 0.88).toHex()
    : primary.mix('#000000', 0.85).toHex()
  text = ensureContrast(text, background, 4.5)

  const primaryOnBackground = ensureContrast(primaryHex.value, background, 4.5)

  const scheme    = schemes[clickCount.value % schemes.length]
  let   secondary = colord(primaryHex.value).rotate(scheme.deg).toHex()
  secondary = ensureContrast(secondary, background, 4.5)

  palette.value      = { secondary, background, text, primaryOnBackground }
  paletteGenerated.value = true
  clickCount.value++

  toast.remove('palette-generated')
  toast.add({
    id: 'palette-generated',
    title: 'Paleta gerada!',
    description: 'Cores complementares calculadas com base na cor primária.',
    color: 'success',
    icon: 'i-lucide-sparkles',
    duration: 2500,
  })
}

// ── Aparência · URLs ──────────────────────────────────────────────────────
const urlSettings = reactive({
  membros:   '',
  promocoes: '',
  ios:       '',
  android:   '',
  facebook:  '',
  twitter:   '',
  instagram: '',
  youtube:   '',
  tiktok:    '',
  telegram:  '',
})

// ── Aparência · Links ─────────────────────────────────────────────────────
interface LinkItem { id: number; titulo: string; url: string }
const links = ref<LinkItem[]>([{ id: 1, titulo: '', url: '' }])
let nextLinkId = 2
function adicionarLink() { links.value.push({ id: nextLinkId++, titulo: '', url: '' }) }
function removerLink(id: number) { links.value = links.value.filter(l => l.id !== id) }

// ── Aparência · Links · Texto de referência ──────────────────────────────
const refTextoLang = ref<'pt' | 'en' | 'es'>('pt')
const textoReferencia = reactive({
  pt: 'Ganhe 10% de comissão de todo RevShare que seus sub-afiliados ganharem!',
  en: '',
  es: '',
})

// ── Aparência · Links · Serviços e recursos ──────────────────────────────
const servicosLinks = reactive({
  livechat:    false,
  zendesk:     false,
  gtm:         false,
  manutencao:  false,
  faleGerente: false,
  subafiliado: false,
})

// ── Gamificação · FTD ─────────────────────────────────────────────────────
const ftdFotoAtivo = ref(false)
const ftdGoals = reactive<Record<number, number>>({})

watch(
  niveisComissao,
  (niveis) => { niveis.forEach(n => { if (!(n.id in ftdGoals)) ftdGoals[n.id] = 0 }) },
  { immediate: true, deep: true },
)

const ftdDesktopImage = ref<string | null>(null)
const ftdMobileImage  = ref<string | null>(null)
const ftdDesktopInput = ref<HTMLInputElement | null>(null)
const ftdMobileInput  = ref<HTMLInputElement | null>(null)

function onFtdFileSelect(e: Event, target: 'desktop' | 'mobile') {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    if (target === 'desktop') ftdDesktopImage.value = ev.target?.result as string
    else ftdMobileImage.value = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

function onFtdDrop(e: DragEvent, target: 'desktop' | 'mobile') {
  e.preventDefault()
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  onFtdFileSelect({ target: { files: [file] } } as unknown as Event, target)
}

// ── Parâmetros · sub-navegação ────────────────────────────────────────────
const subAbas = [
  { key: 'saques',      label: 'Saques'      },
  { key: 'metodos',     label: 'Métodos'     },
  { key: 'criptomoeda', label: 'Criptomoeda' },
  { key: 'relatorio',   label: 'Relatório'   },
  { key: 'mensagens',   label: 'Mensagens'   },
]
const activeSubTab = ref('saques')

// ── carrossel mobile – setas de scroll ────────────────────────────────────
const subTabsScrollRef   = ref<HTMLElement | null>(null)
const gamiScrollRef      = ref<HTMLElement | null>(null)
const aparenciaScrollRef = ref<HTMLElement | null>(null)

const {
  showLeft: subTabsCanScrollLeft, showRight: subTabsCanScrollRight,
  update: updateSubTabsScroll,    scroll:  scrollSubTabs,
} = useScrollableTabsArrows(subTabsScrollRef)
const {
  showLeft: gamiCanScrollLeft,    showRight: gamiCanScrollRight,
  update: updateGamiScroll,       scroll:  scrollGamiTabs,
} = useScrollableTabsArrows(gamiScrollRef)
const {
  showLeft: aparenciaCanScrollLeft, showRight: aparenciaCanScrollRight,
  update: updateAparenciaScroll,    scroll:  scrollAparenciaTabs,
} = useScrollableTabsArrows(aparenciaScrollRef)

// Recalculate arrows when the active main tab changes (panel becomes visible)
watch(selectedTab, async () => {
  await nextTick()
  updateSubTabsScroll()
  updateGamiScroll()
  updateAparenciaScroll()
})

watch(activeSubTab, async () => {
  await nextTick()
  const el = subTabsScrollRef.value
  if (!el) return
  el.querySelector<HTMLElement>('[data-active="true"]')
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  setTimeout(updateSubTabsScroll, 300)
})
watch(activeGamiTab, async () => {
  await nextTick()
  const el = gamiScrollRef.value
  if (!el) return
  el.querySelector<HTMLElement>('[data-active="true"]')
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  setTimeout(updateGamiScroll, 300)
})
watch(activeAparenciaTab, async () => {
  await nextTick()
  const el = aparenciaScrollRef.value
  if (!el) return
  el.querySelector<HTMLElement>('[data-active="true"]')
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  setTimeout(updateAparenciaScroll, 300)
})

onMounted(() => {
  updateSubTabsScroll()
  updateGamiScroll()
  updateAparenciaScroll()
  markClean()
})

// ── Parâmetros · Mensagens ────────────────────────────────────────────────
const langTabs = [
  { label: 'Português', slot: 'pt' },
  { label: 'Inglês',    slot: 'en' },
  { label: 'Espanhol',  slot: 'es' },
]

const messagesConfig = reactive({
  bloqueio: {
    ativo: false,
    pt: '', en: '', es: '',
  },
  termos: {
    ativo: false,
    pt: '', en: '', es: '',
  },
  ftd: {
    ativo: false,
    msg1: { pt: '', en: '', es: '' },
    msg2: { pt: '', en: '', es: '' },
  },
})

// ── Parâmetros · Relatório ────────────────────────────────────────────────
const relatorioAtivo = ref(false)

const reportGroups = [
  {
    title: 'Conversão',
    fields: ['visitas', 'registros', 'ftds', 'qftds'],
    labels: { visitas: 'Visitas', registros: 'Registros', ftds: 'FTDs', qftds: 'QFTDs' },
  },
  {
    title: 'Financeiro',
    fields: ['comissaoCpa', 'subcomissao', 'ajustes', 'pagamentos', 'roi', 'pl', 'comissaoBruta', 'saldoPendente', 'revShare'],
    labels: { comissaoCpa: 'Comissão CPA', subcomissao: 'Subcomissão', ajustes: 'Ajustes', pagamentos: 'Pagamentos', roi: 'ROI', pl: 'P&L', comissaoBruta: 'Comissão Bruta', saldoPendente: 'Saldo Pendente', revShare: 'RevShare' },
  },
  {
    title: 'Depósitos',
    fields: ['saquesTotais', 'depositoLiquido', 'depositoBruto', 'valorTotalFtds'],
    labels: { saquesTotais: 'Saques Totais', depositoLiquido: 'Depósito Líquido', depositoBruto: 'Depósito Bruto', valorTotalFtds: 'Valor Total FTDs' },
  },
] as const

type ReportField = typeof reportGroups[number]['fields'][number]
const allReportFields = reportGroups.flatMap(g => g.fields) as ReportField[]
const selectedReportFields = ref<ReportField[]>([...allReportFields])

function selectAllReport()  { selectedReportFields.value = [...allReportFields] }
function clearReport()      { selectedReportFields.value = [] }

// ── Parâmetros · Criptomoeda ──────────────────────────────────────────────
const cryptoActive   = ref(false)
const cryptoUsdtTrc  = ref(false)
const cryptoBitcoin  = ref(false)
const cryptoXrp      = ref(false)
const cryptoBnb      = ref(false)
const cryptoEth      = ref(false)
const cryptoErc20    = ref(false)
const maxWithdrawal  = ref('49999')
const conversionRate = ref(0)

// ── Parâmetros · Métodos ──────────────────────────────────────────────────
const pixCpf               = ref(true)
const pixCnpj              = ref(true)
const pixEmail             = ref(false)
const pixTelefone          = ref(false)
const pixAleatoria         = ref(false)
const transferenciaIntl    = ref(false)
const qtdMaxMetodos        = ref(3)
const revShareSubAfiliados = ref(0)

// ── Parâmetros · Saques ───────────────────────────────────────────────────
const valorMinimo        = ref('')
const valorMaximoPF      = ref('')
const valorMaximoPJ      = ref('')
const ftdsMinimos        = ref(0)
const carenciaNovo       = ref(0)
const carenciaReprovacao = ref(0)
const carenciaPrimeiro   = ref(0)
const prazoMaximo        = ref(0)
const margemRisco        = ref(0)
const exigirAnexo        = ref(false)

// ── Popup state ───────────────────────────────────────────────────────────
const popupAtivo      = ref(false)
const linkDestino     = ref('')
const linkCopiado     = ref(false)
const delayExibir     = ref(3)
const exibirNovamente = ref(24)

const desktopFile  = ref<File | null>(null)
const mobileFile   = ref<File | null>(null)

const desktopInput = ref<HTMLInputElement | null>(null)
const mobileInput  = ref<HTMLInputElement | null>(null)

const desktopImage = ref<string | null>(null)
const mobileImage  = ref<string | null>(null)

function onFileSelect(e: Event, target: 'desktop' | 'mobile') {
  const input = e.target as HTMLInputElement
  const file  = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = ev => {
    if (target === 'desktop') {
      desktopFile.value  = file
      desktopImage.value = ev.target?.result as string
    } else {
      mobileFile.value  = file
      mobileImage.value = ev.target?.result as string
    }
  }
  reader.readAsDataURL(file)
}

function onDrop(e: DragEvent, target: 'desktop' | 'mobile') {
  e.preventDefault()
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  const fakeEvent = { target: { files: [file] } } as unknown as Event
  onFileSelect(fakeEvent, target)
}

// ── Banners ────────────────────────────────────────────────────────────────
const bannerLink         = ref('')
const bannerLinkCopiado  = ref(false)
const bannerDesktopFile  = ref<File | null>(null)
const bannerDesktopImage = ref<string | null>(null)
const bannerDesktopInput = ref<HTMLInputElement | null>(null)

function onBannerFileSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    bannerDesktopFile.value  = file
    bannerDesktopImage.value = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

function onBannerDrop(e: DragEvent) {
  e.preventDefault()
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  onBannerFileSelect({ target: { files: [file] } } as unknown as Event)
}

async function copyBannerLink() {
  if (!bannerLink.value) return
  await navigator.clipboard.writeText(bannerLink.value)
  bannerLinkCopiado.value = true
  toast.add({
    title: 'Link Copiado',
    description: 'O link foi copiado para a área de transferência.',
    color: 'success',
    icon: 'i-lucide-check',
  })
  setTimeout(() => { bannerLinkCopiado.value = false }, 2000)
}

// Mock upload helpers (substituir por chamada real à API)
function onDesktopUpload() {
  desktopImage.value = 'https://placehold.co/1920x1080/1a1a2e/ffffff?text=Desktop+Preview'
}
function onMobileUpload() {
  mobileImage.value = 'https://placehold.co/390x844/1a1a2e/ffffff?text=Mobile+Preview'
}

async function copyLink() {
  if (!linkDestino.value) return
  await navigator.clipboard.writeText(linkDestino.value)
  linkCopiado.value = true
  toast.add({
    title: 'Link Copiado',
    description: 'O link foi copiado para a área de transferência.',
    color: 'success',
    icon: 'i-lucide-check',
  })
  setTimeout(() => { linkCopiado.value = false }, 2000)
}

// ── Dirty state ───────────────────────────────────────────────────────────
const { isDirty: _isDirty, isModalOpen, bypassGuard, markDirty, markClean, save } = useSettingsDirty()

onBeforeRouteLeave(() => {
  if (_isDirty.value && !bypassGuard.value) {
    isModalOpen.value = true
    return false
  }
  bypassGuard.value = false
})

watch(
  [
    gamiAtivo, niveisComissao,
    primaryHex, palette, paletteGenerated,
    logoImage, faviconImage,
    relatorioAtivo, selectedReportFields,
    cryptoActive, cryptoUsdtTrc, cryptoBitcoin, cryptoXrp, cryptoBnb, cryptoEth, cryptoErc20,
    maxWithdrawal, conversionRate,
    pixCpf, pixCnpj, pixEmail, pixTelefone, pixAleatoria,
    transferenciaIntl, qtdMaxMetodos, revShareSubAfiliados,
    valorMinimo, valorMaximoPF, valorMaximoPJ,
    ftdsMinimos, carenciaNovo, carenciaReprovacao, carenciaPrimeiro,
    prazoMaximo, margemRisco, exigirAnexo,
    popupAtivo, linkDestino, delayExibir, exibirNovamente,
    desktopImage, mobileImage,
    ftdFotoAtivo, ftdDesktopImage, ftdMobileImage,
    bannerLink, bannerDesktopImage,
    links,
  ],
  markDirty,
  { deep: true },
)

watch([messagesConfig, ftdGoals, urlSettings, textoReferencia, servicosLinks], markDirty, { deep: true })
</script>

<template>
  <div class="-m-4 sm:-m-6 flex flex-col h-[calc(100%+2rem)] sm:h-[calc(100%+3rem)]">
    <div class="flex-1 overflow-y-auto min-h-0 p-6">
    <div class="max-w-6xl mx-auto w-full flex flex-col gap-8 pb-6">

      <!-- Navegação ────────────────────────────────────────────────────────── -->
      <div>
        <UButton
          icon="i-lucide-arrow-left"
          label="Voltar"
          color="neutral"
          variant="ghost"
          size="md"
          to="/partners/dashboard/gestor"
        />
      </div>

      <!-- Seletor mobile ────────────────────────────────────────────────────── -->
      <div class="md:hidden flex flex-col gap-1.5">
        <span class="text-sm text-(--ui-text-muted)">Selecione a seção:</span>
        <USelect
          v-model="selectedTab"
          :items="abasMobile"
          leading-icon="i-lucide-sliders-horizontal"
          size="md"
          color="neutral"
          variant="outline"
        />
      </div>

      <!-- Tabs desktop ───────────────────────────────────────────────────────── -->
      <UTabs
        v-model="selectedTab"
        :items="abas"
        variant="link"
        size="md"
        :ui="{
          list: 'hidden md:flex',
          trigger: 'shrink-0',
          label: 'whitespace-nowrap',
        }"
      >

        <!-- ── Popup ──────────────────────────────────────────────────────── -->
        <template #popup>
          <div class="flex flex-col gap-8 pt-4">

            <!-- Toggle ───────────────────────────────────────────────────── -->
            <UCard>
              <div class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-0.5">
                  <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar popup de imagem?</span>
                  <span class="text-xs text-(--ui-text-muted)">Exibe um popup ao usuário ao acessar o site</span>
                </div>
                <USwitch v-model="popupAtivo" color="primary" size="md" />
              </div>
            </UCard>

            <!-- Uploaders ────────────────────────────────────────────────── -->
            <UCard>
              <template #header>
                <span class="text-sm font-semibold text-(--ui-text-highlighted)">Imagens do popup</span>
              </template>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <!-- Desktop uploader -->
                <div class="flex flex-col gap-2">
                  <span class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide">Desktop</span>

                  <!-- Estado: imagem carregada -->
                  <div v-if="desktopImage" class="relative h-44 rounded-lg overflow-hidden">
                    <img :src="desktopImage" class="w-full h-full object-cover rounded-lg" alt="Preview desktop" />
                    <UButton
                      icon="i-lucide-trash-2"
                      color="error"
                      variant="solid"
                      size="xs"
                      class="absolute top-2 right-2 rounded-full"
                      @click="desktopImage = null; desktopFile = null"
                    />
                  </div>

                  <!-- Estado: dropzone -->
                  <div
                    v-else
                    class="relative flex flex-col items-center justify-center gap-3 h-44 rounded-lg border-2 border-dashed border-(--ui-border) bg-(--ui-bg-muted) cursor-pointer hover:border-(--ui-primary) transition-colors"
                    @click="desktopInput?.click()"
                    @dragover.prevent
                    @drop="onDrop($event, 'desktop')"
                  >
                    <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                    <div class="text-center px-4">
                      <p class="text-xs font-medium text-(--ui-text-highlighted)">Arraste ou clique para enviar</p>
                      <p class="text-xs text-(--ui-text-muted)">PNG, JPG até 5 MB — 1920 × 1080 px</p>
                    </div>
                    <input
                      ref="desktopInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="onFileSelect($event, 'desktop')"
                    />
                  </div>
                </div>

                <!-- Mobile uploader -->
                <div class="flex flex-col gap-2">
                  <span class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide">Mobile</span>

                  <!-- Estado: imagem carregada -->
                  <div v-if="mobileImage" class="relative h-44 rounded-lg overflow-hidden">
                    <img :src="mobileImage" class="w-full h-full object-cover rounded-lg" alt="Preview mobile" />
                    <UButton
                      icon="i-lucide-trash-2"
                      color="error"
                      variant="solid"
                      size="xs"
                      class="absolute top-2 right-2 rounded-full"
                      @click="mobileImage = null; mobileFile = null"
                    />
                  </div>

                  <!-- Estado: dropzone -->
                  <div
                    v-else
                    class="relative flex flex-col items-center justify-center gap-3 h-44 rounded-lg border-2 border-dashed border-(--ui-border) bg-(--ui-bg-muted) cursor-pointer hover:border-(--ui-primary) transition-colors"
                    @click="mobileInput?.click()"
                    @dragover.prevent
                    @drop="onDrop($event, 'mobile')"
                  >
                    <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                    <div class="text-center px-4">
                      <p class="text-xs font-medium text-(--ui-text-highlighted)">Arraste ou clique para enviar</p>
                      <p class="text-xs text-(--ui-text-muted)">PNG, JPG até 5 MB — 390 × 844 px</p>
                    </div>
                    <input
                      ref="mobileInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="onFileSelect($event, 'mobile')"
                    />
                  </div>
                </div>

              </div>
            </UCard>

            <!-- Link de destino ──────────────────────────────────────────── -->
            <UCard>
              <template #header>
                <span class="text-sm font-semibold text-(--ui-text-highlighted)">Link de destino</span>
              </template>

              <div class="flex flex-col gap-1.5">
                <div class="flex w-full gap-2">
                  <UInput
                    v-model="linkDestino"
                    icon="i-lucide-link"
                    placeholder="https://exemplo.com/destino"
                    size="md"
                    color="neutral"
                    variant="outline"
                    class="flex-1"
                  />
                  <UButton
                    :icon="linkCopiado ? 'i-lucide-check' : 'i-lucide-copy'"
                    color="neutral"
                    variant="outline"
                    size="md"
                    :disabled="!linkDestino"
                    :class="linkCopiado ? 'text-(--ui-success)' : ''"
                    @click="copyLink"
                  />
                </div>
                <p class="text-xs text-(--ui-text-muted)">
                  URL para onde o usuário será redirecionado ao clicar no popup.
                </p>
              </div>
            </UCard>

            <!-- Temporização ─────────────────────────────────────────────── -->
            <UCard>
              <template #header>
                <span class="text-sm font-semibold text-(--ui-text-highlighted)">Temporização</span>
              </template>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <!-- Delay -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-(--ui-text-highlighted)">
                    Delay para exibir
                  </label>
                  <div class="flex items-center gap-2">
                    <UButton
                      icon="i-lucide-minus"
                      color="neutral"
                      variant="outline"
                      size="md"
                      square
                      :disabled="delayExibir <= 0"
                      @click="delayExibir = Math.max(0, delayExibir - 1)"
                    />
                    <UInput
                      v-model="delayExibir"
                      type="number"
                      size="md"
                      color="neutral"
                      variant="outline"
                      class="w-24 text-center"
                      :min="0"
                    />
                    <UButton
                      icon="i-lucide-plus"
                      color="neutral"
                      variant="outline"
                      size="md"
                      square
                      @click="delayExibir++"
                    />
                  </div>
                  <p class="text-xs text-(--ui-text-muted)">Segundos antes de exibir o popup.</p>
                </div>

                <!-- Exibir novamente -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-(--ui-text-highlighted)">
                    Exibir novamente
                  </label>
                  <div class="flex items-center gap-2">
                    <UButton
                      icon="i-lucide-minus"
                      color="neutral"
                      variant="outline"
                      size="md"
                      square
                      :disabled="exibirNovamente <= 0"
                      @click="exibirNovamente = Math.max(0, exibirNovamente - 1)"
                    />
                    <UInput
                      v-model="exibirNovamente"
                      type="number"
                      size="md"
                      color="neutral"
                      variant="outline"
                      class="w-24 text-center"
                      :min="0"
                    />
                    <UButton
                      icon="i-lucide-plus"
                      color="neutral"
                      variant="outline"
                      size="md"
                      square
                      @click="exibirNovamente++"
                    />
                  </div>
                  <p class="text-xs text-(--ui-text-muted)">Horas até exibir novamente ao mesmo usuário.</p>
                </div>

              </div>
            </UCard>

          </div>
        </template>

        <!-- ── Parâmetros ─────────────────────────────────────────────────── -->
        <template #parametros>
          <div class="pt-4">

            <!-- Sub-navegação mobile: carrossel com setas ───────────────────── -->
            <div class="md:hidden relative flex items-center gap-1 border-b border-(--ui-border) mb-4">
              <UButton
                v-show="subTabsCanScrollLeft"
                icon="i-lucide-chevron-left"
                variant="ghost"
                color="neutral"
                size="xs"
                class="shrink-0"
                aria-label="Rolar para esquerda"
                @click="scrollSubTabs('left')"
              />
              <div
                ref="subTabsScrollRef"
                class="flex-1 flex overflow-x-auto overflow-y-hidden scroll-smooth pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:h-0"
                @scroll="updateSubTabsScroll"
              >
                <button
                  v-for="sub in subAbas"
                  :key="sub.key"
                  :data-active="activeSubTab === sub.key ? 'true' : 'false'"
                  class="shrink-0 whitespace-nowrap px-3 py-2 text-sm transition-colors border-b-2 -mb-px"
                  :class="activeSubTab === sub.key
                    ? 'border-(--ui-primary) text-(--ui-primary) font-medium'
                    : 'border-transparent text-(--ui-text-muted) hover:text-(--ui-text)'"
                  @click="activeSubTab = sub.key"
                >
                  {{ sub.label }}
                </button>
              </div>
              <UButton
                v-show="subTabsCanScrollRight"
                icon="i-lucide-chevron-right"
                variant="ghost"
                color="neutral"
                size="xs"
                class="shrink-0"
                aria-label="Rolar para direita"
                @click="scrollSubTabs('right')"
              />
            </div>

            <!-- Sub-navegação desktop: sidebar vertical ──────────────────── -->
            <div class="flex flex-col md:flex-row md:gap-6 md:min-h-[480px]">
              <div class="hidden md:block w-48 flex-shrink-0">
                <nav class="flex flex-col">
                  <button
                    v-for="sub in subAbas"
                    :key="sub.key"
                    class="flex items-center text-sm text-left px-3 py-2 transition-colors border-l-1 ui-border-muted"
                    :class="activeSubTab === sub.key
                      ? 'border-l-1 border-(--ui-primary) pl-2.5 text-(--ui-primary) font-medium'
                      : 'text-(--ui-text-muted) hover:text-(--ui-text)'"
                    @click="activeSubTab = sub.key"
                  >
                    {{ sub.label }}
                  </button>
                </nav>
              </div>

              <USeparator orientation="vertical" class="hidden md:block self-stretch" />

              <!-- Conteúdo principal -->
              <div class="flex-1 flex flex-col gap-6">

              <!-- ── Saques ──────────────────────────────────────────── -->
              <template v-if="activeSubTab === 'saques'">

                <!-- Inputs de valor -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <UFormField label="Valor Mínimo (R$)">
                    <UInput v-model="valorMinimo" placeholder="0,00" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>
                  <UFormField label="Valor Máximo PIX PF (R$)">
                    <UInput v-model="valorMaximoPF" placeholder="0,00" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>
                  <UFormField label="Valor Máximo PIX PJ (R$)">
                    <UInput v-model="valorMaximoPJ" placeholder="0,00" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>
                </div>

                <!-- Steppers em grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">FTDs Mínimos Exigidos para Saque</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="ftdsMinimos <= 0" @click="ftdsMinimos = Math.max(0, ftdsMinimos - 1)" />
                        <UInput v-model="ftdsMinimos" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="ftdsMinimos++" />
                      </div>
                    </div>
                  </UCard>

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Carência para Novo Saque Após Aprovação (Dias)</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="carenciaNovo <= 0" @click="carenciaNovo = Math.max(0, carenciaNovo - 1)" />
                        <UInput v-model="carenciaNovo" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="carenciaNovo++" />
                      </div>
                    </div>
                  </UCard>

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Carência para Novo Saque Após Reprovação (Dias)</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="carenciaReprovacao <= 0" @click="carenciaReprovacao = Math.max(0, carenciaReprovacao - 1)" />
                        <UInput v-model="carenciaReprovacao" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="carenciaReprovacao++" />
                      </div>
                    </div>
                  </UCard>

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Carência para Primeiro Saque (Dias)</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="carenciaPrimeiro <= 0" @click="carenciaPrimeiro = Math.max(0, carenciaPrimeiro - 1)" />
                        <UInput v-model="carenciaPrimeiro" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="carenciaPrimeiro++" />
                      </div>
                    </div>
                  </UCard>

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Prazo Máximo para Análise (Horas)</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="prazoMaximo <= 0" @click="prazoMaximo = Math.max(0, prazoMaximo - 1)" />
                        <UInput v-model="prazoMaximo" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="prazoMaximo++" />
                      </div>
                    </div>
                  </UCard>

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Margem de Risco para Aprovação (%)</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="margemRisco <= 0" @click="margemRisco = Math.max(0, margemRisco - 1)" />
                        <UInput v-model="margemRisco" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="margemRisco++" />
                      </div>
                    </div>
                  </UCard>

                </div>

                <!-- Toggle de anexo -->
                <UCard>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Exigir Anexo de Invoice/Contrato para Solicitação de Saque?</span>
                      <span class="text-xs text-(--ui-text-muted)">Quando ativo, o afiliado precisará enviar um documento junto ao pedido de saque.</span>
                    </div>
                    <USwitch v-model="exigirAnexo" color="primary" size="md" />
                  </div>
                </UCard>

              </template>

              <!-- ── Métodos ─────────────────────────────────────────── -->
              <template v-else-if="activeSubTab === 'metodos'">

                <!-- Chaves Pix aceitas -->
                <div>
                  <p class="text-xs font-medium text-(--ui-text-muted) mb-3 uppercase tracking-wide">Chaves Pix aceitas</p>
                  <div class="flex flex-row flex-wrap gap-6">
                    <UCheckbox v-model="pixCpf"       label="CPF"       size="md" />
                    <UCheckbox v-model="pixCnpj"      label="CNPJ"      size="md" />
                    <UCheckbox v-model="pixEmail"     label="E-mail"    size="md" />
                    <UCheckbox v-model="pixTelefone"  label="Telefone"  size="md" />
                    <UCheckbox v-model="pixAleatoria" label="Aleatória" size="md" />
                  </div>
                </div>

                <!-- Transferências bancárias -->
                <div class="mt-8">
                  <p class="text-xs font-medium text-(--ui-text-muted) mb-3 uppercase tracking-wide">Transferências bancárias</p>
                  <UCheckbox v-model="transferenciaIntl" label="Transferência internacional" size="md" />
                </div>

                <!-- Steppers -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Quantidade Máxima de Métodos de Recebimento</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="qtdMaxMetodos <= 0" @click="qtdMaxMetodos = Math.max(0, qtdMaxMetodos - 1)" />
                        <UInput v-model="qtdMaxMetodos" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="qtdMaxMetodos++" />
                      </div>
                    </div>
                  </UCard>

                  <UCard>
                    <div class="flex flex-col gap-3">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">RevShare: Comissão sobre Sub-Afiliados (%)</span>
                      <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="revShareSubAfiliados <= 0" @click="revShareSubAfiliados = Math.max(0, revShareSubAfiliados - 1)" />
                        <UInput v-model="revShareSubAfiliados" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                        <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="revShareSubAfiliados++" />
                      </div>
                    </div>
                  </UCard>

                </div>

              </template>

              <!-- ── Criptomoeda ──────────────────────────────────────── -->
              <template v-else-if="activeSubTab === 'criptomoeda'">

                <!-- Master toggle -->
                <UCard>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar método de recebimento por criptomoeda</span>
                      <span class="text-xs text-(--ui-text-muted)">Permite que afiliados recebam saques em criptomoeda.</span>
                    </div>
                    <USwitch v-model="cryptoActive" color="primary" size="md" />
                  </div>
                </UCard>

                <!-- Configurações de criptomoeda -->
                <div class="flex flex-col gap-6">

                  <!-- Chaves aceitas -->
                  <div class="mt-2">
                    <p class="text-xs font-medium text-(--ui-text-muted) mb-3 uppercase tracking-wide">Chaves Criptomoeda aceitas</p>
                    <div class="flex flex-row flex-wrap gap-6">
                      <UCheckbox v-model="cryptoUsdtTrc" label="USDT TRC20"  size="md" />
                      <UCheckbox v-model="cryptoBitcoin" label="Bitcoin"     size="md" />
                      <UCheckbox v-model="cryptoXrp"     label="XRP"         size="md" />
                      <UCheckbox v-model="cryptoBnb"     label="BNB"         size="md" />
                      <UCheckbox v-model="cryptoEth"     label="Ethereum"    size="md" />
                      <UCheckbox v-model="cryptoErc20"   label="ERC-20"      size="md" />
                    </div>
                  </div>

                  <!-- Valor máximo de saque -->
                  <div class="mt-8">
                    <p class="text-xs font-medium text-(--ui-text-muted) mb-3 uppercase tracking-wide">Valor Máximo de Saque para Criptomoeda *</p>
                    <UInput
                      v-model="maxWithdrawal"
                      placeholder="R$ 49.999,00"
                      size="md"
                      color="neutral"
                      variant="outline"
                      class="max-w-md"
                    />
                  </div>

                  <!-- Taxa de conversão -->
                  <div class="mt-8">
                    <p class="text-xs font-medium text-(--ui-text-muted) mb-3 uppercase tracking-wide">Taxa extra de conversão do dólar (%) *</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <UCard>
                        <div class="flex flex-col gap-3">
                          <span class="text-sm font-medium text-(--ui-text-highlighted)">Taxa extra de conversão do dólar (%)</span>
                          <div class="flex items-center gap-2">
                            <UButton icon="i-lucide-minus" color="neutral" variant="outline" size="md" square :disabled="conversionRate <= 0" @click="conversionRate = Math.max(0, conversionRate - 1)" />
                            <UInput v-model="conversionRate" type="number" size="md" color="neutral" variant="outline" class="w-20 [&_input]:text-center" :min="0" />
                            <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="md" square @click="conversionRate++" />
                          </div>
                        </div>
                      </UCard>
                    </div>
                  </div>

                </div>

              </template>

              <!-- ── Relatório ────────────────────────────────────────── -->
              <template v-else-if="activeSubTab === 'relatorio'">

                <!-- Master switch -->
                <UCard>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Personalizar Relatório do Afiliado</span>
                      <span class="text-xs text-(--ui-text-muted)">Escolha quais campos estarão disponíveis no relatório.</span>
                    </div>
                    <USwitch v-model="relatorioAtivo" color="primary" size="md" />
                  </div>
                </UCard>

                <!-- Action bar -->
                <div class="flex items-center gap-2">
                  <UButton label="Selecionar todos" size="xs" variant="ghost" color="primary" @click="selectAllReport" />
                  <UButton label="Limpar" size="xs" variant="ghost" color="neutral" @click="clearReport" />
                </div>

                <!-- Categorized grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div v-for="group in reportGroups" :key="group.title">
                    <span class="text-[10px] uppercase tracking-widest text-(--ui-text-muted) mb-4 block">{{ group.title }}</span>
                    <div class="flex flex-col gap-1">
                      <label
                        v-for="field in group.fields"
                        :key="field"
                        class="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors hover:bg-(--ui-bg-muted)"
                      >
                        <UCheckbox
                          :model-value="selectedReportFields.includes(field as ReportField)"
                          size="md"
                          @update:model-value="(v: boolean) => {
                            if (v) selectedReportFields.push(field as ReportField)
                            else selectedReportFields.splice(selectedReportFields.indexOf(field as ReportField), 1)
                          }"
                        />
                        <span class="text-sm text-(--ui-text-highlighted)">{{ group.labels[field as keyof typeof group.labels] }}</span>
                      </label>
                    </div>
                  </div>
                </div>

              </template>

              <!-- ── Mensagens ────────────────────────────────────────── -->
              <template v-else-if="activeSubTab === 'mensagens'">
                <div class="space-y-6">

                  <!-- Seção A: Bloqueio/Recusa -->
                  <div class="w-full border border-(--ui-border) rounded-xl p-6 flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar Mensagens Personalizadas de Bloqueio/Recusa?</span>
                        <span class="text-xs text-(--ui-text-muted)">Mensagem exibida ao afiliado quando um saque for bloqueado ou recusado.</span>
                      </div>
                      <USwitch v-model="messagesConfig.bloqueio.ativo" color="primary" size="md" />
                    </div>
                    <UTabs :items="langTabs" variant="link" size="md">
                      <template #pt>
                        <div class="pt-3 flex flex-col gap-1">
                          <UTextarea v-model="messagesConfig.bloqueio.pt" :rows="5" size="md" color="neutral" variant="outline" placeholder="Mensagem em português..." :maxlength="500" />
                          <span class="text-xs text-(--ui-text-muted) self-end">{{ messagesConfig.bloqueio.pt.length }}/500</span>
                        </div>
                      </template>
                      <template #en>
                        <div class="pt-3 flex flex-col gap-1">
                          <UTextarea v-model="messagesConfig.bloqueio.en" :rows="5" size="md" color="neutral" variant="outline" placeholder="Message in English..." :maxlength="500" />
                          <span class="text-xs text-(--ui-text-muted) self-end">{{ messagesConfig.bloqueio.en.length }}/500</span>
                        </div>
                      </template>
                      <template #es>
                        <div class="pt-3 flex flex-col gap-1">
                          <UTextarea v-model="messagesConfig.bloqueio.es" :rows="5" size="md" color="neutral" variant="outline" placeholder="Mensaje en español..." :maxlength="500" />
                          <span class="text-xs text-(--ui-text-muted) self-end">{{ messagesConfig.bloqueio.es.length }}/500</span>
                        </div>
                      </template>
                    </UTabs>
                  </div>

                  <!-- Seção B: Termos e Políticas -->
                  <div class="w-full border border-(--ui-border) rounded-xl p-6 flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar e Exibir Termos e Políticas Legais?</span>
                        <span class="text-xs text-(--ui-text-muted)">Texto exibido na área de termos e condições do programa de afiliados.</span>
                      </div>
                      <USwitch v-model="messagesConfig.termos.ativo" color="primary" size="md" />
                    </div>
                    <UTabs :items="langTabs" variant="link" size="md">
                      <template #pt>
                        <div class="pt-3 flex flex-col gap-1">
                          <UTextarea v-model="messagesConfig.bloqueio.pt" :rows="5" size="md" color="neutral" variant="outline" placeholder="Termos e Condições do Programa de Afiliados\n\nEste é o último conjunto de textos que precisa de refinamento...\n\nOTIMIZAÇÃO DE MICROCOPY UX...\n\nI. GESTÃO DE MENSAGENS DE BLOQUEIO E DECLÍNIO...\n\nII. GESTÃO DE TERMOS E CONDIÇÕES...\n\nIII. MENSAGENS PERSONALIZADAS DE SAQUE...\n\nIV. GESTÃO DE DOCUMENTOS LEGAIS...\n\nTRANSCRIÇÃO DO EXEMPLO DE TERMOS E CONDIÇÕES\n\nTermos e condições do Programa de Afiliados 7K PARTNERS\n1. SOBRE NÓS\n1.1 Este Contrato contém os termos e condições..." :maxlength="500" />
                        </div>
                      </template>
                      <template #en>
                        <div class="pt-3 flex flex-col gap-1">
                          <UTextarea v-model="messagesConfig.termos.en" :rows="5" size="md" color="neutral" variant="outline" placeholder="Terms in English..." :maxlength="500" />
                        </div>
                      </template>
                      <template #es>
                        <div class="pt-3 flex flex-col gap-1">
                          <UTextarea v-model="messagesConfig.termos.es" :rows="5" size="md" color="neutral" variant="outline" placeholder="Términos en español..." :maxlength="500" />
                        </div>
                      </template>
                    </UTabs>
                  </div>

                  <!-- Seção C: Requisito de Saque (FTD) -->
                  <div class="w-full border border-(--ui-border) rounded-xl p-6 flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar Mensagens de Requisito de Saque (FTD)?</span>
                        <span class="text-xs text-(--ui-text-muted)">Mensagens exibidas ao afiliado sobre os requisitos mínimos para realizar saques.</span>
                      </div>
                      <USwitch v-model="messagesConfig.ftd.ativo" color="primary" size="md" />
                    </div>
                    <UTabs :items="langTabs" variant="link" size="md">
                      <template #pt>
                        <div class="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <UFormField label="Mensagem 1 (Primeiro Saque)">
                            <UInput v-model="messagesConfig.ftd.msg1.pt" size="md" color="neutral" variant="outline" placeholder="Requisito Mínimo: {{min_ftd}} FTDs..." class="w-full" />
                          </UFormField>
                          <UFormField label="Mensagem 2 (Saques Recorrentes)">
                            <UInput v-model="messagesConfig.ftd.msg2.pt" size="md" color="neutral" variant="outline" placeholder="Valor Mínimo para Saques: {{min_amount}}" class="w-full" />
                          </UFormField>
                        </div>
                      </template>
                      <template #en>
                        <div class="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <UFormField label="Message 1 (First Withdrawal)">
                            <UInput v-model="messagesConfig.ftd.msg1.en" size="md" color="neutral" variant="outline" placeholder="Minimum Requirement: {{min_ftd}} FTDs..." class="w-full" />
                          </UFormField>
                          <UFormField label="Message 2 (Recurring Withdrawals)">
                            <UInput v-model="messagesConfig.ftd.msg2.en" size="md" color="neutral" variant="outline" placeholder="Minimum Withdrawal Amount: {{min_amount}}" class="w-full" />
                          </UFormField>
                        </div>
                      </template>
                      <template #es>
                        <div class="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <UFormField label="Mensaje 1 (Primer Retiro)">
                            <UInput v-model="messagesConfig.ftd.msg1.es" size="md" color="neutral" variant="outline" placeholder="Requisito Mínimo: {{min_ftd}} FTDs..." class="w-full" />
                          </UFormField>
                          <UFormField label="Mensaje 2 (Retiros Recurrentes)">
                            <UInput v-model="messagesConfig.ftd.msg2.es" size="md" color="neutral" variant="outline" placeholder="Monto Mínimo de Retiro: {{min_amount}}" class="w-full" />
                          </UFormField>
                        </div>
                      </template>
                    </UTabs>
                  </div>

                </div>
              </template>

            </div>
            </div>
          </div>
        </template>

        <!-- ── Gamificação ────────────────────────────────────────────────── -->
        <template #gamificacao>
          <div class="pt-4">

            <!-- Sub-navegação mobile: carrossel com setas ───────────────────── -->
            <div class="md:hidden relative flex items-center gap-1 border-b border-(--ui-border) mb-4">
              <UButton
                v-show="gamiCanScrollLeft"
                icon="i-lucide-chevron-left"
                variant="ghost"
                color="neutral"
                size="xs"
                class="shrink-0"
                aria-label="Rolar para esquerda"
                @click="scrollGamiTabs('left')"
              />
              <div
                ref="gamiScrollRef"
                class="flex-1 flex overflow-x-auto overflow-y-hidden scroll-smooth pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:h-0"
                @scroll="updateGamiScroll"
              >
                <button
                  v-for="sub in gamiSubAbas"
                  :key="sub.key"
                  :data-active="activeGamiTab === sub.key ? 'true' : 'false'"
                  class="shrink-0 whitespace-nowrap px-3 py-2 text-sm transition-colors border-b-2 -mb-px"
                  :class="activeGamiTab === sub.key
                    ? 'border-(--ui-primary) text-(--ui-primary) font-medium'
                    : 'border-transparent text-(--ui-text-muted) hover:text-(--ui-text)'"
                  @click="activeGamiTab = sub.key"
                >
                  {{ sub.label }}
                </button>
              </div>
              <UButton
                v-show="gamiCanScrollRight"
                icon="i-lucide-chevron-right"
                variant="ghost"
                color="neutral"
                size="xs"
                class="shrink-0"
                aria-label="Rolar para direita"
                @click="scrollGamiTabs('right')"
              />
            </div>

            <!-- Sub-navegação desktop: sidebar vertical ──────────────────── -->
            <div class="flex flex-col md:flex-row md:gap-6 md:min-h-[480px]">
              <div class="hidden md:block w-48 flex-shrink-0">
                <nav class="flex flex-col">
                  <button
                    v-for="sub in gamiSubAbas"
                    :key="sub.key"
                    class="flex items-center text-sm text-left px-3 py-2 transition-colors border-l-1 ui-border-muted"
                    :class="activeGamiTab === sub.key
                      ? 'border-l-1 border-(--ui-primary) pl-2.5 text-(--ui-primary) font-medium'
                      : 'text-(--ui-text-muted) hover:text-(--ui-text)'"
                    @click="activeGamiTab = sub.key"
                  >
                    {{ sub.label }}
                  </button>
                </nav>
              </div>

              <USeparator orientation="vertical" class="hidden md:block self-stretch" />

              <!-- Conteúdo principal -->
              <div class="flex-1 flex flex-col gap-6">

              <!-- ── Comissão ────────────────────────────────────────── -->
              <template v-if="activeGamiTab === 'comissao'">

                <!-- Master switch -->
                <UCard>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar Gamificação no Sistema</span>
                      <span class="text-xs text-(--ui-text-muted)">Habilita o sistema de níveis e recompensas para os afiliados.</span>
                    </div>
                    <USwitch v-model="gamiAtivo" color="primary" size="md" />
                  </div>
                </UCard>

                <!-- Tabela inline-edit -->
                <div class="border border-(--ui-border) rounded-xl overflow-hidden">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b border-(--ui-border) bg-(--ui-bg-muted)">
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide w-44">Ganhos Acumulados</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Nome (PT)</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Nome (EN)</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Nome (ES)</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide w-44">Ícone</th>
                        <th class="px-4 py-3 w-12" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="nivel in niveisComissao"
                        :key="nivel.id"
                        class="border-b border-(--ui-border) last:border-0 hover:bg-(--ui-bg-muted) transition-colors"
                      >
                        <!-- Ganhos: badge fixo no nível inicial, input nos demais -->
                        <td class="px-3 py-2">
                          <UBadge
                            v-if="nivel.id === INITIAL_NIVEL_ID"
                            label="Nível inicial"
                            color="warning"
                            variant="subtle"
                            size="md"
                          />
                          <UInput
                            v-else
                            v-model="nivel.ganhosAcumulados"
                            type="number"
                            step="0.01"
                            :min="0"
                            placeholder="0,00"
                            size="md"
                            color="neutral"
                            variant="outline"
                          >
                            <template #leading>
                              <span class="text-xs text-(--ui-text-muted) select-none">R$</span>
                            </template>
                          </UInput>
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="nivel.nomePt" placeholder="Português" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="nivel.nomeEn" placeholder="English" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="nivel.nomeEs" placeholder="Español" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <USelectMenu
                            v-model="nivel.icone"
                            :items="iconOptions"
                            value-key="value"
                            size="md"
                            color="neutral"
                            variant="outline"
                            class="w-full"
                          >
                            <template #leading>
                              <UIcon :name="nivel.icone" class="w-4 h-4 text-(--ui-text-muted)" />
                            </template>
                            <template #item="{ item }">
                              <div class="flex items-center gap-2">
                                <UIcon :name="item.value" class="w-4 h-4 text-(--ui-text-muted)" />
                                <span class="text-sm text-(--ui-text-highlighted)">{{ item.label }}</span>
                              </div>
                            </template>
                          </USelectMenu>
                        </td>
                        <td class="px-3 py-2">
                          <UButton
                            v-if="nivel.id !== INITIAL_NIVEL_ID"
                            icon="i-lucide-trash-2"
                            color="error"
                            variant="ghost"
                            size="md"
                            square
                            @click="removerNivel(nivel.id)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Alerta mínimo 3 níveis -->
                <UAlert
                  v-if="niveisComissao.length < 3"
                  icon="i-lucide-triangle-alert"
                  color="warning"
                  variant="subtle"
                  description="A gamificação precisa ter no mínimo 3 níveis."
                />

                <!-- Adicionar nível -->
                <div class="flex justify-start">
                  <UButton
                    label="Adicionar nível"
                    icon="i-lucide-plus"
                    color="neutral"
                    variant="outline"
                    size="md"
                    @click="adicionarNivel"
                  />
                </div>

              </template>

              <!-- ── FTD ─────────────────────────────────────────────── -->
              <template v-else-if="activeGamiTab === 'ftd'">

                <!-- Switches -->
                <UCard>
                  <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar gamificação no sistema</span>
                        <span class="text-xs text-(--ui-text-muted)">Habilita o sistema de níveis e recompensas para os afiliados.</span>
                      </div>
                      <USwitch v-model="gamiAtivo" color="primary" size="md" />
                    </div>
                  </div>
                </UCard>

                <!-- Tabela FTD -->
                <div class="border border-(--ui-border-accented) rounded-xl overflow-hidden">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b border-(--ui-border) bg-(--ui-bg-muted)">
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide w-44">Ganhos Acumulados</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Nome (PT)</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Nome (EN)</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Nome (ES)</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide w-44">Ícone</th>
                        <th class="px-4 py-3 w-12" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="nivel in niveisComissao"
                        :key="nivel.id"
                        class="border-b border-(--ui-border) last:border-0 hover:bg-(--ui-bg-muted) transition-colors"
                      >
                        <td class="px-3 py-2">
                          <UBadge
                            v-if="nivel.id === INITIAL_NIVEL_ID"
                            label="Nível inicial"
                            color="warning"
                            variant="subtle"
                            size="md"
                          />
                          <UInput
                            v-else
                            :model-value="ftdGoals[nivel.id]"
                            type="number"
                            :min="0"
                            size="md"
                            color="neutral"
                            variant="outline"
                            class="w-full"
                            @update:model-value="(v) => { ftdGoals[nivel.id] = Number(v) }"
                          >
                            <template #leading>
                              <span class="text-xs text-(--ui-text-muted) select-none">$</span>
                            </template>
                          </UInput>
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="nivel.nomePt" placeholder="Português" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="nivel.nomeEn" placeholder="English" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="nivel.nomeEs" placeholder="Español" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <USelectMenu v-model="nivel.icone" :items="iconOptions" value-key="value" size="md" color="neutral" variant="outline" class="w-full">
                            <template #leading>
                              <UIcon :name="nivel.icone || 'i-lucide-award'" class="w-4 h-4 text-(--ui-text-muted)" />
                            </template>
                            <template #item="{ item }">
                              <div class="flex items-center gap-2">
                                <UIcon :name="item.value" class="w-4 h-4 text-(--ui-text-muted)" />
                                <span class="text-sm text-(--ui-text-highlighted)">{{ item.label }}</span>
                              </div>
                            </template>
                          </USelectMenu>
                        </td>
                        <td class="px-3 py-2">
                          <UButton
                            v-if="nivel.id !== INITIAL_NIVEL_ID"
                            icon="i-lucide-trash-2"
                            color="error"
                            variant="ghost"
                            size="md"
                            square
                            @click="removerNivel(nivel.id)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Alerta + Adicionar nível -->
                <UAlert
                  v-if="niveisComissao.length < 3"
                  icon="i-lucide-triangle-alert"
                  color="warning"
                  variant="subtle"
                  description="A gamificação precisa ter no mínimo 3 níveis."
                />
                <div class="flex justify-start">
                  <UButton label="Adicionar nível" icon="i-lucide-plus" color="neutral" variant="outline" size="md" @click="adicionarNivel" />
                </div>

                <!-- Upload de fotos de gamificação -->
                <div class="border border-(--ui-border-accented) rounded-xl p-6 flex flex-col gap-4">
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-(--ui-text-highlighted)">Ativar foto de gamificação?</span>
                      <span class="text-xs text-(--ui-text-muted)">Exibe imagens personalizadas para cada nível de gamificação.</span>
                    </div>
                    <USwitch v-model="ftdFotoAtivo" color="primary" size="md" />
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <!-- Desktop -->
                    <div class="flex flex-col gap-2">
                      <span class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide">Desktop</span>
                      <div v-if="ftdDesktopImage" class="relative h-44 rounded-lg overflow-hidden">
                        <img :src="ftdDesktopImage" class="w-full h-full object-cover rounded-lg" alt="Preview desktop" />
                        <UButton icon="i-lucide-trash-2" color="error" variant="solid" size="xs" class="absolute top-2 right-2 rounded-full" @click="ftdDesktopImage = null" />
                      </div>
                      <div
                        v-else
                        class="relative flex flex-col items-center justify-center gap-3 h-44 rounded-xl border-2 border-dashed border-(--ui-border-accented) bg-(--ui-bg-elevated) cursor-pointer hover:border-(--ui-primary) transition-colors"
                        @click="ftdDesktopInput?.click()"
                        @dragover.prevent
                        @drop="onFtdDrop($event, 'desktop')"
                      >
                        <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                        <div class="text-center px-4">
                          <p class="text-xs font-medium text-(--ui-text-highlighted)">Arraste ou clique para enviar</p>
                          <p class="text-xs text-(--ui-text-muted)">PNG, JPG até 5 MB — 1920 × 1080 px</p>
                        </div>
                        <input ref="ftdDesktopInput" type="file" accept="image/*" class="hidden" @change="onFtdFileSelect($event, 'desktop')" />
                      </div>
                    </div>

                    <!-- Mobile -->
                    <div class="flex flex-col gap-2">
                      <span class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide">Mobile</span>
                      <div v-if="ftdMobileImage" class="relative h-44 rounded-lg overflow-hidden">
                        <img :src="ftdMobileImage" class="w-full h-full object-cover rounded-lg" alt="Preview mobile" />
                        <UButton icon="i-lucide-trash-2" color="error" variant="solid" size="xs" class="absolute top-2 right-2 rounded-full" @click="ftdMobileImage = null" />
                      </div>
                      <div
                        v-else
                        class="relative flex flex-col items-center justify-center gap-3 h-44 rounded-xl border-2 border-dashed border-(--ui-border-accented) bg-(--ui-bg-elevated) cursor-pointer hover:border-(--ui-primary) transition-colors"
                        @click="ftdMobileInput?.click()"
                        @dragover.prevent
                        @drop="onFtdDrop($event, 'mobile')"
                      >
                        <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                        <div class="text-center px-4">
                          <p class="text-xs font-medium text-(--ui-text-highlighted)">Arraste ou clique para enviar</p>
                          <p class="text-xs text-(--ui-text-muted)">PNG, JPG até 5 MB — 390 × 844 px</p>
                        </div>
                        <input ref="ftdMobileInput" type="file" accept="image/*" class="hidden" @change="onFtdFileSelect($event, 'mobile')" />
                      </div>
                    </div>

                  </div>
                </div>

              </template>

            </div>
            </div>
          </div>
        </template>

        <!-- ── Aparência ──────────────────────────────────────────────────── -->
        <template #aparencia>
          <div class="pt-4">

            <!-- Sub-navegação mobile: carrossel com setas ───────────────────── -->
            <div class="md:hidden relative flex items-center gap-1 border-b border-(--ui-border) mb-4">
              <UButton
                v-show="aparenciaCanScrollLeft"
                icon="i-lucide-chevron-left"
                variant="ghost"
                color="neutral"
                size="xs"
                class="shrink-0"
                aria-label="Rolar para esquerda"
                @click="scrollAparenciaTabs('left')"
              />
              <div
                ref="aparenciaScrollRef"
                class="flex-1 flex overflow-x-auto overflow-y-hidden scroll-smooth pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:h-0"
                @scroll="updateAparenciaScroll"
              >
                <button
                  v-for="sub in aparenciaSubAbas"
                  :key="sub.key"
                  :data-active="activeAparenciaTab === sub.key ? 'true' : 'false'"
                  class="shrink-0 whitespace-nowrap px-3 py-2 text-sm transition-colors border-b-2 -mb-px"
                  :class="activeAparenciaTab === sub.key
                    ? 'border-(--ui-primary) text-(--ui-primary) font-medium'
                    : 'border-transparent text-(--ui-text-muted) hover:text-(--ui-text)'"
                  @click="activeAparenciaTab = sub.key"
                >
                  {{ sub.label }}
                </button>
              </div>
              <UButton
                v-show="aparenciaCanScrollRight"
                icon="i-lucide-chevron-right"
                variant="ghost"
                color="neutral"
                size="xs"
                class="shrink-0"
                aria-label="Rolar para direita"
                @click="scrollAparenciaTabs('right')"
              />
            </div>

            <!-- Sub-navegação desktop: sidebar vertical ──────────────────── -->
            <div class="flex flex-col md:flex-row md:gap-6 md:min-h-[480px]">
              <div class="hidden md:block w-48 flex-shrink-0">
                <nav class="flex flex-col">
                  <button
                    v-for="sub in aparenciaSubAbas"
                    :key="sub.key"
                    class="flex items-center text-sm text-left px-3 py-2 transition-colors border-l-1 ui-border-muted"
                    :class="activeAparenciaTab === sub.key
                      ? 'border-l-1 border-(--ui-primary) pl-2.5 text-(--ui-primary) font-medium'
                      : 'text-(--ui-text-muted) hover:text-(--ui-text)'"
                    @click="activeAparenciaTab = sub.key"
                  >
                    {{ sub.label }}
                  </button>
                </nav>
              </div>

              <USeparator orientation="vertical" class="hidden md:block self-stretch" />

              <!-- Conteúdo -->
              <div class="flex-1 flex flex-col gap-6">

              <!-- ── Logo ───────────────────────────────────────────────── -->
              <template v-if="activeAparenciaTab === 'logo'">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Logo -->
                  <div class="flex flex-col gap-2">
                    <span class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide">Logo</span>
                    <div v-if="logoImage" class="relative h-44 rounded-xl overflow-hidden">
                      <img :src="logoImage" class="w-full h-full object-contain bg-(--ui-bg-muted) rounded-xl" alt="Logo preview" />
                      <UButton icon="i-lucide-trash-2" color="error" variant="solid" size="xs" class="absolute top-2 right-2 rounded-full" @click="logoImage = null" />
                    </div>
                    <div
                      v-else
                      class="flex flex-col items-center justify-center gap-3 h-44 rounded-xl border-2 border-dashed border-(--ui-border-accented) bg-(--ui-bg-elevated) cursor-pointer hover:border-(--ui-primary) transition-colors"
                      @click="logoInput?.click()"
                      @dragover.prevent
                      @drop="onAparenciaDrop($event, 'logo')"
                    >
                      <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                      <div class="text-center px-4">
                        <p class="text-xs font-medium text-(--ui-text-highlighted)">Envie sua imagem aqui</p>
                        <p class="text-xs text-(--ui-text-muted)">SVG, PNG, JPG ou GIF (máx. 2 MB)</p>
                      </div>
                      <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onAparenciaFileSelect($event, 'logo')" />
                    </div>
                  </div>

                  <!-- Favicon -->
                  <div class="flex flex-col gap-2">
                    <span class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide">Favicon</span>
                    <div v-if="faviconImage" class="relative h-44 rounded-xl overflow-hidden">
                      <img :src="faviconImage" class="w-full h-full object-contain bg-(--ui-bg-muted) rounded-xl" alt="Favicon preview" />
                      <UButton icon="i-lucide-trash-2" color="error" variant="solid" size="xs" class="absolute top-2 right-2 rounded-full" @click="faviconImage = null" />
                    </div>
                    <div
                      v-else
                      class="flex flex-col items-center justify-center gap-3 h-44 rounded-xl border-2 border-dashed border-(--ui-border-accented) bg-(--ui-bg-elevated) cursor-pointer hover:border-(--ui-primary) transition-colors"
                      @click="faviconInput?.click()"
                      @dragover.prevent
                      @drop="onAparenciaDrop($event, 'favicon')"
                    >
                      <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                      <div class="text-center px-4">
                        <p class="text-xs font-medium text-(--ui-text-highlighted)">Envie sua imagem aqui</p>
                        <p class="text-xs text-(--ui-text-muted)">SVG, PNG, JPG ou GIF (máx. 2 MB)</p>
                      </div>
                      <input ref="faviconInput" type="file" accept="image/*" class="hidden" @change="onAparenciaFileSelect($event, 'favicon')" />
                    </div>
                  </div>

                </div>
              </template>

              <!-- ── Cores ──────────────────────────────────────────────── -->
              <!--
              <template v-else-if="activeAparenciaTab === 'cores'">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <UFormField label="Cor Primária">
                    <div class="flex items-center gap-2">
                      <input v-model="corPrimaria" type="color" class="w-10 h-10 rounded-lg cursor-pointer border border-(--ui-border) bg-transparent p-0.5" />
                      <UInput v-model="corPrimaria" size="md" color="neutral" variant="outline" class="flex-1 font-mono uppercase" placeholder="#6366f1" />
                    </div>
                  </UFormField>

                  <UFormField label="Cor Secundária">
                    <div class="flex items-center gap-2">
                      <input v-model="corSecundaria" type="color" class="w-10 h-10 rounded-lg cursor-pointer border border-(--ui-border) bg-transparent p-0.5" />
                      <UInput v-model="corSecundaria" size="md" color="neutral" variant="outline" class="flex-1 font-mono uppercase" placeholder="#8b5cf6" />
                    </div>
                  </UFormField>

                  <UFormField label="Background">
                    <div class="flex items-center gap-2">
                      <input v-model="corBackground" type="color" class="w-10 h-10 rounded-lg cursor-pointer border border-(--ui-border) bg-transparent p-0.5" />
                      <UInput v-model="corBackground" size="md" color="neutral" variant="outline" class="flex-1 font-mono uppercase" placeholder="#09090b" />
                    </div>
                  </UFormField>

                </div>
              </template>
              -->
              <template v-else-if="activeAparenciaTab === 'cores'">
                <div class="flex flex-col gap-4">

                  <!-- ── Identidade Visual ────────────────────────────────── -->
                  <UCard>
                    <div class="flex flex-col gap-5">

                      <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-medium text-(--ui-text-highlighted)">Identidade Visual</span>
                        <p class="text-sm text-(--ui-text-muted)">
                          Defina a cor primária da sua plataforma. Esta cor será aplicada em botões, links e elementos de destaque.
                        </p>
                      </div>

                      <div class="flex flex-col sm:flex-row sm:items-end gap-6">

                        <UFormField label="Preencha a sua cor" class="flex-1">
                          <UInput
                            v-model="primaryHex"
                            placeholder="#21BB75"
                            size="md"
                            color="neutral"
                            variant="outline"
                            class="w-full font-mono uppercase"
                          >
                            <template #leading>
                              <span
                                class="size-4 rounded-full shrink-0 ring-1 ring-(--ui-border)"
                                :style="{ backgroundColor: primaryHex }"
                              />
                            </template>
                          </UInput>
                        </UFormField>

                        <div class="hidden sm:flex items-center h-9 shrink-0">
                          <span class="text-sm text-(--ui-text-muted)">ou</span>
                        </div>

                        <UFormField label="Escolha a cor" class="flex-1">
                          <UPopover :content="{ side: 'bottom', align: 'end' }">
                            <div
                              class="h-9 w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity ring-1 ring-(--ui-border)"
                              :style="{ backgroundColor: primaryHex }"
                            />
                            <template #content>
                              <UColorPicker v-model="primaryHex" format="hex" class="p-2" />
                            </template>
                          </UPopover>
                        </UFormField>

                      </div>

                      <div class="flex justify-end">
                        <UButton
                          color="primary"
                          variant="solid"
                          size="md"
                          class="w-full md:w-auto justify-center"
                          @click="gerarPaleta"
                        >
                          <UIcon name="i-lucide-sparkles" class="size-5 shrink-0" />
                          Gerar Paleta Inteligente
                        </UButton>
                      </div>

                    </div>
                  </UCard>

                  <!-- ── Paleta Inteligente (único card, condicional) ──────── -->
                  <UCard v-if="paletteGenerated">
                    <div class="flex flex-col gap-5">

                      <div class="flex flex-col gap-0.5">
                        <span class="text-sm font-medium text-(--ui-text-highlighted)">Paleta Inteligente</span>
                        <p class="text-sm text-(--ui-text-muted)">
                          Cores complementares geradas com base na cor primária.
                        </p>
                      </div>

                      <div class="flex flex-col gap-4">

                        <!-- Secundária -->
                        <div class="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                          <UFormField class="flex-1 min-w-0">
                            <template #label>
                              <span class="flex items-center gap-2">
                                Secundária
                                <span
                                  class="text-xs px-2 py-0.5 rounded font-mono"
                                  :class="badgeClass(colord(palette.secondary).contrast(palette.background))"
                                >{{ badgeLabel(colord(palette.secondary).contrast(palette.background)) }}</span>
                              </span>
                            </template>
                            <UInput v-model="palette.secondary" size="md" color="neutral" variant="outline" class="w-full font-mono uppercase">
                              <template #leading>
                                <span class="size-4 rounded-full shrink-0 ring-1 ring-(--ui-border)" :style="{ backgroundColor: palette.secondary }" />
                              </template>
                            </UInput>
                          </UFormField>
                          <div class="hidden sm:flex items-center h-9 shrink-0">
                            <span class="text-sm text-(--ui-text-muted)">—</span>
                          </div>
                          <UFormField label="Escolha a cor" class="flex-1 min-w-0">
                            <UPopover :content="{ side: 'bottom', align: 'end' }">
                              <div
                                class="h-9 w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity ring-1 ring-(--ui-border)"
                                :style="{ backgroundColor: palette.secondary }"
                              />
                              <template #content>
                                <UColorPicker v-model="palette.secondary" format="hex" class="p-2" />
                              </template>
                            </UPopover>
                          </UFormField>
                        </div>

                        <!-- Background -->
                        <div class="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                          <UFormField class="flex-1 min-w-0">
                            <template #label>
                              <span class="flex items-center gap-2">
                                Background
                                <span
                                  class="text-xs px-2 py-0.5 rounded font-mono"
                                  :class="badgeClass(colord(palette.background).contrast(palette.text))"
                                >{{ badgeLabel(colord(palette.background).contrast(palette.text)) }}</span>
                              </span>
                            </template>
                            <UInput v-model="palette.background" size="md" color="neutral" variant="outline" class="w-full font-mono uppercase">
                              <template #leading>
                                <span class="size-4 rounded-full shrink-0 ring-1 ring-(--ui-border)" :style="{ backgroundColor: palette.background }" />
                              </template>
                            </UInput>
                          </UFormField>
                          <div class="hidden sm:flex items-center h-9 shrink-0">
                            <span class="text-sm text-(--ui-text-muted)">—</span>
                          </div>
                          <UFormField label="Escolha a cor" class="flex-1 min-w-0">
                            <UPopover :content="{ side: 'bottom', align: 'end' }">
                              <div
                                class="h-9 w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity ring-1 ring-(--ui-border)"
                                :style="{ backgroundColor: palette.background }"
                              />
                              <template #content>
                                <UColorPicker v-model="palette.background" format="hex" class="p-2" />
                              </template>
                            </UPopover>
                          </UFormField>
                        </div>

                        <!-- Texto -->
                        <div class="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                          <UFormField class="flex-1 min-w-0">
                            <template #label>
                              <span class="flex items-center gap-2">
                                Texto
                                <span
                                  class="text-xs px-2 py-0.5 rounded font-mono"
                                  :class="badgeClass(colord(palette.text).contrast(palette.background))"
                                >{{ badgeLabel(colord(palette.text).contrast(palette.background)) }}</span>
                              </span>
                            </template>
                            <UInput v-model="palette.text" size="md" color="neutral" variant="outline" class="w-full font-mono uppercase">
                              <template #leading>
                                <span class="size-4 rounded-full shrink-0 ring-1 ring-(--ui-border)" :style="{ backgroundColor: palette.text }" />
                              </template>
                            </UInput>
                          </UFormField>
                          <div class="hidden sm:flex items-center h-9 shrink-0">
                            <span class="text-sm text-(--ui-text-muted)">—</span>
                          </div>
                          <UFormField label="Escolha a cor" class="flex-1 min-w-0">
                            <UPopover :content="{ side: 'bottom', align: 'end' }">
                              <div
                                class="h-9 w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity ring-1 ring-(--ui-border)"
                                :style="{ backgroundColor: palette.text }"
                              />
                              <template #content>
                                <UColorPicker v-model="palette.text" format="hex" class="p-2" />
                              </template>
                            </UPopover>
                          </UFormField>
                        </div>

                        <!-- Primária ajustada -->
                        <div class="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                          <UFormField class="flex-1 min-w-0">
                            <template #label>
                              <span class="flex items-center gap-2">
                                Primária ajustada
                                <UTooltip text="Versão da primária ajustada para garantir contraste mínimo AA sobre o background gerado.">
                                  <UIcon name="i-lucide-info" class="size-3.5 text-(--ui-text-muted)" />
                                </UTooltip>
                                <span
                                  class="text-xs px-2 py-0.5 rounded font-mono"
                                  :class="badgeClass(colord(palette.primaryOnBackground).contrast(palette.background))"
                                >{{ badgeLabel(colord(palette.primaryOnBackground).contrast(palette.background)) }}</span>
                              </span>
                            </template>
                            <UInput v-model="palette.primaryOnBackground" size="md" color="neutral" variant="outline" class="w-full font-mono uppercase">
                              <template #leading>
                                <span class="size-4 rounded-full shrink-0 ring-1 ring-(--ui-border)" :style="{ backgroundColor: palette.primaryOnBackground }" />
                              </template>
                            </UInput>
                          </UFormField>
                          <div class="hidden sm:flex items-center h-9 shrink-0">
                            <span class="text-sm text-(--ui-text-muted)">—</span>
                          </div>
                          <UFormField label="Escolha a cor" class="flex-1 min-w-0">
                            <UPopover :content="{ side: 'bottom', align: 'end' }">
                              <div
                                class="h-9 w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity ring-1 ring-(--ui-border)"
                                :style="{ backgroundColor: palette.primaryOnBackground }"
                              />
                              <template #content>
                                <UColorPicker v-model="palette.primaryOnBackground" format="hex" class="p-2" />
                              </template>
                            </UPopover>
                          </UFormField>
                        </div>

                      </div>
                    </div>
                  </UCard>

                  <!-- ── Preview ───────────────────────────────────────────── -->
                  <UCard v-if="paletteGenerated">
                    <template #header>
                      <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-eye" class="size-4 text-(--ui-primary)" />
                        <span class="text-sm font-semibold text-(--ui-text-highlighted)">Preview</span>
                        <span class="text-xs text-(--ui-text-muted) ml-1">mini-app simulado</span>
                      </div>
                    </template>

                    <div
                      class="rounded-lg overflow-hidden border border-(--ui-border) h-64 flex select-none"
                      :style="{ backgroundColor: palette.background, color: palette.text }"
                    >

                      <!-- Sidebar -->
                      <div
                        class="w-14 flex-shrink-0 flex flex-col items-center gap-2 py-3 px-2"
                        :style="{ backgroundColor: palette.background, borderRight: `1px solid ${palette.text}18` }"
                      >
                        <div class="size-7 rounded-lg mb-1" :style="{ backgroundColor: palette.primaryOnBackground }" />
                        <div
                          v-for="n in 5" :key="n"
                          class="w-full h-7 rounded-md"
                          :style="{ backgroundColor: n === 1 ? `${palette.primaryOnBackground}28` : `${palette.text}0d` }"
                        />
                      </div>

                      <!-- Main area -->
                      <div class="flex-1 flex flex-col overflow-hidden">

                        <!-- Header -->
                        <div
                          class="h-11 flex-shrink-0 flex items-center justify-between px-4"
                          :style="{ borderBottom: `1px solid ${palette.text}18` }"
                        >
                          <div class="h-3 w-28 rounded-full" :style="{ backgroundColor: `${palette.text}40` }" />
                          <div class="flex items-center gap-2">
                            <div
                              class="h-7 px-3 rounded-md text-xs font-semibold flex items-center"
                              :style="{ backgroundColor: palette.primaryOnBackground, color: palette.background }"
                            >Salvar</div>
                            <div class="size-7 rounded-full" :style="{ backgroundColor: `${palette.secondary}55` }" />
                          </div>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 overflow-hidden p-4 flex flex-col gap-3">

                          <!-- Stat cards -->
                          <div class="flex gap-2">
                            <div
                              v-for="m in 3" :key="m"
                              class="flex-1 rounded-lg p-2.5 flex flex-col gap-1.5"
                              :style="{ backgroundColor: `${palette.text}0a`, border: `1px solid ${palette.text}14` }"
                            >
                              <div class="h-2 w-3/5 rounded-full" :style="{ backgroundColor: `${palette.text}30` }" />
                              <div
                                class="h-4 w-4/5 rounded"
                                :style="{ backgroundColor: m === 1 ? `${palette.primaryOnBackground}28` : `${palette.secondary}28` }"
                              />
                            </div>
                          </div>

                          <!-- Row list -->
                          <div class="flex flex-col gap-1.5">
                            <div
                              v-for="r in 2" :key="r"
                              class="flex items-center gap-2 h-8 rounded-md px-2.5"
                              :style="{ backgroundColor: `${palette.text}08` }"
                            >
                              <div class="size-4 rounded-full flex-shrink-0" :style="{ backgroundColor: `${palette.secondary}50` }" />
                              <div class="flex-1 h-2 rounded-full" :style="{ backgroundColor: `${palette.text}28` }" />
                              <div
                                class="h-5 w-14 rounded text-xs font-medium flex items-center justify-center"
                                :style="{ backgroundColor: `${palette.primaryOnBackground}20`, color: palette.primaryOnBackground }"
                              >ativo</div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </UCard>

                </div>
              </template>

              <!-- ── URLs ───────────────────────────────────────────────── -->
              <template v-else-if="activeAparenciaTab === 'urls'">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">URL da área de membros</span></template>
                    <UInput v-model="urlSettings.membros" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">URL de promoções</span></template>
                    <UInput v-model="urlSettings.promocoes" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">App iOS URL</span></template>
                    <UInput v-model="urlSettings.ios" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">App Android URL</span></template>
                    <UInput v-model="urlSettings.android" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">Facebook</span></template>
                    <UInput v-model="urlSettings.facebook" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">Twitter (X)</span></template>
                    <UInput v-model="urlSettings.twitter" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">Instagram</span></template>
                    <UInput v-model="urlSettings.instagram" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">Youtube</span></template>
                    <UInput v-model="urlSettings.youtube" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">Tiktok</span></template>
                    <UInput v-model="urlSettings.tiktok" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                  <UFormField>
                    <template #label><span class="text-xs text-(--ui-text-muted)">Telegram</span></template>
                    <UInput v-model="urlSettings.telegram" placeholder="https://url.com" size="md" color="neutral" variant="outline" class="w-full" />
                  </UFormField>

                </div>
              </template>

              <!-- ── Links ──────────────────────────────────────────────── -->
              <template v-else-if="activeAparenciaTab === 'links'">

                <div class="border border-(--ui-border-accented) rounded-xl overflow-hidden">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b border-(--ui-border) bg-(--ui-bg-muted)">
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">Título</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-(--ui-text-highlighted) uppercase tracking-wide">URL</th>
                        <th class="px-4 py-3 w-12" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="link in links"
                        :key="link.id"
                        class="border-b border-(--ui-border) last:border-0 hover:bg-(--ui-bg-muted) transition-colors"
                      >
                        <td class="px-3 py-2 w-56">
                          <UInput v-model="link.titulo" placeholder="Ex: Instagram" size="md" color="neutral" variant="outline" class="w-full" />
                        </td>
                        <td class="px-3 py-2">
                          <UInput v-model="link.url" placeholder="https://" size="md" color="neutral" variant="outline" class="w-full">
                            <template #leading>
                              <UIcon name="i-lucide-link" class="w-4 h-4 text-(--ui-text-muted)" />
                            </template>
                          </UInput>
                        </td>
                        <td class="px-3 py-2">
                          <UButton
                            icon="i-lucide-trash-2"
                            color="error"
                            variant="ghost"
                            size="md"
                            square
                            @click="removerLink(link.id)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flex justify-start">
                  <UButton label="Adicionar link" icon="i-lucide-plus" color="neutral" variant="outline" size="md" @click="adicionarLink" />
                </div>

              </template>

            </div>
            </div>
          </div>
        </template>

        <!-- ── Banners ──────────────────────────────────────────────────── -->
        <template #banners>
          <div class="flex flex-col gap-8 pt-4">

            <!-- Link do banner ───────────────────────────────────────────── -->
            <UCard>
              <template #header>
                <span class="text-sm font-semibold text-(--ui-text-highlighted)">Link do banner</span>
              </template>

              <div class="flex flex-col gap-1.5">
                <div class="flex w-full gap-2">
                  <UInput
                    v-model="bannerLink"
                    icon="i-lucide-link"
                    placeholder="https://exemplo.com/destino"
                    size="md"
                    color="neutral"
                    variant="outline"
                    class="flex-1"
                  />
                  <UButton
                    :icon="bannerLinkCopiado ? 'i-lucide-check' : 'i-lucide-copy'"
                    color="neutral"
                    variant="outline"
                    size="md"
                    :disabled="!bannerLink"
                    :class="bannerLinkCopiado ? 'text-(--ui-success)' : ''"
                    @click="copyBannerLink"
                  />
                </div>
                <p class="text-xs text-(--ui-text-muted)">
                  URL para onde o usuário será redirecionado ao clicar no banner.
                </p>
              </div>
            </UCard>

            <!-- Imagem do banner ─────────────────────────────────────────── -->
            <UCard>
              <template #header>
                <span class="text-sm font-semibold text-(--ui-text-highlighted)">Imagem do banner</span>
              </template>

              <div class="w-full md:w-1/2">
                <div v-if="bannerDesktopImage" class="relative h-44 rounded-lg overflow-hidden">
                  <img :src="bannerDesktopImage" class="w-full h-full object-cover rounded-lg" alt="Preview banner" />
                  <UButton
                    icon="i-lucide-trash-2"
                    color="error"
                    variant="solid"
                    size="xs"
                    class="absolute top-2 right-2 rounded-full"
                    @click="bannerDesktopImage = null; bannerDesktopFile = null"
                  />
                </div>

                <div
                  v-else
                  class="relative flex flex-col items-center justify-center gap-3 h-44 rounded-lg border-2 border-dashed border-(--ui-border) bg-(--ui-bg-muted) cursor-pointer hover:border-(--ui-primary) transition-colors"
                  @click="bannerDesktopInput?.click()"
                  @dragover.prevent
                  @drop="onBannerDrop($event)"
                >
                  <UIcon name="i-lucide-image" class="w-8 h-8 text-(--ui-text-muted)" />
                  <div class="text-center px-4">
                    <p class="text-xs font-medium text-(--ui-text-highlighted)">Arraste ou clique para enviar</p>
                    <p class="text-xs text-(--ui-text-muted)">PNG, JPG até 5 MB — 1920 × 1080 px</p>
                  </div>
                  <input
                    ref="bannerDesktopInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onBannerFileSelect($event)"
                  />
                </div>
              </div>
            </UCard>

          </div>
        </template>

      </UTabs>

    </div>
    </div>

    <PartnersGestorSettingsFormActions />
  </div>


</template>
