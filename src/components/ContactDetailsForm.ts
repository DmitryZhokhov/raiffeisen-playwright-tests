import { Locator, Page, expect } from '@playwright/test'

export class ContactDetailsForm {
  readonly page: Page
  readonly name: Locator
  readonly male: Locator
  readonly female: Locator
  readonly birthday: Locator
  readonly email: Locator
  readonly citizenship: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.name = page.locator('textarea[name="name"]')
    this.male = page.locator('text=Мужской')
    this.female = page.locator('text=Женский')
    this.birthday = page.locator('input[name="birthday"]')
    this.email = page.locator('input[placeholder="email@domain.ru"]')
    this.citizenship = page.locator(
      'div[class="ccform-form-control ccform-js-form-control ccform-form-control--checkbox _filled"]'
    )
    this.nextButton = page.locator('div[data-step="3"] button[data-context="next"]')
  }

  async fillName(fullName: string) {
    await this.name.fill(fullName)
  }

  async fillBirthday(birthday: string) {
    await this.birthday.fill(birthday)
  }

  async clickMale() {
    await this.male.click()
  }

  async clickFemale() {
    await this.female.click()
  }
  async fillEmail(email: string) {
    await this.email.fill(email)
  }
  async clickNextButton() {
    await this.nextButton.click()
  }
  async assertCitizenship() {
    await expect(this.citizenship).toBeVisible()
  }
}
