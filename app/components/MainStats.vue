<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
    <UiCard class="flex flex-col gap-2 px-4 py-3">
      <span class="flex items-center gap-2 text-gray-600 text-xs">
        <Icon name="lucide:trophy" size="12" />
        Score moyen
      </span>
      <div class="text-teal-800 font-bold">
        <span class="text-2xl">72</span>
        <span class="ml-1">/ 100</span>
      </div>
    </UiCard>
    <UiCard class="flex flex-col gap-2 px-4 py-3">
      <span class="flex items-center gap-2 text-gray-600 text-xs">
        <Icon name="lucide:clock" size="12" />
        Temps par jeux
      </span>
      <div class="text-teal-800 font-bold">
        <span class="text-2xl">4</span>
        <span class="ml-1">min</span>
      </div>
    </UiCard>
    <UiCard class="flex flex-col gap-2 px-4 py-3">
      <span class="flex items-center gap-2 text-gray-600 text-xs">
        <Icon name="lucide:medal" size="12" />
        Compétence
      </span>
      <div class="text-teal-800 font-bold">
        <span class="text-2xl">Vocabulaire</span>
      </div>
    </UiCard>
    <UiCard class="flex flex-col gap-2 px-4 py-3">
      <span class="flex items-center gap-2 text-gray-600 text-xs">
        <Icon name="lucide:star" size="12" />
        Jeu préféré
      </span>
      <div class="text-teal-800 font-bold">
        <span class="text-2xl">Chute de Pommes</span>
      </div>
    </UiCard>
  </div>
</template>
