export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    const { data } = await supabase.from('games').select().eq('id', id).single()

    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch games'
    })
  }
})
