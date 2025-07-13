<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const value = defineModel<string>()

const props = defineProps<{
  id?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  icon?: string
  class?: HTMLAttributes['class']
}>()

const visible = ref(false)

const computedType = computed(() => {
  return props.type === 'password' && !visible.value ? 'password' : 'text'
})
</script>

<template>
  <div class="relative">
    <Icon
      v-if="props.icon"
      :name="props.icon"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4"
    />
    <input
      v-model="value"
      :id="props.id"
      :type="computedType"
      :placeholder="placeholder"
      :class="
        cn(
          'text-sm font-medium bg-gray-50 rounded-lg px-3 h-9 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors',
          { 'pl-9': icon },
          props.class
        )
      "
    />
    <button
      v-if="props.type === 'password'"
      type="button"
      @click="visible = !visible"
      class="flex absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <Icon
        :name="visible ? 'lucide:eye-closed' : 'lucide:eye'"
        class="size-4"
      />
    </button>
  </div>
</template>
