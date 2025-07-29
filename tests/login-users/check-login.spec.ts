import {test, expect} from "@playwright/test"
import { userData } from "../test-data/user-data";

for (const {testName, username, password} of userData) {
  test(`Check ${testName}`, async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
    // const cartCount = await page.locator(".shopping_cart_badge").textContent()
    // expect (cartCount).toBe(expectedCartCount)
    await expect(page).toHaveURL(/.*inventory/);
  });
}
const array = [1,2,4,5]  //length = 4,   
array.forEach((element)=> console.log(element))
for(let i=0; i<array.length; i++){
  console.log(array)
}

class Array{
  forEach(element){
    // iteration with element
  }
  filter(){

  }
  reduce(){
    
  }
}

// for (const data of userData){
//   test(`Check ${data.testName}`, async ({ page }) => {
//     await page.goto("https://www.saucedemo.com/");
//     await page.fill('#user-name', data.username);
//     await page.fill('#password', data.password);
//     await page.click('#login-button');
//     await expect(page).toHaveURL(/.*inventory/);
//   });
// }