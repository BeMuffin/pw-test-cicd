import {test, expect} from '@playwright/test'

test('Check js script', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/')
    const title = await page.evaluate(()=> document.title)
    expect(title).toBe("The Internet")
})