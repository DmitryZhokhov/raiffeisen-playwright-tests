import { Locator, Page } from '@playwright/test'
import { interceptionResponseResult } from '../helpers/interceptionResult.spec'
import { interceptionResponseAddress } from '../helpers/interceptionAddress.spec'

export class DeliveryDetailsForm {
  readonly page: Page
  readonly deliveryAddress: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.deliveryAddress = page.locator('textarea[name="deliveryAddress"]')
    this.nextButton = page.locator('div[data-step="6"] button[data-context="next"]')
  }

  async fillDeliveryAddress(page: Page, deliveryAddress: string) {
    await interceptionResponseAddress(page)
    await this.deliveryAddress.fill(deliveryAddress)
    await this.page.locator(`text=${deliveryAddress}`).click()
  }

  async choiceDeliveryType(deliveryType: string) {
    await this.page.locator(`text=${deliveryType}`).click()
  }

  async clickNextButton(page: Page) {
    await interceptionResponseResult(page)
    await this.nextButton.click()
  }
}
