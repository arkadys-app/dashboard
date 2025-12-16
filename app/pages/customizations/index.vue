<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  title: 'Personnalisations'
})

const { data: wordlists, refresh } = await useFetch('/api/wordlists')
const { data: games } = await useFetch('/api/games')

const { add } = useToast()

type Schema = z.output<typeof WordlistSchemaClient>

const state = reactive<Partial<Schema>>({
  name: undefined,
  description: undefined,
  game: undefined,
  wordlist: undefined
})

const wordsCount = computed(() => {
  if (!state.wordlist) return 0

  return state.wordlist
    .split('\n')
    .map((word) => word.trim())
    .filter((word) => word.length > 0).length
})

const search = ref('')
const gameFilter = ref<string | undefined>(undefined)
const modalOpen = ref(false)
const loading = ref(false)

const filteredWordlists = computed(() => {
  if (!wordlists.value) return []

  return wordlists.value.filter((wordlist) => {
    const matchesSearch =
      normalizeText(wordlist.name).includes(normalizeText(search.value)) ||
      wordlist.words.some((word) =>
        normalizeText(word).includes(normalizeText(search.value))
      )

    const matchesGame = gameFilter.value
      ? wordlist.gameId === gameFilter.value
      : true

    return matchesSearch && matchesGame
  })
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  try {
    await $fetch('/api/wordlists', {
      method: 'post',
      body: {
        name: event.data.name,
        description: event.data.description,
        gameId: event.data.game,
        words: event.data.wordlist
          .split('\n')
          .map((word) => word.trim())
          .filter((word) => word.length > 0)
      }
    })
    await refresh()
    add({
      title: 'Liste de mots ajoutée',
      description: 'La liste de mots a été créée avec succès.'
    })

    modalOpen.value = false
  } catch (err: any) {
    add({
      variant: 'destructive',
      title: 'Erreur lors de la création de la liste de mots',
      description: err.data.message
    })
  } finally {
    loading.value = false
  }
}

function resetState() {
  state.name = undefined
  state.description = undefined
  state.game = undefined
  state.wordlist = undefined
}
</script>

<template>
  <div class="flex flex-col gap-6 py-6 px-4 lg:px-6">
    <div
      class="relative flex flex-col gap-y-4 w-full max-w-2xl max-h-[calc(100vh-112px)] mx-auto"
    >
      <div class="flex gap-2">
        <UiInput
          v-model="search"
          placeholder="Rechercher une liste de mots..."
          icon="hugeicons:search-01"
          class="w-full max-w-2xl"
        />
        <UiModal v-model:open="modalOpen" title="Créer une liste de mots">
          <UiButton label="Créer une liste de mots" @click="resetState" />

          <template #body="{ close }">
            <UiForm
              class="flex flex-col gap-4 mx-auto w-full"
              :schema="WordlistSchemaClient"
              :state="state"
              @submit="onSubmit"
            >
              <div class="flex flex-col gap-2 px-6 pt-4">
                <UiFormField name="name" label="Nom de la liste">
                  <UiInput
                    v-model="state.name"
                    type="text"
                    placeholder="Liste XYZ"
                    class="w-full"
                  />
                </UiFormField>
                <UiFormField name="description" label="Description">
                  <UiInput
                    v-model="state.description"
                    type="text"
                    class="w-full"
                  />
                </UiFormField>
                <UiFormField name="game" label="Jeu associé">
                  <UiSelect
                    v-model="state.game"
                    placeholder="Aucun jeu sélectionné"
                    class="w-full"
                    :items="
                      games?.map((game) => ({
                        label: game.name,
                        value: game.id
                      })) || []
                    "
                  />
                </UiFormField>
                <UiFormField
                  name="wordlist"
                  label="Liste de mots"
                  :description="`${wordsCount} mots`"
                >
                  <UiTextarea
                    v-model="state.wordlist"
                    placeholder="Saisissez un mot par ligne…"
                    class="w-full"
                    :rows="6"
                  />
                </UiFormField>
              </div>
              <div class="flex gap-2 border-t border-slate-300 px-6 py-4">
                <UiButton
                  variant="ghost"
                  label="Annuler"
                  class="ml-auto"
                  @click="close"
                />
                <UiButton
                  variant="primary"
                  type="submit"
                  label="Créer la liste"
                  :loading="loading"
                />
              </div>
            </UiForm>
          </template>
        </UiModal>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon name="hugeicons:filter" class="text-slate-500" />
          <p class="text-sm font-medium text-slate-500">Filtrer par jeu</p>
        </div>
        <UiSelect
          v-model="gameFilter"
          placeholder="Aucun jeu sélectionné"
          class="w-52"
          :items="
            games?.map((game) => ({
              label: game.name,
              value: game.id,
              onSelect: () => {
                if (gameFilter === game.id) {
                  gameFilter = undefined
                }
              }
            })) || []
          "
        />
      </div>
      <div
        v-if="filteredWordlists.length"
        class="relative flex flex-col gap-y-4 w-full max-w-2xl max-h-[calc(100vh-208px)] mx-auto"
      >
        <div
          class="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none"
        />
        <div
          class="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"
        />
        <ul class="flex flex-col gap-y-2 flex-1 overflow-y-scroll py-4">
          <WordlistCard
            v-for="wordlist in filteredWordlists"
            :key="wordlist.id"
            :title="wordlist.name"
            :href="`/customizations/${wordlist.slug}`"
            :description="`${wordlist.words.length} mots`"
            :global="wordlist.isGlobal"
            :author="
              wordlist.isGlobal
                ? 'Arkadys'
                : `${wordlist.user?.firstname} ${wordlist.user?.lastname}`
            "
          />
        </ul>
      </div>
      <div v-else class="py-4">
        <Empty
          icon="hugeicons:left-to-right-list-dash"
          title="Aucune liste trouvée"
          description="Malheureusement, aucune liste ne correspond à vos critères de recherche."
        />
      </div>
    </div>
  </div>
</template>
