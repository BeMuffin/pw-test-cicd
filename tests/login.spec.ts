import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import("expect-playwright");
dotenv.config();

test.describe.configure({mode:"parallel"})
test.describe("Check Data", async () => {
  test("should login with valid credentials", async ({ page }) => {
    await page.goto("");
    await page.fill("#user-name", process.env.USERNAME || "");
    await page.fill("#password", process.env.PASSWORD || "");
    await page.click("#login-button");
    await expect(page).toHaveScreenshot();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should login with invalid credentials", async ({ page }) => {
    await page.goto("");
    await page.fill("#user-name", "invalid_user");
    await page.fill("#password", "5555");
    await page.click("#login-button");
    const errorLabel = page.locator('[data-test="error"]');
    await expect(errorLabel).toBeVisible();
    await expect(errorLabel).toContainText(
      "Username and password do not match any user in this service"
    );
  });
});


test('Open inventory page @auth', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/.*inventory/);
});

test.skip('This test is skipped', async () => {
  // временно отключён
});