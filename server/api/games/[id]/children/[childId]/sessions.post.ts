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

  const gameId = getRouterParam(event, 'id')
  const childId = getRouterParam(event, 'childId')

  const data = await prisma.gameSession.create({
		data: {
			id: generateId(),
			gameId: gameId!,
			childId: childId!,
			score: body.score,
			duration: body.duration
		},
		include: { game: true }
	})

  return data
})
