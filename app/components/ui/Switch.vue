<script setup lang="ts">
import { useForwardProps } from 'reka-ui'

import type { SwitchRootProps } from 'reka-ui'

const props = defineProps<
  Pick<
    SwitchRootProps,
    'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'
  > & {
    as?: any
    loading?: boolean
    label?: string
    class?: any
  }
>()

const emits = defineEmits<{
  change: [value: boolean]
}>()

const modelValue = defineModel<boolean>({ default: undefined })

const rootProps = useForwardProps(
  reactivePick(props, 'required', 'value', 'defaultValue')
)

const { id: _id, name, disabled } = useFormField()
const id = _id.value ?? useId()
</script>

<template>
  <Primitive
    :as="props.as"
    :class="cn('relative flex items-start', props.class)"
  >
    <div class="flex items-center h-4">
      <SwitchRoot
        v-bind="{ ...rootProps, ...$attrs }"
        v-model="modelValue"
        class="group/switch inline-flex items-center shrink-0 w-7.5 h-4.5 rounded-full p-px data-[state=unchecked]:bg-slate-200 data-[state=checked]:bg-teal-500 inset-shadow-[0_1px_--theme(--color-black/4%)] disabled:opacity-50 disabled:pointer-events-none transition-colors duration-200"
        :name="name"
        :disabled="disabled || props.loading"
        @update:model-value="emits('change', $event)"
      >
        <SwitchThumb
          class="pointer-events-none size-4 group-active/switch:w-4.5 rounded-full bg-white shadow-lg ring-0 transition-[translate,width] duration-200 data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-3 group-active/switch:data-[state=checked]:translate-x-2.5 flex items-center justify-center"
        >
          <Icon
            v-if="props.loading"
            name="hugeicons:loading-03"
            :class="[
              'absolute animate-spin shrink-0 size-10/12 transition-opacity',
              props.loading ? 'opacity-100' : 'opacity-0'
            ]"
          />
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <Label v-if="props.label" class="block font-medium">
      {{ props.label }}
    </Label>
  </Primitive>
</template>
