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

  const body = await readBody(event)
  const slug = `${slugify(body.name)}-${generateId(6).toLowerCase()}`

  try {
    const data = await prisma.wordList.create({
      data: {
        id: generateId(),
        name: body.name,
        slug,
        description: body.description,
        gameId: body.gameId,
        userId: session.user.id,
        words: body.words
      }
    })

    return data
  } catch {
    throw createError({
      statusCode: 500,
      message:
        'Une erreur est survenue lors de la création de la liste de mots.'
    })
  }
})
