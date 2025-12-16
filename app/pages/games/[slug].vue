<script setup lang="ts">
const { currentChild } = useChild()
const { params } = useRoute()
const NuxtLink = resolveComponent('NuxtLink')

const { data: game } = await useFetch(`/api/games/${params.slug}`)
const { data: wordLists, refresh } = await useFetch(
  `/api/games/${params.slug}/wordlists`
)
const { data: sessions } = await useFetch(
  `/api/games/${params.slug}/children/${currentChild.value?.id}/sessions`
)

if (!game.value) {
  throw createError({ statusCode: 404, statusMessage: 'Jeu non trouvé' })
}

const loadingStates = ref<Record<string, boolean>>({})

async function toggleWordList(wordListId: string, isEnabled: boolean) {
  loadingStates.value[wordListId] = true

  try {
    await $fetch(`/api/games/${game.value?.id}/customizations/${wordListId}`, {
      method: 'PUT',
      body: { state: isEnabled }
    })
  } catch (error) {
    console.error('Error updating word list customization:', error)
  } finally {
    loadingStates.value[wordListId] = false
    await refresh()
  }
}

definePageMeta({
  title: 'Détails du jeu'
})
</script>

<template>
  <div class="flex flex-col gap-6 py-6 px-4 lg:px-6">
    <div class="flex items-center gap-4">
      <UiTooltip text="Retour aux jeux">
        <UiButton
          :as="NuxtLink"
          to="/games"
          variant="ghost"
          class="w-8 text-slate-500 hover:bg-slate-100"
        >
          <Icon name="hugeicons:arrow-left-02" class="size-5" />
        </UiButton>
      </UiTooltip>
      <h1 class="text-3xl font-bold">{{ game?.name }}</h1>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="flex-1 min-w-0">
        <UiCarousel
          loop
          :autoplay="{ delay: 6000, stopOnInteraction: false }"
          :items="game?.images || []"
        >
          <template #default="{ item }">
            <NuxtImg
              :src="item.url"
              :alt="item.alt ?? undefined"
              class="aspect-[2/1] object-cover object-top w-full h-full rounded-xl transform transition-transform duration-200 group-hover/game-card:scale-110"
            />
          </template>
          <template #thumbnail="{ item }">
            <NuxtImg
              :src="item.url"
              :alt="item.alt ?? undefined"
              class="aspect-[2/1] object-cover object-top w-24 pointer-events-none"
            />
          </template>
        </UiCarousel>
        <div class="flex flex-col gap-6 pt-24">
          <UiCard class="p-4 gap-2">
            <h4 class="font-medium">Description</h4>
            <p class="text-sm font-medium text-slate-500">
              {{ game?.description }}
            </p>
          </UiCard>
          <UiCard v-if="game?.skills.length" class="p-4 gap-2">
            <h4 class="font-medium">Compétences</h4>
            <div class="flex flex-wrap gap-2">
              <UiTooltip
                v-for="skill in game.skills.map((s) => s.skill) || []"
                :key="skill.id"
                :text="skill.description || ''"
                class="max-w-96 text-center"
              >
                <UiBadge
                  :as="NuxtLink"
                  :to="`/games?skill=${skill.slug}`"
                  class="text-sm bg-slate-100 transition-colors"
                >
                  {{ skill.name }}
                </UiBadge>
              </UiTooltip>
            </div>
          </UiCard>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <UiCard class="p-4 gap-2">
          <div class="flex items-baseline gap-2">
            <h4 class="font-medium">Personnalisations</h4>
            <p class="text-sm text-slate-500">
              {{ wordLists?.filter((wl) => wl.isEnabled).length }} /
              {{ wordLists?.length }} listes
            </p>
          </div>
          <div v-if="wordLists?.length" class="flex flex-col">
            <div
              v-for="wordList in wordLists"
              :key="wordList.id"
              class="flex items-center justify-between"
            >
              <UiModal :title="`${wordList.name}`">
                <UiButton
                  variant="link"
                  icon="hugeicons:left-to-right-list-dash"
                  class="h-8 flex items-center justify-start"
                >
                  <div class="flex items-baseline gap-2">
                    <span class="text-sm font-medium">{{ wordList.name }}</span>
                    <p class="text-xs text-slate-500">
                      {{ wordList.words.length }} mots
                    </p>
                  </div>
                </UiButton>

                <template #body>
                  <ul class="grid gap-2 grid-cols-4 px-6 py-4">
                    <UiBadge
                      v-for="word in wordList.words"
                      as="li"
                      class="block w-full text-sm text-center font-medium text-slate-500 py-1"
                      :key="word"
                    >
                      {{ word }}
                    </UiBadge>
                  </ul>
                </template>
              </UiModal>
              <UiSwitch
                v-model="wordList.isEnabled"
                :loading="loadingStates[wordList.id] ?? false"
                @change="toggleWordList(wordList.id, $event)"
              />
            </div>
          </div>
          <div v-else class="text-sm font-medium text-slate-500 italic">
            Aucune liste de mots disponible.
          </div>
        </UiCard>
        <GameSessionTable v-if="sessions" :data="sessions" class="mt-6" />
      </div>
    </div>
  </div>
</template>
