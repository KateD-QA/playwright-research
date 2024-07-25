const { test, expect } = require('@playwright/test');
const { BankingLoginLandingPage } = require('./landing-login-page');

test.beforeEach('Navigate to Customer Login page & login as existing customer', async ({ page }) => {
  const bankingLogin = new BankingLoginLandingPage(page);
  await bankingLogin.gotoLandingPage();
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.selectOption("xpath=//select[@id='userSelect']", 'Ron Weasly');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account');
});

test('Account page loads correct details for the logged in Customer', async ({ page }) => {
  await expect(page.getByText('Ron Weasly')).toBeVisible();
  await expect(page.getByText('Account Number : ')).toBeVisible();
  await expect(page.getByText('Balance : ')).toBeVisible();
  await expect(page.getByText('Currency : ')).toBeVisible();
});

test('Account Number filter works', async ({ page }) => {
  await page.selectOption("xpath=//select[@id='accountSelect']", '1008');
  await expect(page.locator("xpath=//strong[@class='ng-binding'][1]")).toContainText('1008');
  await expect(page.locator("xpath=//strong[@class='ng-binding'][2]")).toContainText('0');
  await expect(page.locator("xpath=//strong[@class='ng-binding'][3]")).toContainText('Pound');
});

test('Withdraw an amount more than the account balance displays error message', async ({ page }) => {
  await page.locator("xpath=//button[@ng-click='withdrawl()']").click();
  await page.getByPlaceholder('Amount').fill('1023.00');
  await page.locator("xpath=//button[@type='submit']").click();
  await expect(page.getByText('Transaction Failed. You can not withdraw amount more than the balance.')).toBeVisible();
});

  test('Depositing a valid amount is successful', async ({ page }) => {
    await page.getByRole('button', { name: 'Deposit		' }).click();
    await page.getByPlaceholder('Amount').fill('50.00');
    await page.locator("xpath=//button[@type='submit']").click();
    await expect(page.getByText('Deposit Successful')).toBeVisible();
  });

test('Customer can logout', async ({ page }) => {
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
  console.log('Logout customer');
});
