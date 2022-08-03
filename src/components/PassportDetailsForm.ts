import { Locator, Page, expect } from '@playwright/test'
import { interceptionResponsePassportIssuePlace } from '../helpers/interceptionPassportIssuePlace.spec'

export class PassportDetailsForm {
  readonly page: Page
  readonly passportSeriaNumber: Locator
  readonly passportIssueByCode: Locator
  readonly passportIssueDate: Locator
  readonly passportIssuePlace: Locator
  readonly countryList: Locator
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

  async fillPassportIssueByCode(page: Page, passportIssueByCode: string, region: string, passportIssuePlace: string) {
    await interceptionResponsePassportIssuePlace(page, passportIssueByCode, region, passportIssuePlace)
    await this.passportIssueByCode.fill(passportIssueByCode)
  }

  async fillPassportIssueDate(passportIssueDate: string) {
    await this.passportIssueDate.fill(passportIssueDate)
  }

  async fillPassportIssuePlace(passportIssuePlace: string) {
    await this.passportIssuePlace.fill(passportIssuePlace)
  }

  async selectCountryFromList(country: string) {
    await this.page.selectOption('[name="birthCountry"]', `${country}`)
  }

  async clickNextButton() {
    await expect(
      this.page.locator(
        '[data-step="4"] [class="ccform-form-control ccform-js-form-control ccform-form-control--input _filled _valid"]'
      )
    ).toBeVisible()
    await this.nextButton.click()
  }
}
