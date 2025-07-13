<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('p-4 border border-gray-200 rounded-lg', props.class)">
    <slot />
  </div>
</template>
