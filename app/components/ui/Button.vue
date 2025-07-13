<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

interface Props extends PrimitiveProps {
  variant?: VariantProps<typeof buttonVariants>['variant']
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button'
})

const buttonVariants = cva(
  'select-none flex h-9 cursor-pointer items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-gray-50 text-gray-900 hover:bg-gray-100',
        primary: 'border-transparent bg-teal-500 text-white hover:bg-teal-400',
        soft: 'border-transparent bg-zinc-50/4 hover:bg-zinc-50/8',
        ghost:
          'border-transparent bg-transparent text-zinc-50 hover:bg-zinc-50/4',
        destructive:
          'border-transparent bg-red-500 text-zinc-50 hover:bg-red-400'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="cn(buttonVariants({ variant: props.variant }), props.class)"
  >
    <Icon
      v-if="props.loading"
      name="ph:spinner-bold"
      size="16"
      class="mr-2 animate-spin"
    />
    <slot />
  </Primitive>
</template>
