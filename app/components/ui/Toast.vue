<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { useForwardPropsEmits } from 'reka-ui'

import type { VariantProps } from 'class-variance-authority'
import type { ToastRootEmits, ToastRootProps } from 'reka-ui'

import type { ButtonProps } from './Button.vue'

export interface ToastProps extends Pick<
  ToastRootProps,
  'defaultOpen' | 'open' | 'type' | 'duration'
> {
  as?: any
  variant?: VariantProps<typeof toastVariants>['variant']
  title?: string
  description?: string
  icon?: string
  actions?: ButtonProps[]
  close?: boolean
  progress?: boolean
  class?: any
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'primary',
  close: true,
  progress: true
})

const toastVariants = cva(
  'relative group overflow-hidden shadow-lg rounded-xl p-4 flex items-start gap-2.5 focus:outline-none bg-white border border-slate-300',
  {
    variants: {
      variant: {
        primary: '[&_.icon]:text-teal-500',
        secondary: '[&_.icon]:text-slate-500',
        destructive: '[&_.icon]:text-rose-500'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

const emits = defineEmits<ToastRootEmits>()

const rootRef = useTemplateRef('rootRef')
const height = ref(0)

onMounted(() => {
  if (!rootRef.value) return

  nextTick(() => {
    height.value = rootRef.value?.$el?.getBoundingClientRect()?.height
  })
})

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'),
  emits
)

const icon = computed(() => {
  if (props.icon) return props.icon

  switch (props.variant) {
    case 'primary':
      return 'tabler:square-rounded-check-filled'
    case 'secondary':
      return 'tabler:info-square-rounded-filled'
    case 'destructive':
      return 'tabler:alert-square-rounded-filled'
    default:
      return null
  }
})

defineExpose({ height })
</script>

<template>
  <ToastRoot
    ref="rootRef"
    v-slot="{ duration, open, remaining }"
    v-bind="rootProps"
    :class="cn(toastVariants({ variant: props.variant }), props.class)"
    :style="{ '--height': height }"
  >
    <Icon v-if="icon" :name="icon" class="icon shrink-0 size-5" />

    <div class="w-0 flex-1 flex flex-col">
      <ToastTitle v-if="props.title" class="text-sm font-medium">
        {{ props.title }}
      </ToastTitle>
      <ToastDescription
        v-if="props.description"
        as="p"
        :class="['text-sm text-slate-500', { 'mt-1': props.title }]"
      >
        {{ props.description }}
      </ToastDescription>
    </div>

    <div class="flex items-center gap-1.5 shrink-0">
      <ToastAction
        v-for="(action, index) in props.actions"
        :key="index"
        :alt-text="action.label ?? 'Action'"
        as-child
        @click.stop
      >
        <UiButton v-bind="action" />
      </ToastAction>

      <ToastClose v-if="props.close" as-child>
        <UiButton
          variant="ghost"
          icon="hugeicons:cancel-01"
          class="size-6 -mt-0.5 -mr-0.5"
          @click.stop
        />
      </ToastClose>
    </div>

    <UiProgress
      v-if="props.progress && open && remaining > 0 && duration"
      :variant="props.variant"
      :model-value="(remaining / duration) * 100"
      class="absolute inset-x-0 bottom-0 rounded-none [&_div[role=progressbar]]:h-1"
    />
  </ToastRoot>
</template>
