export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')

  const data = await prisma.game.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: {
      images: {
        orderBy: { position: 'asc' },
        select: { url: true, alt: true, position: true }
      },
      skills: {
        select: { skill: true }
      },
      wordLists: true
    }
  })

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Le jeu est introuvable.'
    })
  }

  return data
})
