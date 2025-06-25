<script setup lang="ts">
const { data: games } = await useFetch('/api/games')

const search = ref('')

const filteredGames = computed(() => {
  if (!search.value) return games.value

  return games.value?.filter((game) =>
    game.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div class="flex flex-col">
    <form class="mb-8">
      <SearchInput v-model="search" placeholder="Rechercher..." />
    </form>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
    >
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :name="game.name"
        :thumbnail="game.imageURL"
        :to="`/games/${game.id}`"
      />
    </div>
  </div>
</template>
