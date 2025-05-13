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
        'border-2 bg-zinc-50 rounded-xl font-semibold px-4 h-11 border-zinc-200 placeholder:text-zinc-400 focus:border-blue-400 outline-none',
        props.class
      )
    "
  />
</template>
