<script setup lang="ts">
const { currentChild } = useChild()

const childId = computed(() => currentChild.value?.id)

const { data, status } = await useAsyncData(
  `child-data-${childId.value}`,
  async () => {
    const headers = import.meta.server ? useRequestHeaders() : undefined

    const [scores, sessions, stats] = await Promise.all([
      $fetch(`/api/children/${childId.value}/scores`, { headers }),
      $fetch(`/api/children/${childId.value}/sessions`, { headers }),
      $fetch(`/api/children/${childId.value}/stats`, { headers })
    ])

    return { scores, sessions, stats }
  },
  {
    watch: [childId]
  }
)

const scores = computed(() => data.value?.scores)
const sessions = computed(() => data.value?.sessions)
const stats = computed(() => data.value?.stats)
</script>

<template>
  <ClientOnly>
    <div
      v-if="status === 'success'"
      class="flex flex-col gap-6 py-6 px-4 lg:px-6"
    >
      <div
        v-if="stats"
        class="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
      >
        <StatCard
          title="Score moyen"
          :value="`${stats.average_score.score || 0}%`"
          description="Moyenne des scores obtenus cette semaine"
          :progress="{
            value: `${stats.average_score.progress}%`,
            type:
              stats.average_score.progress > 0
                ? 'increase'
                : stats.average_score.progress < 0
                  ? 'decrease'
                  : 'neutral'
          }"
        />
        <StatCard
          title="Engagement"
          :value="formatDuration(stats.commitment.time_spent || 0)"
          description="Temps passé à jouer cette semaine"
          :progress="{
            value: formatDuration(stats?.commitment.progress || 0),
            type:
              stats.commitment.progress > 0
                ? 'increase'
                : stats.commitment.progress < 0
                  ? 'decrease'
                  : 'neutral'
          }"
        />
        <StatCard
          title="Point fort"
          :value="stats.strongest_skill || 'Aucune donnée'"
          description="La compétence la plus travaillée cette semaine"
        />
        <StatCard
          title="Jeu préféré"
          :value="stats.favorite_game || 'Aucune donnée'"
          description="Le jeu le plus joué cette semaine"
        />
      </div>
      <ScoreChart :data="scores || []" />
      <GameSessionTable v-if="sessions" :data="sessions || []" />
    </div>
    <HomeSkeleton v-else />

    <template #fallback>
      <HomeSkeleton />
    </template>
  </ClientOnly>
</template>
