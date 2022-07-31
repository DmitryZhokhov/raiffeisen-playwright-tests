import { Locator, Page, expect } from '@playwright/test'

export class DeliveryDetailsForm {
  readonly page: Page
  readonly deliveryAddress: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.deliveryAddress = page.locator('textarea[name="deliveryAddress"]')
    this.nextButton = page.locator('div[data-step="6"] button[data-context="next"]')
  }
  async fillDeliveryAddress(deliveryAddress: string) {
    await this.deliveryAddress.fill(deliveryAddress)
  }

  async clickNextButton() {
    await this.nextButton.click()
  }
}
