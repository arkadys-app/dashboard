<script setup lang="ts">
import { getLocalTimeZone } from '@internationalized/date'

import type { CalendarDate } from '@internationalized/date'
import type { CalendarRootProps } from 'reka-ui'

const model = defineModel<CalendarDate>()

const props = defineProps<{
  id?: string
  isDateUnavailable?: CalendarRootProps['isDateUnavailable']
  class?: any
}>()

const { id, disabled, invalid, emitFormBlur } = useFormField()

if (props.id) {
  id.value = props.id
}

watch(
  () => model.value,
  () => {
    emitFormBlur()
  }
)
</script>

<template>
  <UiPopover>
    <UiButton
      :id="id"
      variant="outline"
      trailing-icon="hugeicons:calendar-03"
      :disabled="disabled"
      :class="
        cn(
          'w-full justify-between',
          { 'border-rose-200': invalid },
          props.class
        )
      "
    >
      {{
        model
          ? model
              .toDate(getLocalTimeZone())
              .toLocaleDateString('fr-FR', { dateStyle: 'long' })
          : 'Sélectionner une date'
      }}
    </UiButton>

    <template #content>
      <UiCalendar
        v-model="model"
        class="p-3"
        :is-date-unavailable="props.isDateUnavailable"
      />
    </template>
  </UiPopover>
</template>
