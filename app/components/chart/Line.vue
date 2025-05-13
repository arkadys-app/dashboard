<script setup lang="ts">
import { CurveType } from '@unovis/ts'
import { VisXYContainer, VisLine, VisScatter, VisAxis } from '@unovis/vue'

type DataRecord = { x: number; y: number }

const props = defineProps<{ data: DataRecord[] }>()

const x = (d: DataRecord) => d.x
const y = (d: DataRecord) => d.y

const xFormatter = (x: any) => {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  return days[x]
}
</script>

<template>
  <VisXYContainer :data="data" class="size-full">
    <VisAxis
      type="x"
      :tick-format="xFormatter"
      :grid-line="false"
      :tick-line="false"
      :domain-line="false"
      :num-ticks="7"
      tick-text-font-size="16px"
      tick-text-color="var(--color-zinc-400)"
    />
    <VisAxis
      type="y"
      :tick-line="false"
      :domain-line="false"
      tick-text-font-size="16px"
      tick-font-family="var(--font-family-sans)"
      tick-text-color="var(--color-zinc-400)"
    />
    <VisLine
      :x="x"
      :y="y"
      :curveType="CurveType.Linear"
      color="rgba(43, 127, 255, 0.50)"
    />
    <VisScatter :x="x" :y="y" color="#2b7fff" :radius="6" />
  </VisXYContainer>
</template>
