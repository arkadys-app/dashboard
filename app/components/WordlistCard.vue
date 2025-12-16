<script setup lang="ts">
const props = defineProps<{
  title: string
  href: string
  author: string
  description: string
  global: boolean
}>()
</script>

<template>
  <UiCard as="li" class="gap-2 p-2">
    <div class="flex items-center gap-2">
      <UiLink class="flex items-center gap-2 text-sm pl-1" :to="props.href">
        <Icon
          name="hugeicons:left-to-right-list-dash"
          class="shrink-0 size-3.5"
        />
        {{ props.title }}
      </UiLink>
      <span class="text-xs font-medium text-slate-500">
        {{ description }}
      </span>
    </div>
    <UiBadge
      class="ml-5.5"
      :variant="global ? 'success' : 'secondary'"
      :label="author"
    />
  </UiCard>
</template>
