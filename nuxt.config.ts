import tailwindcss from '@tailwindcss/vite'


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss() as any]
  },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', 'reka-ui/nuxt'],
fonts: {
  families: [
    {
      name: 'Outfit',
      provider: 'google',
      weights: [400, 600, 700]
    }
  ],
  experimental: {
    processCSSVariables: true
  }
},
  icon: {
    mode: 'svg',
    customCollections: [  
      { 
        prefix: 'arkadys',
        dir: './app/assets/icons'
      }
    ]
  }
})
