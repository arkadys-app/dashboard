<script setup lang="ts">
import { useForwardPropsEmits } from 'reka-ui'

import type { RadioGroupRootProps, AcceptableValue } from 'reka-ui'

type RadioGroupValue = Exclude<AcceptableValue, Record<string, any>>
type RadioGroupItem =
  | RadioGroupValue
  | {
      label?: string
      value?: RadioGroupValue
      description?: string
      disabled?: boolean
      class?: any
      [key: string]: any
    }

const model = defineModel<RadioGroupValue>()

const props = withDefaults(
  defineProps<
    RadioGroupRootProps & {
      valueKey?: string
      labelKey?: string
      descriptionKey?: string
      legend?: string
      items?: RadioGroupItem[]
      defaultValue?: RadioGroupValue
      class?: any
    }
  >(),
  {
    valueKey: 'value',
    labelKey: 'label',
    descriptionKey: 'description',
    orientation: 'vertical'
  }
)

const emits = defineEmits<{
  change: [value: any]
}>()

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'loop',
    'required',
    'orientation',
    'name',
    'disabled',
    'defaultValue'
  ),
  emits
)

const id = useId()
</script>

<template>
  <RadioGroupRoot
    v-bind="rootProps"
    :class="cn('relative', props.class)"
    @update:model-value="(value) => emits('change', value)"
  >
    <fieldset class="flex flex-col gap-x-2 gap-y-1">
      <legend
        v-if="props.legend"
        class="mb-2 block font-medium text-sm text-slate-500"
      >
        {{ props.legend }}
      </legend>

      <div v-for="item in props.items" class="flex items-center gap-2 h-5">
        <RadioGroupItem
          :id="`${id}:${isItem(item) ? get(item, props.valueKey) : item}`"
          :value="isItem(item) ? get(item, props.valueKey) : item"
          :disabled="isItem(item) ? item.disabled : false"
          class="cursor-pointer rounded-full size-4 shrink-0 ring ring-inset ring-slate-300 shadow-xs overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
        >
          <RadioGroupIndicator
            class="flex items-center justify-center size-full bg-teal-500 after:bg-white after:rounded-full after:size-1.5"
          />
        </RadioGroupItem>

        <div
          v-if="
            (isItem(item) && (item.label || item.description)) || !isItem(item)
          "
          class="flex items-center gap-2 w-full text-sm"
        >
          <Label
            v-if="(isItem(item) && item.label) || !isItem(item)"
            :for="`${id}:${isItem(item) ? get(item, props.valueKey) : item}`"
            class="block font-medium"
          >
            {{ isItem(item) ? item.label : item }}
          </Label>
          <p
            v-if="isItem(item) && item.description"
            class="text-xs font-medium text-slate-500"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </fieldset>
  </RadioGroupRoot>
</template>
