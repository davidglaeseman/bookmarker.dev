import type { Page } from '@playwright/test'

export type SeedBookmark = {
  name: string
  url: string
  favicon: string
  key: number
}

// Mirrors SettingDefault in app/stores/useAppStore.ts
export const DEFAULT_SETTINGS = {
  backgroundColor: '#222',
  textColor: '#fff',
  backgroundImage: null,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center center',
}

/**
 * Seed localStorage before the app boots. `addInitScript` runs on every
 * navigation in the context, so this also survives page.reload().
 */
export async function seedStorage(
  page: Page,
  bookmarks: SeedBookmark[] = [],
  settings: Record<string, unknown> = DEFAULT_SETTINGS,
) {
  await page.addInitScript(
    ([b, s]) => {
      localStorage.setItem('bookmarks', JSON.stringify(b))
      localStorage.setItem('settings', JSON.stringify(s))
    },
    [bookmarks, settings] as const,
  )
}
