import { Locator, Page, expect } from '@playwright/test'

export class PermanentAddressForm {
  readonly page: Page
  readonly birthPlace: Locator
  readonly permanentAddress: Locator
  readonly taxResidency: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.birthPlace = page.locator('textarea[name="birthPlace"]')
    this.permanentAddress = page.locator('textarea[name="permanentAddress"]')
    this.taxResidency = page.locator('text=Только РФ')
    this.nextButton = page.locator('div[data-step="5"] button[data-context="next"]')
  }

  async fillBirthPlace(birthPlace: string) {
    await this.birthPlace.fill(birthPlace)
  }

  async fillPermanentAddress(permanentAddress: string) {
    await this.permanentAddress.fill(permanentAddress)
  }

  async clickNextButton() {
    await this.nextButton.click()
  }

  async clickRussiaTaxResidency() {
    await this.taxResidency.click()
  }
}
