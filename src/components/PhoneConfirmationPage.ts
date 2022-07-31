import { Locator, Page } from '@playwright/test'

export class PhoneConfirmationPage {
  readonly page: Page
  readonly mobilePhone: Locator
  readonly confirmationCode: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.mobilePhone = page.locator('input[name="mobilePhone"]')
    this.confirmationCode = page.locator('input[name="mobilePhoneConfirmation"]')
    this.nextButton = page.locator('div[data-step="1"] button[data-context="next"]')
  }

  async fillPhoneNumber(mobilePhone: string) {
    await this.mobilePhone.fill(mobilePhone)
  }

  async fillConfirmationCode(confirmationCode: string) {
    await this.confirmationCode.fill(confirmationCode)
  }

  async clickNextButton() {
    await this.nextButton.click()
  }
}
