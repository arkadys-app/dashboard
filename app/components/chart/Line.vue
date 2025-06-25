<script setup lang="ts">
import {
  VisXYContainer,
  VisLine,
  VisAxis,
  VisArea,
  VisCrosshair
} from '@unovis/vue'

type DataRecord = { x: number; y: number }

const props = defineProps<{ data: DataRecord[] }>()

const x = (d: DataRecord) => d.x
const y = (d: DataRecord) => d.y

const xFormatter = (x: any) => {
  const days = ['18/04', '19/04', '20/04', '21/04', '22/04', '23/04', '24/04']

  return days[x]
}

const svgDefs = computed(
  () => `
  <linearGradient id="gradient" gradientTransform="rotate(90)">
    <stop offset="0%" stop-color="color-mix(in oklab, var(--color-blue-500) 20%, transparent)" />
    <stop offset="40%" stop-color="color-mix(in oklab, var(--color-blue-500) 1%, transparent)" />
  </linearGradient>
`
)
</script>

<template>
  <VisXYContainer
    :svgDefs="svgDefs"
    :data="props.data"
    :padding="{ top: 8, right: 8, bottom: 16, left: 16 }"
    class="chart size-full bg-blue-500/0"
  >
    <VisAxis
      type="x"
      :tick-format="xFormatter"
      :grid-line="false"
      :tick-line="false"
      :domain-line="false"
      :num-ticks="7"
      tick-text-font-size="14px"
      tick-text-color="var(--color-zinc-400)"
    />
    <VisAxis
      type="y"
      :grid-line="false"
      :tick-line="false"
      :domain-line="false"
      tick-text-font-size="14px"
      tick-text-color="var(--color-zinc-400)"
    />
    <VisLine :x="x" :y="y" color="var(--color-blue-500)" />
    <VisArea :x="x" :y="y" color="url(#gradient)" />
    <VisCrosshair color="var(--color-blue-500)" />
  </VisXYContainer>
</template>
