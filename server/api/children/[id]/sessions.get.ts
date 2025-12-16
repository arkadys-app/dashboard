export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')

  const data = await prisma.gameSession.findMany({
    where: { childId: id, child: { parentId: session.user.id } },
    include: { game: true },
    orderBy: { createdAt: 'desc' }
  })

  return data
})
