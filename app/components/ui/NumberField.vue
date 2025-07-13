<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const value = defineModel<number>()

const props = defineProps<{
  id?: string
  min?: number
  max?: number
  placeholder?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NumberFieldRoot
    v-model="value"
    :id="props.id"
    :min="props.min"
    :max="props.max"
    :class="
      cn(
        'flex items-center bg-gray-50 rounded-md h-9 hover:bg-gray-100 focus-within:bg-gray-100 transition-colors',
        props.class
      )
    "
  >
    <NumberFieldDecrement
      class="size-9 flex items-center justify-center cursor-pointer"
    >
      <Icon name="lucide:minus" size="16" />
    </NumberFieldDecrement>
    <NumberFieldInput
      :placeholder="props.placeholder"
      class="flex-1 bg-transparent text-center tabular-nums outline-none"
    />
    <NumberFieldIncrement
      class="size-9 flex items-center justify-center cursor-pointer"
    >
      <Icon name="lucide:plus" size="16" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
