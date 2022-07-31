import { Locator, Page, expect } from '@playwright/test'

export class PassportDetailsForm {
  readonly page: Page
  readonly passportSeriaNumber: Locator
  readonly passportIssueByCode: Locator
  readonly passportIssueDate: Locator
  readonly passportIssuePlace: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.passportSeriaNumber = page.locator('input[name="passportSeriaNumber"]')
    this.passportIssueByCode = page.locator('input[name="passportIssueByCode"]')
    this.passportIssueDate = page.locator('input[name="passportIssueDate"]')
    this.passportIssuePlace = page.locator('textarea[name="passportIssuePlace"]')
    this.nextButton = page.locator('div[data-step="4"] button[data-context="next"]')
  }

  async fillPassportSeriaNumber(passportSeriaNumber: string) {
    await this.passportSeriaNumber.fill(passportSeriaNumber)
  }

  async fillPassportIssueByCode(passportIssueByCode: string) {
    await this.passportIssueByCode.fill(passportIssueByCode)
  }

  async fillPassportIssueDate(passportIssueDate: string) {
    await this.passportIssueDate.fill(passportIssueDate)
  }

  async fillPassportIssuePlace(passportIssuePlace: string) {
    await this.passportIssuePlace.fill(passportIssuePlace)
  }

  async clickNextButton() {
    await this.nextButton.click()
  }
}
