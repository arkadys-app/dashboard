import { Prisma } from '@prisma/client'
import slugify from '@sindresorhus/slugify'
import { generateId } from 'better-auth'

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const { data, error } = await readValidatedBody(
    event,
    WordlistSchemaServer.safeParse
  )

  if (error) {
    throw createError({
      statusCode: 422,
      message: error.issues[0].message,
      data: error.issues
    })
  }

  try {
    let wordlist = await prisma.wordList.findUnique({
      where: { id, userId: session.user.id, NOT: { isGlobal: true } }
    })

    if (!wordlist) {
      throw createError({
        statusCode: 404,
        message: 'Liste de mots introuvable.'
      })
    }

    let slug = wordlist.slug

    if (wordlist.name !== data.name) {
      slug = `${slugify(data.name)}-${generateId(6).toLowerCase()}`
    }

    wordlist = await prisma.wordList.update({
      where: { id, userId: session.user.id, NOT: { isGlobal: true } },
      data: {
        slug,
        name: data.name,
        description: data.description,
        gameId: data.gameId,
        userId: session.user.id,
        words: data.words
      }
    })

    return { status: true, data: wordlist }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw createError({
          statusCode: 404,
          message: 'Vous ne pouvez pas modifier cette liste de mots.'
        })
      }
    }

    throw err
  }
})
