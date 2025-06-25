<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: VariantProps<typeof buttonVariants>['variant']
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'primary'
  }
)

const buttonVariants = cva(
  'select-none cursor-pointer rounded-full text-sm font-medium px-4 py-2 text-sm transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-400 shadow-sm',
        secondary:
          'bg-zinc-50 text-blue-500 hover:bg-zinc-100 border border-zinc-200',
        link: 'text-blue-500 hover:text-blue-400'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)
</script>

<template>
  <button :class="cn(buttonVariants({ variant: props.variant }), props.class)">
    <slot />
  </button>
</template>
