<script setup lang="ts">
import type { ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'

const supabase = useSupabaseClient<Database>()

const props = defineProps<{
  childId: string
}>()

const data = ref<ChartData<'line'>>({
  labels: [],
  datasets: []
})

watchEffect(async () => {
  if (!props.childId) return

  const { data: perfRaw } = await supabase
    .from('child_game_history')
    .select(
      `
      *,
      game:game_id (
        name
      )
    `
    )
    .eq('child_id', props.childId)
    .order('played_at', { ascending: true })
    .limit(50)

  if (!perfRaw) return

  // Étape 1 : Grouper les performances par date et jeu
  const scoresByDateAndGame: Record<string, Record<string, number[]>> = {}
  const allDates: Set<string> = new Set()
  const allGames: Set<string> = new Set()

  for (const perf of perfRaw) {
    const date = new Date(perf.played_at)
    const label = `${date.getDate()}/${date.getMonth() + 1}`
    const game = perf.game.name

    allDates.add(label)
    allGames.add(game)

    if (!scoresByDateAndGame[game]) scoresByDateAndGame[game] = {}
    if (!scoresByDateAndGame[game][label]) scoresByDateAndGame[game][label] = []

    scoresByDateAndGame[game][label].push(perf.score)
  }

  const labels = Array.from(allDates).sort((a, b) => {
    const [da = 0, ma = 0] = a.split('/').map(Number)
    const [db = 0, mb = 0] = b.split('/').map(Number)
    return (
      new Date(2024, ma - 1, da).getTime() -
      new Date(2024, mb - 1, db).getTime()
    )
  })

  const colorPalette = [
    '#2b7fff',
    '#ff6900',
    '#00c49a',
    '#ff4b5c',
    '#a259ff',
    '#ffc107'
  ]
  let colorIndex = 0

  const datasets = Array.from(allGames).map((gameName) => {
    const color = colorPalette[colorIndex % colorPalette.length]
    colorIndex++

    const scoresPerDate = labels.map((dateLabel) => {
      const scores = scoresByDateAndGame[gameName]?.[dateLabel] ?? []
      if (scores.length === 0) return null // ou NaN ou 0
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      return Math.round(avg)
    })

    return {
      label: gameName,
      data: scoresPerDate,
      borderColor: color,
      backgroundColor: color,
      tension: 0.4,
      spanGaps: true
    }
  })

  data.value = {
    labels,
    datasets
  }
})
</script>

<template>
  <div class="flex-1">
    <Line
      :data="data"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }"
    />
  </div>
</template>
