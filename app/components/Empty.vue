<script setup lang="ts">
const props = defineProps<{
  icon?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center">
    <div v-if="props.icon" class="relative mb-6">
      <span
        class="relative z-10 flex items-center justify-center size-9 shadow-xs bg-white border border-slate-300 rounded-lg"
      >
        <Icon :name="props.icon" class="size-[18px]" />
      </span>
      <span
        class="absolute border border-slate-300 rounded-lg size-9 bg-white shadow-px -translate-x-0.5 -rotate-10 bottom-px origin-bottom-left scale-84 pointer-events-none"
      />
      <span
        class="absolute border border-slate-300 rounded-lg size-9 bg-white shadow-px translate-x-0.5 rotate-10 bottom-px origin-bottom-right scale-84 pointer-events-none"
      />
    </div>
    <div class="text-lg font-semibold">{{ props.title }}</div>
    <div
      v-if="props.description"
      class="text-center text-sm text-slate-500 mt-1"
    >
      {{ props.description }}
    </div>
  </div>
</template>
