<script setup lang="ts">
import defu from 'defu'
import type { AcceptableValue, SelectContentProps } from 'reka-ui'

type SelectValue = Exclude<AcceptableValue, Record<string, any>>
export type SelectItem =
  | SelectValue
  | {
      label?: string
      value?: SelectValue
      disabled?: boolean
      onSelect?: (e?: Event) => void
      class?: any
      [key: string]: any
    }

const value = defineModel<SelectValue | SelectValue[]>()

const props = withDefaults(
  defineProps<{
    id?: string
    placeholder?: string
    items: SelectItem[]
    multiple?: boolean
    valueKey?: string
    labelKey?: string
    content?: Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount'>
    class?: any
  }>(),
  {
    valueKey: 'value',
    labelKey: 'label'
  }
)

const contentProps = toRef(
  () =>
    defu(props.content, {
      side: 'bottom',
      sideOffset: 4,
      position: 'popper'
    }) as SelectContentProps
)
</script>

<template>
  <SelectRoot v-model="value" :multiple="props.multiple">
    <SelectTrigger
      :id="props.id"
      :class="
        cn(
          'border border-slate-300 bg-white focus-visible:ring-2 ring-slate-100 h-8 px-4 py-2 shadow-xs has-[>svg]:px-3 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-t\'])]:size-4 [&_svg]:shrink-0 outline-none',
          props.class
        )
      "
    >
      <SelectValue
        :placeholder="props.placeholder"
        class="truncate pointer-events-none select-none"
      />
      <Icon name="hugeicons:arrow-down-01" class="text-slate-500 ml-auto" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="min-w-(--reka-select-trigger-width) bg-white rounded-lg border border-slate-300 shadow-md z-[100] data-[state=open]:data-[side=top]:animate-slide-up data-[state=open]:data-[side=bottom]:animate-slide-down"
        v-bind="contentProps"
      >
        <SelectViewport class="p-1">
          <SelectItem
            v-for="(item, index) in props.items"
            :key="index"
            :value="isItem(item) ? get(item, props.valueKey) : item"
            :disabled="isItem(item) && item.disabled"
            :class="
              cn(
                'text-sm font-medium leading-none flex items-center h-7 px-2 relative select-none rounded-md data-[disabled]:text-slate-400 data-[disabled]:pointer-events-none outline-none data-[highlighted]:bg-slate-100 transition-colors',
                isItem(item) && item.class
              )
            "
            @select="isItem(item) && item.onSelect?.($event)"
          >
            <SelectItemText>
              {{ isItem(item) ? get(item, props.labelKey) : item }}
            </SelectItemText>
            <SelectItemIndicator
              class="ml-auto inline-flex items-center justify-center"
            >
              <Icon name="hugeicons:tick-02" class="text-slate-500" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
