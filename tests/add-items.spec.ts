import { test as base, expect } from '@playwright/test';

const test = base.extend<{ randomItem: string }>({
  randomItem: async ({}, use) => {
    const items = ['#add-to-cart-sauce-labs-backpack', '#add-to-cart-sauce-labs-bike-light'];
    const selected = items[Math.floor(Math.random() * items.length)];
    await use(selected);
  }
});

test.only('Add random item to cart', async ({ page, randomItem }) => {
  await page.goto('/inventory.html');
  await page.click(randomItem);
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toBeVisible();

  const cartItemsCount = await page.locator(".shopping_cart_badge").textContent()
  expect(cartItemsCount).toBe("1")
});