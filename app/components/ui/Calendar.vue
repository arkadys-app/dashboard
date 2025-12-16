<script setup lang="ts">
import type { CalendarDate, DateValue } from '@internationalized/date'
import type { CalendarRootProps } from 'reka-ui'

const model = defineModel<CalendarDate>()
const props = defineProps<{
  isDateUnavailable?: CalendarRootProps['isDateUnavailable']
  class?: any
}>()

const paginateYear = (date: DateValue, sign: -1 | 1) => {
  if (sign === -1) {
    return date.subtract({ years: 1 })
  }

  return date.add({ years: 1 })
}
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    v-model="model"
    locale="fr-FR"
    fixed-weeks
    :is-date-disabled="props.isDateUnavailable"
    :class="props.class"
  >
    <CalendarHeader class="flex items-center justify-between">
      <CalendarPrev
        :prev-page="(date) => paginateYear(date, -1)"
        aria-label="Année précédente"
        as-child
      >
        <UiButton variant="ghost" size="icon" class="size-8">
          <Icon name="hugeicons:arrow-left-double" class="size-4" />
        </UiButton>
      </CalendarPrev>
      <CalendarPrev aria-label="Mois précédent" as-child>
        <UiButton variant="ghost" size="icon" class="size-8">
          <Icon name="hugeicons:arrow-left-01" class="size-4" />
        </UiButton>
      </CalendarPrev>
      <CalendarHeading
        v-slot="{ headingValue }"
        class="text-center text-sm font-medium truncate mx-3"
      >
        {{ headingValue }}
      </CalendarHeading>
      <CalendarNext aria-label="Mois suivant" as-child>
        <UiButton variant="ghost" size="icon" class="size-8">
          <Icon name="hugeicons:arrow-right-01" class="size-4" />
        </UiButton>
      </CalendarNext>
      <CalendarNext
        :next-page="(date) => paginateYear(date, 1)"
        aria-label="Année suivante"
        as-child
      >
        <UiButton variant="ghost" size="icon" class="size-8">
          <Icon name="hugeicons:arrow-right-double" class="size-4" />
        </UiButton>
      </CalendarNext>
    </CalendarHeader>
    <div
      class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
    >
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none space-y-1 focus:outline-none"
      >
        <CalendarGridHead>
          <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="rounded-lg text-xs font-medium text-slate-500"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`week-dates-${index}`"
            class="grid grid-cols-7 place-items-center"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDates.toString()"
              :date="weekDate"
              class="relative text-center text-sm font-medium"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="relative flex items-center justify-center size-8 rounded-lg whitespace-nowrap cursor-pointer data-[selected]:bg-teal-500 data-[selected]:text-white data-today:not-data-[selected]:bg-slate-100 data-[highlighted]:bg-slate-100 hover:not-data-[selected]:bg-slate-100 focus-visible:ring-2 focus:outline-none data-disabled:opacity-40 data-disabled:line-through data-disabled:pointer-events-none data-unavailable:line-through data-unavailable:text-slate-500 data-unavailable:pointer-events-none data-[outside-view]:text-slate-500 transition"
              >
                {{ weekDate.day }}
              </CalendarCellTrigger>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
