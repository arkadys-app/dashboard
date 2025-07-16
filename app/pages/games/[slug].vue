<script setup lang="ts">
const { params } = useRoute()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const { data: game } = await useAsyncData(`game-${params.slug}`, async () => {
  const { data } = await supabase
    .from('games')
    .select(
      `
    *,
    game_skills (
      skills (
        name
      )
    ),
    word_lists (
      id,
      sound_name,
      words,
      in_game_id
    )
  `
    )
    .eq('slug', params.slug as string)
    .single()

  return data
})

const selectedInGameIds = ref<number[]>([])

watchEffect(async () => {
  if (!game.value || !user.value) return

  const allInGameIds = game.value.word_lists
  .map((l) => l.in_game_id)
  .filter((id): id is number => id !== null)

  const { data: settings } = await supabase
    .from('user_game_settings')
    .select('in_game_word_list_id_ban')
    .eq('user_id', user.value.id)
    .eq('game_id', game.value.id)
    .maybeSingle()

  const banned = settings?.in_game_word_list_id_ban ?? []

  selectedInGameIds.value = allInGameIds.filter((id) => !banned.includes(id))
})

const saveSelections = async () => {
  if (!game.value || !user.value) return

  const wordLists = game.value.word_lists

  const allInGameIds = wordLists.map((l) => l.in_game_id)
  const bannedInGameIds = allInGameIds.filter((id) => !selectedInGameIds.value.includes(id))
  const bannedWordListUUIDs = wordLists.filter((l) => bannedInGameIds.includes(l.in_game_id)).map((l) => l.id)

  const { error } = await supabase.from('user_game_settings').upsert({
    user_id: user.value.id,
    game_id: game.value.id,
    in_game_word_list_id_ban: bannedInGameIds,
    word_list_id_ban: bannedWordListUUIDs
  }, {
    onConflict: 'user_id,game_id'
  })
}
</script>

<template>
  <div class="flex flex-col h-full px-4">
    <h2 class="inline-flex items-center font-bold text-2xl py-3">
      <NuxtLink
        to="/games"
        class="text-teal-800/60 hover:text-teal-800 transition-colors"
      >
        Jeux
      </NuxtLink>
      <Icon
        name="lucide:chevron-right"
        class="text-teal-600 inline-block mx-1"
      />
      <span class="text-teal-800">{{ game?.name }}</span>
    </h2>
    <div class="grid grid-cols-2 gap-4 mt-6">
      <AspectRatio :ratio="4 / 3">
        <NuxtImg
          :src="`/games/${game?.slug}.png`"
          class="rounded-lg w-full h-full object-cover"
        />
      </AspectRatio>
      <div class="flex flex-col gap-4">
        <h4 class="text-teal-800 font-bold text-xl">Informations</h4>
        <div class="grid grid-cols-2">
          <span class="font-medium">Difficulté</span>
          <span class="font-bold">
            {{ Difficulty[game?.difficulty!] }}
          </span>
        </div>
        <div class="grid grid-cols-2">
          <span class="font-medium">Durée estimée</span>
          <span class="font-bold">{{ game?.estimated_time }} minutes</span>
        </div>
        <div class="grid grid-cols-2">
          <span class="font-medium">Compétences</span>
          <div
            class="inline-flex font-semibold text-teal-800 space-x-1 flex-wrap gap-y-1"
          >
            <span
              v-for="skill of game?.game_skills.map(
                (skill) => skill.skills.name
              )"
              class="bg-gray-100 rounded-md px-2 whitespace-nowrap select-none"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        <DialogRoot>
          <DialogTrigger as-child>
            <UiButton variant="primary" class="mt-auto">
              <Icon name="lucide:settings-2" class="mr-2" />
              Personnaliser le jeu
            </UiButton>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay class="fixed inset-0 z-30 bg-black/10" />
            <DialogContent
              class="fixed top-1/2 left-1/2 max-h-[85vh] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg z-40"
            >
              <DialogTitle class="font-bold text-teal-800">
                Personnaliser le jeu
              </DialogTitle>
              <DialogDescription class="text-sm text-gray-600 mt-2.5">
                Personnalisez les paramètres du jeu pour l'adapter à vos
                besoins.
              </DialogDescription>
              <CheckboxGroupRoot
                v-if="!game || game.word_lists.length > 0"
                v-model="selectedInGameIds"
                class="grid grid-cols-3 gap-3 mt-4 overflow-auto max-h-96"
              >
                <CheckboxRoot
                  as="div"
                  v-for="list of game?.word_lists"
                  :key="list.in_game_id"
                  :value="list.in_game_id"
                  class="relative cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 select-none hover:bg-gray-50 data-[state=checked]:bg-gray-100 transition-colors"
                >
                  <CheckboxIndicator class="absolute top-2 right-2">
                    <Icon name="lucide:check" class="text-teal-800" />
                  </CheckboxIndicator>
                  <span class="font-bold text-teal-800 text-sm">
                    {{ list.sound_name }}
                  </span>
                  <ul class="text-xs pl-3 mt-1">
                    <li
                      v-for="(word, index) of (list.words as []).slice(0, 5)"
                      :key="index"
                      class="list-disc"
                    >
                      {{ word }}
                    </li>
                    <li v-if="(list.words as []).length > 5" class="-ml-3">
                      + {{ (list.words as []).length - 5 }} mots...
                    </li>
                  </ul>
                </CheckboxRoot>
              </CheckboxGroupRoot>
              <p
                v-else
                class="text-sm text-gray-600 mt-4 text-center italic"
              >
                Aucune liste de mots disponible pour ce jeu.
              </p>
              <UiButton
                variant="primary"
                class="mt-4 w-full"
                @click="saveSelections()"
              >
                Enregistrer
              </UiButton>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </div>
    <div class="mt-6 flex flex-col gap-4">
      <span class="text-xl text-teal-800 font-bold">Description</span>
      <p>{{ game?.description }}</p>
    </div>
  </div>
</template>
