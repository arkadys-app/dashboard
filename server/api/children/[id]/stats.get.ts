import { now } from '@internationalized/date'

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const today = now('utc')

  const weekAgo = today.subtract({ weeks: 1 })
  const twoWeeksAgo = today.subtract({ weeks: 2 })

  const avgCurrentWeek = await prisma.gameSession.aggregate({
    where: {
      childId: id,
      child: { parentId: session.user.id },
      createdAt: { gte: weekAgo.toDate() }
    },
    _avg: { score: true }
  })

  const avgPreviousWeek = await prisma.gameSession.aggregate({
    where: {
      childId: id,
      child: { parentId: session.user.id },
      createdAt: { gte: twoWeeksAgo.toDate(), lt: weekAgo.toDate() }
    },
    _avg: { score: true }
  })

  const averageScore = {
    score: Math.round(avgCurrentWeek._avg.score || 0),
    progress: Math.round(
      (avgCurrentWeek._avg.score || 0) - (avgPreviousWeek._avg.score || 0)
    )
  }

  const sumCurrentWeek = await prisma.gameSession.aggregate({
    where: {
      childId: id,
      child: { parentId: session.user.id },
      createdAt: { gte: weekAgo.toDate() }
    },
    _sum: { duration: true }
  })

  const sumPreviousWeek = await prisma.gameSession.aggregate({
    where: {
      childId: id,
      child: { parentId: session.user.id },
      createdAt: { gte: twoWeeksAgo.toDate(), lt: weekAgo.toDate() }
    },
    _sum: { duration: true }
  })

  const commitment = {
    time_spent: sumCurrentWeek._sum.duration || 0,
    progress:
      (sumCurrentWeek._sum.duration || 0) - (sumPreviousWeek._sum.duration || 0)
  }

  const skillCounts = await prisma.gameSession.groupBy({
    by: ['gameId'],
    where: { childId: id, child: { parentId: session.user.id } },
    _count: { gameId: true },
    orderBy: { _count: { gameId: 'desc' } },
    take: 1
  })

  let strongestSkill = null

  if (skillCounts.length > 0) {
    const game = await prisma.game.findUnique({
      where: { id: skillCounts[0].gameId },
      include: { skills: { select: { skill: { select: { name: true } } } } }
    })

    strongestSkill = { name: game?.skills[0].skill.name ?? null }
  } else {
    strongestSkill = { name: null }
  }

  const favoriteGameData = await prisma.gameSession.groupBy({
    by: ['gameId'],
    where: { childId: id, child: { parentId: session.user.id } },
    _count: { gameId: true },
    orderBy: { _count: { gameId: 'desc' } },
    take: 1
  })

  let favoriteGame = null

  if (favoriteGameData.length > 0) {
    favoriteGame = await prisma.game.findUnique({
      where: { id: favoriteGameData[0].gameId },
      select: { name: true }
    })
  }

  return {
    average_score: averageScore,
    commitment,
    strongest_skill: strongestSkill.name,
    favorite_game: favoriteGame?.name ?? null
  }
})
