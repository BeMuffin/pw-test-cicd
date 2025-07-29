import { expect as baseExpect } from "@playwright/test";
export { test } from "@playwright/test";

export const expect =  baseExpect.extend({
    toHaveCatProperty: (received: any[]) => {
    const pass =
      Array.isArray(received) &&
      received.every(
        (item) => item && Object.prototype.hasOwnProperty.call(item, "cat")
      );
    return pass
      ? { message: () => `All elements have key 'cat'`, pass: true }
      : { message: () => `Some elements do not have key 'cat'`, pass: false };
  },
});


// export const randomItem = baseExpect.extend<{ randomItem: string }>({
//   randomItem: async ({}, use) => {
//     const items = ['#add-to-cart-sauce-labs-backpack', '#add-to-cart-sauce-labs-bike-light'];
//     const selected = items[Math.floor(Math.random() * items.length)];
//     await use(selected);
//   }
// });
