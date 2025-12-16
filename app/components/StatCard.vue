<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  description?: string
  progress?: {
    value: string | number
    type?: 'increase' | 'decrease' | 'neutral'
  }
}>()
</script>

<template>
  <UiCard class="relative bg-white gap-4">
    <div
      :class="
        cn(
          'px-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5',
          props.progress && 'grid-cols-[1fr_auto]'
        )
      "
    >
      <div class="text-slate-500 text-sm font-medium">{{ props.title }}</div>
      <div class="text-3xl font-bold tabular-nums">{{ props.value }}</div>
      <div
        v-if="props.progress"
        class="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
      >
        <UiBadge
          :variant="
            props.progress?.type === 'increase'
              ? 'success'
              : props.progress?.type === 'decrease'
                ? 'error'
                : 'secondary'
          "
        >
          <Icon
            v-if="props.progress.type === 'increase'"
            name="hugeicons:trade-up"
          />
          <Icon
            v-else-if="props.progress.type === 'decrease'"
            name="hugeicons:trade-down"
          />
          <Icon v-else name="hugeicons:minus-sign" />
          {{ props.progress.value }}
        </UiBadge>
      </div>
    </div>
    <div v-if="!!props.description" class="flex px-6">
      <p class="text-xs text-slate-500">
        {{ props.description }}
      </p>
    </div>
  </UiCard>
</template>
