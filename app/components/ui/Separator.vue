<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import type { SeparatorProps as _SeparatorProps } from 'reka-ui'

type SeparatorProps = Omit<_SeparatorProps, 'asChild'> & {
  label?: string
  icon?: string
  class?: any
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<{
  default: (props?: {}) => any
}>()

const rootProps = useForwardProps(
  reactivePick(props, 'as', 'decorative', 'orientation')
)
</script>

<template>
  <Separator
    v-bind="rootProps"
    :class="
      cn(
        'group/separator flex items-center align-center text-center text-sm font-medium',
        props.class
      )
    "
  >
    <div
      class="bg-slate-300 group-data-[orientation=horizontal]/separator:h-px group-data-[orientation=horizontal]/separator:w-full group-data-[orientation=vertical]/separator:h-full group-data-[orientation=vertical]/separator:w-px"
    />

    <template v-if="props.label || props.icon || !!slots.default">
      <div class="flex">
        <slot>
          <span v-if="props.label">{{ props.label }}</span>
          <Icon
            v-else-if="props.icon"
            :name="props.icon"
            class="shrink-0 size-4"
          />
        </slot>
      </div>

      <div
        class="bg-slate-300 group-data-[orientation=horizontal]/separator:h-px group-data-[orientation=horizontal]/separator:w-full group-data-[orientation=vertical]/separator:h-full group-data-[orientation=vertical]/separator:w-px"
      />
    </template>
  </Separator>
</template>
