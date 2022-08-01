import { Locator, Page, expect } from '@playwright/test'

export class ResultForm {
  readonly page: Page
  readonly title: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('div[class="ccform-thx-page__row ccform-thx-page__row--last"] div[class="ccform-thx-page__title"]')
  }

  async checkResultHeader(text: string) {
    await expect(this.title).toHaveText(text)
  }
}
