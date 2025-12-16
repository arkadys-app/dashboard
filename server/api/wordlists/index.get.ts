export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const data = await prisma.wordList.findMany({
    where: {
      OR: [{ isGlobal: true }, { userId: session.user.id }]
    },
    include: { user: true },
    orderBy: [{ isGlobal: 'asc' }, { name: 'asc' }]
  })

  return data
})
