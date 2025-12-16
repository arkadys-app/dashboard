<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

const model = defineModel<string>()

const props = withDefaults(
  defineProps<{
    as?: any
    id?: string
    type?: InputHTMLAttributes['type']
    placeholder?: string
    icon?: string
    required?: boolean
    autocomplete?: InputHTMLAttributes['autocomplete']
    autofocus?: boolean
    toggleVisibility?: boolean
    disabled?: boolean
    class?: any
  }>(),
  {
    as: 'div',
    type: 'text'
  }
)

const { id, name, disabled, invalid, emitFormBlur } = useFormField()

if (props.id) {
  id.value = props.id
}

const inputRef = ref<HTMLInputElement | null>(null)
const show = ref(false)

const visibility = computed(() =>
  props.toggleVisibility ? (show.value ? 'text' : 'password') : props.type
)

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
}

onMounted(() => {
  autoFocus()
})

defineExpose({ inputRef })
</script>

<template>
  <Primitive
    :as="props.as"
    :class="cn('relative inline-flex items-center', props.class)"
  >
    <span
      v-if="props.icon"
      class="absolute inset-y-0 start-0 flex items-center px-2 pointer-events-none"
    >
      <Icon :name="props.icon" class="shrink-0 text-slate-500 size-4" />
    </span>

    <input
      ref="inputRef"
      v-model="model"
      :id="id"
      :type="visibility"
      :name="name"
      :placeholder="props.placeholder"
      :disabled="disabled || props.disabled"
      :required="props.required"
      :autocomplete="props.autocomplete"
      :autofocus="props.autofocus"
      :class="
        cn(
          'w-full px-3 border focus-visible:border-slate-400 border-slate-300 shadow-xs rounded-lg h-8 appearance-none bg-white focus-visible:ring-3 focus:ring-slate-200 transition-[box-shadow,border-color] placeholder:text-slate-400 text-sm font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-rose-300 focus-visible:ring-rose-100 focus-visible:border-rose-400':
              invalid,
            'ps-8': props.icon
          }
        )
      "
      @change="emitFormBlur"
    />

    <slot />

    <span
      v-if="props.toggleVisibility"
      class="absolute inset-y-0 end-0 flex items-center"
      @mousedown.prevent
    >
      <UiButton
        variant="outline"
        class="size-6 justify-center text-slate-600 mr-1 rounded-md"
        tabindex="-1"
        :icon="show ? 'hugeicons:view-off' : 'hugeicons:view'"
        @click="show = !show"
      />
    </span>
  </Primitive>
</template>
