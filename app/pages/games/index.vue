<script setup lang="ts">
const { data: games } = await useFetch('/api/games')
</script>

<template>
  <div class="flex flex-col">
    <form class="py-7">
      <SearchInput placeholder="Rechercher..." />
    </form>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
    >
      <GameCard
        v-for="game in games"
        :key="game.id"
        :name="game.name"
        :thumbnail="game.imageURL"
        :to="`/games/${game.id}`"
      />
    </div>
  </div>
</template>
