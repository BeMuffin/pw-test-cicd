import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto("");
  await page.fill("#user-name", process.env.USERNAME || "");
  await page.fill("#password", process.env.PASSWORD || "");
  await page.click("#login-button");
});

test.describe("Check Product page", async () => {
  test("should display product items", async ({ page }) => {
    const productsCount = await page.locator(".inventory_item").count();
    expect(productsCount).toBeGreaterThan(0);
  });

  test("should add item to cart", async ({ page }) => {
    await page.click(".inventory_item:nth-child(2) .btn_primary");
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");
  });
});
