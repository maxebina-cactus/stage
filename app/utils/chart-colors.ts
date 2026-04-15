export const CHART_COLORS = [
  'var(--ui-primary)',
  'var(--ui-success)',
  'var(--ui-warning)',
  'var(--ui-error)',
] as const

export type ChartColor = (typeof CHART_COLORS)[number]
