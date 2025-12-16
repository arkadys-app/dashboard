<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  FlexRender,
  getPaginationRowModel
} from '@tanstack/vue-table'

import type { ColumnDef, VisibilityState } from '@tanstack/vue-table'

import type { SelectItem } from './ui/Select.vue'

const UiLink = resolveComponent('UiLink')
const NuxtTime = resolveComponent('NuxtTime')

const props = defineProps<{ data: Record<string, any>[] }>()

const columnsSession: ColumnDef<any, any>[] = [
  {
    accessorKey: 'game',
    header: 'Jeu',
    cell: (info) =>
      h(
        UiLink,
        { to: `/games/${info.getValue().slug}` },
        () => info.getValue().name
      )
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: (info) => `${info.getValue()}%`
  },
  {
    accessorKey: 'duration',
    header: 'Durée',
    cell: (info) => formatDuration(info.getValue())
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: (info) =>
      h(NuxtTime, {
        datetime: new Date(info.getValue()),
        dateStyle: 'medium',
        timeStyle: 'short'
      })
  }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

const pageSizeItems: SelectItem[] = [
  {
    value: 10,
    label: '10',
    onSelect: () => {
      table.setPageSize(10)
    }
  },
  {
    value: 20,
    label: '20',
    onSelect: () => {
      table.setPageSize(20)
    }
  },
  {
    value: 30,
    label: '30',
    onSelect: () => {
      table.setPageSize(30)
    }
  },
  {
    value: 40,
    label: '40',
    onSelect: () => {
      table.setPageSize(40)
    }
  },
  {
    value: 50,
    label: '50',
    onSelect: () => {
      table.setPageSize(50)
    }
  }
]

const data = ref(props.data)
const selectedPageSize = ref(10)
const columnVisibility = ref<VisibilityState>({})

watch(
  () => props.data,
  (newData) => {
    data.value = newData
  },
  { deep: true }
)

watch(columnVisibility, (newVisibility) => {
  table.setColumnVisibility(newVisibility)
})

const table = useVueTable({
  data,
  columns: columnsSession,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    get pagination() {
      return pagination.value
    },
    get columnVisibility() {
      return columnVisibility.value
    }
  },
  onPaginationChange: (updaterOrValue) => {
    pagination.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination.value)
        : updaterOrValue
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibility.value)
        : updaterOrValue
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold leading-none px-6">Sessions</h2>
      <UiDropdownMenu
        :items="
          table.getAllColumns().map((column) => ({
            label: (column.columnDef.header ?? column.id) as string,
            type: 'checkbox',
            checked: column.getIsVisible(),
            onUpdateChecked: (checked: boolean) => {
              column.toggleVisibility(checked)
            },
            onSelect: (e) => {
              e?.preventDefault()
            }
          }))
        "
        :content="{ align: 'end' }"
      >
        <UiButton variant="outline">
          <Icon name="hugeicons:layout-3-column" class="text-slate-500" />
          Colonnes
          <Icon name="hugeicons:arrow-down-01" class="text-slate-500" />
        </UiButton>
      </UiDropdownMenu>
    </div>
    <div
      class="overflow-hidden bg-white rounded-lg border border-slate-300 my-4"
    >
      <div class="relative w-full overflow-x-auto">
        <table class="w-full divide-y divide-slate-300">
          <thead>
            <tr
              v-for="headerGroup in table.getHeaderGroups()"
              class="h-[36.5px] bg-slate-100"
              :key="headerGroup.id"
            >
              <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                scope="col"
                @click="header.column.getToggleSortingHandler()?.($event)"
                class="font-medium text-sm px-4 py-2 text-left first-of-type:pl-6 last-of-type:pr-6"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-300">
            <template v-if="table.getRowModel().rows.length > 0">
              <tr v-for="row in table.getRowModel().rows" :key="row.id">
                <td
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="p-4 text-sm font-medium whitespace-nowrap first-of-type:pl-6 last-of-type:pr-6 last-of-type:w-60"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </td>
              </tr>
            </template>
            <tr v-else>
              <td
                :colspan="table.getAllColumns().length"
                class="p-4 text-sm text-center font-medium text-slate-500"
              >
                Aucune donnée disponible.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex items-center gap-8 w-full px-4 lg:px-6">
      <div class="hidden lg:flex items-center gap-2 ml-auto">
        <label for="rows-per-page" class="select-none font-medium text-sm">
          Lignes par page
        </label>
        <UiSelect
          id="rows-per-page"
          v-model="selectedPageSize"
          :items="pageSizeItems"
        />
      </div>
      <div class="text-sm font-medium">
        Page {{ pagination.pageIndex + 1 }} sur {{ table.getPageCount() }}
      </div>
      <div class="flex items-center gap-2 ml-auto lg:ml-0">
        <UiButton
          variant="outline"
          class="hidden lg:flex w-8"
          @click="table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
        >
          <Icon name="hugeicons:arrow-left-double" />
        </UiButton>
        <UiButton
          variant="outline"
          class="w-8"
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
        >
          <Icon name="hugeicons:arrow-left-01" />
        </UiButton>
        <UiButton
          variant="outline"
          class="w-8"
          @click="table.nextPage()"
          :disabled="!table.getCanNextPage()"
        >
          <Icon name="hugeicons:arrow-right-01" />
        </UiButton>
        <UiButton
          variant="outline"
          class="hidden lg:flex w-8"
          @click="table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
        >
          <Icon name="hugeicons:arrow-right-double" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
