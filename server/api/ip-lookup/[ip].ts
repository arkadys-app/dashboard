export default defineEventHandler(async (event) => {
  const ip = getRouterParam(event, 'ip')
  const data = await $fetch<{
    status: string
    country?: string
    city?: string
  }>(`http://ip-api.com/json/${ip}?fields=status,country,city`)

  if (data.status !== 'success') {
    throw createError({
      statusCode: 400,
      message: "L'adresse IP est invalide."
    })
  }

  return data
})
