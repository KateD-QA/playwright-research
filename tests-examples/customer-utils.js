const { test, expect } = require('@playwright/test');

export class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.inputBox = this.page.locator('input.new-input');
    this.customerInput = this.page.locator('todo-item');
    this.clickButton = this.page.getByRole('button');

  }

  /**
   * @param {string} text
   */
  async enterInput(text) {
    await this.inputBox.fill(text);
  }

  /**
   * @param {string} text
   */
  async loginCustomer(text) {
    const todo = this.todoItems.filter({ hasText: text });
    
    await todo.getByRole('button').click();
  }

  
}
