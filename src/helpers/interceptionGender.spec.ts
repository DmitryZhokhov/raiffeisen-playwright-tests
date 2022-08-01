import { Page } from '@playwright/test'

export async function interceptionResponseGender(page: Page, surname: string, name: string, patronymic: string, gender: string) {
  await page.route('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio', async (route) => {
    const response = await page.request.fetch(route.request())
    const mockResponseObject = {
      suggestions: [
        {
          value: `${surname} ${name} ${patronymic}`,
          unrestricted_value: `${surname} ${name} ${patronymic}`,
          data: {
            surname: `${surname}`,
            name: `${name}`,
            patronymic: `${patronymic}`,
            gender: `${gender}`,
            source: null,
            qc: '0',
          },
        },
      ],
    }
    route.fulfill({
      response,
      body: JSON.stringify(mockResponseObject),
    })
  })
}
