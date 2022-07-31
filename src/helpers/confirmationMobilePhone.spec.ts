import { Page } from '@playwright/test'
import { PhoneConfirmationForm } from '../components/PhoneConfirmationForm'

export async function confirmationMobilePhone(page: Page, mobilePhone: string, confirmationCode: string) {
  const phoneConfirmationForm = new PhoneConfirmationForm(page)
  await phoneConfirmationForm.fillPhoneNumber(mobilePhone)
  await phoneConfirmationForm.clickNextButton()
  await phoneConfirmationForm.fillConfirmationCode(confirmationCode)
}
