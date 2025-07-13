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
      description,
      words,
      is_public
    )
  `
    )
    .eq('slug', params.slug as string)
    .single()

  return data
})

const selectedLists = ref<string[]>([])

watchEffect(async () => {
  if (!game.value || !user.value) return

  const allListIds = game.value.word_lists.map((list) => list.id)

  const { data: userLists } = await supabase
    .from('user_word_lists')
    .select('word_list_id')
    .eq('user_id', user.value.id)

  selectedLists.value =
    userLists!.length > 0
      ? allListIds.filter(
          (id) => !userLists!.map((l) => l.word_list_id).includes(id)
        )
      : allListIds
})

const saveSelections = async () => {
  if (!game.value || !user.value) return

  const allListIds = game.value.word_lists.map((l) => l.id)
  const disabledListIds = allListIds.filter(
    (id) => !selectedLists.value.includes(id)
  )

  await supabase.from('user_word_lists').delete().eq('user_id', user.value.id)

  if (disabledListIds.length > 0) {
    const inserts = disabledListIds.map((id) => ({
      user_id: user.value!.id,
      word_list_id: id
    }))

    await supabase.from('user_word_lists').insert(inserts)
  }
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
              Customiser le jeu
            </UiButton>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay class="fixed inset-0 z-30 bg-black/10" />
            <DialogContent
              class="fixed top-1/2 left-1/2 max-h-[85vh] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg z-40"
            >
              <DialogTitle class="font-bold text-teal-800">
                Customiser le jeu
              </DialogTitle>
              <DialogDescription class="text-sm text-gray-600 mt-2.5">
                Personnalisez les paramètres du jeu pour l'adapter à vos
                besoins.
              </DialogDescription>
              <CheckboxGroupRoot
                v-model="selectedLists"
                class="grid grid-cols-3 gap-3 mt-4"
              >
                <CheckboxRoot
                  as="div"
                  v-for="list of game?.word_lists"
                  :key="list.id"
                  :value="list.id"
                  class="relative cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 select-none hover:bg-gray-50 data-[state=checked]:bg-gray-100 transition-colors"
                >
                  <CheckboxIndicator class="absolute top-2 right-2">
                    <Icon name="lucide:check" class="text-teal-800" />
                  </CheckboxIndicator>
                  <span class="font-bold text-teal-800 text-sm"
                    >Lettre {{ list.sound_name }}</span
                  >
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
