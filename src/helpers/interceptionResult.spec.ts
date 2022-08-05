import { Page, expect } from '@playwright/test'

export async function interceptionResponseResult(page: Page, phone: string, token: string, gender: string) {
  const requestURL = 'https://oapi.raiffeisen.ru/api/forms/public/v1.0/forms/debit-card-single-field/66/answers'
  page.on('request', (request) => {
    if (request.url() === requestURL) {
      console.log(request.method(), request.url(), request.postDataJSON())
      expect(request.postDataJSON()).toMatchObject({ auth: { phone: `${phone}`, token: `${token}` } })
      expect(request.postDataJSON()).toMatchObject({
        answer: {
          root: {
            name: {
              gender: `${gender}`,
            },
          },
        },
      })
    }
  })
  await page.route(requestURL, async (route) => {
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
