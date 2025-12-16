<script setup lang="ts">
definePageMeta({
  title: 'Liste des jeux'
})

const route = useRoute()
const { currentChild } = useChild()

const { data: games } = await useFetch('/api/games')
const { data: skills } = await useFetch('/api/skills')
const { data: favoriteGame } = await useFetch(
  `/api/children/${currentChild.value?.id}/favorite-game`
)

const search = ref('')
const selectedSkills = ref<string[]>(
  route.query.skill ? [route.query.skill as string] : []
)

const filteredGames = computed(() => {
  if (!games.value) return []

  return games.value.filter((game) => {
    const matchesSearch = normalizeText(game.name).includes(
      normalizeText(search.value)
    )
    const matchesSkills =
      selectedSkills.value.length === 0 ||
      selectedSkills.value.every((skill) =>
        game.skills.some((s) => s.skill.slug === skill)
      )

    return matchesSearch && matchesSkills
  })
})
</script>

<template>
  <div class="flex flex-col gap-6 py-6 px-4 lg:px-6">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <UiInput
        v-model="search"
        placeholder="Rechercher un jeu..."
        icon="hugeicons:search-01"
        class="w-full max-w-2xl"
      />
      <UiSelect
        v-model="selectedSkills"
        :items="
          skills?.map((skill) => ({ label: skill.name, value: skill.slug })) ||
          []
        "
        :content="{ align: 'end' }"
        placeholder="Compétences"
        multiple
        class="w-full sm:w-64"
      />
    </div>
    <div class="text-sm font-medium">
      Tout les jeux ({{ filteredGames.length }})
    </div>
    <div
      class="flex flex-col gap-8 @xl/main:grid @xl/main:grid-cols-2 @5xl/main:grid-cols-3"
    >
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :title="game.name"
        :image="game.images[0]?.url || ''"
        :link="`/games/${game.slug}`"
        :tags="game.skills.map((s) => s.skill.name)"
        :favorite="favoriteGame?.id === game.id"
      />
    </div>
    <div v-if="filteredGames.length === 0">
      <Empty
        icon="hugeicons:game-controller-03"
        title="Aucun jeu trouvé"
        description="Malheureusement, aucun jeu ne correspond à vos critères de recherche."
      />
    </div>
  </div>
</template>
