import type { Game } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const favoriteGameData = await prisma.gameSession.groupBy({
    by: ['gameId'],
    where: {
      childId: getRouterParam(event, 'id'),
      child: { parentId: session.user.id }
    },
    _count: { gameId: true },
    orderBy: { _count: { gameId: 'desc' } },
    take: 1
  })

  let favoriteGame: Game | null = null

  if (favoriteGameData.length > 0) {
    favoriteGame = await prisma.game.findUnique({
      where: { id: favoriteGameData[0].gameId }
    })
  }

  return favoriteGame ?? null
})
