<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: any
    value?: string
    class?: any
  }>(),
  {
    as: 'kbd'
  }
)
const slots = defineSlots<{
  default: (props: {}) => any
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :class="
      cn(
        'inline-flex items-center justify-center px-1 rounded-sm font-medium font-mono h-4 min-w-4 text-[10px] border border-slate-300 text-slate-500',
        props.class
      )
    "
  >
    <slot>
      {{ props.value }}
    </slot>
  </Primitive>
</template>
