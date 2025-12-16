<script setup lang="ts">
import { useForwardPropsEmits } from 'reka-ui'

import type { DialogRootEmits, DialogRootProps } from 'reka-ui'

const props = withDefaults(
  defineProps<
    DialogRootProps & {
      title?: string
      description?: string
      close?: boolean
      class?: any
    }
  >(),
  {
    close: true,
    modal: true
  }
)

const emits = defineEmits<DialogRootEmits>()

const slots = defineSlots<{
  default(props: { open: boolean }): any
  content(props: { close: () => void }): any
  header(props: { close: () => void }): any
  body(props: { close: () => void }): any
  footer(props: { close: () => void }): any
}>()

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'open', 'defaultOpen', 'modal'),
  emits
)
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal>
      <AnimatePresence>
        <DialogOverlay as-child>
          <Motion
            class="z-100 fixed inset-0 overflow-y-auto bg-slate-100/60"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1, transition: { duration: 0.2 } }"
            :exit="{ opacity: 0, transition: { duration: 0.2 } }"
          />
        </DialogOverlay>

        <DialogContent as-child>
          <Motion
            class="z-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-2xl shadow-lg border border-slate-300 bg-white divide-y divide-slate-300 flex flex-col overflow-hidden focus:outline-none"
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3, type: 'spring' }
            }"
            :exit="{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }"
          >
            <VisuallyHidden v-if="!props.title || !props.description">
              <DialogTitle v-if="!props.title" />
              <DialogDescription v-if="!props.description" />
            </VisuallyHidden>

            <slot name="content" :close="close">
              <div
                v-if="
                  !!slots.header ||
                  props.title ||
                  props.description ||
                  props.close
                "
                class="flex items-center gap-2 p-4 sm:px-6"
              >
                <slot name="header" :close="close">
                  <div>
                    <DialogTitle v-if="props.title" class="font-medium">
                      {{ props.title }}
                    </DialogTitle>

                    <DialogDescription
                      v-if="props.description"
                      class="mt-1 text-slate-500 text-sm"
                    >
                      {{ props.description }}
                    </DialogDescription>
                  </div>

                  <DialogClose v-if="props.close" as-child>
                    <UiButton
                      variant="ghost"
                      icon="hugeicons:cancel-01"
                      class="absolute top-4 end-4 size-6"
                    />
                  </DialogClose>
                </slot>
              </div>

              <div v-if="!!slots.body" class="">
                <slot name="body" :close="close" />
              </div>

              <div v-if="!!slots.footer" class="">
                <slot name="footer" :close="close" />
              </div>
            </slot>
          </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
