// pages/HomePage.js

import BasePage from './BasePage.js';

export default class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productsLink = 'a[href="/products"]';
  }

  async goToHome() {
    await this.goTo('https://automationexercise.com');
  }

  async clickProducts() {
    await this.click(this.productsLink);
  }
}
