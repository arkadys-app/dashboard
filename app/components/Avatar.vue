<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    size?: number
  }>(),
  {
    size: 16
  }
)
</script>

<template>
  <AvatarRoot
    class="inline-flex items-center justify-center overflow-hidden rounded-full align-middle select-none"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  >
    <AvatarImage
      class="w-full h-full rounded-[inherit] object-cover"
      :src="props.src"
      :alt="props.alt"
    />
    <AvatarFallback />
  </AvatarRoot>
</template>
