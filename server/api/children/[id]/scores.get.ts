export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')

  const sessions = await prisma.gameSession.findMany({
    where: { childId: id, child: { parentId: session.user.id } },
    select: { score: true, createdAt: true }
  })

  const grouped: Record<string, number[]> = {}

  for (const s of sessions) {
    const date = s.createdAt.toISOString().split('T')[0]

    if (!grouped[date]) grouped[date] = []
    grouped[date].push(s.score)
  }

  const data = Object.entries(grouped).map(([date, scores]) => ({
    date,
    average: scores.reduce((a, b) => a + b, 0) / scores.length
  }))

  return data.sort((a, b) => a.date.localeCompare(b.date))
})
