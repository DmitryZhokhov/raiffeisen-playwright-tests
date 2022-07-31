import { Page } from '@playwright/test'
import { PhoneConfirmationPage } from '../components/PhoneConfirmationPage'

export async function confirmationMobilePhone(page: Page, mobilePhone: string, confirmationCode: string) {
  const phoneConfirmationPage = new PhoneConfirmationPage(page)
  await phoneConfirmationPage.fillPhoneNumber(mobilePhone)
  await phoneConfirmationPage.clickNextButton()
  await phoneConfirmationPage.fillConfirmationCode(confirmationCode)
}
