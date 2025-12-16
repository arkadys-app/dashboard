<script setup lang="ts">
const value = defineModel<string>()

const props = defineProps<{
  items: { label: string; value: string }[]
  class?: any
}>()
</script>

<template>
  <TabsRoot
    v-model="value"
    :class="cn('flex flex-col rounded-lg', props.class)"
  >
    <TabsList class="relative shrink-0 flex bg-slate-100 rounded-lg p-1">
      <TabsTrigger
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
        class="text-xs leading-none font-medium px-2 py-1.5 rounded-md cursor-pointer data-[state=inactive]:hover:text-slate-900 data-[state=active]:shadow-xs data-[state=active]:bg-white data-[state=inactive]:text-slate-500 transition-colors"
      >
        {{ item.label }}
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
