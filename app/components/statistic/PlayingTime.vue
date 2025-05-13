<template>
  <div
    class="flex flex-col gap-y-6 p-6 rounded-2xl shadow-md bg-white shadow-slate-900/6"
  >
    <div class="flex items-center gap-x-3">
      <div
        class="flex items-center justify-center size-6 rounded-full border border-slate-200"
      >
        <Icon name="tabler:clock" size="16" class="text-cyan-500" />
      </div>
      <span class="text-xl font-semibold leading-5">Temps de Jeu</span>
    </div>
    <div class="flex items-end gap-x-6">
      <div class="flex flex-col gap-y-2">
        <div class="flex items-end gap-x-1">
          <span class="text-5xl font-bold leading-8">3</span>
          <span class="text-xl font-medium leading-4 text-slate-600">h</span>
          <span class="text-5xl font-bold leading-8">15</span>
          <span class="text-xl font-medium leading-4 text-slate-600">min</span>
        </div>
        <div class="flex items-center gap-x-1 text-sm leading-4 text-red-500">
          -30min
          <Icon name="tabler:trending-down" size="16" />
        </div>
      </div>
      <!-- <div class="flex items-end gap-x-1">
        <span class="text-4xl font-bold leading-6">3</span>
        <span class="text-base font-medium leading-3 text-slate-600">h</span>
        <span class="text-4xl font-bold leading-6">15</span>
        <span class="text-base font-medium leading-3 text-slate-600">min</span>
      </div> -->
      <div class="flex-1 w-0 h-16">
        <ChartBar
          :data="[
            { x: 0, y: 4 },
            { x: 1, y: 3 },
            { x: 2, y: 2 },
            { x: 3, y: 5 },
            { x: 4, y: 3 },
            { x: 5, y: 4 },
            { x: 6, y: 2 }
          ]"
        />
      </div>
    </div>
  </div>
</template>
