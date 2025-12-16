<script setup lang="ts">
import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'

const props = withDefaults(
  defineProps<{
    as?: any
    variant?: VariantProps<typeof badgeVariants>['variant']
    label?: string
    class?: any
  }>(),
  {
    as: 'span'
  }
)

const badgeVariants = cva(
  'font-medium inline-flex items-center text-xs whitespace-nowrap px-1 py-0.5 gap-1 rounded-md w-fit',
  {
    variants: {
      variant: {
        secondary: 'text-slate-500 bg-slate-50',
        success: 'text-teal-500 bg-teal-50',
        error: 'text-rose-500 bg-rose-50'
      }
    },
    defaultVariants: {
      variant: 'secondary'
    }
  }
)
</script>

<template>
  <Primitive
    :as="props.as"
    :class="cn(badgeVariants({ variant: props.variant }), props.class)"
  >
    <slot>
      <span v-if="label">
        {{ label }}
      </span>
    </slot>
  </Primitive>
</template>
