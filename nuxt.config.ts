import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  alias: {
    '~': '/',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'bookmarker.dev | free simple bookmarks' }
      ]
    }
  },
  css: [
    '~/assets/css/_main.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
