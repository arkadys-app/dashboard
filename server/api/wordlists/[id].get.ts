export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const data = await prisma.wordList.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      AND: [{ OR: [{ isGlobal: true }, { userId: session.user.id }] }]
    },
    include: { user: true, game: true }
  })

  return data
})
