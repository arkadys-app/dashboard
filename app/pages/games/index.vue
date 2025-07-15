<script setup lang="tsx">
const supabase = useSupabaseClient<Database>()

const { data: games } = await useAsyncData('games', async () => {
  const { data } = await supabase.from('games').select('*')

  return data ?? []
})

const searchQuery = ref('')

const filteredGames = computed(() => {
  return games.value?.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="flex flex-col h-full px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between">
      <div class="py-3">
        <h1 class="text-teal-800 text-2xl font-bold">Jeux</h1>
        <p class="text-gray-600">{{ filteredGames?.length }} jeux</p>
      </div>
    </div>
    <div class="mt-4">
      <UiInput
        v-model="searchQuery"
        icon="lucide:search"
        placeholder="Rechercher un jeu"
        class="w-full"
      />
    </div>
    <div class="grid grid-cols-4 gap-4 mt-4">
      <NuxtLink
        v-for="game of searchQuery.length > 0 ? filteredGames : games"
        :key="game.id"
        :to="`/games/${game.slug}`"
      >
        <UiCard
          class="h-full p-0 overflow-hidden hover:bg-gray-50 transition-colors"
        >
          <AspectRatio :ratio="4 / 3">
            <NuxtImg
              :src="`/games/${game.slug}.png`"
              class="rounded-t-md w-full h-full object-cover"
            />
          </AspectRatio>
          <div class="p-4">
            <h4 class="text-lg font-bold text-teal-800">
              {{ game.name }}
            </h4>
          </div>
        </UiCard>
      </NuxtLink>
    </div>
  </div>
</template>
