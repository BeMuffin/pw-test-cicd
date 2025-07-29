import {test, expect} from '@playwright/test'

test('Check frames', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/iframe")
    const frameElement = page.frameLocator("#mce_0_ifr")
    const paragraf = frameElement.locator('p')
    await expect(paragraf).toHaveText('Your content goes here.')
})