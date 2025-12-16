export default defineNuxtPlugin({
  name: 'session-fetch-plugin',
  enforce: 'pre',
  async setup(nuxtApp) {
    nuxtApp.payload.isCached = Boolean(useRequestEvent()?.context.cache)
    if (
      nuxtApp.payload.serverRendered &&
      !nuxtApp.payload.prerenderedAt &&
      !nuxtApp.payload.isCached
    ) {
      const session = await useAuth().fetchSession()

      if (!session?.user) return
      await useChild().fetchChildren()
    }
  }
})
