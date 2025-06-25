<script setup lang="ts">
const { data: game } = await useFetch(`/api/games/${useRoute().params.id}`)
</script>

<template>
  <div class="flex flex-col py-6">
    <div class="flex space-x-4 items-center">
      <NuxtLink
        to="/games"
        class="flex items-center justify-center size-10 border-2 border-zinc-200 hover:bg-zinc-100 rounded-full"
      >
        <Icon name="ri:arrow-left-s-line" size="20" />
      </NuxtLink>
      <NuxtImg
        :src="game.imageURL"
        width="64"
        height="64"
        class="object-cover rounded-xl"
      />
      <h1 class="text-xl font-bold">{{ game.name }}</h1>
    </div>
    <div class="flex flex-col space-y-4">
      <span class="font-medium">Description</span>
      <p class="text-sm text-gray-600">{{ game.description }}</p>
    </div>
    <ul class="flex space-x-2">
      <li
        v-for="skills of game.game_skills.map((gs: any) => gs.skills)"
        class="bg-zinc-100 rounded-full px-4 py-2 text-sm font-bold text-zinc-500"
      >
        {{ skills.name }}
      </li>
    </ul>
  </div>
</template>
