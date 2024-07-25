const { test, expect } = require('@playwright/test');
const { BankingLoginLandingPage } = require('./landing-login-page');

test('Customer can make deposits & withdrawls, then view them in Transaction history', async ({ page }) => {
  const bankingLogin = new BankingLoginLandingPage(page);
  await bankingLogin.gotoLandingPage();
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.selectOption("xpath=//select[@id='userSelect']", 'Ron Weasly');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account');

  //Depositing a valid amount is successful
    await page.locator("xpath=//button[@ng-click='deposit()']").click();
    await page.getByPlaceholder('Amount').fill('50.00');
    await page.locator("xpath=//button[@type='submit']").click();
    await expect(page.getByText('Deposit Successful')).toBeVisible();

  //Withdraw an amount less than the account balance is successful
    await page.locator("xpath=//button[@ng-click='withdrawl()']").click();
    await page.getByPlaceholder('Amount').fill('20.00');
    await page.locator("xpath=//button[@type='submit']").click();

    // Verify Customers can see thier transactions in the Transactions page
    await page.locator("xpath=//button[@ng-click='transactions()']").click();
    //await expect(page.locator("xpath=//table[@class='table table-bordered table-striped']")).toContainText("50");

    // Reset button clears all transactions 
    await page.locator("xpath=//button[@ng-click='reset()']").click();
    await expect(page.locator("xpath=//table[@class='table table-bordered table-striped']//tbody")).toBeEmpty;

    //Back button redirects customer to thier Account landing page
    await page.locator("xpath=//button[@ng-click='back()']").click();
    await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account');
  });