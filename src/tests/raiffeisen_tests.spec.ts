import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test'
import { MainPage } from '../components/MainPage'
import { ContactDetailsPage } from '../components/ContactDetailsPage'
import { confirmationMobilePhone } from '../helpers/confirmationMobilePhone.spec'
import { interceptionGenderResponse } from '../helpers/interceptionGender.spec'

test.describe.parallel('Raiffeisen Tests', () => {
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
    const mainPage = new MainPage(page)
    await mainPage.checkStepHeader(1)
    await confirmationMobilePhone(page, '+7(111)111-11-11', '1111')
  })

  test('Order debit card by Male', async () => {
    const mainPage = new MainPage(page)
    await mainPage.checkStepHeader(2)
    const contactDetailsPage = new ContactDetailsPage(page)
    await contactDetailsPage.fillName('Иванов Дмитрий Михайлович')
    await interceptionGenderResponse(page, 'Иванов', 'Дмитрий', 'Михайлович', 'MALE')
    await contactDetailsPage.fillBirthday('16.11.1986')
    await contactDetailsPage.fillEmail('test@gmail.com')
    await contactDetailsPage.clickMale()
    await contactDetailsPage.assertCitizenship()
    await contactDetailsPage.clickNextButton()
    await mainPage.checkStepHeader(3)
  })

  test('Order debit card by Female', async () => {
    const mainPage = new MainPage(page)
    await mainPage.checkStepHeader(2)
    await page.locator('textarea[name="name"]').fill('Петрова Елена Александровна')
  })
})
