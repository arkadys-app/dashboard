<script setup lang="ts">
import { VisXYContainer, VisStackedBar } from '@unovis/vue'

type DataRecord = { x: number; y: number }

const props = defineProps<{ data: DataRecord[] }>()

const x = (d: DataRecord) => d.x
const y = (d: DataRecord) => d.y
</script>

<template>
  <VisXYContainer :data="props.data" class="size-full">
    <VisStackedBar :x="x" :y="y" roundedCorners color="#00b8db" />
  </VisXYContainer>
</template>
