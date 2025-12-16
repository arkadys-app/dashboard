<script setup lang="ts">
import { defu } from 'defu'
import { useForwardPropsEmits } from 'reka-ui'

import type {
  TooltipRootProps,
  TooltipRootEmits,
  TooltipContentProps,
  TooltipContentEmits
} from 'reka-ui'
import type { EmitsToProps } from 'vue'

const props = defineProps<
  TooltipRootProps & {
    text?: string
    kbds?: string[]
    content?: Omit<TooltipContentProps, 'as' | 'asChild'> &
      Partial<EmitsToProps<TooltipContentEmits>>
    class?: any
  }
>()
const emits = defineEmits<TooltipRootEmits>()
const slots = defineSlots<{
  default: (props: { open: boolean }) => any
  content: (props: {}) => any
}>()

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'defaultOpen',
    'open',
    'delayDuration',
    'disableHoverableContent',
    'disableClosingTrigger',
    'ignoreNonKeyboardFocus'
  ),
  emits
)
const contentProps = toRef(
  () =>
    defu(props.content, {
      side: 'bottom',
      sideOffset: 4
    }) as TooltipContentProps
)
</script>

<template>
  <TooltipRoot v-slot="{ open }" v-bind="rootProps">
    <TooltipTrigger v-if="!!slots.default" v-bind="$attrs" as-child>
      <slot :open="open" />
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        v-bind="contentProps"
        :class="
          cn(
            'flex items-center gap-1.5 z-100 rounded-lg border border-slate-300 bg-white px-2 py-1 font-medium text-xs shadow-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[slide=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[slide=top]:slide-in-from-bottom-2 origin-(--reka-tooltip-content-transform-origin) pointer-events-auto will-change-[transform,opacity]',
            props.class
          )
        "
      >
        <slot name="content">
          <span v-if="props.text">{{ props.text }}</span>

          <span
            v-if="props.kbds?.length"
            class="items-center shrink-0 gap-0.5 not-first-of-type:before:me-0.5"
          >
            <UiKbd
              v-for="(kbd, index) in props.kbds"
              :key="index"
              :value="kbd"
            />
          </span>
        </slot>
        <TooltipArrow :width="10" :height="5" class="fill-slate-300" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
