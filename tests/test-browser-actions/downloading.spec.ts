import {test, expect} from '@playwright/test'

test('Check downloading', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/download")

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.click('a:has-text("dummy.txt")')
    ])

    const path = await download.path();
    console.log(path);
})

test('Check uploading', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload")
    await page.setInputFiles("#file-upload", "tests/test-data/sample.txt")

    await page.click("#file-submit")
    await expect(page.locator("#uploaded-files")).toHaveText("sample.txt")
})