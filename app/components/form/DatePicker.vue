<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  id?: string
  placeholder?: DateValue
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const { error } = useFormField()
</script>

<template>
  <UiDatePicker v-bind="delegatedProps" />
</template>
