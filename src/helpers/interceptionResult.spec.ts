import { Page, expect } from '@playwright/test'

export async function assertRequest(page: Page) {
  const req = await page.waitForRequest(
    'https://oapi.raiffeisen.ru/api/forms/public/v1.0/forms/debit-card-single-field/66/answers'
  )
  page.on('request', (request) => console.log('>>', request.method(), request.url()))
  expect(req.postDataJSON()).toContain('"auth":{"phone":"71111111111","token":"YD5j3gq0eyQI8xJQ/Dpx7Cas"}')
}

export async function interceptionResponseResult(page: Page) {
  await page.route('https://oapi.raiffeisen.ru/api/forms/public/v1.0/forms/debit-card-single-field/66/answers', async (route) => {
    const response = await page.request.fetch(route.request())
    const mockResponseObject = {
      success: true,
      error: {
        code: 0,
        message: '',
      },
      meta: [],
      data: {
        payload: {
          answerId: 99999999,
          reuseToken: 'ed958b64-129e-1111-89d4-48535286570a',
        },
        analytics: {
          formName: 'DEBIT_CARD_FULL_FORM',
        },
      },
    }
    route.fulfill({
      response,
      body: JSON.stringify(mockResponseObject),
    })
  })
}
