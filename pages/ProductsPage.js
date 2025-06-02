// pages/ProductsPage.js
const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    // 1) Ubica el contenedor principal de productos
    this.productCardSelector = '.features_items > .col-sm-4';
    // 2) Dentro de cada card, el botón “View Product” puede coincidir con este texto
    this.viewProductButtonSelector = 'a:has-text("View Product")';
  }

  /**
   * Haz clic en “View Product” del producto en la posición `index` (1-based).
   * @param {number} index — índice (1,2,3…)
   */
  async clickViewProductByIndex(index) {
    // Esperar a que cargue al menos una card
    await this.page.waitForSelector(this.productCardSelector);

    // 1) Tomamos todos los elementos que cumplen ".features_items > .col-sm-4"
    const allCards = this.page.locator(this.productCardSelector);

    // 2) Seleccionamos el N-ésimo (index-1 porque .nth es 0-based)
    const productCard = allCards.nth(index - 1);

    // 3) Dentro de esa card, hacemos clic en "View Product"
    //    Ubicamos la etiqueta <a> que tenga texto "View Product"
    const viewBtn = productCard.locator(this.viewProductButtonSelector);

    // 4) Esperar a que el botón sea visible y clickeable
    await viewBtn.waitFor({ state: 'visible', timeout: 5000 });
    await viewBtn.click();
  }
}

module.exports = ProductsPage;
