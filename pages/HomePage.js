const BasePage = require('./BasePage');
class HomePage extends BasePage {
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
module.exports = HomePage;
