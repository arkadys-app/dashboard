<script setup lang="ts">
const props = defineProps<{
  data: { date: string; average: number }
}>()
</script>

<template>
  <div
    class="px-2.5 py-1.5 grid gap-1.5 text-xs shadow-md bg-white rounded-lg border border-slate-300"
  >
    <div class="font-medium">
      {{
        new Intl.DateTimeFormat('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }).format(new Date(data.date))
      }}
    </div>
    <div class="grid gap-1.5">
      <div class="flex w-full flex-wrap gap-2 items-center">
        <div class="shrink-0 rounded-sm size-2.5 bg-teal-500" />
        <div class="flex flex-1 justify-between leading-none items-center">
          <div class="grid gap-1.5">
            <span class="font-medium text-slate-500">Score moyen</span>
          </div>
          <span class="font-mono font-medium tabular-nums ml-2">
            {{ props.data.average }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
