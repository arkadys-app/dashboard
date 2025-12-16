export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const game = await prisma.game.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    select: { id: true }
  })

  if (!game) {
    throw createError({
      statusCode: 404,
      message: 'Le jeu est introuvable.'
    })
  }

  const wordLists = await prisma.wordList.findMany({
    where: {
      gameId: game.id,
      OR: [{ isGlobal: true }, { userId: session.user.id }]
    },
    include: {
      userCustomizations: {
        where: { userId: session.user.id },
        select: { isEnabled: true }
      }
    },
    orderBy: [{ isGlobal: 'desc' }, { name: 'asc' }]
  })

  const data = wordLists.map((wordList) => ({
    ...wordList,
    isEnabled: wordList.userCustomizations[0]?.isEnabled ?? wordList.isGlobal,
    userCustomizations: undefined
  }))

  return data
})
