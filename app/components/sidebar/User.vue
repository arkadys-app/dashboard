<script setup lang="ts">
const props = defineProps<{
  data: {
    firstname?: string
    lastname?: string
    email?: string
  }
}>()
</script>

<template>
  <div class="flex gap-3">
    <span
      class="flex items-center justify-center bg-teal-100 size-9 rounded-full"
    >
      <Icon name="lucide:user" class="size-4 text-teal-800" />
    </span>
    <div class="flex flex-col">
      <span class="text-sm font-bold text-teal-800">{{
        `${props.data.firstname} ${props.data.lastname}`
      }}</span>
      <span class="text-xs text-gray-600">{{ props.data.email }}</span>
    </div>
  </div>
</template>
