import { Page } from '@playwright/test'

export async function interceptionResponsePassportIssuePlace(
  page: Page,
  passportIssueByCode: string,
  region: string,
  passportIssuePlace: string
) {
  await page.route('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit', async (route) => {
    const response = await page.request.fetch(route.request())
    const mockResponseObject = {
      suggestions: [
        {
          value: `${passportIssuePlace}`,
          unrestricted_value: `${passportIssuePlace}`,
          data: { code: `${passportIssueByCode}`, name: `${passportIssuePlace}`, region_code: `${region}`, type: '0' },
        },
      ],
    }
    route.fulfill({
      response,
      body: JSON.stringify(mockResponseObject),
    })
  })
}
