<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>

<template>
  <p :id="formDescriptionId" :class="cn('text-sm text-gray-400', props.class)">
    <slot />
  </p>
</template>
