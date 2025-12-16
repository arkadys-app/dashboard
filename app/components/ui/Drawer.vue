<script setup lang="ts">
import {
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger
} from 'vaul-vue'

const props = defineProps<{
  as?: any
  class?: any
}>()

const slots = defineSlots<{
  default: (props: {}) => any
  content: (props: {}) => any
}>()
</script>

<template>
  <DrawerRoot>
    <DrawerTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot />
    </DrawerTrigger>

    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-slate-100/60" />

      <DrawerContent
        class="fixed bg-white border-t border-slate-300 flex flex-col mt-24 h-auto max-h-[96%] bottom-0 inset-x-0 rounded-t-xl focus:outline-none"
      >
        <DrawerHandle
          class="shrink-0 bg-slate-300 !w-12 !h-1.5 mx-auto mt-4 transition-opacity"
        />

        <VisuallyHidden v-if="!!slots.content">
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Drawer description</DrawerDescription>
        </VisuallyHidden>

        <div
          v-if="!!slots.content"
          class="w-full flex flex-col gap-4 p-4 overflow-y-auto"
        >
          <slot name="content" />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
