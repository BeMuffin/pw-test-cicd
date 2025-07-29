import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("Check cart page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.fill("#user-name", process.env.USER_NAME || "");
    await page.fill("#password", process.env.PASSWORD || "");
    await page.click("#login-button");
  });

  test.afterEach("logout", async ({ page }) => {
    await page.click(".bm-burger-button");
    await page.click("#logout_sidebar_link");
  });

  test("add 1st product, remove and check", async ({ page }) => {
    await page.click(".inventory_item:first-child .btn_primary");
    await page.click('[fill="currentColor"]');
    await page.click(".cart_item .btn_secondary");

    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator(".removed_cart_item")).not.toBeVisible();
    // await expect(page.locator(".removed_cart_item")).toHaveClass(
    //   /removed_cart_item/
    // );
  });
});
