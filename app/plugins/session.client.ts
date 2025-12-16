export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.payload.serverRendered) {
    const session = await useAuth().fetchSession()

    if (!session?.user) return
    await useChild().fetchChildren()
  } else if (
    Boolean(nuxtApp.payload.prerenderedAt) ||
    Boolean(nuxtApp.payload.isCached)
  ) {
    nuxtApp.hook('app:mounted', async () => {
      const session = await useAuth().fetchSession()

      if (!session?.user) return
      await useChild().fetchChildren()
    })
  }
})
