export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const data = await prisma.game.findMany({
    orderBy: { name: 'asc' },
    include: {
      images: {
        orderBy: { position: 'asc' },
        select: { url: true, alt: true, position: true }
      },
      skills: {
        select: { skill: true }
      }
    }
  })

  return data
})
