// @ts-check
const { test, expect } = require('@playwright/test');

import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    testIdAttribute: 'data-test'
  }
}); 

test('Navigate to Saucedemo.com', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  // Verify the landing page loads by checking page title
  await expect(page.getByText('Swag Labs')).toBeVisible();
});

test('Verify that a valid user can log in, add products to cart and complete order checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
// User can enter a valid username and matching password to login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  // Verify successful login by checking that user is redirected to Products page
  await expect(page.getByText('Products')).toBeVisible();

// Verify that the product catalogue list can be filtered by price from low to high
    await page.selectOption("xpath=//select[@data-test='product-sort-container']", 'lohi');
    // TODO: Verify the filter was applied by comparing price of first listed item with price of second listed item
    // Assert that item a price is < item b price

// First 2 items in the filtered product list can successfully be added to shopping cart
    await page.locator("//div[@class='inventory_item'][1]//button").click();
    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    await page.locator("//div[@class='inventory_item'][2]//button").click();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    // Verify Shopping cart button can be clicked & contains cart qty count
    await page.locator("xpath=//a[@data-test='shopping-cart-link']").click();
    const cartCount = page.locator("xpath=//span[@class='shopping_cart_badge']").filter({ hasText: '2' });

// Cart contents displays items user actually added to cart 
   await page.locator("xpath=//div[@class='cart_item'][1]");
   await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
   await page.locator("xpath=//div[@class='cart_item'][2]");
   await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
   // TODO: Correct Quantity of each item is displayed
 
   // User can succesfully complete shipping details step
   await page.getByRole('button', { name: 'checkout' }).click();
   await page.getByPlaceholder('First Name').fill('Standard');
   await page.getByPlaceholder('Last Name').fill('User');
   await page.getByPlaceholder('Zip/Postal Code').fill('2000');
   await page.getByRole('button', { name: 'continue' }).click();
 
   // User can view checkout overview & Submit order
   await expect(page.getByText('Checkout: Overview')).toBeVisible();
   await page.getByRole('button', { name: 'finish' }).click();
   // TODO: Cart calculates total cost of items correctly 

   // Verify checkout process is finished and user can navigate back to products page
   await expect(page.getByText('Thank you for your order!')).toBeVisible();
   await page.getByRole('button', { name: 'Back Home' }).click();

});