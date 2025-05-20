import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-16',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  app: {
    head: {
      htmlAttrs: { style: 'scroll-behavior: smooth' },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ]
    }
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss() as any]
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'motion-v/nuxt',
    'reka-ui/nuxt'
  ],
  fonts: {
    providers: { bunny: false },
    families: [
      {
        name: 'Outfit',
        provider: 'google',
        weights: [400, 600, 700]
      }
    ]
  }
})
