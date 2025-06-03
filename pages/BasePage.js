// pages/BasePage.js

export default class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
    }
  
    async goTo(url) {
      await this.page.goto(url);
    }
  
    async click(selector) {
      await this.page.click(selector);
    }
  
    async fill(selector, text) {
      await this.page.fill(selector, text);
    }
  
    async getText(selector) {
      return await this.page.textContent(selector);
    }
  }
  