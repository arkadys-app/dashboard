import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const { childId } = getQuery(event)

  if (!childId || typeof childId !== 'string') {
    throw createError({ statusCode: 400, message: 'childId requis' })
  }

  const { data, error } = await client
    .from('child_game_history')
    .select(
      `
      game:game_id (
        name
      )
    `
    )
    .eq('child_id', childId)

  if (error) throw createError({ statusCode: 500, message: error.message })

  const counts: Record<string, number> = {}

  for (const entry of data) {
    const name = entry.game.name
    counts[name] = (counts[name] || 0) + 1
  }

  const favoriteGame =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

  return { favoriteGame }
})
