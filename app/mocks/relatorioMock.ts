export interface RelatorioMetrica {
  icon: string
  label: string
  value: string
  trend: 1 | -1
  trendLabel: string
}

export const relatorioMetricasMock: RelatorioMetrica[] = [
  { icon: 'i-lucide-zap',          label: 'CPA',      value: '3.782', trend:  1, trendLabel: '+11,01%' },
  { icon: 'i-lucide-piggy-bank',   label: 'FTDs',     value: '3.782', trend: -1, trendLabel: '-9,05%'  },
  { icon: 'i-lucide-bar-chart-big', label: 'RevShare', value: '3.782', trend:  1, trendLabel: '+11,01%' },
]
