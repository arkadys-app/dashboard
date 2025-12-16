<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: any
    class?: any
  }>(),
  {
    as: 'div'
  }
)
</script>

<template>
  <Primitive
    :as="props.as"
    :class="
      cn(
        'border border-slate-300 bg-white flex flex-col gap-6 py-6 shadow-xs rounded-xl',
        props.class
      )
    "
  >
    <slot />
  </Primitive>
</template>
