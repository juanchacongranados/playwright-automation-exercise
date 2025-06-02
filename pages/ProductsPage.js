const BasePage = require('./BasePage');
class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productGrid = '.features_items .col-sm-4';
    this.viewProductButton = '.choose > a';
  }
  async clickViewProductByIndex(index) {
    await this.page.waitForSelector(this.productGrid);
    const productLocator = `(${this.productGrid})[${index}]`;
    await this.page.click(`${productLocator} ${this.viewProductButton}`);
  }
}
module.exports = ProductsPage;
