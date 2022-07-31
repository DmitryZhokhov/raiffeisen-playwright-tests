import { Locator, Page, expect } from '@playwright/test'

export class MainForm {
  readonly page: Page
  readonly title: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('span[data-step-hidden="2"]')
  }

  async checkStepHeader(step: number) {
    await expect(this.title).toHaveText(` (шаг ${step} из 5)`)
  }
}
