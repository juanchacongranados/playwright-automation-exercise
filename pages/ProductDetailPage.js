// pages/ProductDetailPage.js

import BasePage from './BasePage.js';

export default class ProductDetailPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.quantityInput    = 'input#quantity';
    this.addToCartButton  = 'button.btn.btn-default.cart';
    this.cartModal        = '.modal-content';
    this.proceedToCheckoutBtn = '.modal-content a[href="/view_cart"]';
}

  async setQuantity(quantity) {
    await this.page.fill(this.quantityInput, String(quantity));
  }

  async clickAddToCart() {
    await this.click(this.addToCartButton);
    // Esperar a que aparezca el modal de confirmación
    await this.page.waitForSelector(this.cartModal, { timeout: 10000 });
  }

  async clickProceedToCheckout() {
    const viewCartBtn = this.page.locator(this.proceedToCheckoutBtn);
    await viewCartBtn.waitFor({ state: 'visible', timeout: 10000 });
    await viewCartBtn.click();

  }
}
