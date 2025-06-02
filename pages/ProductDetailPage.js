const BasePage = require('./BasePage');
class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.quantityInput = 'input#quantity';
    this.addToCartButton = 'button.btn.btn-default.cart';
    this.cartModal = '.modal-content';
    this.proceedToCheckoutBtn = 'a[href="/view_cart"]';
  }
  async setQuantity(quantity) {
    await this.page.fill(this.quantityInput, String(quantity));
  }
  async clickAddToCart() {
    await this.click(this.addToCartButton);
    await this.page.waitForSelector(this.cartModal);
  }
  async clickProceedToCheckout() {
    await this.click(this.proceedToCheckoutBtn);
  }
}
module.exports = ProductDetailPage;
