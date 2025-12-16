<script setup lang="ts">
import {
  VisXYContainer,
  VisLine,
  VisAxis,
  VisArea,
  VisTooltip,
  VisCrosshair
} from '@unovis/vue'
import { isWithinInterval, subDays, subMonths, subYears } from 'date-fns'
import { createApp } from 'vue'

import Tooltip from './Tooltip.vue'

const props = defineProps<{
  data: { date: string; average: number }[]
}>()

const svgDefs = `
    <linearGradient id="vis-gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="var(--color-teal-400)" />
      <stop offset="100%" stop-color="var(--color-white)" />
    </linearGradient>
  `

const selectedRange = ref<TimeRange>('1m')
const items = [
  { label: '7 jours', value: '7d', description: 'les 7 derniers jours' },
  { label: '1 mois', value: '1m', description: 'le dernier mois' },
  { label: '3 mois', value: '3m', description: 'les 3 derniers mois' },
  { label: '6 mois', value: '6m', description: 'les 6 derniers mois' },
  { label: '1 an', value: '1y', description: "l'année dernière" }
]

type TimeRange = '7d' | '1m' | '3m' | '6m' | '1y'

interface ScoreData {
  date: string
  average: number
}

const getInterval = (range: TimeRange, end: Date = new Date()) => {
  switch (range) {
    case '7d':
      return { start: subDays(end, 7), end }
    case '1m':
      return { start: subMonths(end, 1), end }
    case '3m':
      return { start: subMonths(end, 3), end }
    case '6m':
      return { start: subMonths(end, 6), end }
    case '1y':
      return { start: subYears(end, 1), end }
  }
}

const data = computed(() => {
  const interval = getInterval(selectedRange.value, new Date())

  return props.data
    .filter((p) => isWithinInterval(p.date, interval))
    .toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const x = (d: ScoreData) => new Date(d.date)
const y = (d: ScoreData) => d.average

const tickValues = computed(() => {
  if (data.value.length === 0) return []

  const step = Math.max(1, Math.floor(data.value.length / 6))

  return data.value
    .filter((_, i) => i % step === 0 || i === data.value.length - 1)
    .map((d) => new Date(d.date))
})

const tickFormat = (date: string, i: number, ticks: string[]) => {
  if (i === 0 || i === ticks.length - 1) return ''

  const dateObj = new Date(date)

  switch (selectedRange.value) {
    case '7d':
      return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'short',
        day: '2-digit'
      }).format(dateObj)
    case '1m':
    case '3m':
    case '6m':
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short'
      }).format(dateObj)
    case '1y':
      return new Intl.DateTimeFormat('fr-FR', {
        month: 'short',
        year: 'numeric'
      }).format(dateObj)
  }
}

const onCrosshairUpdate = computed(() => (d: ScoreData) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return ''
  }

  try {
    const app = createApp(Tooltip, { data: d })
    const container = document.createElement('div')

    app.mount(container)
    const html = container.innerHTML

    app.unmount()

    return html
  } catch (e) {
    return ''
  }
})
</script>

<template>
  <UiCard class="@container/card bg-white">
    <div class="flex justify-between items-end px-6">
      <div class="flex flex-col gap-1.5">
        <h2 class="leading-none font-semibold text-lg">Performance</h2>
        <p class="text-sm text-slate-500">
          Score moyen pour
          {{ items.find((i) => i.value === selectedRange)?.description }}
        </p>
      </div>
      <div class="flex">
        <UiTabs
          v-model="selectedRange"
          :items="items"
          class="hidden @[700px]/card:flex"
        />
        <UiSelect
          v-model="selectedRange"
          :items="items"
          :content="{ align: 'end' }"
          class="w-28 @[700px]/card:hidden"
        />
      </div>
    </div>
    <div id="score-chart" class="pr-6">
      <VisXYContainer
        v-if="props.data.length > 1"
        :data="data"
        :svg-defs="svgDefs"
        class="h-64 rounded"
        :padding="{ top: 10 }"
        :margin="{ left: 10 }"
      >
        <VisLine :lineWidth="1" :x="x" :y="y" color="var(--color-teal-500)" />
        <VisArea :x="x" :y="y" color="url(#vis-gradient)" :opacity="0.2" />

        <VisAxis
          type="x"
          :x="x"
          tick-text-color="var(--color-slate-400)"
          tick-text-fit-mode="trim"
          :domain-line="false"
          :grid-line="false"
          :tick-line="false"
          :tick-values="tickValues"
          :tick-format="tickFormat"
        />
        <VisAxis
          type="y"
          :tick-line="false"
          :domain-line="false"
          :num-ticks="2"
          tick-text-font-size="0px"
        />

        <VisCrosshair
          color="var(--color-teal-500)"
          :duration="0"
          :template="onCrosshairUpdate"
        />

        <VisTooltip :follow-cursor="false" />
      </VisXYContainer>
      <div
        v-else
        class="relative overflow-hidden flex items-center justify-center rounded-lg border border-dashed border-slate-300 ml-6 h-64"
      >
        <svg
          class="absolute inset-0 h-full w-full stroke-slate-200"
          fill="none"
        >
          <defs>
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
            </pattern>
          </defs>
          <rect stroke="none" fill="url(#pattern)" width="100%" height="100%" />
        </svg>
        <p
          class="absolute top-1/2 -translate-y-1/2 rounded-sm py-0.5 px-1 text-center text-sm font-medium text-slate-500 bg-white"
        >
          Aucune donnée de score disponible.
        </p>
      </div>
    </div>
  </UiCard>
</template>
