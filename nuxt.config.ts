import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: { compatibilityVersion: 4 },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()]
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@vee-validate/nuxt',
    'motion-v/nuxt',
    'reka-ui/nuxt'
  ],

  fonts: {
    providers: { bunny: false },
    defaults: {
      weights: [400, 500, 600, 700]
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/login', '/sign-up']
    }
  }
})
