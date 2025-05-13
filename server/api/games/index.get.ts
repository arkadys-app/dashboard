export default defineEventHandler(async () => {
  try {
    const { data } = await supabase.from('games').select()

    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch games'
    })
  }
})
