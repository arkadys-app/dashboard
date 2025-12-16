<script setup lang="ts" generic="T">
import { defu } from 'defu'
import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui'
import type {
  DropdownMenuContentProps,
  DropdownMenuRootEmits,
  DropdownMenuRootProps
} from 'reka-ui'

export type DropdownMenuItem = {
  label?: string
  icon?: string
  type?: 'checkbox'
  slot?: string
  disabled?: boolean
  checked?: boolean
  href?: string
  loadingAuto?: boolean
  onUpdateChecked?: (checked: boolean) => void
  onSelect?: (e: Event) => void
  class?: any
}

const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps<
  DropdownMenuRootProps & {
    items?: DropdownMenuItem[]
    disabled?: boolean
    content?: Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'>
    labelKey?: string
    class?: any
  }
>()

const emits = defineEmits<DropdownMenuRootEmits>()
const slots = defineSlots<{
  default(props: { open: boolean }): any
  content(props: {}): any
  [key: string]: any
}>()

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'defaultOpen', 'open', 'modal'),
  emits
)
const contentProps = toRef(
  () =>
    defu(props.content, {
      side: 'bottom',
      sideOffset: 4
    }) as DropdownMenuContentProps
)
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="rootProps">
    <DropdownMenuTrigger
      v-if="!!slots.default"
      as-child
      :disabled="props.disabled"
      :class="props.class"
    >
      <slot :open="open" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        v-bind="contentProps"
        class="min-w-(--reka-dropdown-menu-trigger-width) bg-white rounded-lg border border-slate-300 shadow-md z-[100] p-1 data-[state=open]:data-[side=top]:animate-slide-up data-[state=open]:data-[side=bottom]:animate-slide-down"
      >
        <slot name="content">
          <template v-for="(item, index) in props.items" :key="index">
            <template v-if="item.slot && slots[item.slot]">
              <slot :name="item.slot" :item="item" />
            </template>
            <DropdownMenuCheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="item.label"
              :class="
                cn(
                  'flex items-center text-sm font-medium data-[state=checked]:text-slate-800 h-7 px-2 rounded-md cursor-pointer select-none data-[highlighted]:bg-slate-100 transition-colors outline-none',
                  item.class
                )
              "
              @update:model-value="item.onUpdateChecked"
              @select="item.onSelect"
            >
              <Icon
                v-if="!!item.icon"
                :name="item.icon"
                class="text-slate-500 mr-2"
              />
              {{ item.label }}
              <Icon
                v-if="item.checked"
                name="hugeicons:tick-02"
                class="ml-auto text-slate-500"
              />
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem
              v-else
              :disabled="item.disabled"
              :text-value="item.label"
              :as="item.href ? NuxtLink : 'div'"
              :to="item.href"
              :class="
                cn(
                  'flex items-center text-sm font-medium cursor-pointer data-[highlighted]:text-slate-800 data-[state=checked]:text-slate-800 h-7 px-2 rounded-md select-none data-[highlighted]:bg-slate-100 data-disabled:opacity-50 data-disabled:pointer-events-none outline-none',
                  item.class
                )
              "
              @select="item.onSelect"
            >
              <Icon
                v-if="!!item.icon"
                :name="item.icon"
                class="text-slate-500 mr-2"
              />
              {{ item.label }}
            </DropdownMenuItem>
          </template>
        </slot>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
