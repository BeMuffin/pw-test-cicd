import { test, expect } from "@playwright/test";

test("Check keyboard", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/key_presses?");
  const result = page.locator("#result");
  await page.keyboard.press("Enter");
  await expect(result).toHaveText("You entered: ENTER");
});
