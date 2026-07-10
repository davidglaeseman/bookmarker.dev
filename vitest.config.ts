import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: false,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['app/composables/**', 'app/stores/**', 'app/components/**'],
      exclude: [
        'app/**/*.spec.ts',
        'app/**/*.test.ts',
      ],
    },
  },
})
