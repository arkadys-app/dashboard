<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { LabelProps } from 'reka-ui'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { formItemId } = useFormField()
</script>

<template>
  <Label
    :class="cn('text-xs font-medium text-teal-800 select-none', props.class)"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
