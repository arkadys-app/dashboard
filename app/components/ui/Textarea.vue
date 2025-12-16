<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'

const model = defineModel<string>()

const props = withDefaults(
  defineProps<{
    as?: any
    id?: string
    placeholder?: string
    required?: boolean
    autocomplete?: TextareaHTMLAttributes['autocomplete']
    autofocus?: boolean
    rows?: number
    disabled?: boolean
    class?: any
  }>(),
  {
    as: 'div'
  }
)

const { id, name, disabled, invalid, emitFormBlur } = useFormField()

if (props.id) {
  id.value = props.id
}

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoFocus() {
  if (props.autofocus) {
    textareaRef.value?.focus()
  }
}

onMounted(() => {
  autoFocus()
})

defineExpose({ textareaRef })
</script>

<template>
  <Primitive
    :as="props.as"
    :class="cn('relative inline-flex items-center', props.class)"
  >
    <textarea
      ref="textareaRef"
      v-model="model"
      :id="id"
      :name="name"
      :placeholder="props.placeholder"
      :disabled="disabled || props.disabled"
      :required="props.required"
      :autocomplete="props.autocomplete"
      :autofocus="props.autofocus"
      :rows="props.rows"
      :class="
        cn(
          'w-full px-3 py-1 border focus-visible:border-slate-400 border-slate-300 shadow-xs rounded-lg appearance-none bg-white focus-visible:ring-3 focus:ring-slate-200 transition-[box-shadow,border-color] placeholder:text-slate-400 text-sm font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-rose-300 focus-visible:ring-rose-100 focus-visible:border-rose-400':
              invalid
          }
        )
      "
      @change="emitFormBlur"
    />
  </Primitive>
</template>
