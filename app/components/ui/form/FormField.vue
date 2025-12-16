<script setup lang="ts">
interface FormFieldProps {
  name?: string
  label?: string
  description?: string
  error?: string
  class?: any
}

const props = defineProps<FormFieldProps>()

const form = useFormContext()

const id = ref(useId())

const resolvedError = computed(() => {
  if (!props.name) return undefined
  if (typeof props.error === 'string') {
    return props.error
  }

  return form.errors.value.find((e) => e.name === props.name)?.message
})

provideFormFieldContext({
  id,
  name: ref(props.name),
  error: resolvedError
})
</script>

<template>
  <div :class="cn('text-sm', props.class)">
    <div
      v-if="props.label"
      class="flex content-center items-center justify-between"
    >
      <Label
        :for="id"
        :class="
          cn('block font-medium', {
            'text-rose-500': resolvedError
          })
        "
      >
        {{ props.label }}
      </Label>
    </div>

    <div class="mt-2 relative">
      <slot :error="resolvedError" />
      <p v-if="props.description" class="text-xs text-slate-500 mt-1">
        {{ props.description }}
      </p>
      <div class="mt-2">
        <Transition
          enter-active-class="transition-all duration-300 ease-in-out"
          leave-active-class="transition-all duration-300 ease-in-out"
          enter-from-class="opacity-0 h-0 -translate-y-2"
          enter-to-class="opacity-100 h-5 translate-y-0"
          leave-from-class="opacity-100 h-5 translate-y-0"
          leave-to-class="opacity-0 h-0 -translate-y-2"
        >
          <div
            v-if="resolvedError"
            :id="`${id}-error`"
            class="text-rose-500 font-medium"
          >
            {{ resolvedError }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
