<script setup lang="ts">
const { toasts, remove } = useToast()

const refs = ref<{ height: number }[]>([])

const height = computed(() =>
  refs.value.reduce((acc, { height }) => acc + height + 16, 0)
)

function getOffset(index: number) {
  return refs.value
    .slice(index + 1)
    .reduce((acc, { height }) => acc + height + 16, 0)
}
</script>

<template>
  <ToastProvider>
    <slot />

    <UiToast
      v-for="(toast, index) in toasts"
      :key="toast.id"
      ref="refs"
      v-bind="omit(toast, ['id', 'close'])"
      class="absolute inset-x-0 z-(--index) transform-(--transform) data-[swipe=move]:transition-none data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 duration-200 ease-out data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out] data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] bottom-0 transition-[transform,translate,height] pointer-events-auto"
      :style="{
        '--index': index - toasts.length + toasts.length,
        '--before': toasts.length - 1 - index,
        '--offset': getOffset(index),
        '--translate': 'calc(var(--offset) * -1px)',
        '--transform': 'translateY(var(--translate))'
      }"
      @click="toast.onClick && toast.onClick(toast)"
      @update:open="(v) => !v && remove(toast.id)"
    />

    <ToastPortal to="body">
      <ToastViewport
        class="fixed right-4 bottom-4 flex flex-col w-[calc(100%-2rem)] sm:w-96 h-(--height) z-110 focus:outline-none"
        :style="{
          '--height': `${height}px`
        }"
      />
    </ToastPortal>
  </ToastProvider>
</template>
