import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test('loads with the correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/bookmarker\.dev/)
  })

  test('shows the add bookmark button', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Add Bookmark' })).toBeVisible()
  })

  test('shows the global settings toggle', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('button[aria-label*="Global Settings"]')).toBeVisible()
  })

  test('starts with an empty grid when storage is empty', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.bookmark-grid a')).toHaveCount(0)
  })
})
