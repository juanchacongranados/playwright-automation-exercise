// pages/ProductsPage.js

import BasePage from './BasePage.js';

export default class ProductsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Cada “card” de producto en la lista
    this.productGrid = '.features_items .col-sm-4';
  }

  /**
   * Hace clic en “View Product” del producto en la posición `index` (1-based).
   * @param {number} index
   */
  async clickViewProductByIndex(index) {
    // 1) Esperar a que haya al menos un producto en pantalla
    await this.page.waitForSelector(this.productGrid, { timeout: 10000 });

    // 2) Seleccionar la tarjeta del producto (índice 0-based en Playwright)
    const productCard = this.page.locator(this.productGrid).nth(index - 1);

    // 3) Hacer scroll (en caso de que esté parcialmente fuera de pantalla)
    await productCard.scrollIntoViewIfNeeded();

    // 4) Dentro de esa tarjeta, localizar el enlace “View Product” por texto
    const viewBtn = productCard.locator('a:has-text("View Product")');

    // 5) Esperar a que el “View Product” sea visible antes de hacer clic
    await viewBtn.waitFor({ state: 'visible', timeout: 10000 });

    // 6) Finalmente, clic en “View Product”
    await viewBtn.click();
  }
}
