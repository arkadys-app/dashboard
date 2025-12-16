<script setup lang="ts">
import { useForwardPropsEmits } from 'reka-ui'

import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'

const props = defineProps<{ class?: any } & PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()
const slots = defineSlots<{
  default: (props: { open: boolean }) => any
  content: (props: { close: () => void }) => any
  anchor: (props: { close: () => void }) => any
}>()

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'defaultOpen', 'open', 'modal'),
  emits
)
</script>

<template>
  <PopoverRoot v-slot="{ open, close }" v-bind="rootProps">
    <PopoverTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </PopoverTrigger>

    <PopoverAnchor v-if="!!slots.anchor" as-child>
      <slot name="anchor" :close="close" />
    </PopoverAnchor>

    <PopoverPortal>
      <PopoverContent
        side="bottom"
        :side-offset="5"
        class="z-100 bg-white shadow-lg rounded-lg border border-slate-300 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto"
      >
        <slot name="content" :close="close" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
