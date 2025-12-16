<script setup lang="ts">
const props = defineProps<{
  href: string
  label: string
  icon?: string
}>()
</script>

<template>
  <NuxtLink
    :to="props.href"
    class="flex w-full items-center hover:bg-slate-100 focus-visible:bg-slate-100 gap-2 overflow-hidden rounded-lg p-2 h-8 text-slate-500 hover:text-slate-800 [.router-link-active]:bg-teal-500 [.router-link-active]:text-white [.router-link-active]:shadow-xs transition-all outline-none"
  >
    <Icon v-if="props.icon" :name="props.icon" class="shrink-0 size-4" />
    <span class="text-left text-sm font-medium">{{ props.label }}</span>
  </NuxtLink>
</template>
