export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const childId = getRouterParam(event, 'childId')

  const data = await prisma.gameSession.findMany({
    where: {
      game: { OR: [{ id }, { slug: id }] },
      childId,
      child: { parentId: session.user.id }
    },
    include: { game: true },
    orderBy: { createdAt: 'desc' }
  })

  return data
})
