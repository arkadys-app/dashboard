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
        game_skills (
          skill:skills (
            name
          )
        )
      )
    `
    )
    .eq('child_id', childId)

  if (error) throw createError({ statusCode: 500, message: error.message })

  const skillCounts: Record<string, number> = {}

  for (const entry of data) {
    for (const gs of entry.game.game_skills ?? []) {
      const name = gs.skill.name
      skillCounts[name] = (skillCounts[name] || 0) + 1
    }
  }

  const topSkill =
    Object.entries(skillCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

  return { topSkill }
})
