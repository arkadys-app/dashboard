import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const { childId } = getQuery(event)

  if (!childId || typeof childId !== 'string') {
    throw createError({ statusCode: 400, message: 'childId requis' })
  }

  const { data, error } = await client
    .from('child_game_history')
    .select('duration')
    .eq('child_id', childId)

  if (error) throw createError({ statusCode: 500, message: error.message })

  const durations = data.map((d) => d.duration)
  const averageDuration = durations.length
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0

  return { averageDuration }
})
