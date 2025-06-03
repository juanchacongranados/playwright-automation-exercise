// pages/CheckoutPage.js

const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectores para la pantalla de registro extenso (tras hacer click en "Register / Login")
    this.signupNameInput       = 'input[data-qa="signup-name"]';
    this.signupEmailInput      = 'input[data-qa="signup-email"]';
    this.signupButton          = 'button[data-qa="signup-button"]';
    // Formulario “Create Account” completo
    this.titleMrRadio          = '#id_gender1';
    this.titleMrsRadio         = '#id_gender2';
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

    // Selectores para la página de carrito (ya logueados)
    this.placeOrderButton      = 'a[href="/payment"]';

    // Selectores para la página de pago (“Payment”)
    this.nameOnCardInput       = 'input[data-qa="name-on-card"]';
    this.cardNumberInput       = 'input[data-qa="card-number"]';
    this.cvcInput              = 'input[data-qa="cvc"]';
    this.expirationMonthInput  = 'input[data-qa="expiry-month"]';
    this.expirationYearInput   = 'input[data-qa="expiry-year"]';
    this.payAndConfirmButton   = 'button#submit'; // ID real en Payment

    // Selectores para la página de “Order Placed!”
    this.orderConfirmationText = 'h2:has-text("Order Placed!")';

    // Selector para Logout (aparece en el menú superior tras login)
    this.logoutLink            = 'a:has-text("Logout")';
  }

  /**
   * 7. Registrar nuevo usuario con datos Faker.
   *    name/email son los primeros campos que aparecen.
   */
  async registerNewUser(name, email, password, firstName, lastName, address, state, city, zipcode, mobile) {
    // 1) Llenar “New User Signup!” (name + email)
    await this.page.fill(this.signupNameInput, name);
    await this.page.fill(this.signupEmailInput, email);
    await this.page.click(this.signupButton);

    // 2) Esperar a que aparezca el formulario “Enter Account Information”
    await this.page.waitForSelector(this.titleMrRadio, { timeout: 5000 });

    // 3) Llenar el formulario completo
    // a) Seleccionar título (tomaremos siempre “Mr.” para simplificar)
    await this.page.check(this.titleMrRadio);
    // b) Contraseña
    await this.page.fill(this.passwordInput, password);
    // c) Fecha de nacimiento (anclamos valores fijos, p. ej. 1 / enero / 1990)
    await this.page.selectOption(this.dayDropdown, '1');
    await this.page.selectOption(this.monthDropdown, '1');
    await this.page.selectOption(this.yearDropdown, '1990');

    // d) Nombres y apellidos
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);

    // e) Dirección completa
    await this.page.fill(this.addressInput, address);
    await this.page.selectOption(this.countryDropdown, 'United States'); // Ajusta si necesitas otro
    await this.page.fill(this.stateInput, state);
    await this.page.fill(this.cityInput, city);
    await this.page.fill(this.zipcodeInput, zipcode);
    await this.page.fill(this.mobileNumberInput, mobile);

    // f) Crear cuenta
    await this.page.click(this.createAccountButton);

    // 4) Esperar a que redirija a la página de “Account Created!” o directamente al carrito
    //    En este sitio, tras crear cuenta, redirige al “My Account” con mensaje de éxito.
    //    Luego tienes que hacer clic en “Continue” (automaticamente redirige al Home),
    //    y luego ir a “Cart” para volver al flujo. Para simplificar, asume que tras 
    //    crear cuenta ya quedamos logueados y lista la sesión activa.
    await this.page.waitForSelector('text=Account Created!', { timeout: 5000 });
    // Hacer clic en “Continue”
    await this.page.click('a:has-text("Continue")');
    // Espera a que redirija al Home
    await this.page.waitForURL('https://automationexercise.com/');
  }

  /**
   * 8. Desde Home (ya logueado), navegar a Cart directamente,
   *    o bien, click en “Cart” del menú superior para ir a /view_cart.
   */
  async goToCart() {
    await this.page.click('a[href="/view_cart"]');
    await this.page.waitForURL(/\/view_cart/);
  }

  /**
   * 8. Confirmar la orden. En /view_cart, hacer clic en “Proceed To Checkout”,
   *    pero esta vez, como ya estamos logueados, simplemente pasaremos a /payment.
   */
  async confirmOrder() {
    // Click en “Proceed To Checkout”
    const proceedBtn = this.page.locator('a.check_out');
    await proceedBtn.waitFor({ state: 'visible', timeout: 5000 });
    await Promise.all([
      this.page.waitForURL(/\/checkout/),
      proceedBtn.click(),
    ]);

    // Ahora estamos en /checkout; en esta página hay un botón “Place Order” 
    // (que es <a href="/payment">Place Order</a>)
    await this.page.waitForSelector(this.placeOrderButton, { timeout: 5000 });
    await Promise.all([
      this.page.waitForURL(/\/payment/),
      this.page.click(this.placeOrderButton),
    ]);
  }

  /**
   * 8.1. En la página de página de pago (/payment), llenar datos de tarjeta y confirmar.
   */
  async fillPaymentDetailsAndPlaceOrder(cardName, cardNumber, cvc, expMonth, expYear) {
    // Esperar a que cargue el formulario de pago
    await this.page.waitForSelector(this.nameOnCardInput, { timeout: 5000 });

    // Llenar datos de tarjeta
    await this.page.fill(this.nameOnCardInput, cardName);
    await this.page.fill(this.cardNumberInput, cardNumber);
    await this.page.fill(this.cvcInput, cvc);
    await this.page.fill(this.expirationMonthInput, expMonth);
    await this.page.fill(this.expirationYearInput, expYear);

    // Hacer clic en “Pay and Confirm Order”
    await this.page.click(this.payAndConfirmButton);

    // Esperar a que aparezca el mensaje “Order Placed!”
    await this.page.waitForSelector(this.orderConfirmationText, { timeout: 5000 });
  }

  /**
   * 9. Hacer clic en “Logout” desde el menú superior.
   */
  async logout() {
    // El enlace “Logout” aparece en el header tras loguearse
    const logoutBtn = this.page.locator(this.logoutLink);
    await logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
    await logoutBtn.click();
    // Verificamos que volvimos a la Home sin sesión
    await this.page.waitForURL('https://automationexercise.com/');
  }
}

module.exports = CheckoutPage;
