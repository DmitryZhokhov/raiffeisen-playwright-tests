import { test, expect } from '@playwright/test'

test.describe.parallel('Raiffeisen Tests', () => {

  test('Order debit card by Male', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)

  // create a locator
  const getStarted = page.locator('text=Get Started')

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
  })

  test('Order debit card by Male', async ({ page }) => {

  })
})
