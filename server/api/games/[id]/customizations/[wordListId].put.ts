export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const wordListId = getRouterParam(event, 'wordListId')!
  const { data, error } = await readValidatedBody(
    event,
    ToggleWordlistSchema.safeParse
  )

  if (error) {
    throw createError({
      statusCode: 422,
      message: error.issues[0].message,
      data: error.issues
    })
  }

  const wordList = await prisma.wordList.findUnique({
    where: { id: wordListId, game: { id } }
  })

  if (!wordList) {
    throw createError({
      statusCode: 404,
      message: 'La liste de mots est introuvable pour ce jeu.'
    })
  }

  if (wordList.isGlobal && data.state === true) {
    await prisma.gameCustomization.deleteMany({
      where: {
        userId: session.user.id,
        gameId: wordList.gameId,
        wordListId
      }
    })

    return { success: true }
  }

  await prisma.gameCustomization.upsert({
    where: {
      userId_gameId_wordListId: {
        userId: session.user.id,
        gameId: wordList.gameId,
        wordListId
      }
    },
    create: {
      userId: session.user.id,
      gameId: wordList.gameId,
      wordListId,
      isEnabled: data.state
    },
    update: {
      isEnabled: data.state
    }
  })

  return { success: true }
})
