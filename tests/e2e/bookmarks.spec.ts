import { test, expect } from '@playwright/test'
import { seedStorage } from './helpers'

test.describe('bookmarks', () => {
  test('adds a new bookmark and persists it across reload', async ({ page }) => {
    // No seedStorage here: addInitScript re-runs on reload and would wipe the
    // bookmark we add. A fresh context already starts with empty storage.
    await page.goto('/')

    await page.getByRole('button', { name: 'Add Bookmark' }).click()
    await expect(page.locator('#name')).toBeVisible()

    await page.locator('#name').fill('GitHub')
    await page.locator('#url').fill('https://github.com')
    await page.getByRole('button', { name: 'Save' }).click()

    // Saving does not auto-close the modal; it flashes a confirmation.
    await expect(page.getByText('Bookmark Saved')).toBeVisible()

    // Close the modal (handled via useMagicKeys escape).
    await page.keyboard.press('Escape')
    await expect(page.locator('#name')).toBeHidden()

    // Card is rendered in the grid.
    await expect(page.getByRole('link', { name: /GitHub/ })).toBeVisible()

    // Persisted to localStorage.
    const stored = await page.evaluate(() => localStorage.getItem('bookmarks'))
    expect(stored).toContain('https://github.com')

    // Survives a full reload.
    await page.reload()
    await expect(page.getByRole('link', { name: /GitHub/ })).toBeVisible()
  })

  test('flags an invalid URL and clears it when valid', async ({ page }) => {
    await seedStorage(page)
    await page.goto('/')

    await page.getByRole('button', { name: 'Add Bookmark' }).click()

    await page.locator('#url').fill('not a url')
    await expect(page.getByText('Invalid URL')).toBeVisible()

    await page.locator('#url').fill('https://example.com')
    await expect(page.getByText('Invalid URL')).toBeHidden()
  })

  test('lowercases the url as it is typed', async ({ page }) => {
    await seedStorage(page)
    await page.goto('/')

    await page.getByRole('button', { name: 'Add Bookmark' }).click()
    await page.locator('#url').fill('HTTPS://EXAMPLE.COM')
    await expect(page.locator('#url')).toHaveValue('https://example.com')
  })

  test('edits an existing bookmark', async ({ page }) => {
    await seedStorage(page, [
      { name: 'Old Name', url: 'https://example.com', favicon: '', key: 0 },
    ])
    await page.goto('/')

    await page.getByRole('button', { name: 'Edit Old Name Bookmark' }).click()
    await expect(page.locator('#name')).toHaveValue('Old Name')

    await page.locator('#name').fill('New Name')
    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Bookmark Saved')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('link', { name: /New Name/ })).toBeVisible()

    const stored = await page.evaluate(() => localStorage.getItem('bookmarks'))
    expect(stored).toContain('New Name')
  })

  test('deletes a bookmark after confirmation', async ({ page }) => {
    await seedStorage(page, [
      { name: 'Delete Me', url: 'https://example.com', favicon: '', key: 0 },
    ])
    await page.goto('/')

    await expect(page.getByRole('link', { name: /Delete Me/ })).toBeVisible()

    await page.getByRole('button', { name: 'Edit Delete Me Bookmark' }).click()
    await page.getByRole('button', { name: 'Delete', exact: true }).click()

    // Confirmation overlay.
    await page.getByRole('button', { name: 'Yes' }).click()

    await expect(page.getByRole('link', { name: /Delete Me/ })).toBeHidden()
    const stored = await page.evaluate(() => localStorage.getItem('bookmarks'))
    expect(stored).toBe('[]')
  })

  test('cancels a delete with "No"', async ({ page }) => {
    await seedStorage(page, [
      { name: 'Keep Me', url: 'https://example.com', favicon: '', key: 0 },
    ])
    await page.goto('/')

    await page.getByRole('button', { name: 'Edit Keep Me Bookmark' }).click()
    await page.getByRole('button', { name: 'Delete', exact: true }).click()
    await page.getByRole('button', { name: 'No' }).click()

    // Still in the edit modal, bookmark untouched.
    await expect(page.locator('#name')).toHaveValue('Keep Me')

    await page.keyboard.press('Escape')
    await expect(page.getByRole('link', { name: /Keep Me/ })).toBeVisible()
  })
})
