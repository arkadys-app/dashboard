import { Prisma } from '@prisma/client'
import { generateId } from 'better-auth'

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const { data, error } = await readValidatedBody(
    event,
    ChildSchemaServer.safeParse
  )

  if (error) {
    throw createError({
      statusCode: 422,
      message: error.issues[0].message,
      data: error.issues
    })
  }

  try {
    await prisma.child.create({
      data: {
        id: generateId(),
        firstname: data.firstname,
        birthdate: data.birthdate,
        parentId: session.user.id
      }
    })

    return { status: true }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw createError({
          statusCode: 422,
          message: 'Un enfant avec ce prénom existe déjà.'
        })
      }
    }

    throw err
  }
})
