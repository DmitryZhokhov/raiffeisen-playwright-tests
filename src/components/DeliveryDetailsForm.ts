import { Locator, Page, expect } from '@playwright/test'
import { interceptionResponseResult, assertRequest } from '../helpers/interceptionResult.spec'

export class DeliveryDetailsForm {
  readonly page: Page
  readonly deliveryAddress: Locator
  readonly deliveryAddressValid: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.deliveryAddress = page.locator('textarea[name="deliveryAddress"]')
    this.deliveryAddressValid = page.locator(
      '[data-step="6"] [class="ccform-form-control ccform-js-form-control ccform-form-control--input _clear _filled _complete _valid"]'
    )
    this.nextButton = page.locator('div[data-step="6"] button[data-context="next"]')
  }

  async fillDeliveryAddress(deliveryAddress: string) {
    await this.deliveryAddress.fill(deliveryAddress)
    await this.page.locator(`text=${deliveryAddress}`).click()
  }

  async validDeliveryAddress() {
    await expect(this.deliveryAddressValid).toBeVisible()
  }

  async choiceDeliveryType(deliveryType: string) {
    await this.page.locator(`text=${deliveryType}`).click()
  }

  async clickNextButton(page: Page) {
    await interceptionResponseResult(page)
    await this.nextButton.click()
  }
}
