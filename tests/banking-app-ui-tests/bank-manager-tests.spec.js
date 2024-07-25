const { test, expect } = require('@playwright/test');
const { BankingLoginLandingPage } = require('./landing-login-page');

test.beforeEach('Login as a Bank Manager', async ({ page }) => {
  const bankingLogin = new BankingLoginLandingPage(page);
  await bankingLogin.gotoLandingPage();
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
});

test('Landing page options load for Bank manager', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Account' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Customers' })).toBeVisible();
});

test('A new Customer can be created', async ({ page }) => {
  await page.locator("xpath=//button[@ng-click='addCust()']").click();
  await page.getByPlaceholder('First Name').fill('Luna');
  await page.getByPlaceholder('Last Name').fill('Lovegood');
  await page.getByPlaceholder('Post Code').fill('SP4 7DE');
  await page.locator("xpath=//button[@type='submit']").click();
  // Verify new customer was saved successfully & search customer
  await page.locator("xpath=//button[@ng-click='showCust()']").click();
  await page.getByPlaceholder('Search Customer').fill('Luna');
  await expect(page.locator("xpath=//td[@class='ng-binding'][1]")).toContainText('Luna');
});

test('A new account can be opened for an existing customer', async ({ page }) => {
  await page.locator("xpath=//button[@ng-click='openAccount()']").click();
  await page.selectOption("xpath=//select[@id='userSelect']", 'Harry Potter');
  await page.selectOption("xpath=//select[@id='currency']", 'Pound');
  await page.locator("xpath=//button[@type='submit']").click();
  // Verify new account was saved successfully & search customer
  await page.locator("xpath=//button[@ng-click='showCust()']").click();
  await page.getByPlaceholder('Search Customer').fill('Harry');
  await expect(page.locator("xpath=//span[@ng-repeat='account in cust.accountNo'][4]")).toContainText(/[0-9]/);
});

test('Delete a customer', async ({ page }) => {
  await page.locator("xpath=//button[@ng-click='showCust()']").click();
  await page.getByPlaceholder('Search Customer').fill('Nev'); 
  await page.locator("xpath=//button[@ng-click='deleteCust(cust)']").click();
 //Verify customer is actually deleted by Searching them and confirming no results are returned
 await page.getByPlaceholder('Search Customer').fill('Neville');
 await expect(page.locator("xpath=//table[@class='table table-bordered table-striped']//tbody")).toBeEmpty();
});

test.skip('Bank managers can search from a list of Customers', async ({ page }) => {
  await page.locator("xpath=//button[@ng-click='showCust()']").click();
  await page.getByPlaceholder('Search Customer').fill('Harry');
  await expect(page.locator("xpath=//td[@class='ng-binding'][1]")).toContainText('Harry');
});  

test('Bank Manager can logout by clicking Home Button', async ({ page }) => {
  await page.locator("xpath=//button[@ng-click='home()']").click();
  await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
});
