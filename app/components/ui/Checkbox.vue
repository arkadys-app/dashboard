<script setup lang="ts">
import { useForwardProps } from 'reka-ui'

import type { CheckboxRootProps } from 'reka-ui'

interface CheckboxProps
  extends Pick<
    CheckboxRootProps,
    'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'
  > {
  label?: string
  icon?: string
  class?: any
}

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<boolean>()
const props = defineProps<CheckboxProps>()
const emits = defineEmits<{
  change: [value: boolean | 'indeterminate']
}>()

const rootProps = useForwardProps(
  reactivePick(props, 'required', 'value', 'defaultValue')
)

const { id: _id, name, disabled } = useFormField()
const id = _id.value ?? useId()

function onUpdate(value: boolean | 'indeterminate') {
  emits('change', value)
}
</script>

<template>
  <Label class="relative flex items-start">
    <div class="flex items-center h-5">
      <CheckboxRoot
        v-model="modelValue"
        v-bind="{ ...rootProps, ...$attrs }"
        :id="id"
        :name="name"
        :disabled="disabled"
        class="size-4 rounded-sm ring ring-inset ring-slate-300 shadow-xs overflow-hidden"
        @update:model-value="onUpdate"
        v-slot="{ state }"
      >
        <AnimatePresence>
          <Motion
            v-if="state === true"
            :initial="{ opacity: 0, scale: 1.2 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 1.2 }"
            class="flex size-full"
          >
            <CheckboxIndicator
              class="flex rounded-sm items-center justify-center size-full bg-teal-500 text-white"
            >
              <Icon
                :name="props.icon || 'tabler:check'"
                class="shrink-0 size-3"
              />
            </CheckboxIndicator>
          </Motion>
        </AnimatePresence>
      </CheckboxRoot>
    </div>

    <div v-if="props.label" class="w-full ms-2 text-sm">
      <Label :for="id" class="block font-medium">
        {{ props.label }}
      </Label>
    </div>
  </Label>
</template>
