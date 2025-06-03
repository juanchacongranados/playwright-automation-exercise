// pages/CheckoutPage.js

import BasePage from './BasePage.js';

export default class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // 1) “New User Signup!” (nombre y email)
    this.signupNameInput       = 'input[data-qa="signup-name"]';
    this.signupEmailInput      = 'input[data-qa="signup-email"]';
    this.signupButton          = 'button[data-qa="signup-button"]';

    // 2) “Enter Account Information” (Create Account)
    this.titleMrRadio          = '#id_gender1';
    this.passwordInput         = 'input[data-qa="password"]';
    this.dayDropdown           = 'select[data-qa="days"]';
    this.monthDropdown         = 'select[data-qa="months"]';
    this.yearDropdown          = 'select[data-qa="years"]';
    this.firstNameInput        = 'input[data-qa="first_name"]';
    this.lastNameInput         = 'input[data-qa="last_name"]';
    this.addressInput          = 'input[data-qa="address"]';
    this.countryDropdown       = 'select[data-qa="country"]';
    this.stateInput            = 'input[data-qa="state"]';
    this.cityInput             = 'input[data-qa="city"]';
    this.zipcodeInput          = 'input[data-qa="zipcode"]';
    this.mobileNumberInput     = 'input[data-qa="mobile_number"]';
    this.createAccountButton   = 'button[data-qa="create-account"]';

    // 3) “Account Created!” y “Continue”
    this.accountCreatedText    = 'text=Account Created!';
    this.continueButton        = 'a:has-text("Continue")';

    // 4) Ir al carrito desde el menú
    this.cartLink              = 'a[href="/view_cart"]';

    // 5) En /view_cart → “Proceed To Checkout” (navega a /checkout)
    this.proceedToCheckoutBtn  = 'a[href="/checkout"], a.check_out';

    // 6) En /checkout → “Place Order” (navega a /payment)
    this.placeOrderButton      = 'a:has-text("Place Order")';

    // 7) Campos de pago en /payment
    this.nameOnCardInput       = 'input[name="name_on_card"]';
    this.cardNumberInput       = 'input[name="card_number"]';
    this.cvcInput              = 'input[name="cvc"]';
    this.expirationMonthInput  = 'input[name="expiry_month"]';
    this.expirationYearInput   = 'input[name="expiry_year"]';
    this.payAndConfirmButton   = 'button:has-text("Pay and Confirm Order")';

    // 8) “Order Placed!”
    this.orderConfirmationText = 'h2:has-text("Order Placed!")';

    // 9) “Logout” en el menú superior
    this.logoutLink            = 'text=Logout';
  }

  /**
   * Paso 7: Registrar nuevo usuario usando Faker
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} address
   * @param {string} state
   * @param {string} city
   * @param {string} zipcode
   * @param {string} mobile
   */
  async registerNewUser(name, email, password, firstName, lastName, address, state, city, zipcode, mobile) {
    // 1) “New User Signup!”: nombre y correo
    await this.page.fill(this.signupNameInput, name);
    await this.page.fill(this.signupEmailInput, email);
    await this.page.click(this.signupButton);

    // 2) Esperar formulario “Enter Account Information”
    await this.page.waitForSelector(this.titleMrRadio, { timeout: 10000 });

    // 3) Completar detalles:
    await this.page.check(this.titleMrRadio);
    await this.page.fill(this.passwordInput, password);
    await this.page.selectOption(this.dayDropdown, '1');
    await this.page.selectOption(this.monthDropdown, '1');
    await this.page.selectOption(this.yearDropdown, '1990');
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.addressInput, address);
    await this.page.selectOption(this.countryDropdown, 'United States');
    await this.page.fill(this.stateInput, state);
    await this.page.fill(this.cityInput, city);
    await this.page.fill(this.zipcodeInput, zipcode);
    await this.page.fill(this.mobileNumberInput, mobile);

    // 4) Hacer clic en “Create Account”
    await this.page.click(this.createAccountButton);

    // 5) Esperar “Account Created!” y hacer clic en “Continue”
    await this.page.waitForSelector(this.accountCreatedText, { timeout: 10000 });
    await this.page.click(this.continueButton);

    // 6) Esperar a que redirija al home (usuario ya logueado)
    await this.page.waitForURL('https://automationexercise.com/', { timeout: 10000 });
  }

  /**
   * Paso 8: Ir al carrito (/view_cart) desde el menú superior
   */
  async goToCart() {
    await this.page.click(this.cartLink);
    await this.page.waitForURL(/\/view_cart/, { timeout: 10000 });
  }

  /**
   * Paso 8 (continuación): En /view_cart, hacer clic en “Proceed To Checkout”
   * para llegar a /checkout, y luego clic en “Place Order” para ir a /payment
   */
  async confirmOrder() {
    // 1) Click “Proceed To Checkout”
    const proceedBtn = this.page.locator(this.proceedToCheckoutBtn);
    await proceedBtn.waitFor({ state: 'visible', timeout: 10000 });
    await proceedBtn.click();

    // 2) Ahora en /checkout, esperar y hacer clic en “Place Order”
    await this.page.waitForSelector(this.placeOrderButton, { timeout: 10000 });
    await this.page.click(this.placeOrderButton);

    // 3) Esperar a que cargue el formulario de pago (campo name_on_card)
    await this.page.waitForSelector(this.nameOnCardInput, { timeout: 10000 });
  }

  /**
   * Paso 12: Llenar datos de tarjeta en /payment y confirmar
   * @param {string} cardName
   * @param {string} cardNumber
   * @param {string} cvc
   * @param {string} expMonth
   * @param {string} expYear
   */
  async fillPaymentDetailsAndPlaceOrder(cardName, cardNumber, cvc, expMonth, expYear) {
    await this.page.fill(this.nameOnCardInput, cardName);
    await this.page.fill(this.cardNumberInput, cardNumber);
    await this.page.fill(this.cvcInput, cvc);
    await this.page.fill(this.expirationMonthInput, expMonth);
    await this.page.fill(this.expirationYearInput, expYear);
    await this.page.click(this.payAndConfirmButton);
    await this.page.waitForSelector(this.orderConfirmationText, { timeout: 10000 });
  }

  /**
   * Paso 13: Hacer logout y esperar a que vuelva al home
   */
  async logout() {
    const logoutBtn = this.page.locator(this.logoutLink);
    await logoutBtn.waitFor({ state: 'visible', timeout: 10000 });
    await logoutBtn.click();
    await this.page.waitForURL(/https:\/\/automationexercise\.com(\/|\/index\.html)?/, {timeout: 10000});
  }
}
