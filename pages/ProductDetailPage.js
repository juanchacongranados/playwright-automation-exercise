// pages/ProductDetailPage.js
const BasePage = require('./BasePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.quantityInput = 'input#quantity';
    this.addToCartButton = 'button.btn.btn-default.cart';
    this.cartModal = '#cartModal'; // observa: aquí uso el id "#cartModal"
    // Ya no usaremos globalmente 'a[href="/view_cart"]', 
    // sino que lo limitaremos a estar dentro del modal:
    // this.proceedToCheckoutBtn = 'a[href="/view_cart"]';  
  }

  async setQuantity(quantity) {
    await this.page.fill(this.quantityInput, String(quantity));
  }

  async clickAddToCart() {
    await this.click(this.addToCartButton);
    // Esperamos a que el modal aparezca (por su id)
    await this.page.waitForSelector(this.cartModal);
  }

  async clickProceedToCheckout() {
    // 1) Definimos un locator que busque solo dentro del contenido del modal:
    const viewCartInModal = this.page.locator(`${this.cartModal} a[href="/view_cart"]`);

    // 2) Esperamos a que ese enlace sea visible (para garantizar que el modal ya está cargado):
    await viewCartInModal.waitFor({ state: 'visible', timeout: 5000 });

    // 3) Hacemos clic en **ese** enlace concreto
    await viewCartInModal.click();

    // A partir de aquí, la navegación a /view_cart debería ocurrir sin que el modal "intercepte" el clic.
  }
}

module.exports = ProductDetailPage;
