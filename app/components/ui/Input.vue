<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const value = defineModel<string>()

const props = defineProps<{
  id?: string
  placeholder?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <input
    :id="props.id"
    v-model="value"
    :placeholder="props.placeholder"
    :class="
      cn(
        'border rounded-full font-medium px-4 py-2 border-gray-200 focus:border-gray-300 text-sm placeholder:text-gray-400 shadow-sm transition-colors outline-none',
        props.class
      )
    "
  />
</template>
