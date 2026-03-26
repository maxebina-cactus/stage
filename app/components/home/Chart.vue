<script setup lang="ts">
defineProps<{ period: string }>()

const rawData = [
  { label: 'Mar 12', value: 32000 },
  { label: 'Mar 13', value: 55000 },
  { label: 'Mar 14', value: 38000 },
  { label: 'Mar 15', value: 72000 },
  { label: 'Mar 16', value: 48000 },
  { label: 'Mar 17', value: 65000 },
  { label: 'Mar 18', value: 28000 },
  { label: 'Mar 19', value: 42000 },
  { label: 'Mar 20', value: 78000 },
  { label: 'Mar 21', value: 52000 },
  { label: 'Mar 22', value: 68000 },
  { label: 'Mar 23', value: 44000 },
  { label: 'Mar 24', value: 85000 },
  { label: 'Mar 25', value: 62000 },
]

const totalRevenue = '$89,340'

// SVG dimensions
const W = 800
const H = 220
const PL = 0    // no left padding (labels outside chart box)
const PR = 0
const PT = 20
const PB = 36

const cW = W - PL - PR
const cH = H - PT - PB

const minV = Math.min(...rawData.map(d => d.value))
const maxV = Math.max(...rawData.map(d => d.value))
const vRange = maxV - minV || 1

const points = rawData.map((d, i) => ({
  x: PL + (i / (rawData.length - 1)) * cW,
  y: PT + cH - ((d.value - minV) / vRange) * cH,
  label: d.label,
  value: d.value,
}))

// Smooth cubic bezier path
function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return ''
  const first = pts[0]!
  let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]!
    const c = pts[i]!
    const cpx = (p.x + c.x) / 2
    d += ` C ${cpx.toFixed(2)} ${p.y.toFixed(2)} ${cpx.toFixed(2)} ${c.y.toFixed(2)} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`
  }
  return d
}

const linePath = buildPath(points)
const bottomY = PT + cH
const last = points[points.length - 1]!
const first = points[0]!
const areaPath = `${linePath} L ${last.x.toFixed(2)} ${bottomY} L ${first.x.toFixed(2)} ${bottomY} Z`

// X axis: show labels where i % 2 === 0, skip first
const xLabels = points.filter((_, i) => i > 0 && i % 2 === 0)
</script>

<template>
  <div class="bg-(--ui-bg-elevated) border border-(--ui-border) rounded-xl overflow-hidden">
    <!-- Chart header -->
    <div class="px-5 pt-5 pb-2">
      <p class="text-xs font-semibold tracking-wider text-(--ui-text-muted) mb-1">REVENUE</p>
      <p class="text-3xl font-bold text-(--ui-text)">{{ totalRevenue }}</p>
    </div>

    <!-- SVG chart -->
    <div class="w-full px-0">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="w-full block"
        preserveAspectRatio="none"
        style="height: 200px"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00DC82" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#00DC82" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- Area fill -->
        <path :d="areaPath" fill="url(#chartGrad)" />

        <!-- Line -->
        <path
          :d="linePath"
          fill="none"
          stroke="#00DC82"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- X axis labels -->
    <div class="relative px-0 pb-4" style="height: 28px">
      <span
        v-for="pt in xLabels"
        :key="pt.label"
        class="absolute text-xs text-(--ui-text-muted) -translate-x-1/2"
        :style="{ left: `${(pt.x / W) * 100}%`, bottom: '4px' }"
      >
        {{ pt.label }}
      </span>
    </div>
  </div>
</template>
