import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-10-05',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'reka-ui/nuxt'
  ],
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700]
    }
  },
  icon: {
    mode: 'svg',
    customCollections: [{ prefix: 'arkadys', dir: './app/assets/icons' }]
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  }
})
