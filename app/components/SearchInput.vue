<script setup lang="ts">
const value = defineModel<string>()

const props = defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <div class="relative flex w-full max-w-md">
    <Icon
      name="ri:search-line"
      size="18"
      class="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400"
    />
    <UiInput
      v-model="value"
      :placeholder="props.placeholder"
      class="pl-10 w-full"
    />
  </div>
</template>
