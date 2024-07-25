const { expect } = require('@playwright/test');
exports.BankingLoginLandingPage = class BankingLoginLandingPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator("//strong[@class='mainHeading']", { hasText: 'XYZ Bank' });
    this.homeButton = page.locator("button", { hasText: 'Home' });
    this.customerLogin = page.locator("button", { hasText: 'Customer Login'});
    this.bankManagerLogin = page.locator("button", { hasText: 'Bank Manager Login'});
  }

  async gotoLandingPage() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    await expect(this.pageTitle).toBeVisible();
    await expect(this.customerLogin).toBeVisible();
    await expect(this.bankManagerLogin).toBeVisible();
  }

  async homeButton() {
    await this.homeButton.click();
    await expect(this.pageTitle).toBeVisible();
  }
};