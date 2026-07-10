import { test, expect } from '@playwright/test'
import { seedStorage } from './helpers'

test.describe('settings', () => {
  test('opens the settings modal', async ({ page }) => {
    await seedStorage(page)
    await page.goto('/')

    await page.locator('button[aria-label*="Global Settings"]').click()
    await expect(page.locator('#backgroundColor')).toBeVisible()
    await expect(page.locator('#textColor')).toBeVisible()
  })

  test('updates the background color and persists it', async ({ page }) => {
    await seedStorage(page)
    await page.goto('/')

    await page.locator('button[aria-label*="Global Settings"]').click()
    await page.locator('#backgroundColor').fill('#ff0000')

    // Persisted to localStorage.
    await expect
      .poll(() =>
        page.evaluate(
          () => JSON.parse(localStorage.getItem('settings') || '{}').backgroundColor,
        ),
      )
      .toBe('#ff0000')

    // Applied to the app background via the reactive CSS binding.
    await expect(page.locator('.application')).toHaveCSS(
      'background-color',
      'rgb(255, 0, 0)',
    )
  })

  test('reveals background image options once a valid image URL is entered', async ({ page }) => {
    await seedStorage(page)
    await page.goto('/')

    await page.locator('button[aria-label*="Global Settings"]').click()

    // Selects are hidden until the image URL is valid.
    await expect(page.locator('#backgroundSize')).toBeHidden()

    await page.locator('#backgroundImage').fill('https://example.com/bg.png')
    await expect(page.locator('#backgroundSize')).toBeVisible()
  })
})
