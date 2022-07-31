import { Page, Locator, expect } from '@playwright/test'

export class StepHeader {
  readonly page: Page
  readonly title: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('span[data-step-hidden="2"]')
  }

  async checkStepHeader(step: string) {
    await expect(this.title).toHaveText(` (шаг ${step} из 5)`)
  }
}
