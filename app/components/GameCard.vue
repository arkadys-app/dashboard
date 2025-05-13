<script setup lang="ts">
const props = defineProps<{
  to: string
  name: string
  thumbnail: string
  class?: string
}>()
</script>

<template>
  <NuxtLink
    :to="props.to"
    class="flex flex-col gap-y-4 border-zinc-200 bg-white shadow-slate-900/6"
  >
    <AspectRatio :ratio="4 / 4">
      <NuxtImg
        :src="props.thumbnail"
        width="500"
        height="500"
        class="size-full object-cover rounded-2xl"
      />
    </AspectRatio>
    <div class="flex flex-col gap-y-4">
      <h4 class="text-xl font-bold text-center">{{ props.name }}</h4>
    </div>
  </NuxtLink>
</template>
