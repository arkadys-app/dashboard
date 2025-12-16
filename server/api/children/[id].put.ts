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
    await prisma.child.update({
      where: { id, parentId: session.user.id },
      data: {
        firstname: data.firstname,
        birthdate: data.birthdate
      }
    })

    return { status: true }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw createError({
          statusCode: 404,
          message: "L'enfant est introuvable."
        })
      }

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
