// pages/ProductsPage.js
const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productGrid = '.features_items .col-sm-4';
    this.viewProductButton = '.choose > a';
  }

  /**
   * Haz clic en “View Product” del producto en la posición `index` (1-based).
   * @param {number} index — índice (1,2,3…)
   */
  async clickViewProductByIndex(index) {
    // Esperar a que al menos un producto esté renderizado en el grid:
    await this.page.waitForSelector(this.productGrid);

    // Con locator(), agarramos el conjunto de todos los elementos que coinciden con this.productGrid,
    // luego con .nth(index - 1) seleccionamos el que queremos (index-1 porque nth() es 0-based),
    // y dentro de ese elemento, en lugar de pasar un string CSS con índice, volvemos a usar locator() para el botón:
    const productCard = this.page.locator(this.productGrid).nth(index - 1);
    await productCard.locator(this.viewProductButton).click();
  }
}

module.exports = ProductsPage;
