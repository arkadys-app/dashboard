<script setup lang="ts">
import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'

export interface ButtonProps {
  as?: any
  variant?: VariantProps<typeof buttonVariants>['variant']
  type?: 'button' | 'submit' | 'reset'
  label?: string
  icon?: string
  trailingIcon?: string
  disabled?: boolean
  loading?: boolean
  loadingAuto?: boolean
  onClick?:
    | ((event: MouseEvent) => void | Promise<void>)
    | Array<(event: MouseEvent) => void | Promise<void>>
  class?: any
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button'
})

const buttonVariants = cva(
  "relative h-8 py-2 px-3 cursor-pointer inline-flex items-center justify-center select-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-slate-300 ring-offset-white gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        primary:
          'bg-teal-500 text-white hover:bg-teal-500/85 shadow-xs inset-shadow-[0_1px_--theme(--color-white/16%)] border border-teal-500 [&:is(:active)]:inset-shadow-[0_1px_--theme(--color-black/8%)] [&:is(:disabled,:active)]:shadow-none',
        outline:
          'border border-slate-300 bg-white hover:bg-slate-100 shadow-xs',
        ghost: 'hover:bg-slate-100',
        link: 'hover:underline decoration-1 decoration-slate-500 decoration-dashed p-0 h-auto',
        destructive:
          'bg-rose-500 text-white hover:bg-rose-500/85 shadow-rose-300 shadow-xs inset-shadow-[0_1px_--theme(--color-white/16%)] border border-rose-500 [&:is(:active)]:inset-shadow-[0_1px_--theme(--color-black/8%)] [&:is(:disabled,:active)]:shadow-none'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

const slots = defineSlots<{
  default(props: {}): any
}>()

const loadingAutoState = ref(false)

async function onClickWrapper(event: MouseEvent) {
  loadingAutoState.value = true
  const callbacks = Array.isArray(props.onClick)
    ? props.onClick
    : [props.onClick]

  try {
    await Promise.all(callbacks.map((fn) => fn?.(event)))
  } finally {
    loadingAutoState.value = false
  }
}

const isLoading = computed(() => {
  return props.loading || (props.loadingAuto && loadingAutoState.value)
})
</script>

<template>
  <Primitive
    :as="props.as"
    :type="props.type"
    :disabled="props.disabled || isLoading"
    :class="cn(buttonVariants({ variant: props.variant }), props.class)"
    @click="onClickWrapper"
  >
    <Icon
      v-if="props.icon"
      :name="props.icon"
      :class="[
        'shrink-0 size-4',
        props.variant === 'primary' || props.variant === 'destructive'
          ? 'text-white'
          : 'text-slate-500'
      ]"
    />
    <slot>{{ props.label }}</slot>
    <Icon
      v-if="isLoading"
      name="hugeicons:loading-03"
      class="shrink-0 size-4 animate-spin"
    />
    <Icon
      v-else-if="props.trailingIcon"
      :name="props.trailingIcon"
      :class="[
        'shrink-0 size-4',
        props.variant === 'primary' || props.variant === 'destructive'
          ? 'text-white'
          : 'text-slate-500'
      ]"
    />
  </Primitive>
</template>
