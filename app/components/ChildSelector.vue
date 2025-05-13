<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'reka-ui'

const items = [
  {
    name: 'Lucas',
    avatar: 'https://api.dicebear.com/9.x/dylan/svg?seed=Lucas'
  },
  {
    name: 'Mathieu',
    avatar: 'https://api.dicebear.com/9.x/dylan/svg?seed=Mathieu'
  }
]
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger
      class="select-none h-11 px-3 flex gap-x-2 items-center font-bold text-lg rounded-xl hover:bg-zinc-100 data-[state=open]:bg-zinc-100"
    >
      <NuxtImg :src="items[0]?.avatar" width="24" class="rounded-full" />
      <span class="pr-1">{{ items[0]?.name }}</span>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        :side-offset="4"
        class="min-w-52 border-2 border-zinc-200 rounded-2xl overflow-hidden bg-white"
      >
        <DropdownMenuLabel
          class="uppercase flex px-4 h-10 items-center font-bold text-xs text-zinc-400"
        >
          Mes enfants
        </DropdownMenuLabel>
        <DropdownMenuSeparator class="h-0.5 bg-zinc-200" />
        <DropdownMenuItem
          v-for="item of items"
          class="px-3 h-11 gap-x-2 flex items-center font-bold data-[highlighted]:bg-zinc-100 cursor-pointer"
        >
          <NuxtImg :src="item.avatar" width="24" class="rounded-full" />
          {{ item.name }}
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-0.5 bg-zinc-200" />
        <DropdownMenuItem
          class="px-3 h-11 gap-x-2 flex items-center font-bold data-[highlighted]:bg-zinc-100 cursor-pointer"
        >
          <span
            class="size-6 border-2 border-zinc-300 rounded-full flex items-center justify-center"
          >
            <Icon name="ri:add-fill" class="text-zinc-400" />
          </span>
          Ajouter un enfant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
