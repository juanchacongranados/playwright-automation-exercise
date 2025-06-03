// tests/purchase-flow.spec.js

import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import ProductsPage from '../pages/ProductsPage.js';
import ProductDetailPage from '../pages/ProductDetailPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { getRandomQuantity } from '../utils/fakerHelper.js';
import { faker } from '@faker-js/faker';

test.describe('Flujo de compra en automationexercise.com', () => {
  test('TC-001: Agregar tercer producto al carrito y validar modal de checkout', async ({ page }) => {
    // 1) Instanciar Page Objects
    const homePage          = new HomePage(page);
    const productsPage      = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const checkoutPage      = new CheckoutPage(page);

    // 2) Paso 1: Ir a home
    await homePage.goToHome();
    await expect(page).toHaveURL('https://automationexercise.com/');

    // 3) Paso 2: Ir a Products
    await homePage.clickProducts();
    await expect(page).toHaveURL(/\/products/);

    // 4) Paso 3: Clic en “View Product” del tercer producto
    await productsPage.clickViewProductByIndex(3);
    await expect(page).toHaveURL(/\/product_details\/\d+/);

    // 5) Paso 4: Generar y setear cantidad aleatoria
    const randomQty = getRandomQuantity(1, 20);
    await productDetailPage.setQuantity(randomQty);
    const qtyValue = await page.inputValue(productDetailPage.quantityInput);
    expect(Number(qtyValue)).toBe(randomQty);

    // 6) Paso 5: Agregar al carrito y validar modal
    await productDetailPage.clickAddToCart();
    await expect(page.locator(productDetailPage.cartModal)).toBeVisible();
    await expect(page.locator(productDetailPage.cartModal))
      .toContainText('Your product has been added to cart');

    // 7) Paso 6: Clic en “View Cart” dentro del modal
    await productDetailPage.clickProceedToCheckout();
    await expect(page).toHaveURL(/\/view_cart/);

    // 8) Paso 7: En /view_cart, clic en “Proceed To Checkout” (muestra pop-up)
    const proceedBtn = page.locator('a.check_out');
    await proceedBtn.waitFor({ state: 'visible', timeout: 10000 });
    await proceedBtn.click();

    // 9) Paso 8: En el pop-up, clic en “Register / Login”
    const registerLoginBtn = page.locator('u:has-text("Register / Login")');
    await registerLoginBtn.waitFor({ state: 'visible', timeout: 10000 });
    await Promise.all([
      page.waitForURL(/\/login/),
      registerLoginBtn.click(),
    ]);

    // 10) Paso 9: Validar “New User Signup!”
    await expect(page.locator('.signup-form')).toBeVisible();

    // ————————————————————————————
    //            Pasos opcionales
    // ————————————————————————————

    // 11) Paso 10: Registrar nuevo usuario con Faker
    const randomName      = faker.person.firstName() + ' ' + faker.person.lastName();
    const randomEmail     = faker.internet.email().toLowerCase();
    const randomPassword  = faker.internet.password(8);
    const firstName       = faker.person.firstName();
    const lastName        = faker.person.lastName();
    const address         = faker.location.streetAddress();
    const state           = faker.location.state();
    const city            = faker.location.city();
    const zipcode         = faker.location.zipCode();
    const mobile          = faker.phone.number('3##-###-####');

    await checkoutPage.registerNewUser(
      randomName,
      randomEmail,
      randomPassword,
      firstName,
      lastName,
      address,
      state,
      city,
      zipcode,
      mobile
    );

    // 12) Paso 11: Ir al carrito y confirmar orden
    await checkoutPage.goToCart();
    await checkoutPage.confirmOrder();

    // 13) Paso 12: Llenar datos de tarjeta y confirmar
    const cardName   = `${firstName} ${lastName}`;
    const cardNumber = '4111111111111111';
    const cvc        = '123';
    const expMonth   = '12';
    const expYear    = '2026';

    await checkoutPage.fillPaymentDetailsAndPlaceOrder(
      cardName,
      cardNumber,
      cvc,
      expMonth,
      expYear
    );

    // 14) Paso 13: Logout
    await checkoutPage.logout();
  });
});
