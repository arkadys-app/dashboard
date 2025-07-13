<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const id = useId()

provide(FORM_ITEM_INJECTION_KEY, id)
</script>

<template>
  <div :class="cn('flex flex-col gap-y-2', props.class)">
    <slot />
  </div>
</template>
