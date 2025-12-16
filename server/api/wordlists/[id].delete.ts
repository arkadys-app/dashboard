import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')

  try {
    await prisma.wordList.delete({
      where: { id, userId: session.user.id, NOT: { isGlobal: true } }
    })

    return { status: true }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw createError({
          statusCode: 404,
          message: 'Vous ne pouvez pas supprimer cette liste de mots.'
        })
      }
    }

    throw err
  }
})
