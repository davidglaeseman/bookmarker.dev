import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/css/_main.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})