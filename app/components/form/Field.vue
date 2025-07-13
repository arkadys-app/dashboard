<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  name: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'textarea' | 'number' | 'date'
  placeholder?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Field v-slot="{ componentField }" :name="props.name">
    <FormItem :class="props.class">
      <FormLabel v-if="label">
        {{ label }}
      </FormLabel>
      <div class="relative flex-1 items-center">
        <FormControl>
          <FormInput
            v-if="
              props.type === 'text' ||
              props.type === 'email' ||
              props.type === 'password'
            "
            :type="props.type"
            :placeholder="props.placeholder"
            v-bind="componentField"
          />
          <FormNumberField
            v-else-if="props.type === 'number'"
            :placeholder="props.placeholder"
            :min="1"
            :max="18"
            v-bind="componentField"
          />
          <FormDatePicker
            v-else-if="props.type === 'date'"
            :placeholder="props.placeholder"
            v-bind="componentField"
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  </Field>
</template>
