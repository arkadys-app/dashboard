<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()

const { data: children } = await useAsyncData('children', async () => {
  const { data } = await supabase
    .from('children')
    .select('*')
    .eq('user_id', user.value!.id)

  return data ?? []
})

const selectedChildId = ref<string>()
const selectedChildName = ref<string>()

// Stats
const score = ref<number>(0)
const duration = ref<number>(0)
const skill = ref<string>('Aucune')
const favorite = ref<string>('Aucun')

onMounted(() => {
  const storedChildId = localStorage.getItem('childId')
  const fallback = children.value?.[0]
  const selected =
    children.value?.find((c) => c.id === storedChildId) ?? fallback

  if (selected) {
    selectedChildId.value = selected.id
    selectedChildName.value = selected.firstname
  }
})

// Mise à jour manuelle des stats quand l'enfant change
watchEffect(async () => {
  if (!selectedChildId.value) return

  const [scoreData, durationData, skillData, favoriteData] = await Promise.all([
    $fetch('/api/stats/average-score', {
      query: { childId: selectedChildId.value }
    }),
    $fetch('/api/stats/game-duration', {
      query: { childId: selectedChildId.value }
    }),
    $fetch('/api/stats/top-skill', {
      query: { childId: selectedChildId.value }
    }),
    $fetch('/api/stats/favorite-game', {
      query: { childId: selectedChildId.value }
    })
  ])

  score.value = scoreData.averageScore ?? 0
  duration.value = durationData.averageDuration ?? 0
  skill.value = skillData.topSkill ?? 'Aucune'
  favorite.value = favoriteData.favoriteGame ?? 'Aucun'
})

const setChildId = (childId: string) => {
  localStorage.setItem('childId', childId)
  selectedChildId.value = childId
  const match = children.value?.find((c) => c.id === childId)
  selectedChildName.value = match?.firstname
}
</script>

<template>
  <div class="flex flex-col h-full px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between">
      <div class="py-3">
        <h1 class="text-teal-800 text-2xl font-bold">
          Bienvenue {{ user?.user_metadata.firstname }} 👋
        </h1>
        <p class="text-gray-600">
          Suivez la progression de {{ selectedChildName }} ici !
        </p>
      </div>
      <div class="py-3">
        <ClientOnly>
          <ChildSwitcher
            v-model="selectedChildName"
            :children="children!"
            @child-selected="(child) => setChildId(child.id)"
          />
        </ClientOnly>
      </div>
    </div>
    <MainStats
      :data="{
        averageScore: score ?? 0,
        averageDuration: duration ?? 0,
        favoriteGame: favorite ?? 'Aucun',
        skill: skill ?? 'Aucune'
      }"
    />
    <div class="mt-4 flex-1">
      <UiCard class="flex flex-col pt-3 h-full">
        <h2 class="text-2xl font-bold text-teal-800">Performances</h2>
        <PerformanceChart v-if="selectedChildId" :child-id="selectedChildId" />
        <p v-else class="text-gray-600 my-auto text-center">
          Sélectionnez un enfant pour voir ses performances.
        </p>
      </UiCard>
    </div>
  </div>
</template>
