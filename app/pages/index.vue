<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between w-full">
      <div class="space-y-3">
        <h1 class="text-3xl font-bold">Bonjour, David</h1>
        <p class="text-gray-600">Suivez la progression de Lucas ici !</p>
      </div>
      <ChildSelector />
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border border-gray-200 px-6 rounded-full shadow-sm"
    >
      <div class="flex gap-x-4 py-6">
        <span
          class="flex items-center justify-center size-12 bg-blue-100 rounded-full"
        >
          <Icon name="lucide:trophy" size="24" class="text-blue-500 my-0.5" />
        </span>
        <div class="flex-1">
          <p class="text-sm font-medium">Score moyen</p>
          <span class="font-bold text-xl"
            >72 <span class="text-sm">/ 100</span></span
          >
        </div>
      </div>
      <div class="flex gap-x-4 py-6">
        <span
          class="flex items-center justify-center size-12 bg-blue-100 rounded-full"
        >
          <Icon name="lucide:clock" size="24" class="text-blue-500 my-0.5" />
        </span>
        <div class="flex-1">
          <p class="text-sm font-medium">Temps par jeux</p>
          <span class="font-bold text-xl"
            >4 <span class="text-sm">min</span></span
          >
        </div>
      </div>
      <div class="flex gap-x-4 py-6">
        <span
          class="flex items-center justify-center size-12 bg-blue-100 rounded-full"
        >
          <Icon name="lucide:medal" size="24" class="text-blue-500 my-0.5" />
        </span>
        <div class="flex-1">
          <p class="text-sm font-medium">Compétence</p>
          <span class="font-bold text-xl">Vocabulaire</span>
        </div>
      </div>
      <div class="flex gap-x-4 py-6">
        <span
          class="flex items-center justify-center size-12 bg-blue-100 rounded-full"
        >
          <Icon
            name="lucide:gamepad-2"
            size="24"
            class="text-blue-500 my-0.5"
          />
        </span>
        <div class="flex-1">
          <p class="text-sm font-medium">Jeu préféré</p>
          <span class="font-bold text-xl">Falling Apples</span>
        </div>
      </div>
    </div>
    <div class="flex">
      <div
        class="flex flex-col w-full gap-6 px-6 py-4 border border-gray-200 rounded-4xl shadow-sm"
      >
        <h2 class="text-xl font-bold">Performance</h2>
        <div class="min-w-xl">
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
