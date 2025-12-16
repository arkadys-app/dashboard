<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { useForwardPropsEmits } from 'reka-ui'

import type { VariantProps } from 'class-variance-authority'
import type { ProgressRootEmits, ProgressRootProps } from 'reka-ui'

export interface ProgressProps
  extends Pick<
    ProgressRootProps,
    'getValueLabel' | 'getValueText' | 'modelValue'
  > {
  as?: any
  variant?: VariantProps<typeof progressVariants>['variant']
  max?: number
  status?: boolean
  vrariant?: 'primary' | 'secondary' | 'destructive'
  class?: any
}

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: null
})

const progressVariants = cva(
  'rounded-[inherit] size-full transition-transform duration-200 ease-out',
  {
    variants: {
      variant: {
        primary: 'bg-teal-500',
        secondary: 'bg-slate-500',
        destructive: 'bg-rose-500'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

const emits = defineEmits<ProgressRootEmits>()

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'getValueLabel', 'getValueText', 'modelValue', 'max'),
  emits
)

const isIndeterminate = computed(() => rootProps.value.modelValue === null)

const percent = computed(() => {
  if (isIndeterminate.value) return undefined

  switch (true) {
    case rootProps.value.modelValue! < 0:
      return 0
    case rootProps.value.modelValue! > (props.max ?? 100):
      return 100
    default:
      return Math.round(
        (rootProps.value.modelValue! / (props.max ?? 100)) * 100
      )
  }
})
</script>

<template>
  <Primitive
    :as="props.as"
    :class="cn('flex flex-col gap-2 w-full', props.class)"
  >
    <div
      v-if="!isIndeterminate && props.status"
      class="flex text-sm text-slate-500 transition-[width] duration-200"
      :style="{ width: `${Math.max(percent ?? 0, 0)}%` }"
    >
      {{ percent }}%
    </div>

    <ProgressRoot
      v-bind="rootProps"
      class="relative h-2 overflow-hidden rounded-[inherit] bg-slate-100"
    >
      <ProgressIndicator
        :class="progressVariants({ variant: props.variant })"
        :style="{ transform: `translateX(-${100 - Number(percent)}%)` }"
      />
    </ProgressRoot>
  </Primitive>
</template>
