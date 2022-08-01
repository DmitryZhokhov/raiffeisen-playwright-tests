import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test'
import { MainForm } from '../components/MainForm'
import { ContactDetailsForm } from '../components/ContactDetailsForm'
import { PassportDetailsForm } from '../components/PassportDetailsForm'
import { PermanentAddressForm } from '../components/PermanentAddressForm'
import { DeliveryDetailsForm } from '../components/DeliveryDetailsForm'
import { ResultForm } from '../components/ResultForm'
import { confirmationMobilePhone } from '../helpers/confirmationMobilePhone.spec'
import { interceptionResponseResult } from '../helpers/interceptionResult.spec'

test.describe.parallel('Raiffeisen Tests', () => {
  let browser: Browser
  let context: BrowserContext
  let page: Page

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    })
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    })
    page = await context.newPage()
    await page.goto('https://www.raiffeisen.ru/')
    const mainForm = new MainForm(page)
    await mainForm.checkStepHeader(1)
    await confirmationMobilePhone(page, '+7(111)111-11-11', '1111')
  })

  test('Order debit card by Male', async () => {
    const mainPage = new MainForm(page)
    await mainPage.checkStepHeader(2)
    const contactDetailsForm = new ContactDetailsForm(page)
    await contactDetailsForm.fillName(page, 'Иванов', 'Дмитрий', 'Михайлович', 'MALE')
    await contactDetailsForm.fillBirthday('16.11.1986')
    await contactDetailsForm.fillEmail('test@gmail.com')
    await contactDetailsForm.assertCitizenship()
    await contactDetailsForm.clickNextButton()
    await mainPage.checkStepHeader(3)
    const passportDetailsForm = new PassportDetailsForm(page)
    await passportDetailsForm.fillPassportSeriaNumber('0505-123456')
    await passportDetailsForm.fillPassportIssueByCode('250-001')
    await passportDetailsForm.fillPassportIssueDate('16.12.2006')
    await passportDetailsForm.fillPassportIssuePlace('УМВД РОССИИ ПО ПРИМОРСКОМУ КРАЮ')
    await passportDetailsForm.clickNextButton()
    await mainPage.checkStepHeader(4)
    const permanentAddressForm = new PermanentAddressForm(page)
    await permanentAddressForm.fillBirthPlace('г. Владивосток')
    await permanentAddressForm.fillPermanentAddress('г Владивосток, ул Басаргина, д 32, кв 10')
    await permanentAddressForm.clickRussiaTaxResidency()
    await permanentAddressForm.clickNextButton()
    await mainPage.checkStepHeader(5)
    const deliveryDetailsForm = new DeliveryDetailsForm(page)
    await deliveryDetailsForm.fillDeliveryAddress('г Владивосток, ул Басаргина, д 32, кв 10')
    await deliveryDetailsForm.clickNextButton()
    await interceptionResponseResult(page)
    const resultForm = new ResultForm(page)
    await resultForm.checkResultHeader('Заявка передана в службу доставки')
  })
})
