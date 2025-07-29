import {test, expect} from '@playwright/test'

test('Check alert', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain("I am a JS Alert");
        await dialog.accept();
    })

    await page.click('button:has-text("Click for JS Alert")')
    await expect(page.locator("#result")).toHaveText("You successfully clicked an alert")
})