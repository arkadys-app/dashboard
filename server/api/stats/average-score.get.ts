import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const { childId } = getQuery(event)

  if (!childId || typeof childId !== 'string') {
    throw createError({ statusCode: 400, message: 'childId requis' })
  }

  const { data, error } = await client
    .from('child_game_history')
    .select('score')
    .eq('child_id', childId)

  if (error) throw createError({ statusCode: 500, message: error.message })

  const scores = data.map((d) => d.score)
  const averageScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0

  return { averageScore }
})
