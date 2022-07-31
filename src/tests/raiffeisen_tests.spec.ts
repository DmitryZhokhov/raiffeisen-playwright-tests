import {
  Browser,
  BrowserContext,
  Page,
  test,
  chromium,
  expect,
} from '@playwright/test'
import { StepHeader } from '../components/StepHeader'

test.describe('Raiffeisen Tests', () => {
  let browser: Browser
  let context: BrowserContext
  let page: Page

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    })
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto('https://www.raiffeisen.ru/')
    const stepHeader = new StepHeader(page)
    await stepHeader.checkStepHeader('1')
    await page.locator('input[name="mobilePhone"]').fill('+7(111)111-11-11')
    await page.locator('div[data-step="1"] button[data-context="next"]').click()
    await page.locator('input[name="mobilePhoneConfirmation"]').fill('1111')
  })

  test('Order debit card by Male', async ({ page }) => {
    const stepHeader = new StepHeader(page)
    await stepHeader.checkStepHeader('2')
  })

  test('Order debit card by Female', async ({ page }) => {
    const stepHeader = new StepHeader(page)
    await stepHeader.checkStepHeader('2')
  })
})
