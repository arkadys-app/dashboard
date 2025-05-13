<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between w-full py-7">
      <h1 class="text-2xl font-bold">Bienvenue David 👋</h1>
      <ChildSelector />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="flex gap-x-4 border-2 border-zinc-200 rounded-2xl px-6 py-4">
        <Icon name="ri:trophy-fill" size="24" class="text-blue-500 my-0.5" />
        <div class="flex-1">
          <span class="font-bold text-xl">72</span>
          <p class="text-sm text-zinc-400 font-medium">Score total moyen</p>
        </div>
      </div>
      <div class="flex gap-x-4 border-2 border-zinc-200 rounded-2xl px-6 py-4">
        <Icon name="ri:hourglass-fill" size="24" class="text-blue-500 my-0.5" />
        <div class="flex-1">
          <span class="font-bold text-xl">4 min</span>
          <p class="text-sm text-zinc-400 font-medium">Temps moyen par jeux</p>
        </div>
      </div>
      <div class="flex gap-x-4 border-2 border-zinc-200 rounded-2xl px-6 py-4">
        <Icon name="ri:medal-fill" size="24" class="text-blue-500 my-0.5" />
        <div class="flex-1">
          <span class="font-bold text-xl">Vocabulaire</span>
          <p class="text-sm text-zinc-400 font-medium">Compétence développé</p>
        </div>
      </div>
      <div class="flex gap-x-4 border-2 border-zinc-200 rounded-2xl px-6 py-4">
        <Icon name="ri:gamepad-fill" size="24" class="text-blue-500 my-0.5" />
        <div class="flex-1">
          <span class="font-bold text-xl">Falling Apples</span>
          <p class="text-sm text-zinc-400 font-medium">Jeu préféré</p>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col gap-6">
        <h2 class="text-2xl font-bold">Score cette semaine</h2>
        <div
          class="min-w-xl flex gap-x-4 border-2 border-zinc-200 rounded-2xl px-6 pt-8 pb-4"
        >
          <ChartLine
            :data="[
              { x: 0, y: 68 },
              { x: 1, y: 74 },
              { x: 2, y: 70 },
              { x: 3, y: 76 },
              { x: 4, y: 69 },
              { x: 5, y: 71 },
              { x: 6, y: 76 }
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
