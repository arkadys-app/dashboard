<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  class?: HTMLAttributes['class']
  containerClass?: HTMLAttributes['class']
}>()

const modelValue = defineModel<string | number>()

const inputContainerRef = ref<HTMLDivElement | null>(null)
const mouse = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const radius = 100
const visible = ref(false)

const containerBg = computed(() => {
  return `
    radial-gradient(
      ${visible.value ? radius + 'px' : '0px'} circle at ${mouse.value.x}px ${mouse.value.y}px,
      var(--color-violet-400),
      transparent 80%
    )
  `
})

const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
  if (!inputContainerRef.value) return

  const { left, top } = inputContainerRef.value.getBoundingClientRect()
  mouse.value = { x: clientX - left, y: clientY - top }
}
</script>

<template>
  <div
    ref="inputContainerRef"
    :class="
      cn(
        'group/input rounded-full p-[2px] transition duration-300',
        props.containerClass
      )
    "
    :style="{
      background: containerBg
    }"
    @mouseenter="() => (visible = true)"
    @mouseleave="() => (visible = false)"
    @mousemove="handleMouseMove"
  >
    <input
      v-bind="$attrs"
      v-model="modelValue"
      type="email"
      :class="
        cn(
          `flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-full px-4 py-2 text-sm  file:border-0 file:bg-transparent
          file:text-sm file:font-medium placeholder:text-neutral-400
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400
           disabled:cursor-not-allowed disabled:opacity-50
           group-hover/input:shadow-none transition duration-400`,
          props.class
        )
      "
    />
  </div>
</template>

<style scoped>
input {
  box-shadow:
    0px 2px 3px -1px rgba(0, 0, 0, 0.1),
    0px 1px 0px 0px rgba(25, 28, 33, 0.02),
    0px 0px 0px 1px rgba(25, 28, 33, 0.08);
}
</style>
