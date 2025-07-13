<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const value = defineModel<DateValue>()

const props = defineProps<{
  id?: string
  placeholder?: DateValue
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <DatePickerRoot v-model="value" :id="props.id" locale="fr">
    <DatePickerField
      v-slot="{ segments }"
      class="h-9 pl-3 flex select-none bg-gray-50 hover:bg-gray-100 focus-within:bg-gray-100 transition-colors items-center rounded-lg text-center justify-between"
    >
      <div class="flex items-center text-sm font-medium">
        <template v-for="item of segments" :key="item.part">
          <DatePickerInput v-if="item.part === 'literal'" :part="item.part">
            {{ item.value }}
          </DatePickerInput>
          <DatePickerInput
            v-else
            :part="item.part"
            style="caret-color: var(--color-gray-900)"
            class="rounded p-0.5 outline-none"
          >
            {{ item.value }}
          </DatePickerInput>
        </template>
      </div>

      <DatePickerTrigger
        class="size-9 flex items-center justify-center cursor-pointer outline-none"
      >
        <Icon
          name="lucide:calendar"
          size="16"
          class="text-teal-800 transition-colors"
        />
      </DatePickerTrigger>
    </DatePickerField>

    <DatePickerContent
      :side-offset="4"
      class="w-64 rounded-lg bg-white border border-gray-200 shadow-sm z-50"
    >
      <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
        <DatePickerHeader class="flex items-center justify-between">
          <DatePickerPrev
            class="inline-flex items-center justify-center size-8 rounded-md cursor-pointer bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon name="lucide:chevron-left" size="16" />
          </DatePickerPrev>
          <DatePickerHeading class="text-sm font-medium" />
          <DatePickerNext
            class="inline-flex items-center justify-center size-8 rounded-md cursor-pointer bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon name="lucide:chevron-right" size="16" />
          </DatePickerNext>
        </DatePickerHeader>
        <div>
          <DatePickerGrid
            v-for="month of grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <DatePickerGridHead>
              <DatePickerGridRow class="my-2 flex w-full justify-between">
                <DatePickerHeadCell
                  v-for="day of weekDays"
                  :key="day"
                  class="w-8 font-normal text-sm text-gray-600"
                >
                  {{ day }}
                </DatePickerHeadCell>
              </DatePickerGridRow>
            </DatePickerGridHead>
            <DatePickerGridBody>
              <DatePickerGridRow
                v-for="(weekDates, index) of month.rows"
                :key="`weekDate-${index}`"
                class="flex w-full justify-between"
              >
                <DatePickerCell
                  v-for="weekDate of weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="size-8"
                >
                  <DatePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center size-full whitespace-nowrap rounded-md text-sm font-medium hover:bg-gray-100 data-[selected]:bg-teal-100 data-[selected]:text-teal-800 data-[outside-view]:text-gray-400 transition-colors cursor-pointer"
                  />
                </DatePickerCell>
              </DatePickerGridRow>
            </DatePickerGridBody>
          </DatePickerGrid>
        </div>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>
</template>
