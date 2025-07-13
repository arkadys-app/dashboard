<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  id?: string
  min?: number
  max?: number
  placeholder?: string
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const { error } = useFormField()
</script>

<template>
  <UiNumberField
    :class="
      cn(
        'w-full',
        error &&
          'bg-red-100 placeholder:text-red-300 hover:bg-red-200 focus:bg-red-200',
        props.class
      )
    "
    v-bind="delegatedProps"
  />
</template>
