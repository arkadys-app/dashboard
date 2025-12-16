<script setup lang="ts">
const props = defineProps<{
  as?: any
  class?: any
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    :class="cn('bg-slate-800/8 animate-pulse', props.class)"
  >
    <slot />
  </Primitive>
</template>
