export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Vous n'êtes pas autorisé à effectuer cette action."
    })
  }

  const id = getRouterParam(event, 'id')
  const data = await prisma.child.findUnique({
    where: { id, parentId: session.user.id }
  })

  if (!data) {
    throw createError({
      statusCode: 401,
      message: "L'enfant est introuvable."
    })
  }

  return data
})
